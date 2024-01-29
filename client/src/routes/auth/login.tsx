import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setLogin } from "../../state";
import { RootState } from "../../state";

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

const initialValuesLogin = {
  email: "",
  password: "",
};

const Login = () => {
  const mode = useSelector((state: RootState) => state.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  interface OnSubmitPropsType {
    resetForm: () => void;
  }

  const login = async (
    values: ValuesType,
    onSubmitProps: OnSubmitPropsType
  ) => {
    console.log(values);
    try {
      const loggedInResponse = await axios
        .post("http://localhost:3001/auth/login", values)
        .then((res) => res.data);

      const loggedIn = loggedInResponse;

      console.log("CHECK HERE");
      console.log(loggedIn);
      onSubmitProps.resetForm();

      if (loggedIn) {
        toast.success("Logged in.");
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        setTimeout(() => navigate("/community"), 2000);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  // const resultMessage = login

  const handleFormSubmitLogin = async (
    values: ValuesType,
    onSubmitProps: OnSubmitPropsType
  ) => {
    await login(values, onSubmitProps);
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
          <span className="text-3xl text-white text-glow font-bold">LOGIN</span>
        </div>

        <div
          className={`p-7 rounded-b-2xl ${
            mode === "light"
              ? "newscard-filter-light opacity-[80%]"
              : "newscard-filter"
          } flex  shadow-lg shadow-cyan-500/30 `}
        >
          <Formik
            onSubmit={handleFormSubmitLogin}
            // @ts-ignore
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              errors,
              touched,
            }) => (
              <form
                className="w-full flex flex-col gap-64"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-5">
                  {/* EMAIL INPUT */}
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
                      className={` ${
                        mode === "light"
                          ? "bg-slate-200/90 text-slate-900"
                          : "bg-[#02121c] text-white"
                      } rounded-lg`}
                      name="email"
                      type="email"
                      aria-label="Email"
                      value={values.email || ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>

                  {/* PASSWORD INPUT */}
                  <div
                    className={` flex w-full flex-col ${
                      mode === "light"
                        ? "font-semibold text-black"
                        : "text-[white]"
                    } gap-2`}
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
                      className={`rounded-lg ${
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
                </div>

                <div className="flex w-full gap-3 flex-col">
                  <button
                    id="hehe"
                    type="submit"
                    className={`rounded-md w-full transition-all ease-in-out ${
                      mode === "light"
                        ? "bg-cyan-950 border-cyan-500/50"
                        : "bg-cyan-950 border-cyan-200/50"
                    } border-[1px] p-1 font-bold text-white hover:opacity-80`}
                  >
                    LOGIN
                  </button>

                  <Link
                    to={"/register"}
                    className={` flex cursor-pointer flex-row justify-center text-sm ${
                      mode === "light"
                        ? "font-semibold text-black"
                        : "text-[white]"
                    }`}
                  >
                    Don't have an account? Sign Up here.
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

export default Login;
