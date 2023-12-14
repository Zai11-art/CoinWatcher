import React from "react";
import shortid from "shortid";
import { useSelector } from "react-redux";
import { RootState } from "../../state";

interface NewsType {
  title: string;
  image: string;
  description: string;
  url: string;
  source: string;
}


const NewsCard : React.FC<NewsType> = ({ image, title, description, source, url }) => {
  const mode = useSelector((state : RootState) => state.mode);

  return (
    <div
      key={shortid.generate()}
      className={`my-3  flex
              
              flex-col  
              rounded-md 
              ${
                mode === "light"
                  ? "text-glow bg-slate-200 text-slate-900 "
                  : "headCard-filter border-[0.1px] border-cyan-200/40 text-white"
              }
              shadow-xl duration-200 
              ease-in-out  hover:scale-[1.01]
              h-[300px] w-[100%]
              sm:h-[250px] sm:w-[100%] 
              md:h-[250px] md:w-[100%] 
              lg:h-[210px] lg:w-[100%] `}
    >
      <div className="flex flex-row p-1 md:p-0 lg:p-0">
        <div
          className="newscard-filter
                  absolute mx-1
                 
                  rounded-md p-1 md:mx-0
                  md:mt-0  
                  lg:mx-0 lg:mt-0
                  h-[270px] w-[175px]
                  md:w-[250px] md:h-[245px] 
                  lg:h-[205px] lg:w-[250px]  "
        ></div>
        <img
          src={
            image
              ? image
              : "https://images.pexels.com/photos/4808267/pexels-photo-4808267.jpeg?auto=compress&cs=tinysrgb&w=300"
          }
          alt=""
          className="
                      mx-1 h-[270px]
                      w-[175px] rounded-md
                      md:mx-0 md:mt-0 md:h-[245px] 
                      md:w-[250px]  lg:mx-0 
                      lg:mt-0  lg:h-[205px] lg:w-[250px]
                      
                      "
        />

        <div className="ml-4 w-[70%] lg:w-[700px]">
          <h1 className="text-md my-2 font-semibold  md:text-xl lg:text-xl">
            {title.length < 60 ? title : title.slice(0, 60) + "..."}
          </h1>
          <p
            className="mt-2 
                          text-[13px] 
                          lg:text-[14.5px]"
          >
            {" "}
            {description.length < 140 ? description : description.slice(0, 140) + "..."}
          </p>
          <div
            className="mt-8 lg:mt-7 md:mt-12 sm:mt-4  flex flex-row justify-between 
                  text-[12px]
                   lg:text-[14.5px] "
          >
            <span className="flex flex-col italic">
              <span>Source:</span>
              <span>{source}</span>
            </span>
            <a
              href={url}
              className={` 
             rounded-lg  flex items-center px-2
                text-[1]  
              duration-200 ease-in-out 
              hover:scale-[1.02] 
           
              ${
                mode === "light"
                  ? "newscard-filter-light border-[#0b2027] font-semibold text-blue-900 hover:bg-[#274163] hover:text-white focus:outline-none focus:ring focus:ring-[#a2e9ff] active:bg-[#b0ecff]"
                  : "border-[#9ccddc] bg-[#062c43] text-white hover:bg-[#ced7e0] focus:outline-none focus:ring focus:ring-[#9ccddc] active:bg-[#9ccddc]"
              }
              `}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
