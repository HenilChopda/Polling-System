import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import backgroundSVG from "../images/bg.svg";

const Register = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }

    try {
      const response = await axios.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        // Redirect to login after successful registration
        setRedirect(true);
      }
    } catch (error) {
      alert("Failed.. Something is wrong");
      setError("username", {
        type: "manual",
        message: "Registration failed. Please try again.",
      });
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className="flex items-center justify-center bg-height bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundSVG})` }}
    >
      <div className="ml-8">
        <p className="font-semibold text-2xl italic text-emerald-950 opacity-50">
          Empowering Voices with
        </p>
        <p className="font-semibold text-8xl">
          <span>VoiceVault</span>
        </p>
      </div>

      <div className="flex justify-center h-108 my-10 ml-auto mr-10">
        <div className="w-96 bg-emerald-200/20 p-8 shadow-2xl rounded-xl border border-black/10 hover:bg-emerald-700/ hover:duration-500 out-of-range:duration-500">
          <h2 className="text-2xl font-bold mb-4">Registration</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600 my-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className={`w-full border rounded-md py-2 px-3 border-black ${
                  errors.username ? "border-red-500" : ""
                }`}
                placeholder="Enter your username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 my-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className={`w-full border rounded-md py-2 px-3 border-black ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 my-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className={`w-full border rounded-md py-2 px-3 border-black ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="profileImage" className="block text-gray-600 my-2">
                Profile Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-2"
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-700"
            >
              Register
            </button>
          </form>
          <div className="mt-4">
            <p className="text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-900 hover:underline">
                Go to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, Navigate } from "react-router-dom";
// import axios from "axios";
// import backgroundSVG from "../images/bg.svg";

// const Register = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [user, setUser] = useState({});
//   const [redirect, setRedirect] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm();

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append("profileImage", selectedFile);

//       try {
//         const response = await axios.post("/upload", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         // Update the user profile image URL if the upload is successful
//         if (response.data.success) {
//           setUser((prevUser) => ({
//             ...user,
//             profileImage: response.data.file,
//           }));
//         }
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       }
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post("/register", data);
//       if(response.status === 201){
//       await handleUpload(); // Upload the file after registering
//       // Redirect to login after successful registration
//       setRedirect(true);
//     }
//     } catch (error) {
//       alert("Failed.. Something is wrong");
//       // Example: Set custom error for a specific field
//       setError("username", {
//         type: "manual",
//         message: "Registration failed. Please try again.",
//       });
//     }
//   };

//   if (redirect) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div
//       className="flex items-center justify-center bg-height bg-cover bg-center"
//       style={{ backgroundImage: `url(${backgroundSVG})` }}
//     >
//       <div className="ml-8">
//         <p className="font-semibold text-2xl italic text-emerald-950 opacity-50">
//           Empowering Voices with
//         </p>
//         <p className="font-semibold text-8xl">
//           <span>VoiceVault</span>
//         </p>
//       </div>

//       <div className="flex justify-center h-108 my-10 ml-auto mr-10">
//         <div className="w-96 bg-emerald-200/20 p-8 shadow-2xl rounded-xl border border-black/10 hover:bg-emerald-700/ hover:duration-500 out-of-range:duration-500">
//           <h2 className="text-2xl font-bold mb-4">Registration</h2>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-4">
//               <label htmlFor="username" className="block text-gray-600 my-2">
//                 Username:
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 className={`w-full border rounded-md py-2 px-3 border-black ${
//                   errors.username ? "border-red-500" : ""
//                 }`}
//                 placeholder="Enter your username"
//                 {...register("username", { required: true })}
//               />
//               {errors.username && (
//                 <span className="text-red-500 text-sm">
//                   {errors.username.message}
//                 </span>
//               )}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-600 my-2">
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className={`w-full border rounded-md py-2 px-3 border-black ${
//                   errors.email ? "border-red-500" : ""
//                 }`}
//                 placeholder="Enter your email"
//                 {...register("email", { required: true })}
//               />
//               {errors.email && (
//                 <span className="text-red-500 text-sm">
//                   {errors.email.message}
//                 </span>
//               )}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="password" className="block text-gray-600 my-2">
//                 Password:
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className={`w-full border rounded-md py-2 px-3 border-black ${
//                   errors.password ? "border-red-500" : ""
//                 }`}
//                 placeholder="Enter your password"
//                 {...register("password", { required: true })}
//               />
//               {errors.password && (
//                 <span className="text-red-500 text-sm">
//                   {errors.password.message}
//                 </span>
//               )}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="profileImage" className="block text-gray-600 my-2">
//                 Profile Image:
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="mb-2"
//               />
//             </div>

//             <button
//               type="submit"
//               className="bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-700"
//             >
//               Register
//             </button>
//           </form>
//           <div className="mt-4">
//             <p className="text-slate-500">
//               Already have an account?{" "}
//               <Link to="/login" className="text-emerald-900 hover:underline">
//                 Go to login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
