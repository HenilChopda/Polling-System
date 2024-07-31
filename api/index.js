// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const UserData = require("./models/User");
const Poll = require("./models/Poll");
const Vote = require("./models/Voter");
const jwtSecrect = "jayshreeram";
const multer = require('multer');
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// middleware for logging incoming requests
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URL);

// Set storage engine with custom filename
const storage = multer.diskStorage({
  destination: './uploads/', // Directory to save the uploaded files
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() ;
    const ext = path.extname(file.originalname).toLowerCase();
    const newFilename = req.body.username + '-' + uniqueSuffix + ext;
    cb(null, newFilename);
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}


app.get("/", (req, res) => {
  res.send("Server Running!");
});

app.post("/register", upload.single('profileImage'), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const profileImage = req.file ? req.file.filename : null;
    console.log(profileImage);

    const user = await UserData.create({
      username,
      email,
      password,
      profilePhotoName: profileImage,
    });

    res.status(201).send(user);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const record = await UserData.findOne({ email });
  if (record) {
    {
      const passok = record.password === password;
      if (passok) {
        jwt.sign(
          {
            username: record.username,
            email: record.email,
            id: record._id,
            profilePhotoName: record.profilePhotoName,
          },
          jwtSecrect,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(record);
          }
        );
      } else {
        res.status(422).json("not ok");
      }
    }
  } else {
    res.status(422).json("Not found");
  }
});

app.post("/createpoll", async (req, res) => {
  try {
    const { question, options } = req.body;
    const { token } = req.cookies;
    const user = jwt.verify(token, jwtSecrect, {});
    const genpoll = await Poll.create({
      creator: user.id,
      question,
      options,
    });
    res.json(genpoll);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/createpoll", async (req, res) => {
  try {
    const { question, options } = req.body;
    const { token } = req.cookies;
    const user = jwt.verify(token, jwtSecrect, {});

    // Convert options array to match the schema
    const formattedOptions = options.map((option) => ({ option, votes: 0 }));

    const genpoll = await Poll.create({
      creator: user.id,
      question,
      options: formattedOptions,
    });

    res.json(genpoll);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecrect, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.get("/votepoll", async (req, res) => {
  try {
    const polls = await Poll.find().populate("creator", "username");

    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/vote", async (req, res) => {
  try {
    const { pollId, selectedOption, optionId } = req.body;
    const { token } = req.cookies;
    const userdata = jwt.verify(token, jwtSecrect, {});
    const existingVote = await Vote.findOne({
      user: userdata.id,
      poll: pollId,
    });

    if (existingVote) {
      return res
        .status(400)
        .json({ error: "User has already voted for this poll." });
    }

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    const selectedOptionIndex = poll.options.findIndex(
      (option) => option.option === selectedOption
    );

    if (selectedOptionIndex === -1) {
      return res.status(400).json({ error: "Invalid selected option" });
    }

    poll.options[selectedOptionIndex].votes += 1;

    await poll.save();

    const newVote = await Vote.create({
      user: userdata.id,
      poll: pollId,
      option: optionId,
    });

    res.status(200).json({ message: "Vote submitted successfully", newVote });
  } catch (error) {
    console.error("Error submitting vote:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/individualpoll", (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecrect, {}, async (err, user) => {
      const { id } = user;
      if (err) throw err;
      res.json(await Poll.find({ creator: id }));
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/votedpoll", async (req, res) => {
  try {
    const { token } = req.cookies;
    const userdata = jwt.verify(token, jwtSecrect, {});
    const voted = await Vote.find({ user: userdata.id }).populate({
      path: "poll",
      select: "creator question options",
      populate: {
        path: "creator",
        select: "username",
      },
    });

    res.json(voted);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Upload Endpoint
app.post('/upload', upload.single('profileImage'), (req, res) => {

  if (req.file) {
    // Save the file to uploads directory
    
    res.json({
      message: 'File uploaded!',
      file: `uploads/${req.file.filename}`
    });
  } else {
    res.status(400).json({ message: 'No file selected' });
  }
});

// Update profile image endpoint
// app.post('/update-profile-image', upload.single('profileImage'), async (req, res) => {
//   const { userId } = req.body;
//   if (req.file) {
//     try {
//       const updatedUser = await UserData.findByIdAndUpdate(
//         userId,
//         { profilePhotoName: req.file.filename },
//         { new: true }
//       );
//       res.json(updatedUser);
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating profile image', error });
//     }
//   } else {
//     res.status(400).json({ message: 'No file selected' });
//   }
// });

app.post('/update-profile-image', upload.single('profileImage'), async (req, res) => {
  try {
    const { userId } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'No file selected' });
    }

    if (!userId) {
      return res.status(400).json({ message: 'User ID not provided' });
    }

    console.log(`Received file: ${req.file.filename} for user: ${userId}`);

    const updatedUser = await UserData.findByIdAndUpdate(
      userId,
      { profilePhotoName: req.file.filename },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ message: 'Error updating profile image', error });
  }
});


app.post('/update-profile-image', upload.single('profileImage'), async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file selected' });
    }

    if (!userId) {
      return res.status(400).json({ message: 'User ID not provided' });
    }

    console.log(`Received file: ${req.file.filename} for user: ${userId}`);

    const user = await UserData.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if there's an existing profile photo and delete it
    if (user.profilePhotoName) {
      const existingFilePath = path.join(__dirname, 'uploads', user.profilePhotoName);
      if (fs.existsSync(existingFilePath)) {
        try {
          fs.unlinkSync(existingFilePath);
          console.log(`Deleted old profile image: ${existingFilePath}`);
        } catch (error) {
          console.error('Error deleting existing profile image:', error);
        }
      } else {
        console.warn(`Existing profile image not found: ${existingFilePath}`);
      }
    }

    // Update the user's profile with the new photo
    user.profilePhotoName = req.file.filename;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ message: 'Error updating profile image', error });
  }
});


app.listen(7000);
