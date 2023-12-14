import { useState, useEffect } from "react";
import Exchangecalc from "./testComp/Exchangecalc";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import { IoArrowForwardOutline, IoHelpCircleOutline } from "react-icons/io5";


const ExchangeCalculator = () => {
  const mode = useSelector((state: RootState) => state.mode);
  const { data } = useQuery(["currencyPrices"], () => {
    return (
      axios
        .get(
          "https://v6.exchangerate-api.com/v6/b51a7bc71ceacdda84823787/latest/USD"
        )
        // .then(response => response.json())
        .then((res) => res.data.conversion_rates)
    );
  });


  const toConvert = data;

  const transform = (data: Record<string, number>) => {
    const currencyObj = data;
    const currencyArr: { name: string; price: number }[] = [];

    console.log(currencyArr)

    for (const key in currencyObj) {
      if (currencyObj.hasOwnProperty(key)) {
        currencyArr.push({
          name: key,
          price: currencyObj[key],
        });
      }
    }
    return currencyArr;
  };

  const currencyPrice = transform(toConvert);

  if (!data) {
    return (
      <div
        className={`
        mt-[270px] flex h-[590px]
        w-[100%] flex-col
        rounded-lg border-[2px]
        border-[#9ccddc] bg-[#062c43]
        p-6 pb-4
        shadow-2xl sm:h-[470px]
        sm:w-[700px] md:mt-[280px] 
        md:h-[470px]
        md:w-[700px] 
        lg:mt-[265px]  lg:h-[525px] 
        lg:w-[1000px]`}
      >
        <Loader></Loader>
        <h1 className="text-glow text-center text-[white]">
          Trying to Fetch Currency Prices...
        </h1>
      </div>
    );
  }

  return (
    <div
      className={`
        mt-[290px] h-[590px] w-[100%]
        rounded-lg p-6
        sm:h-[470px] sm:w-[700px]
        md:mt-[280px] md:h-[470px]
        md:w-[700px] lg:mt-[265px]
        lg:h-[525px] lg:w-[1000px]
        ${
          mode === "light"
            ? "headCard-filter-light text-glow text-blue-900"
            : "headCard-filter text-white"
        }
        mb-12
        flex  flex-col 
        pb-4
        shadow-2xl
        
        `}
    >
      <form>
        <div className="flex w-full flex-row items-center justify-between">
          <h1 className="mt-2 text-3xl font-bold   uppercase ">currency ex.</h1>
          <div className="mt-2 flex flex-row   items-center justify-center text-[11px] italic lg:text-sm">
            <div className="text-lg">
              <IoHelpCircleOutline />
            </div>

            <span>
              Take into account the fees and volatility might vary overtime.
            </span>
          </div>
        </div>

        <div className="items-between mt-4 flex flex-col">
          <div className="my-1.5 flex w-full flex-row flex-wrap justify-between ">
            <Exchangecalc />
            <div className="mt-3 flex w-[100%]  flex-col items-center">
              <h1 className="mb-2 mt-0 text-lg  font-normal italic">
                Top exchange rates:
              </h1>
              <div
                className={`
                        flex h-[275px]
                        w-[100%] flex-col
                        flex-nowrap items-center
                        rounded-lg  md:h-[175px]
                        md:w-[635px] md:flex-row md:flex-wrap lg:h-[200px]  
                        lg:w-[935px] lg:flex-row  lg:flex-wrap 
                        ${mode === "light" ? "bg-slate-200/50" : "bg-[#02121c]"}
                        justify-center
                        p-3`}
              >
                {[
                  {
                    label: "1 USD $",
                    flag: "fi fi-us mr-1",
                    targetFlag: "fi fi-ph mr-1",
                    labelTarget:
                      "₱" +
                      currencyPrice
                        .slice(111, 112)
                        .map((e) => e.price.toFixed(2)),
                  },
                  {
                    label: "1 EUR €",
                    flag: "fi fi-eu mr-1",
                    targetFlag: "fi fi-us mr-1",
                    labelTarget:
                      "$" +
                      (1 / currencyPrice.slice(43, 44)[0].price).toFixed(4),
                  },
                  {
                    label: "1 USD $",
                    flag: "fi fi-us mr-1",
                    targetFlag: "fi fi-cn mr-1",
                    labelTarget:
                      "¥" +
                      currencyPrice
                        .slice(71, 72)
                        .map((e) => e.price.toFixed(2)),
                  },
                  {
                    label: "1 GBP £",
                    flag: "fi fi-gb mr-1",
                    targetFlag: "fi fi-us mr-1",
                    labelTarget:
                      "$" +
                      (1 / currencyPrice.slice(47, 48)[0].price).toFixed(4),
                  },
                ].map((data) => (
                  <article
                    className={`${
                      mode === "light"
                        ? "headCard-filter-light text-glow text-blue-900"
                        : "bg-[#09283b] text-white"
                    }
                                my-1.5 mr-6
                                flex h-[60px]
                                w-[90%] flex-row 
                                items-center justify-around rounded-lg border-[0.5px] border-[#9ccddc]
                                px-1 py-2 duration-200 ease-in-out hover:scale-[1.02] md:h-[60px]
                                md:w-[275px] lg:h-[75px] lg:w-[400px]`}
                  >
                    <div
                      className={`${
                        mode === "light"
                          ? "text-glow bg-slate-300 text-blue-900"
                          : "bg-[#09283b] text-white"
                      } flex flex-row rounded-lg border-[1px] border-[#9ccddc] p-2 md:p-1.5 lg:p-3`}
                    >
                      <span className={data.flag}></span>
                      <h1 className="text-glow  text-[15px]  font-semibold md:text-[20px] lg:text-[20px] ">
                        {data.label}
                      </h1>
                    </div>

                    <div
                      className={`text-xl lg:text-3xl ${
                        mode === "light"
                          ? "text-glow text-[#345683]"
                          : "bg-[#09283b] text-[#9ccddc]"
                      }   `}
                    >
                      <IoArrowForwardOutline />
                    </div>

                    <div
                      className={`${
                        mode === "light"
                          ? "text-glow bg-slate-300 text-blue-900"
                          : "bg-[#09283b] text-white"
                      } flex flex-row rounded-lg border-[1px] border-[#9ccddc] p-2 md:p-1.5 lg:p-3`}
                    >
                      <span className={data.targetFlag}></span>
                      <h1 className="text-glow  text-[15px]  font-semibold md:text-[20px] lg:text-[20px]">
                        {data.labelTarget}
                      </h1>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ExchangeCalculator;
