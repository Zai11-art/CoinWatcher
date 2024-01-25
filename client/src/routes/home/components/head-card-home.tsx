import React from "react";
import TiltCard from "./info-card";
import {
  IoEyeOutline,
  IoSearchCircleOutline,
  IoSearchOutline,
} from "react-icons/io5";
import InfoCard from "./info-card";

const cardInfo1 = [
  {
    icon: <IoSearchOutline />,
    description: "Search the latest cryptocurrencies in the market.",
    color: "bg-[#0c7730]",
  },
  {
    icon: <IoEyeOutline />,
    description: "Watch the latest coin prices and stats.",
    color: "bg-[#0d5658]",
  },
  {
    icon: <IoSearchCircleOutline />,
    description: "Monitor and lookout for coin availablity.",
    color: "bg-[#092a4b]",
  },
];

const HeadCardHome = () => {
  return (
    <div className="flex h-full flex-col xl:w-[1200px] lg:w-[1000px] w-full lg:px-0 px-5 gap-12 py-12">
      <h1 className="lg:text-4xl text-3xl font-bold text-white">
        <span className="span-material text-glow">Monitor </span>
        the latest and top cryptocurrencies up to date.
      </h1>

      {/* first main card section */}
      <div className="flex xl:w-[1200px] lg:w-[1000px] w-full h-full rounded-md p-4 gap-3 bg-slate-900/40 md:flex-row flex-col items-center justify-center">
        {/* LEFT */}
        <div className="md:w-[50%] w-full h-full">
          <h1 className="lg:text-2xl text-lg mb-2 font-semibold text-slate-300">
            Full with features.
          </h1>
          <p className="mb-3 text-sm font-thin text-slate-300">
            Come across the features that you will need to trade and check about
            information about different coins
          </p>

          <div className="w-full h-full gap-3 flex flex-col">
            {cardInfo1.map((card, i) => (
              <InfoCard
                index={i}
                color={card.color}
                description={card.description}
                icon={card.icon}
              />
            ))}
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex md:w-[50%] w-full h-full">
          <img
            src="http://localhost:3001/assets/1stcard_image.png"
            className="rounded-lg w-full h-full"
          />
        </div>
      </div>

      {/* 1st section benefits */}
      <div className="flex md:flex-row flex-col items-center justify-center p-2 gap-3">
        <div className="flex w-full">
          <h1 className="text-md font-semibold text-white md:text-xl lg:text-2xl xl:text-3xl">
            <span className="text-glow font-bold text-[#76ff76]">
              Fresh Data.{" "}
            </span>
            Providing the latest information about different cryptocurrencies
            with a chart, available markets, specific news for each coin.
          </h1>
        </div>

        <div className="flex w-full flex-col items-center ">
          <div className="glass flex p-5 items-center justify-center shadow-2xl shadow-[#76ff76b9]">
            <h1 className="text-glow text-5xl font-bold text-[#76ff76] md:text-6xl lg:text-7xl xl:text-7xl">
              250+{" "}
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

export default HeadCardHome;
