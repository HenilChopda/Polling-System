import { useContext, useState ,useEffect } from "react";
import UserProfileImage from "../images/programmer.png";
import "animate.css/animate.min.css";
import "./UserProfile.css";
import { MyContext } from "../components/ContextProvider";
import { Navigate } from "react-router-dom";
import axios from "axios";
import CreatedPollsByUser from "./CreatedPollsByUser";
import VotedPollsByUser from "./VotedPollsByUser";

const UserProfile = () => {
  const { user, ready, setUser } = useContext(MyContext);
  const [isCreatedPolls, setCreatedPolls] = useState(true);
  const [redirect, setRedirect] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('file-input').click();
  };

  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  const handleToggle = () => {
    setCreatedPolls((prev) => !prev);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return alert("No file selected");
    }

    const formData = new FormData();
    formData.append("profileImage", selectedFile);
    formData.append("userId", user._id); // Include user ID in the form data

    try {
      const response = await axios.post("http://localhost:7000/update-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(response.data); // Update user context with the new data
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handlelogout = async (e) => {
    e.preventDefault();
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  if (!ready) {
    return "loading";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  // useEffect(() => {
  //   // Fetch user data when the component mounts
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get("/profile");
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  console.log(user?.profilePhotoName);

  return (
    <div className="mx-auto p-8 bg-gradient-to-r from-dad7cd via-a3b18a to-588157 rounded-3xl animate__animated animate__fadeIn duration-500 flex">
      {/* Left Partition */}
      <div className="flex flex-col w-5/6 mr-10">
        <div className="flex items-center justify-center space-x-5 mb-3">
          <span
            className={`text-3xl font-extrabold cursor-pointer  ${
              isCreatedPolls ? "text-3a5a40 " : "text-344e41 text-emerald-200 "
            } transition duration-300 ease-in-out `}
            onClick={() => setCreatedPolls(true)}
          >
            Created Polls
          </span>
          <div className="flex items-center space-x-2">
            <div
              className={`${
                isCreatedPolls ? "bg-emerald-400 " : " bg-emerald-200"
              } relative inline-flex h-10 w-20 cursor-pointer rounded-full transition-colors duration-300 ease-in-out`}
              onClick={handleToggle}
            >
              <div
                className={`${
                  isCreatedPolls ? "translate-x-0 " : "translate-x-10"
                } absolute h-10 w-10 rounded-full bg-white shadow-md ring-0 transition-transform duration-300 ease-in-out;`}
              />
            </div>
          </div>
          <span
            className={`text-3xl cursor-pointer font-extrabold ${
              !isCreatedPolls ? "text-3a5a40 " : "text-344e41 text-emerald-200"
            } transition duration-300 ease-in-out`}
            onClick={() => setCreatedPolls(false)}
          >
            Voted Polls
          </span>
        </div>
        <div className={` ${isCreatedPolls ? "text-3a5a40 " : "text-344e41"}`}>
          {isCreatedPolls ? (
            <div>
              {/* <h3 className="text-2xl font-semibold mb-4"> */}
              <div className=" bg-emerald-200 rounded-xl shadow-lg h-96">
                <CreatedPollsByUser />
              </div>
              {/* </h3> */}
            </div>
          ) : (
            <div>
              <VotedPollsByUser />
            </div>
          )}
        </div>
      </div>

      {/* Right Partition */}
      <div className="flex flex-col items-center h-1/6 bg-emerald-200 mt-12 p-5 shadow-xl rounded-xl w-1/6 ml-auto">
        <div className="w-32 h-32 bg-transparent rounded-full mb-4 overflow-hidden animate__animated animate__bounceIn">
          <img
          //  src="{`http://localhost:7000/uploads/${user.profilePhotoName}`}"
            src={user?.profilePhotoName ? `http://localhost:7000/uploads/${user.profilePhotoName}` : UserProfileImage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        
        <h2 className="text-xl font-bold text-3a5a40 mb-1">{user?.username}</h2>
        <p className="text-344e41 mb-1">{user?.email}</p>
       
        {/* <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" /> */}
        <div className="flex flex-col items-start mb-2">
      <input
        type="file"
        accept="image/*"
        id="file-input"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded"
      >
        Choose File
      </button>
      <span className="text-gray-700 text-sm mt-2">
        {selectedFile ? selectedFile.name : 'No file chosen'}
      </span>
    </div>
        <button
          onClick={handleUpload}
          className="text-white rounded-lg w-20 p-2 bg-emerald-500 hover:bg-emerald-600 duration-300"
        >
          Upload
        </button>

        <div className="text-center mb-2 mt-2">
          <button
            onClick={handlelogout}
            className="text-white rounded-lg w-20 p-2 bg-red-500 hover:bg-red-600 duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
