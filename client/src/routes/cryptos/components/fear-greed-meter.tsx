import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { RootState } from "../../../state";
import Loader from "../../../components/loader";

interface ShadowedProps {
  rotationAngle: string;
}

const MyElement = styled.div<ShadowedProps>`
  transform: rotate(${(props) => props?.rotationAngle || "0deg"});
`;

const FearGreadMeter = () => {
  const mode = useSelector((state: RootState) => state.mode);

  const { data: dataIndex, isLoading } = useQuery(["fearGreedData"], () => {
    return axios
      .get("https://api.alternative.me/fng/?limit=10&format=json")
      .then((res) => res.data.data);
  });

  return (
    <div
      className={` p-5 rounded-md ${
        mode === "light"
          ? "cryptocard-grad-light text-[#142435]"
          : "cryptocard-grad text-white"
      } w-full flex flex-col items-center justify-center`}
    >
      <h1 className="text-md uppercase font-bold text-glow">
        Fear & Greed Index
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex h-full flex-col flex-wrap items-center ">
          {/* OUTER GLASS */}
          <div
            className={`${
              mode === "light"
                ? "meter-bgMain-light z-[01] bg-[#105b9c98] opacity-30"
                : "meter-bgMain"
            } absolute z-[2] mt-[60px] md:mt-[40px] lg:mt-[20px]
                        h-[calc(100px*0.8)] w-[calc(200px*0.8)] 
                        sm:h-[calc(100px*1)] sm:w-[calc(200px*1)] 
                        md:h-[calc(100px*1.4)] md:w-[calc(200px*1.4)]
                        lg:h-[calc(100px*1.4)] lg:w-[calc(200px*1.4)]`}
          ></div>

          {/* THIN METER */}
          <div
            className=" meter md:mt-[60px] z-[1] mt-[75px] lg:mt-[40px]
                        w-[calc(200px*0.65)] h-[calc(100px*0.65)]
                        sm:w-[calc(200px*0.85)] sm:h-[calc(100px*0.85)]
                        md:h-[calc(100px*1.2)] md:w-[calc(200px*1.2)]
                        lg:h-[calc(100px*1.2)] lg:w-[calc(200px*1.2)]"
          ></div>

          {/* THICK METER */}
          <div
            className=" meter-bg absolute z-[0] mt-[67.5px] md:mt-[50px] lg:mt-[30px]
                        h-[calc(100px*0.73)] w-[calc(200px*0.73)]
                        sm:h-[calc(100px*0.92)] sm:w-[calc(200px*0.92)]
                        md:h-[calc(100px*1.3)] md:w-[calc(200px*1.3)]
                        lg:h-[calc(100px*1.3)] lg:w-[calc(200px*1.3)]"
          ></div>

          {/* ARROW */}
          <MyElement
            data-rotation-angle="5"
            rotationAngle={`${
              (parseInt(
                dataIndex?.slice(0, 1).map((e: { value: number }) => e.value)
              ) /
                100) *
                180 -
              90
            }deg`}
            className={`dial absolute z-[4] mt-[80px] md:mt-[60px] lg:mt-[40px]
                        origin-bottom border-[2px] border-[#ced7e0]
                        ${mode === "light" ? "bg-slate-600 " : "bg-slate-200"} 
                        duration-100 
                        w-[50px]  h-[60px] 
                        sm:w-[50px]  sm:h-[80px] 
                        md:w-[50px] md:h-[120px]
                        lg:h-[120px] lg:w-[50px]`}
          ></MyElement>

          <div
            className={`absolute z-[4] rounded-full border-[5px] border-[#9ccddc] bg-[#062c43] 
                         h-[20px] w-[20px]  lg:mt-[150px] md:mt-[170px]  sm:mt-[150px] mt-[130px]
                          `}
          ></div>
          {dataIndex
            ?.slice(0, 1)
            ?.map((e: { value_classification: string; value: number }) => (
              <div
                key={e.value}
                className={` mt-[40px] flex  
                                items-center justify-around rounded-lg
                                border-[1px] ${
                                  mode === "light"
                                    ? "border-blue-200/50 bg-slate-200/50 text-[#142435]"
                                    : "border-[#9ccddc] bg-[#054569] text-[white]"
                                } 
                                h-[60px]  w-[140px]
                                sm:h-[50px] sm:w-[250px]  
                                md:h-[50px] md:w-[250px]  
                                lg:h-[50px] lg:w-[250px] py-5 `}
              >
                <h1 className={`text-sm md:text-[16.5px] lg:text-[16.5px]  flex flex-col items-center justify-center`}>
                  STATUS:{" "}
                  <span
                    className={`font-semibold shadow-lg ${
                      e.value_classification === "Fear" ||
                      (e.value > 0 && e.value < 20)
                        ? `text-[#ff4929] ${
                            mode === "light" ? "bg-slate-500" : "bg-[#0b1f2b]"
                          }  rounded-md px-1 py-[0.1em]`
                        : e.value_classification === "Fear" ||
                          (e.value > 20 && e.value < 40)
                        ? `text-[#ffd429] ${
                            mode === "light" ? "bg-slate-500" : "bg-[#0b1f2b]"
                          } rounded-md px-1 py-[0.1em]`
                        : e.value_classification === "Neutral" ||
                          (e.value > 40 && e.value < 60)
                        ? `text-[#e6ff29] ${
                            mode === "light" ? "bg-slate-500" : "bg-[#0b1f2b]"
                          } rounded-md px-1 py-[0.1em]`
                        : e.value_classification === "Greed" ||
                          (e.value > 60 && e.value < 80)
                        ? `text-[#bbff29] ${
                            mode === "light" ? "bg-slate-500" : "bg-[#0b1f2b]"
                          } rounded-md px-1 py-[0.1em]`
                        : e.value_classification === "Greed" ||
                          (e.value > 80 && e.value < 100)
                        ? `text-[#97ff29] ${
                            mode === "light" ? "bg-slate-500" : "bg-[#0b1f2b]"
                          } rounded-md px-1 py-[0.1em]`
                        : ""
                    }`}
                  >
                    {e.value_classification}
                  </span>
                </h1>
                <h1 className="text-sm md:text-[16.5px] lg:text-[16.5px] flex flex-col items-center justify-center">
                  SCORE:{" "}
                  <span
                    className={` font-semibold shadow-lg ${
                      e.value_classification === "Fear" ||
                      (e.value > 0 && e.value < 20)
                        ? `text-[#ff4929] ${
                            mode === "light" ? "bg-slate-500" : "bg-[#0b1f2b]"
                          } rounded-md px-1 py-[0.1em]`
                        : e.value_classification === "Fear" ||
                          (e.value > 20 && e.value < 40)
                        ? `text-[#ffd429] ${
                            mode === "light" ? "bg-slate-500" : "bg-[#0b1f2b]"
                          } rounded-md px-1 py-[0.1em]`
                        : e.value_classification === "Neutral" ||
                          (e.value > 40 && e.value < 60)
                        ? `text-[#e6ff29] ${
                            mode === "light" ? "bg-slate-500" : "bg-[#0b1f2b]"
                          } rounded-md px-1 py-[0.1em]`
                        : e.value_classification === "Greed" ||
                          (e.value > 60 && e.value < 80)
                        ? `text-[#bbff29] ${
                            mode === "light" ? "bg-slate-500" : "bg-[#0b1f2b]"
                          } rounded-md px-1 py-[0.1em]`
                        : e.value_classification === "Greed" ||
                          (e.value > 80 && e.value < 100)
                        ? `text-[#97ff29] ${
                            mode === "light" ? "bg-slate-500" : "bg-[#0b1f2b]"
                          } rounded-md px-1 py-[0.1em]`
                        : ""
                    }`}
                  >
                    {e.value}
                  </span>{" "}
                </h1>
              </div>
            ))}
          <h1 className="mt-4 text-[13px] font-semibold text-orange-400  duration-150 ease-in-out hover:scale-[1.02] ">
            Source:{" "}
            <span className="">
              <a href="https://alternative.me/crypto/fear-and-greed-index/">
                Alternative.me
              </a>{" "}
            </span>
          </h1>
        </div>
      )}
    </div>
  );
};
export default FearGreadMeter;
