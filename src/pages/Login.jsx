import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import axios from "axios";
import validationSchema from "../schema/Login.schema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginImage from "../assets/Login.png";

const Login = () => {
  const { getUser } = useContext(Context);
  const initialValues = {
    userName: "",
    password: "",
  };

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        "https://zbl.zaffarsons.com/zbl/login",
        {
          username: values.userName,
          password: values.password,
        }
      );
      console.log("Success");
      if (data.success) {
        localStorage.setItem("userData", JSON.stringify(data));
        getUser();
        navigate("/");
      }
    } catch (error) {
      console.log("Login Error:", error);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#ededed]">
      <div className="w-[40%] min-w-[320px] h-[50%] shadow-2xl flex rounded-2xl">
        <div className="w-[40%] h-full bg-white">
          <img
            className="w-[100%] h-[100%] mx-auto mb-12"
            src={LoginImage}
            alt="Login"
          />
        </div>
        <div className="form bg-white w-[60%] h-full px-4 flex flex-col justify-center">
          <h1 className="text-black font-bold mb-5 xl:text-3xl md:text-xl text-lg italic text-center">
            Login Your Account
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <Field
                      id="userName"
                      name="userName"
                      type="userName"
                      autoComplete="userName"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    <ErrorMessage
                      name="userName"
                      component="p"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500 lg:text-[1vw] text-[7px]"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
