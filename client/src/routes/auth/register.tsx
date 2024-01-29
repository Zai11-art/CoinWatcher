import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../state";
import axios from "axios";

// CONFIG REGISTER SCHEMA
const registerSchema = yup.object().shape({
  userName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  bio: yup.string().required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required"),
});

interface ValuesRegisterType {
  email: string;
  userName: string;
  password: string;
  bio: string;
  picture: { name: string };
}

// INITIAL VALUES
const initialValuesRegister = {
  userName: "",
  email: "",
  password: "",
  picture: "",
  bio: "",
};

const Register = () => {
  const mode = useSelector((state: RootState) => state.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  interface OnSubmitPropsType {
    resetForm: () => void;
  }

  const register = async (
    values: ValuesRegisterType,
    onSubmitProps: OnSubmitPropsType
  ) => {
    try {
      // image parse
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("picturePath", values.picture.name);

      console.log(formData);

      const savedUserResponse = await axios.post(
        "http://localhost:3001/auth/register",
        formData
      );

      const savedUser = await savedUserResponse.data;

      if (savedUser) {
        navigate("/login");
      }

      onSubmitProps.resetForm();
    } catch (err) {
      console.error(err)
      toast.error("Register failed.");
    }
  };

  const handleFormSubmitRegister = async (
    values: ValuesRegisterType,
    onSubmitProps: OnSubmitPropsType
  ) => {
    console.log(values);
    await register(values, onSubmitProps);
  };

  return (
    <div
      className={`flex h-full w-full flex-col items-center ${
        mode === "light" ? "bg-slate-300/95" : "bg-[#051925]"
      } pt-[100px] pb-[300px]`}
    >
      <div className="sm:w-[500px] w-full flex flex-col sm:px-0 px-5">
        <div
          className={`flex px-7 pt-8 homePageCard rounded-t-lg z-[1] h-[100px] w-full`}
        >
          <span className="text-3xl text-white text-glow font-bold">
            REGISTER
          </span>
        </div>

        <div
          className={`p-7 rounded-b-2xl ${
            mode === "light"
              ? "newscard-filter-light opacity-[80%]"
              : "newscard-filter"
          } flex  shadow-lg shadow-cyan-500/30 `}
        >
          <Formik
            onSubmit={handleFormSubmitRegister}
            // @ts-ignore
            initialValues={initialValuesRegister}
            validationSchema={registerSchema}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
              errors,
              touched,
            }) => (
              <form
                className="w-full flex flex-col gap-5"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-5">
                  <div
                    className={` flex w-full flex-col ${
                      mode === "light"
                        ? "font-semibold text-black"
                        : "text-[white]"
                    } gap-2 `}
                  >
                    <div className="flex flex-row justify-between">
                      <label className="text-glow " htmlFor="userName">
                        Username
                      </label>
                      {/* error handling */}
                      {errors.userName && touched.userName ? (
                        <div className="text-red-500 transition-all ease-in-out">
                          {errors.userName}
                        </div>
                      ) : null}
                    </div>

                    <input
                      required
                      className={`${
                        mode === "light"
                          ? "bg-slate-200/90 text-slate-900"
                          : "bg-[#02121c] text-white"
                      } rounded-lg`}
                      name="userName"
                      type="text"
                      aria-label="UserName"
                      value={values.userName || ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>

                  <div
                    className={` flex w-full flex-col ${
                      mode === "light"
                        ? "font-semibold text-black"
                        : "text-[white]"
                    } gap-2 `}
                  >
                    <div className="flex flex-row justify-between">
                      <label className="text-glow " htmlFor="email">
                        Email
                      </label>
                      {/* error handling */}
                      {errors.email && touched.email ? (
                        <div className="text-red-500 transition-all ease-in-out">
                          {errors.email}
                        </div>
                      ) : null}
                    </div>
                    <input
                      required
                      className={`${
                        mode === "light"
                          ? "bg-slate-200/90 text-slate-900"
                          : "bg-[#02121c] text-white"
                      } rounded-lg`}
                      name="email"
                      type="text"
                      aria-label="Email"
                      value={values.email || ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>

                  <div
                    className={` flex w-full flex-col ${
                      mode === "light"
                        ? "font-semibold text-black"
                        : "text-[white]"
                    } gap-2 `}
                  >
                    <div className="flex flex-row justify-between">
                      <label className="text-glow" htmlFor="bio">
                        Bio
                      </label>
                      {/* error handling */}
                      {errors.bio && touched.bio ? (
                        <div className="text-red-500 transition-all ease-in-out">
                          {errors.bio}
                        </div>
                      ) : null}
                    </div>
                    <input
                      required
                      className={`${
                        mode === "light"
                          ? "bg-slate-200/90 text-slate-900"
                          : "bg-[#02121c] text-white"
                      } rounded-lg`}
                      name="bio"
                      type="text"
                      aria-label="Bio"
                      value={values.bio || ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>

                  <div
                    className={` flex w-full flex-col ${
                      mode === "light"
                        ? "font-semibold text-black"
                        : "text-[white]"
                    } gap-2 `}
                  >
                    <div className="flex flex-row justify-between">
                      <label className="text-glow pb-2" htmlFor="password">
                        Password
                      </label>
                      {/* error handling */}
                      {errors.password && touched.password ? (
                        <div className="text-red-500 transition-all ease-in-out">
                          {errors.password}
                        </div>
                      ) : null}
                    </div>
                    <input
                      required
                      className={`${
                        mode === "light"
                          ? "bg-slate-200/90 text-slate-900"
                          : "bg-[#02121c] text-white"
                      } rounded-lg`}
                      name="password"
                      type="password"
                      aria-label="Password"
                      value={values.password || ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Dropzone
                      accept={{
                        "image/png": [".png"],
                        "image/jpg": [".jpg"],
                        "image/jpeg": [".jpeg"],
                      }}
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <div
                              className={`flex h-[5rem] flex-row items-center justify-center border-[1px] border-dashed ${
                                mode === "light"
                                  ? "border-blue-900 text-blue-900"
                                  : "border-[#9ccddc] text-white"
                              } `}
                            >
                              <div className="flex flex-col text-center">
                                <p className="cursor-pointer pb-1 font-bold ">
                                  Add User Picture Here
                                </p>
                                <span className="">
                                  {!values.picture
                                    ? "Choose photo (Required)"
                                    : // @ts-ignore
                                      values.picture?.name}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`flex h-[5rem] flex-row items-center justify-around border-[1px] border-dashed ${
                                mode === "light"
                                  ? "border-blue-900 text-blue-900"
                                  : "border-[#9ccddc] text-white"
                              }`}
                            >
                              <div className="flex flex-row items-center justify-center">
                                <span className="">
                                  {!values.picture?.name
                                    ? "No photo"
                                    : values.picture.name}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    id="hehe"
                    type="submit"
                    className={`rounded-md w-full transition-all ease-in-out ${
                      mode === "light"
                        ? "bg-cyan-950 border-cyan-500/50"
                        : "bg-cyan-950 border-cyan-200/50"
                    } border-[1px] p-1 font-bold text-white hover:opacity-80`}
                  >
                    REGISTER
                  </button>
                  <Link
                    to={"/login"}
                    className={`mt-5 flex cursor-pointer flex-row justify-center text-sm ${
                      mode === "light"
                        ? "font-semibold text-black"
                        : "text-[white]"
                    }`}
                  >
                    Already have an account? Login here
                  </Link>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
