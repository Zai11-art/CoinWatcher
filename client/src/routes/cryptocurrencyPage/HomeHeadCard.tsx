import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state";

interface CardLink {
  icon:  string | null;
  label: string;
  details: string;
  id: number;
  }

interface HomeHeadCard {
  cardLinks: CardLink[];
}


const HomeHeadCard: React.FC<HomeHeadCard> = ({ cardLinks }) => {
  const mode = useSelector((state: RootState) => state.mode);

  return (
    <div
      className="flex w-full 
        flex-row items-center 
        justify-center "
    >
      <div
        className={` 
            absolute z-[2]
            mt-12 h-[305px]
            w-[90%] rounded-lg 
            sm:h-[320px] sm:w-[95%] 
            md:h-[300px] md:w-[700px]
            lg:h-[200px] lg:w-[1000px]
             ${mode === "light" ? "newscard-filter-light" : "newscard-filter"}
            flex flex-col items-center  pb-4 opacity-95`}
      >
        <div
          className={`${
            mode === "light" ? "text-glow-light text-[#1b4169]" : " text-white"
          } mb-2 mt-3 text-center `}
        >
          <h1 className="mt-2  text-lg font-bold uppercase sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl">
            <span className="">Watch</span> the Top coins now.
          </h1>
          <p className="md:text-md font mt-2 text-[13.5px] italic">
            Watch the latest crypto prices, markets, and news at your
            convenience.
          </p>
        </div>
        <div
          className=" 
                mt-2 flex
                h-[300px] w-[100%]
                flex-row
                flex-wrap items-center justify-center sm:flex-row  md:h-[270px]
                md:w-[650px] md:flex-row lg:h-[150px] lg:w-[960px] lg:flex-row
                
                "
        >
          {cardLinks?.map(
            (link: {
              icon:  string | null;
              label: string;
              details: string;
              id: number;
            }) => (
              <div
                key={link.id}
                className={`font-semibold ${
                  mode === "light"
                    ? "text-glow bg-slate-200 text-blue-900 shadow-xl"
                    : "text-glow bg-slate-900 text-white"} 
                        m-2 flex 
                        h-[60px]
                        w-[40%] flex-col
                        justify-center rounded-lg 
                        border-[2px] border-[#9ccddc]
                        duration-100
                        ease-in-out hover:scale-[1.02]
                        sm:h-[70px] sm:w-[180px]
                        md:h-[70px] md:w-[300px]
                        lg:h-[62.5px] lg:w-[210px]
                        xl:h-[62.5px] xl:w-[210px]
                        `}
              >
                <span className="text- mx-2  flex items-center text-[13.2px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[18px]">
                  {typeof link.icon === "string" ? 
                  <img className="w-6 h-6" src={link.icon} alt={link.label} />
                  : link.icon}
                  {link.details}
                </span>
                <span className="text- t mx-2 text-[10px] font-normal italic sm:text-[11px] md:text-[11px] lg:text-[12px] xl:text-[12px]">
                  {link.label}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      <div
        className="
            homePageCard
            mt-12
            h-[305px]
            w-[90%] rounded-lg
            border-[2px] 
            border-[#9ccddc] opacity-[100%]
            sm:h-[320px] sm:w-[95%]
            md:h-[300px] md:w-[700px] 
            lg:h-[200px] lg:w-[1000px]
            "
      ></div>
    </div>
  );
};

export default HomeHeadCard;
