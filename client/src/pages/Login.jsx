import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../components/ContextProvider";
import backgroundSVG from "../images/bg.svg"; 

const Login = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(MyContext);
  const [redirect, setRedirect] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      const { data: userData } = await axios.post("/login", data);
      setUser(userData);
      setRedirect(true);
    } catch (error) {
      alert("Login Failed");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="flex items-center justify-center bg-height"
      style={{
        backgroundImage: `url(${backgroundSVG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="ml-8">
        <p className="font-semibold text-2xl italic text-emerald-950 opacity-50">
          Empowering Voices with
        </p>
        <p className=" font-semibold text-8xl">
          <span>VoiceVault</span>
        </p>
      </div>

      <div className="w-96 bg-emerald-200/20 ml-auto mr-10 p-8 shadow-2xl rounded-xl border border-black/10">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 my-2">
              Email:
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <>
                  <input
                    type="email"
                    id="email"
                    className="w-full border rounded-md py-2 px-3 border-black"
                    placeholder="Enter your email"
                    {...field}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password:
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <>
                  <input
                    type="password"
                    id="password"
                    className="w-full border rounded-md py-2 px-3 border-black"
                    placeholder="Enter your password"
                    {...field}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <button
            className="bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-700"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <p className="text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-900 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
