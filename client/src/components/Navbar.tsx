import { useState,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setMode } from "../state";
import { toast } from "react-toastify";
import { useId } from "react";
import SearchBar from "./SearchBar";
import LoggedInDropdown from "./LoggedInDropdown";
import { RootState } from "../state";
import { IoAppsOutline, IoClose, IoMoon, IoSunny } from "react-icons/io5";

const Navbar = () => {
  const keyId = useId();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state : RootState) => state.user);
  const mode = useSelector((state :RootState) => state.mode);
  const isAuth = Boolean(useSelector((state :RootState) => state.token));
  const picturePath = user?.picturePath
  const userName  = user?.userName
  const userId  = user?._id

  const handleMode = () => {
    dispatch(setMode());
  };

  let navLinks = [
    { name: "Cryptocurrencies", link: "/Cryptocurrencies", id: 0 },
    { name: "Exchanges", link: "/Exchanges", id: 1 },
    { name: "Apps", link: "/Apps", id: 2 },
    { name: "News", link: "/News", id: 3 },
    { name: "Learn", link: "/Learn", id: 4 },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky left-0 top-0 z-[100] w-full shadow-xl">
        <div
          className={` z-[100] flex h-[60px] flex-col justify-center ${
            mode === "light" ? "bg-slate-300" : "bg-[#062c43]"
          } 
             p-2 md:flex-row md:items-center md:justify-between`}
        >
          <Link to={'/Cryptocurrencies'}>
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
              {open ? <IoClose/> : <IoAppsOutline/>}
            </div>
          </div>

          <div className="z-[-1] mt-2 lg:static lg:z-[1]">
            <div
              className={`md:items-left absolute mr-4 mt-[15px] flex w-full
              flex-col-reverse shadow-xl md:mt-3 md:flex-col-reverse md:shadow-xl lg:static lg:mt-5 lg:flex-row lg:items-center
               lg:bg-[transparent]  lg:shadow-none xl:flex-row xl:items-center   xl:shadow-none
                ${
                  open
                    ? `top-[45px]   ${
                        mode === "light" ? "bg-slate-300" : "bg-[#062c43]"
                      } `
                    : "top-[-500px] "
                } left-[-0.1px] pb-[25px] duration-200  ease-in-out`}
            >
              <div className="items-left md:items-left flex flex-col md:flex-col lg:flex-row lg:items-center xl:flex-row xl:items-center ">
                {navLinks.map((link, index) => (
                  <div className="my-3 lg:my-1" key={`${keyId}-${index}`}>
                    <Link
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
              <div className="flex xl:mx-2 lg:mx-2 md:mx-7 mx-7 items-center xl:flex-row lg:flex-row md:flex-row-reverse flex-row-reverse xl:justify-none lg:justify-none md:justify-between justify-between">
                <div className="my-4 ml-7 md:my-4 lg:ml-1 xl:ml-1">
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
                </div>
                {isAuth ? (
                  <LoggedInDropdown
                    userId={userId}
                    userName={userName}
                    imagePath={picturePath}
                  />
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className={` mt- mx-1 rounded-lg border-[2px]  p-[0.2rem] font-semibold duration-200 
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
        </div>
      </nav>
    </>
  );
}

export default Navbar;
