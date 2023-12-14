import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state";

const NewsCardHeader = () => {
  const mode = useSelector((state : RootState) => state.mode)
  return (
    <div
      className={`
                ${mode === "light" ? "headCard-filter-light text-slate-700 text-glow" : "headCard-filter text-white"} 
                absolute
                z-[2] mt-12
                flex 
                flex-col
                rounded-lg 
                pb-4
                w-[100%] h-[350px]
                sm:w-[100%] sm:h-[350px]
                md:h-[300px] md:w-[700px]
                lg:h-[300px] lg:w-[1000px]`}
    >
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-bold">
          Be updated. no FOMO. Crypto news for you.
        </h1>
        <p className={`text-md  md:w-[500px] ${mode === "light" ? "font-semibold" : "font-normal"}`}>
          Welcome to the ultimate source for all your cryptocurrency news and
          analysis! Our mission is to keep you up-to-date with the latest
          developments in the rapidly evolving world of digital currencies.
        </p>
        <h1 className="text-md my-2 font-bold">
          Get the Latest news in the last 24 hrs
        </h1>
      </div>

      <div className="ml-6 mt-1">
        <Link
          to="/Home"
          className="h-[20px]
                        w-[100px] rounded-full border-[0.5px] text-white
                        border-[#9ccddc] bg-[#062c43] p-1 text-sm
                        duration-200  ease-in-out hover:scale-[1.02] 
                        hover:bg-[#9ccddc] px-5
                        hover:text-[white] md:bg-[#054569]"
        >
          View Coins here
        </Link>
      </div>
    </div>
  );
};

export default NewsCardHeader;
