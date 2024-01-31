import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoAppsOutline, IoClose, IoMoon, IoSunny } from "react-icons/io5";

import { setLogout, setMode } from "../state";
import { RootState } from "../state";
import SearchBar from "./search-bar";
import LoggedInDropdown from "./user-dropdown";
import { useMediaQuery } from "../hooks/use-media-query";

const Navbar = () => {
  const keyId = useId();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const mode = useSelector((state: RootState) => state.mode);
  const isAuth = Boolean(useSelector((state: RootState) => state.token));
  const picturePath = user?.picturePath;
  const userName = user?.userName;
  const userId = user?._id;
  const md = useMediaQuery("(max-width:850px)");

  const handleMode = () => {
    dispatch(setMode());
  };

  const logout = () => {
    dispatch(setLogout());
  };

  let navLinks = [
    { name: "Cryptocurrencies", link: "/cryptocurrencies", id: 0 },
    { name: "Exchanges", link: "/exchanges", id: 1 },
    { name: "Apps", link: "/apps", id: 2 },
    { name: "News", link: "/news", id: 3 },
    { name: "Learn", link: "/learn", id: 4 },
  ];

  let mobileLinks = [
    { name: "Cryptocurrencies", link: "/cryptocurrencies", id: 0 },
    { name: "Exchanges", link: "/exchanges", id: 1 },
    { name: "Apps", link: "/apps", id: 2 },
    { name: "News", link: "/news", id: 3 },
    { name: "Learn", link: "/learn", id: 4 },
  ];

  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`shadow-lg w-full text-white font-semibold h-20 z-[100]  
     sticky top-0`}
    >
      <div
        className={`flex items-center justify-between h-full ${
          mode === "light" ? "bg-slate-200 shadow-lg" : "bg-[#031218]"
        } `}
      >
        <div className="flex items-center gap-2">
          <Link to={"/cryptocurrencies"}>
            <h1
              className={`ml-4 text-xl font-bold ${
                mode === "light" ? "text-[#3259af]" : "text-white"
              } `}
            >
              <span className="text-glow text-2xl">CoinWatcher</span>
              <span className="span-material text-2xl">.Io</span>{" "}
            </h1>
          </Link>

          {md ? null : (
            <div className="flex gap-1 mt-1 items-center">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  className={`text-[14px] transition-all ease-in-out  p-1 active:bg-slate-800 ${
                    mode === "light"
                      ? "text-slate-800 hover:text-slate-700  font-normal"
                      : "text-slate-300 hover:text-slate-200  font-normal "
                  } `}
                  to={link.link}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {md ? (
          <>
            <div
              className={`w-full z-[-1]  absolute ${
                open ? "top-0" : "top-[-1000px]"
              } ${
                mode === "light"
                  ? "bg-slate-300 text-black"
                  : "bg-[#0e1414] text-white"
              } h-screen transition-all ease-in-out  duration-300`}
            >
              <div className="flex flex-col mt-16 py-8 px-5">
                <div className=" flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full">
                      <img
                        className="h-full w-full object-cover rounded-full"
                        src={`${isAuth ? user?.picturePath : ""}`}
                        alt="user"
                      />
                    </div>

                    <span className="ml-2 text-sm">
                      {user ? user?.userName : "Logged out"}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user ? "bg-green-500" : "bg-red-500"
                      } `}
                    ></div>
                    <span className="text-normal font-light text-sm">
                      {user ? "online" : "offline"}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <SearchBar />
                  {mobileLinks.map((lbl, i) => (
                    <Link key={i} onClick={() => setOpen(!open)} to={lbl.link}>
                      <div
                        className={`${
                          mode === "light" ? "font-semibold" : "font-semibold"
                        } flex text-xl hover:text-3xl transition-all ease-in-out items-center py-2`}
                      >
                        {/* <div className="mr-2 ">{lbl.icon}</div> */}
                        <span className="text-sm">{lbl.name}</span>
                      </div>
                    </Link>
                  ))}

                  {md && (
                    <div className="w-full">
                      {isAuth ? (
                        <button
                          onClick={() => {
                            logout();
                            setOpen(!open);
                            navigate("/");
                          }}
                          className={`w-full mt-5 text-white flex items-center justify-center p-[2px] py-1 px-4 border-[1px] border-yellow-200/40 rounded-md font-normal transition-all ease-in-out
                        ${
                          mode === "light"
                            ? "bg-gradient-to-r from-cyan-700/70 to-cyan-900 hover:bg-cyan-900 shadow-slate-900/40 shadow-md"
                            : "bg-gradient-to-r from-cyan-900/50 to-cyan-900 hover:bg-cyan-500"
                        }`}
                        >
                          logout
                        </button>
                      ) : (
                        <Link
                          onClick={() => setOpen(!open)}
                          to={"/login"}
                          type="button"
                          className={`w-full mt-5 text-white flex items-center justify-center p-[2px] py-1 px-4 border-[1px] border-yellow-200/40 rounded-md font-normal transition-all ease-in-out
                      ${
                        mode === "light"
                          ? "bg-gradient-to-r from-cyan-700/70 to-cyan-900 hover:bg-cyan-900 shadow-slate-900/40 shadow-md"
                          : "bg-gradient-to-r from-cyan-900/50 to-cyan-900 hover:bg-cyan-500"
                      }`}
                        >
                          login
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex  gap-2">
              <button
                onClick={handleMode}
                className={`text-white ${
                  mode === "light"
                    ? "shadow-slate-900/60"
                    : "shadow-cyan-400/90"
                } w-7 h-7 flex items-center justify-center bg-cyan-700 shadow-md rounded-full p-[2px]`}
              >
                {mode === "light" ? (
                  <IoSunny className="w-5 h-5 shadow-xl rounded-full hover:shadow-cyan-100/90 shadow-cyan-300/30 transition-all ease-in-out " />
                ) : (
                  <IoMoon className="w-5 h-5 shadow-xl rounded-full hover:shadow-cyan-100/90 shadow-cyan-300/30 transition-all ease-in-out " />
                )}
              </button>
              <button className="pr-4" onClick={() => setOpen(!open)}>
                {open ? (
                  <IoClose
                    className={`text-[30px] ${
                      mode === "light" ? "text-[#266f85]" : "text-[#7de1ff]"
                    }`}
                  />
                ) : (
                  <IoAppsOutline
                    className={`text-[30px] ${
                      mode === "light" ? "text-[#266f85]" : "text-[#7de1ff]"
                    }`}
                  />
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between ">
            <SearchBar />
            <div className="flex items-center justify-center pr-4 gap-2">
              <button
                onClick={handleMode}
                className={`text-white ${
                  mode === "light"
                    ? "shadow-slate-900/60"
                    : "shadow-cyan-400/90"
                } w-8 h-8 flex items-center justify-center  bg-cyan-700 shadow-md rounded-full`}
              >
                {mode === "light" ? (
                  <IoSunny className="w-5 h-5 shadow-xl rounded-full hover:shadow-cyan-100/90 shadow-cyan-300/30 transition-all ease-in-out " />
                ) : (
                  <IoMoon className="w-5 h-5 shadow-xl rounded-full hover:shadow-cyan-100/90 shadow-cyan-300/30 transition-all ease-in-out " />
                )}
              </button>
              <div>
                {isAuth ? (
                  <LoggedInDropdown
                    userId={userId}
                    userName={userName}
                    imagePath={picturePath}
                  />
                ) : (
                  <>
                    <Link
                      to={"/login"}
                      type="button"
                      className={`flex items-center p-[2px] py-1 px-4 border-[1px] border-yellow-200/40 rounded-md font-normal transition-all ease-in-out
                      ${
                        mode === "light"
                          ? "bg-gradient-to-r from-cyan-700/70 to-cyan-900 hover:bg-cyan-900 shadow-slate-900/40 shadow-md"
                          : "bg-gradient-to-r from-cyan-900/50 to-cyan-900 hover:bg-cyan-500"
                      }`}
                    >
                      login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* <nav className="sticky left-0 top-0 z-[100] w-full shadow-xl">
      <div
        className={` z-[100] flex h-[60px] flex-col justify-center ${
          mode === "light" ? "bg-slate-300" : "bg-[#062c43]"
        } 
             p-2 md:flex-row md:items-center md:justify-between`}
      >
        <Link to={"/cryptocurrencies"}>
          <h1
            className={`ml-4 text-xl font-bold ${
              mode === "light" ? "text-[#3259af]" : "text-white"
            } `}
          >
            <span className="text-glow text-2xl">CoinWatcher</span>
            <span className="span-material text-2xl">.Io</span>{" "}
          </h1>
        </Link>

        <div
          className={`absolute right-5 top-5 cursor-pointer text-xl 
              duration-150 ease-in-out hover:scale-[1.04] hover:text-[white] lg:hidden
              ${mode === "light" ? "text-[#060d16]" : "text-[#9ccddc] "}`}
        >
          <div onClick={() => setOpen(!open)}>
            {open ? <IoClose /> : <IoAppsOutline />}
          </div>
        </div>

        <div
          className={`md:items-left absolute mr-4 mt-[15px] flex w-full h-screen
              flex-col-reverse shadow-xl md:mt-3 md:flex-col-reverse md:shadow-xl lg:static lg:mt-5 lg:flex-row lg:items-center
               lg:bg-[transparent]  lg:shadow-none xl:flex-row xl:items-center   xl:shadow-none
                ${
                  open
                    ? `top-[45px] ${
                        mode === "light" ? "bg-slate-300" : "bg-[#062c43]"
                      } `
                    : "top-[-500px] "
                } left-[-0.1px] pb-[25px] duration-200  ease-in-out`}
        >
          
          <div className="items-left md:items-left flex flex-col md:flex-col lg:flex-row lg:items-center xl:flex-row xl:items-center ">
            {navLinks.map((link, index) => (
              <div className="my-3 lg:my-1" key={`${keyId}-${index}`}>
                <Link
                  onClick={() => setOpen(false)}
                  to={link.link}
                  className={`mx-2  ml-8
                text-[15px] font-semibold ${
                  mode === "light" ? "text-black" : "text-white"
                } transition-all ease-in-out hover:scale-[1.02]  lg:ml-2 lg:text-[13px]`}
                >
                  {link.name}
                </Link>
                <div
                  className={`${
                    mode === "light"
                      ? "h-[2px] bg-blue-900"
                      : "h-[0.9px] bg-blue-300"
                  }  w-full opacity-10  lg:invisible xl:invisible`}
                />
              </div>
            ))}

            <div className="my-3 lg:my-1" key={keyId + 111}>
              <Link
                to={"/Community"}
                onClick={() => {
                  !isAuth && toast("Please Login to access it anon.");
                }}
                className={`mx-2 my-3 ml-8
                text-[15px] font-semibold ${
                  mode === "light" ? "text-black" : "text-white"
                } transition-all ease-in-out hover:scale-[1.02] lg:my-1 lg:ml-2 lg:text-[13px]`}
                key={"Community"}
              >
                Community
              </Link>
              <div
                className={`${
                  mode === "light"
                    ? "h-[2px] bg-blue-900"
                    : "h-[0.9px] bg-blue-300"
                }  w-full opacity-10  lg:invisible xl:invisible`}
              />
            </div>
          </div>

          <SearchBar />

          <div className="flex items-center gap-2 ">
            {mode === "light" ? (
              <button
                aria-label="light mode"
                onClick={handleMode}
                className=" flex rounded-full bg-slate-200 p-[0.25rem] text-xl text-blue-400 shadow-xl "
              >
                <IoSunny />
              </button>
            ) : (
              <button
                aria-label="dark mode"
                onClick={handleMode}
                className=" flex rounded-full bg-[#060d16] p-[0.25rem] text-xl text-blue-300 shadow-xl "
              >
                <IoMoon />
              </button>
            )}

            {isAuth ? (
              <LoggedInDropdown
                userId={userId}
                userName={userName}
                imagePath={picturePath}
              />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className={`mx-1 rounded-lg border-[2px]  p-[0.2rem] font-semibold duration-200 
                    ease-in-out  hover:scale-[1.04] lg:ml-3   lg:mr-1 
                    lg:w-[65px] 
                    ${
                      mode === "light"
                        ? "border-blue-900 bg-slate-300 text-sm text-blue-900 hover:bg-[#12406b] hover:text-[white]"
                        : "border-[#9ccddc] bg-[#062c43]  text-sm  text-white hover:bg-[#9ccddc] hover:text-[white]"
                    }`}
              >
                SIGN IN
              </button>
            )}
          </div>

        </div>
      </div>
    </nav> */
}
