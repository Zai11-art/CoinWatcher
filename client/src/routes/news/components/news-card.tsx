import React from "react";
import shortid from "shortid";
import { useSelector } from "react-redux";

import { RootState } from "../../../state";


interface NewsType {
  title: string;
  image: string;
  description: string;
  url: string;
  source: string;
}

const NewsCard: React.FC<NewsType> = ({
  image,
  title,
  description,
  source,
  url,
}) => {
  const mode = useSelector((state: RootState) => state.mode);

  return (
    <div
      key={shortid.generate()}
      className={`flex rounded-lg ${
        mode === "light"
          ? "text-glow bg-slate-200 text-slate-900 "
          : "headCard-filter border-[0.1px] border-cyan-200/40 text-white"
      } w-full gap-2`}
    >
      <div className="w-64 h-full p-2 flex items-center justify-center ">
        <img
          src={
            image
              ? image
              : "https://images.pexels.com/photos/4808267/pexels-photo-4808267.jpeg?auto=compress&cs=tinysrgb&w=300"
          }
          className="w-full h-48 flex rounded-lg"
        />
      </div>

      <div className="w-[70%] lg:w-[700px] py-5 px-4 flex flex-col  justify-between ">
        <div className="flex flex-col gap-2">
          <h1 className="text-md  font-semibold  md:text-xl lg:text-xl">
            {title.length < 60 ? title : title.slice(0, 60) + "..."}
          </h1>
          <p className="text-[13px] lg:text-[14.5px]">
            {description.length < 140
              ? description
              : description.slice(0, 140) + "..."}
          </p>
        </div>

        <div className="flex w-full justify-between">
          <span className="flex flex-col italic">
            <span>Source:</span>
            <span>{source}</span>
          </span>

          <a
            href={url}
            className={`rounded-lg flex items-center px-2 duration-200 ease-in-out hover:scale-[1.02] 
              ${
                mode === "light"
                  ? "newscard-filter-light border-[#0b2027] font-semibold text-blue-900 hover:bg-[#274163] hover:text-white focus:outline-none focus:ring focus:ring-[#a2e9ff] active:bg-[#b0ecff]"
                  : "shadow-md shadow-black border-[#9ccddc] bg-[#062c43] text-white hover:bg-[#ced7e0] focus:outline-none focus:ring focus:ring-[#9ccddc] active:bg-[#9ccddc]"
              } `}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
