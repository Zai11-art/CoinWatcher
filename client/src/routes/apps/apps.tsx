import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../state";
import ProfitCalculator from "./components/profit-calculator";
import LeverageCalculator from "./components/leverage-calculator";
import ExchangeCalculator from "./components/exchange-calculator";

const Apps = () => {
  const mode = useSelector((state: RootState) => state.mode);
  const [activeCalc, setActiveCalc] = useState("calc3");

  const handleClick = (calc: string) => {
    setActiveCalc(calc);
  };

  return (
    <div
      className={`h-full w-full gap-5  ${
        mode === "light" ? "bg-slate-300" : "bg-[#051925]"
      } flex flex-col items-center justify-center py-20 md:px-12 px-5`}
    >
      <div
        className={`rounded-lg shadow-2xl ${
          mode === "light" ? "headCard-filter-light" : "headCard-filter"
        } p-8 lg:w-[1000px]  w-full `}
      >
        <div className="flex items-center justify-center gap-5 w-full md:flex-row flex-col">
          <div
            className={`${
              mode === "light" ? "text-glow text-blue-900" : "text-white"
            } `}
          >
            <h1 className=" mb-2 text-[19px] font-bold sm:text-[21.5px] md:text-3xl lg:text-3xl">
              Calculators for P/L. leverage. and more.
            </h1>
            <p className="xl:text-md lg:text-md md:text-md text-xs font-semibold italic sm:text-sm">
              Use calculators to leverage your trading, make a strategy, or just
              simple calculate the profits.
            </p>
          </div>

          <div className="flex justify-center lg:flex-row flex-row md:w-[200px] w-full md:flex-wrap gap-2">
            {[
              { calcName: "Profit", calcNum: "calc1" },
              { calcName: "Futures", calcNum: "calc2" },
              { calcName: "Exchange", calcNum: "calc3" },
            ].map((calc) => (
              <button
                onClick={() => handleClick(`${calc.calcNum}`)}
                className={`text-glow   my-2 md:text-md text-sm flex items-center justify-center ${
                  mode === "light"
                    ? "border-[#0f6581] bg-slate-300/80 font-semibold text-blue-900 hover:bg-[#274163] hover:text-white active:bg-[#b0ecff]"
                    : "border-[#9ccddc] bg-[#062c43] text-white hover:bg-[#ced7e0] active:bg-[#9ccddc]"
                } ${
                  activeCalc === calc.calcNum && "border-[3px]"
                } border-[1px] rounded-xl p-2 lg:w-24 w-full`}
              >
                {calc.calcName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeCalc === "calc1" && <ProfitCalculator />}
      {activeCalc === "calc2" && <LeverageCalculator />}
      {activeCalc === "calc3" && <ExchangeCalculator />}
    </div>
  );
};

export default Apps;
