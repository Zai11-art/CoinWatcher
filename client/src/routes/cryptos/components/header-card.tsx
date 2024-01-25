import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../state/index";

interface CardLink {
  icon: string | null;
  label: string;
  details: string;
  id: number;
}

interface HeadCard {
  cardLinks: CardLink[];
}

const HeadCard: React.FC<HeadCard> = ({ cardLinks }) => {
  const mode = useSelector((state: RootState) => state.mode);

  return (
    <div className={`flex w-full flex-row items-center justify-center`}>
      <div
        className={`rounded-lg ${
          mode === "light" ? "newscard-filter-light" : "newscard-filter"
        } gap-5 p-6 flex flex-col items-center  opacity-95 lg:w-[1000px] w-full`}
      >
        <div
          className={`${
            mode === "light" ? "text-glow-light text-[#1b4169]" : " text-white"
          }  text-center `}
        >
          <h1 className="text-2xl text-glow font-bold uppercase sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl">
            Watch the Top coins now.
          </h1>
          <p className="md:text-md font  text-[13.5px] italic">
            Watch the latest crypto prices, markets, and news at your
            convenience.
          </p>
        </div>

        <div className="flex lg:flex-nowrap flex-wrap w-full items-center justify-center gap-3">
          {cardLinks?.map(
            (link: {
              icon: string | null;
              label: string;
              details: string;
              id: number;
            }) => (
              <div
                key={link.id}
                className={`font-semibold p-2 flex-col flex ${
                  mode === "light"
                    ? "text-glow bg-slate-200 text-blue-900 shadow-xl"
                    : "text-glow bg-slate-900 text-white"
                } sm:w-64 w-full border-[1px] rounded-lg border-cyan-500/30`}
              >
                <span className="text-xs italic">{link.label}</span>
                <span className="text-lg">
                  {typeof link.icon === "string" ? (
                    <img className="w-6 h-6" src={link.icon} alt={link.label} />
                  ) : (
                    link.icon
                  )}
                  {link.details}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HeadCard;
