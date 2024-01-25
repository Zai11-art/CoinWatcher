import LoggedInDropdown from "../../../components/LoggedInDropdown";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../state";
import { IoAppsOutline, IoClose } from "react-icons/io5";

const HomeNavbar = () => {
  const [open, setOpen] = useState(false);
  const isAuth = Boolean(useSelector((state: RootState) => state.token));
  const user = useSelector((state: RootState) => state.user);
  const picturePath = user?.picturePath ?? "";
  const userName = user?.userName ?? "";
  const userId = user?._id ?? "";

  const navigate = useNavigate();

  let navLinks = [
    { name: "Cryptocurrencies", link: "/Cryptocurrencies", id: 0 },
    { name: "Apps", link: "/Apps", id: 1 },
    { name: "News", link: "/News", id: 2 },
  ];

  return (
    <nav className="top-0 shadow-2xl w-full sticky z-[101] bg-[#02070f]">
      <div className=" flex md:justify-between justify-center flex-col md:flex-row z-[10] p-2 md:items-center h-[60px]">
        <div>
          <h1 className="text-white ml-4 text-xl font-bold ">
            <span className="text-glow">CoinWatcher</span>
            <span className="span-material text-xl font-bold text-glow">
              .Io
            </span>
          </h1>
        </div>

        <div
          className="absolute right-5 top-5 text-xl text-[#9ccddc] md:hidden
              hover:text-[white] duration-150 ease-in-out hover:scale-[1.04] cursor-pointer"
        >
          <div onClick={() => setOpen(!open)}>
            {open ? <IoClose /> : <IoAppsOutline />}
          </div>
        </div>

        <div className="md:static md:z-[1] z-[-1] ">
          <ul
            className={`flex md:flex-row flex-col xl:items-center lg:items-center md:items-center mr-4  md:static absolute
              w-full  md:bg-[transparent] md:mt-6 mt-[15px]  ${
                open ? "top-[45px]  bg-[#041d2c] " : "top-[-360px] "
              } 
              duration-500 ease-in-out left-[-0.1px]  pb-[25px]`}
          >
            {navLinks.map((link) => (
              <Link
                to={link.link}
                className="hover:scale-[1.02] transition-all ease-in-out
                  text-white mx-2 font-semibold md:text-[12px] text-[15px] md:ml-3 ml-8 md:my-1 my-3"
                key={link.id}
              >
                {link.name}
              </Link>
            ))}

            {isAuth ? (
              <LoggedInDropdown
                userId={userId}
                userName={userName}
                imagePath={picturePath}
              />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className=" text-white border-[2px] rounded-md px-2 md:py-0 py-1 md:w-[100px] w-[200px] 
                mx-5 border-[#9ccddc]  md:bg-[#054569] bg-[#062c43] font-semibold hover:bg-[#9ccddc] md:mt-0 mt-2 
                hover:text-[white] duration-200 ease-in-out hover:scale-[1.04] text-md"
              >
                LOGIN
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
