import React from "react";
import Tilt from "react-parallax-tilt";
import { useId } from "react";
import {  } from "react-icons/io5";

interface TiltCardType {
  index: number;
  color: string;
  description: string;
  icon: JSX.Element;
}

const TiltCard : React.FC<TiltCardType> = ({ index, color, description, icon }) => {

  const id = useId();

  return (
    <Tilt
      tiltMaxAngleX={7}
      tiltMaxAngleY={7}
      glareEnable={true}
      glareBorderRadius="0.7"
      glareMaxOpacity={0.6}
      glareColor="lightblue"
      glarePosition="all"
    >
      <div
        key={`${id}-${index}-${icon}`}
        className="glass xl:w-[100%] lg:w-[100%] md:w-[100%] w-[98%] px-1
                xl:h-[90px] lg:h-[90px] md:h-[90px] h-[60%] 
                xl:mx-0 lg:mx-0 md:mx-0  
                flex xl:flex-row lg:flex-row md:flex-row flex-col 
                 items-center justify-around"
      >
        <span
          className={`text-5xl ${color} text-white
                  rounded-full 
                  md:w-12 md:h-12 w-10 h-10
                  border-blue-200 border-[1px] flex items-center`}
        >
          {icon}
        </span>
        <p
          className="text-white xl:text-lg lg:text-md md:text-sm text-[0.68rem] 
                  w-[70%] overflow-auto font-thin text-center"
        >
          {description}
        </p>
      </div>
    </Tilt>
  );
};

export default TiltCard;
