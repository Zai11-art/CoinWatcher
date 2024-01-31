import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state";

const RatingBar = ({ rating } : {rating: number}) => {
  const mode = useSelector((state :  RootState) => state.mode);
  const barWidth = (rating / 10) * 100; // Calculate the width of the bar based on the rating

  return (
    <div className="flex items-center">
      {/* Rating bar */}
      <div
        className={`h-5 w-[100px] ${
          mode === "light"
            ? "box-shadow-inner bg-slate-200 "
            : "box-shadow-inner-light bg-[black]"
        }  rounded-full`}
      >
        <div
          className={`flex h-full items-center justify-center rounded-xl 
          ${
            rating === 10
              ? "bg-[#1ab634]"
              : rating === 9
              ? "bg-[#39b61a]"
              : rating === 8
              ? "bg-[#53b61a]"
              : rating === 7
              ? "bg-[#8dcc17]"
              : rating === 6
              ? "bg-[#abcc17]"
              : rating === 5
              ? "bg-[#bacc17]"
              : rating === 4
              ? "bg-[#ccba17]"
              : rating === 3
              ? "bg-[#cc6817]"
              : rating === 2
              ? "bg-[#cc4a17]"
              : rating === 1
              ? "bg-[#cc1717]"
              : "N/a"
          } bg-green-500 text-xs font-bold 
            text-white`}
          style={{ width: `${barWidth}%` }}
        >
          <span className="">{rating}</span>
        </div>
      </div>

      {/* Rating value */}
    </div>
  );
};

export default RatingBar;
