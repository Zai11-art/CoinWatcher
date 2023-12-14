import { useState, useEffect } from "react";
import ProfitCalculator from "./ProfitCalc";
import LeverageCalculator from "./LeverageCalc";
import ExchangeCalculator from "./ExchangeCalc";
import { useSelector } from "react-redux";
import { RootState } from "../../state";

const ToolsPage = () => {
  const mode = useSelector((state: RootState) => state.mode);
  const [activeCalc, setActiveCalc] = useState("calc1");
 
  const handleClick = (calc: string) => {
    setActiveCalc(calc);
  };

  return (
    <div
      className={`h-[100%] w-[100%] md:h-[100vh] lg:h-[100vh] ${
        mode === "light" ? "bg-slate-300" : "bg-[#051925]"
      }  flex flex-col items-center `}
    >
      <div
        className="
            AppsHeader absolute
            z-[2] mt-12
            flex 
            h-[225px] 
            w-[100%]
            rounded-lg pb-4
            sm:h-[200px] sm:w-[450px]
            md:h-[210px] md:w-[700px]
            lg:h-[200px] lg:w-[1000px]"
      ></div>

      <div
        className={`
            absolute z-[2]
            mt-12 
            h-[225px]
            w-[100%] 
            rounded-lg shadow-2xl
            sm:h-[200px] sm:w-[450px]
            md:h-[210px] md:w-[700px]
            lg:h-[200px] lg:w-[1000px]
            ${mode === "light" ? "headCard-filter-light" : "headCard-filter"}
            flex
            flex-col  pb-4`}
      >
        <div className="p-6">
          <div
            className={`${
              mode === "light" ? "text-glow text-blue-900" : "text-white"
            } mb-3 md:mb-6 lg:mb-5`}
          >
            <h1 className=" mb-2 text-[19px] font-bold sm:text-[21.5px] md:text-3xl lg:text-3xl">
              Calculators for P/L. leverage. and more.
            </h1>
            <p className="xl:text-md lg:text-md md:text-md text-xs font-semibold italic sm:text-sm">
              Use calculators to leverage your trading, make a strategy, or just
              simple calculate the profits.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between lg:flex-row">
            {[
              { calcName: "Profit Calculator", calcNum: "calc1" },
              { calcName: "Futures Calculator", calcNum: "calc2" },
              { calcName: "Currency Exchange", calcNum: "calc3" },
            ].map((calc) => (
              <button
                onClick={() => handleClick(`${calc.calcNum}`)}
                className={` text-glow my-2  flex 
                          h-[50px] w-[31%] flex-row items-center justify-around
                        rounded-lg border-[0.5px] p-1 text-xs  duration-200
                        ease-in-out hover:scale-[1.02] md:w-[190px]
                        md:text-lg lg:w-[250px]
                        lg:text-lg
                        ${
                          mode === "light"
                            ? "border-[#0b2027] bg-slate-300/80 font-semibold text-blue-900 hover:bg-[#274163] hover:text-white focus:outline-none focus:ring focus:ring-[#a2e9ff] active:bg-[#b0ecff]"
                            : "border-[#9ccddc] bg-[#062c43] text-white hover:bg-[#ced7e0] focus:outline-none focus:ring focus:ring-[#9ccddc] active:bg-[#9ccddc]"
                        }
                        `}
              >
                {calc.calcName}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[0] md:mt-0 lg:mt-1">
        {activeCalc === "calc1" && <ProfitCalculator />}
        {activeCalc === "calc2" && <LeverageCalculator />}
        {activeCalc === "calc3" && <ExchangeCalculator />}
      </div>
    </div>
  );
}

export default ToolsPage;
