import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../state";




// CONFIG REGISTER SCHEMA
const registerSchema = yup.object().shape({
  userName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  bio: yup.string().required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required"),
});

// CONFIG LOGIN SCHEMA
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email")
    .required("required")
    .matches(/[a-zA-Z]/, "Incorrect password or email"),
  password: yup
    .string()
    .required("required")
    .matches(/[a-zA-Z]/, "Incorrect password or email"),
});

interface ValuesType {
  email: string;
  password: string;
}

interface ValuesRegisterType {
  email: string;
  userName: string;
  password: string;
  bio: string;
  picture: any;
}

// INITIAL VALUES
const initialValuesRegister   = {
  userName: "",
  email: "",
  password: "",
  picture: "",
  bio: "",
};

const initialValuesLogin  = {
  email: "",
  password: "",
};

const commonstyles = "rounded-t-2xl mt-[4rem] md:w-[500px] md:h-[100px] w-[90%] h-[100px]";


const Form = () => {
  const mode = useSelector((state : RootState) => state.mode);
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  // log in status
  const [message, setMessage] = useState("");
  // register status
  const [registerMessage, setregisterMessage] = useState("");



  interface OnSubmitPropsType {
    resetForm: () => void;
  }

  const register = async (values : ValuesRegisterType, onSubmitProps : OnSubmitPropsType) => {
    console.log("register stats here")
    console.log(values)
    console.log(onSubmitProps)
    // this allows us to send form info with image
    const formData = new FormData();
    // for (let value in values) {
    //   formData.append(value, values[value]);
    // }
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setregisterMessage("Register Successful! Redirecting to Login");
      setTimeout(() => {
        setPageType("login");
        setregisterMessage("");
        setMessage("");
      }, 2000);
    } else {
      setregisterMessage("Please fill up all fields.");
    }
  };

  

  const login = async (values : ValuesType, onSubmitProps : OnSubmitPropsType) => {
    console.log("login stats here")
    console.log(values)
    console.log(onSubmitProps)
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    console.log(loggedInResponse, loggedIn);
    onSubmitProps.resetForm();
    if (loggedIn.msg != "User does not exist. ") {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      setTimeout(() => navigate("/community"), 2000);
      setMessage("Welcome!");
    } else {
      setMessage("Incorrect email or password. Please try again.");
      navigate("/login");
    }
  };

  // const resultMessage = login

  const handleFormSubmitLogin = async (values : ValuesType  , onSubmitProps : OnSubmitPropsType) => {
    console.log("handleFormSubmit here")
    console.log(values)
    console.log(onSubmitProps)
    if (isLogin) await login(values, onSubmitProps);
  };
  const handleFormSubmitRegister = async (values : ValuesRegisterType  , onSubmitProps : OnSubmitPropsType) => {
    console.log("handleFormSubmit here")
    console.log(values)
    console.log(onSubmitProps)
    if (isRegister) await register(values, onSubmitProps);
  };
  
  return (
    <>
      <div
        className={`${commonstyles} ${
          mode === "light"
            ? "newscard-filter-light opacity-[95%] "
            : "newscard-filter text-white"
        }  absolute  z-[2] shadow-lg`}
      ></div>
      <div
        className={`${commonstyles}  homePageCard absolute  z-[1] h-[100px] `}
      ></div>
      <div
        className={`${commonstyles} ${
          mode === "light" ? "text-glow-light text-[#1b4169]" : "text-white"
        } z-[3] h-[100px] p-6`}
      >
        {isLogin ? (
          <h1 className=" text-4xl font-bold">LOGIN</h1>
        ) : (
          <h1 className=" text-4xl font-bold ">REGISTER</h1>
        )}
      </div>

      {isLogin &&
        (message === "Welcome!" ? (
          <div
            className={`text-md w-[90%] ${
              mode === "light" ? "bg-slate-200" : "bg-[#000f1b]"
            }  text-center font-semibold text-green-300 transition-all ease-in-out md:w-[500px]`}
          >
            {message}
          </div>
        ) : (
          <div
            className={`text-md w-[90%] ${
              mode === "light" ? "bg-slate-200" : "bg-[#000f1b]"
            }  text-center font-semibold text-red-500 transition-all ease-in-out md:w-[500px]`}
          >
            {message}
          </div>
        ))}

      {isRegister &&
        (registerMessage === "Register Successful! Redirecting to Login" &&
        registerMessage?.length ? (
          <div
            className={`text-md w-[90%] ${
              mode === "light" ? "bg-slate-200" : "bg-[#000f1b]"
            }  text-center font-semibold text-green-300 transition-all ease-in-out md:w-[500px]`}
          >
            {registerMessage}
          </div>
        ) : (
          <div
            className={`text-md w-[90%] ${
              mode === "light" ? "bg-slate-200" : "bg-[#000f1b]"
            }  text-center font-semibold text-red-500 transition-all ease-in-out md:w-[500px]`}
          >
            {registerMessage}
          </div>
        ))}

      <div
        className={` mb-[200px] h-[650px] w-[90%] rounded-b-2xl ${
          mode === "light"
            ? "newscard-filter-light opacity-[80%]"
            : "newscard-filter"
        } p-6 shadow-lg shadow-cyan-500/30 md:h-[650px] md:w-[500px]`}
      >
        <Formik
          onSubmit={isLogin ? handleFormSubmitLogin : handleFormSubmitRegister}
          // @ts-ignore
          initialValues={isLogin ? initialValuesRegister :  initialValuesLogin}
          validationSchema={isLogin ? loginSchema : registerSchema}
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
            <form onSubmit={handleSubmit}>
              {isRegister && (
                <>
                  <div className="flex w-[100%] justify-between">
                    <div
                      className={` flex w-[100%] flex-col pb-5 ${
                        mode === "light"
                          ? "font-semibold text-black"
                          : "text-[white]"
                      } `}
                    >
                      <div className="flex flex-row justify-between">
                        <label className="text-glow pb-2" htmlFor="userName">
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
                        className={`h-8 ${
                          mode === "light" ? "bg-slate-200/90" : "bg-[#02121c]"
                        } `}
                        name="userName"
                        type="text"
                        aria-label="UserName"
                        value={values.userName || ""}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div
                    className={` flex w-[100%] flex-col pb-5 ${
                      mode === "light"
                        ? "font-semibold text-black"
                        : "text-[white]"
                    } `}
                  >
                    <div className="flex flex-row justify-between">
                      <label className="text-glow pb-2" htmlFor="email">
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
                      className={`h-8 ${
                        mode === "light" ? "bg-slate-200/90" : "bg-[#02121c]"
                      } `}
                      name="email"
                      type="text"
                      aria-label="Email"
                      value={values.email || ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={` flex w-[100%] flex-col pb-5 ${
                      mode === "light"
                        ? "font-semibold text-black"
                        : "text-[white]"
                    } `}
                  >
                    <div className="flex flex-row justify-between">
                      <label className="text-glow pb-2" htmlFor="bio">
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
                      className={`h-8 ${
                        mode === "light" ? "bg-slate-200/90" : "bg-[#02121c]"
                      } `}
                      name="bio"
                      type="text"
                      aria-label="Bio"
                      value={values.bio || ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={` flex w-[100%] flex-col pb-5 ${
                      mode === "light"
                        ? "font-semibold text-black"
                        : "text-[white]"
                    } `}
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
                      className={`h-8 ${
                        mode === "light" ? "bg-slate-200/90" : "bg-[#02121c]"
                      } `}
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
                        'image/png': ['.png'],
                        'image/jpg': ['.jpg'],
                        'image/jpeg': ['.jpeg'],
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
                                  {!values.picture?.name
                                    ? "Choose photo (Required)"
                                    : values.picture.name}
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
                </>
              )}

              {!isRegister && (
                <>
                  <div
                    className={` flex w-[100%] flex-col pb-5 ${
                      mode === "light"
                        ? "font-semibold text-black"
                        : "text-[white]"
                    } `}
                  >
                    <div className="flex flex-row justify-between">
                      <label className="text-glow pb-2" htmlFor="email">
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
                      className={`h-8 ${
                        mode === "light"
                          ? "bg-slate-200/90 text-slate-900"
                          : "bg-[#02121c] text-white"
                      } `}
                      name="email"
                      type="email"
                      aria-label="Email"
                      value={values.email || ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>

                  <div
                    className={` flex w-[100%] flex-col pb-5 ${
                      mode === "light"
                        ? "font-semibold text-black"
                        : "text-[white]"
                    } `}
                  >
                    <div className="flex flex-row justify-between">
                      <label className="text-glow pb-2 " htmlFor="password">
                        Password
                      </label>
                      {/* error handling */}
                      {errors.password && touched.password ? (
                        <div className="text-red-500">{errors.password}</div>
                      ) : null}
                    </div>
                    <input
                      required
                      className={`h-8 ${
                        mode === "light"
                          ? "bg-slate-200/90 text-slate-900"
                          : "bg-[#02121c] text-white"
                      } `}
                      name="password"
                      type="password"
                      aria-label="Password"
                      value={values.password || ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <div className="mt-5">
                <button
                  id="hehe"
                  type="submit"
                  className=" py- hehe mt-2 w-full rounded-md border-[2px] border-[#9ccddc]
                bg-[#062c43] px-2 font-semibold text-white duration-200 ease-in-out hover:scale-[1.02] 
                hover:bg-[#9ccddc] hover:text-[white] md:mt-0 md:bg-[#054569] md:py-1"
                >
                  {isLogin ? "LOGIN" : "REGISTER"}
                </button>
              </div>
              <div
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                className={`mt-5 flex cursor-pointer flex-row justify-center text-sm ${
                  mode === "light" ? "font-semibold text-black" : "text-[white]"
                }`}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Form;

// HEX CODES:
// #051925
// #062c43
// #054569
// #5591a9
// #9ccddc
// #ced7e0
