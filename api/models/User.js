const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: [true, "username required"] },
  email: {
    type: String,
    unique: true,
    required: [true, "email required"],
  },
  password: { type: String, required: [true, "password required"] },
  profilePhotoName: { type: String },
});

const userModel = mongoose.model("UserData", UserSchema);

module.exports = userModel;
