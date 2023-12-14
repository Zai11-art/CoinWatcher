import React from "react";
import TiltCard from "./HomeTiltCard";
import { IoEyeOutline, IoSearchCircleOutline, IoSearchOutline } from "react-icons/io5";

const tiltcardFirst = [
  {
    icon: <IoSearchOutline/>,
    description: "Search the latest cryptocurrencies in the market.",
    color: "bg-[#0c7730]",
  },
  {
    icon: <IoEyeOutline/>,
    description: "Watch the latest coin prices and stats.",
    color: "bg-[#0d5658]",
  },
  {
    icon: <IoSearchCircleOutline/>,
    description: "Monitor and lookout for coin availablity.",
    color: "bg-[#092a4b]",
  },
];

const HomeCardFirst = () => {
  return (
    <div
      className=" flex h-[100%] 
  w-full flex-col p-5 px-10 md:px-12
  lg:px-24 xl:px-[13%]"
    >
      <h1
        className=" mb-3 w-[90%] text-3xl 
    font-bold text-white md:text-4xl lg:text-4xl xl:text-4xl"
      >
        <span className="span-material text-glow">Monitor </span>
        the latest and top cryptocurrencies up to date.
      </h1>
      <p className="md:text-md mb-6 text-sm font-semibold text-white ">
        From the widest varieties of cryptocurrencies in the market. You can
        find it here.
      </p>

      {/* first main card section */}
      <div
        className=" 
      mb-6 flex h-[500px] w-[100%] 
      flex-col-reverse rounded-xl shadow-2xl shadow-blue-300/20 md:h-[450px]
   md:flex-row lg:h-[430px] lg:flex-row xl:h-[430px] xl:flex-row"
      >
        <div
          className="
      z-[100] h-[50%] 
      w-[100%] rounded-l-xl 
      bg-[#151b1f] p-5 
      shadow-2xl 
      md:h-[100%] md:w-[45%]
      
      xl:h-[100%] xl:w-[45%]"
        >
          <h1 className="mb-2 text-2xl font-semibold text-slate-300">
            Full with features.
          </h1>
          <p className="mb-3 text-sm font-thin text-slate-300">
            Come across the features that you will need to trade and check about
            information about different coins
          </p>
          <div
            className="
        flex 
        h-[100%] w-[100%] flex-row justify-between 
        md:h-[75%] md:flex-col lg:h-[75%] lg:flex-col 
        xl:h-[75%]
        xl:flex-col"
          >
            {tiltcardFirst.map((data, index) => (
              <TiltCard
                key={`${index}`}
                index={index}
                color={data.color}
                description={data.description}
                icon={data.icon}
              />
            ))}
          </div>
        </div>

        <div
          className="
      vignette flex 
      h-[55%] w-[100%] 
      rounded-r-xl bg-[#0e1214] 
      bg-cover bg-center 
      saturate-[120%]  md:h-[100%]
      md:w-[55%] lg:h-[100%]
      lg:w-[55%] xl:h-[100%] xl:w-[55%]"
          style={{
            backgroundImage:
              "url('http://localhost:3001/assets/1stcard_image.png')",
          }}
        ></div>
      </div>

      {/* 1st section benefits */}
      <div
        className="mt-12 flex h-[100%] w-[100%] 
    flex-row items-center justify-around md:flex-row 
    lg:flex-row xl:flex-row"
      >
        <div className="mb-6 flex w-[50%]">
          <h1 className="text-md font-semibold text-white md:text-xl lg:text-2xl xl:text-3xl">
            <span className="text-glow font-bold text-[#76ff76]">
              Fresh Data.{" "}
            </span>
            Providing the latest information about different cryptocurrencies
            with a chart, available markets, specific news for each coin.
          </h1>
        </div>
        <div className="flex w-[50%] flex-col items-center p-2 ">
          <div
            className="glass flex h-[100%] w-[100%] flex-col items-center justify-center p-4 
        shadow-2xl shadow-green-300/50 transition-all ease-in-out hover:scale-[1.05] md:w-[350px] md:flex-row lg:w-[400px] lg:flex-row
        xl:w-[500px] xl:flex-row"
          >
            <h1 className="text-glow text-5xl font-bold text-[#76ff76] md:text-6xl lg:text-7xl xl:text-7xl">
              750+{" "}
            </h1>
            <span className="text-md text-glow mt-3 font-thin text-[#76ff76] md:text-lg lg:text-xl xl:text-3xl">
              CRYPTOCURRENCIES
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCardFirst;
