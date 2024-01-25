import React from "react";
import { useId } from "react";

interface TiltCardType {
  index: number;
  color: string;
  description: string;
  icon: JSX.Element;
}

const InfoCard: React.FC<TiltCardType> = ({
  index,
  color,
  description,
  icon,
}) => {
  const id = useId();

  return (
    <div
      key={`${id}-${index}-${icon}`}
      className="text-white flex gap-2 items-center p-3 font-thin bg-slate-950 rounded-lg border-[1px] border-cyan-200/20"
    >
      <span
        className={`flex border-[1px] border-cyan-500/50 items-center justify-center ${color} rounded-full p-3 text-xl`}
      >
        {icon}
      </span>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default InfoCard;
