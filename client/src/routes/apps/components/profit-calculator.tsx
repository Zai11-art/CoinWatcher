import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../state";

const ProfitCalculator = () => {
  const mode = useSelector((state: RootState) => state.mode);

  const [currentInitial, setcurrentInitial] = useState<number>(0);
  const [currentPrice, setcurrentPrice] = useState<number>(0);
  const [currentSell, seturrentSell] = useState<number>(0);
  const [investFee, setInvestFee] = useState<number>(0);
  const [exitFee, setExitFee] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [multiplier, setmuitiplier] = useState<number>(0);
  const [exit, setExit] = useState<number>(0);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    const x = (total + currentInitial) / currentInitial;
    const y =
      (((currentSell - currentPrice) / currentPrice) * currentInitial +
        currentInitial) /
      currentInitial;
    e.preventDefault();
    if (!currentInitial || !currentPrice || !currentSell) {
      setTotal(0);
    } else {
      setTotal(((currentSell - currentPrice) / currentPrice) * currentInitial);
      setExit(
        ((currentSell - currentPrice) / currentPrice) * currentInitial -
          (investFee + exitFee) +
          currentInitial
      );
      setmuitiplier(y);
    }
    setcurrentInitial(currentInitial);
    setcurrentPrice(currentPrice);
    seturrentSell(currentSell);
    setInvestFee(investFee);
    setExitFee(exitFee);
  };

  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setmuitiplier(0);
    setcurrentInitial(0);
    setcurrentPrice(0);
    seturrentSell(0);
    setInvestFee(0);
    setExitFee(0);
    setTotal(0);
  };

  return (
    <div
      className={`lg:w-[1000px]  w-full rounded-lg p-6 ${
        mode === "light"
          ? "headCard-filter-light text-blue-900 text-glow"
          : "headCard-filter text-white"
      } pb-4 flex  flex-col shadow-2xl `}
    >
      <form>
        <div className="flex  justify-between md:flex-row flex-col w-full">
          <h1 className="md:text-3xl text-[28px] uppercase font-bold mt-2">
            Profit Calculator
          </h1>
          <div className="lg:text-sm text-[11px] italic mt-2 flex flex-row items-center ">
            <span>
              *Take into account the fees and volatility might vary overtime.
            </span>
          </div>
        </div>
        <div className="flex flex-col items-between mt-4 ">
          <div className="flex flex-row  my-2 w-full gap-x-5 gap-y-2 flex-wrap">
            {[
              {
                label: "Cost / Margin:",
                value: currentInitial,
                funcT: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setcurrentInitial(parseFloat(e.target.value)),
              },
              {
                label: "Buy Price:",
                value: currentPrice,
                funcT: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setcurrentPrice(parseFloat(e.target.value)),
              },
              {
                label: "Sell Price:",
                value: currentSell,
                funcT: (e: React.ChangeEvent<HTMLInputElement>) =>
                  seturrentSell(parseFloat(e.target.value)),
              },
              {
                label: "Investment Fee:",
                value: investFee,
                funcT: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setInvestFee(parseFloat(e.target.value)),
              },
              {
                label: "Exit Fee:",
                value: exitFee,
                funcT: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setExitFee(parseFloat(e.target.value)),
              },
            ].map((data) => (
              <div className="flex flex-col md:w-64 w-full">
                <label className="lg:text-lg font-semibold text-md mb-3">
                  {data.label}
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 lg:text-xl text-mdtext-gray-900 bg-[#0b4958] border border-r-0 border-gray-300 rounded-l-md">
                    $
                  </span>
                  <input
                    min="0"
                    required
                    onChange={data.funcT}
                    value={data.value}
                    type="number"
                    className={`border-[1px] border-[#9ccddc] rounded-r-lg ${
                      mode === "light" ? "bg-slate-200/90" : "bg-[#02121c]"
                    }  p-2  w-full`}
                  />
                </div>
              </div>
            ))}

            <div
              className={`w-full lg:h-[125px] md:h-[100px] h-[100px] mt-3 ${
                mode === "light" ? "bg-slate-200/50" : "bg-[#02121c]"
              } rounded-xl`}
            >
              <div className="flex flex-row items-center justify-around h-full w-full">
                {[
                  { label: "Profit / Loss:", logic: "$" + total.toFixed(2) },
                  {
                    label: "Total Exit Amount:",
                    logic:
                      "$" + investFee || exitFee
                        ? exit.toFixed(2)
                        : total.toFixed(2),
                  },
                  {
                    label: "Multipler:",
                    logic: !multiplier ? 0 : multiplier.toFixed(2) + "x",
                  },
                ].map((data) => (
                  <div className="flex flex-col items-center  justify-center">
                    <h1 className=" text-glow font-bold lg:text-lg md:text-md text-[12px]">
                      {data.label}
                    </h1>
                    <div
                      className={`rounded-xl p-2 ${
                        mode === "light"
                          ? "newscard-filter-light"
                          : "bg-[#040d11]"
                      } mt-3 flex items-center justify-center`}
                    >
                      <h1
                        className={`lg:text-2xl text-xl text-glow font-semibold ${
                          exit > currentInitial || total == 0
                            ? `${
                                mode === "light"
                                  ? "text-[#28a733]"
                                  : "text-[#2ae937]"
                              } `
                            : `${
                                mode === "light"
                                  ? "text-[#d82e2e]"
                                  : "text-[#ff6666]"
                              } `
                        }`}
                      >
                        {data.logic}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full h-full py-4 md:justify-start justify-center">
              <div className="flex gap-3 items-center md:justify-start justify-center w-full">
                {[
                  { label: "Calculate", funcT: handleSubmit },
                  { label: "Reset", funcT: handleReset },
                ].map((data) => (
                  <button
                    onClick={data.funcT}
                    className={`w-32 py-2 lg:text-lg font-semibold border-[1px] border-[#9ccddc] rounded-lg duration-200 ease-in-out hover:scale-[1.04] ${
                      mode === "light"
                        ? "border-[#0b2027] newscard-filter-light font-semibold text-blue-900 hover:bg-[#274163] hover:text-white focus:outline-none focus:ring focus:ring-[#a2e9ff] active:bg-[#b0ecff]"
                        : "border-[#9ccddc] bg-[#062c43] text-white hover:bg-[#ced7e0] focus:outline-none focus:ring focus:ring-[#9ccddc] active:bg-[#9ccddc]"
                    }`}
                  >
                    {data.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfitCalculator;
