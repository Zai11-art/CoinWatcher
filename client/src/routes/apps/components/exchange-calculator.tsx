import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { IoArrowForwardOutline } from "react-icons/io5";

import { RootState } from "../../../state";
import Loader from "../../../components/Loader";
import ExchangeComponent from "./exchange-component";

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

    console.log(currencyArr);

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
        className={`lg:w-[1000px] h-[590px] w-full rounded-lg p-6 ${
          mode === "light"
            ? "headCard-filter-light text-blue-900 text-glow"
            : "headCard-filter text-white"
        } flex gap-5 items-center justify-center flex-col shadow-2xl py-12`}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={`lg:w-[1000px]  w-full rounded-lg p-6 ${
        mode === "light"
          ? "headCard-filter-light text-blue-900 text-glow"
          : "headCard-filter text-white"
      } pb-4 flex  flex-col shadow-2xl `}
    >
      <form>
        <div className="flex justify-between md:flex-row flex-col w-full">
          <h1 className="mt-2 text-3xl font-bold   uppercase">currency ex.</h1>
          <div className="lg:text-sm text-[11px] italic mt-2 flex flex-row items-center ">
            <span>
              * Take into account the fees and volatility might vary overtime.
            </span>
          </div>
        </div>

        <div className="items-between flex flex-col py-10">
          <div className="flex w-full flex-row flex-wrap justify-between gap-5 ">
            <ExchangeComponent />

            <div className="flex gap-2 flex-col items-center">
              <h1 className="mb-2 mt-0 text-lg  font-normal italic">
                Top exchange rates:
              </h1>

              <div
                className={`flex items-center justify-center w-full flex-wrap ${
                  mode === "light" ? "bg-slate-200/50" : "bg-[#02080c]"
                } rounded-xl py-5 gap-5 `}
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
                  <div
                    className={`flex p-2 rounded-lg items-center justify-center gap-2 ${
                      mode === "light"
                        ? "headCard-filter-light text-glow text-blue-900"
                        : "bg-black border-blue-500/50  text-white"
                    } border-[1px]`}
                  >
                    <div
                      className={`${
                        mode === "light"
                          ? "text-glow bg-slate-200 text-blue-900"
                          : "bg-[#09283b] text-white"
                      } flex border-[1px] rounded-md p-2 border-[#9ccddc]`}
                    >
                      <span className={data.flag}></span>
                      <h1 className="text-glow md:text-xl text-md font-semibold ">
                        {data.label}
                      </h1>
                    </div>

                    <div
                      className={`text-xl lg:text-3xl ${
                        mode === "light"
                          ? "text-glow text-[#345683]"
                          : " text-[#9ccddc]"
                      }   `}
                    >
                      <IoArrowForwardOutline />
                    </div>

                    <div
                      className={`${
                        mode === "light"
                          ? "text-glow bg-slate-200 text-blue-900"
                          : "bg-[#09283b] text-white"
                      } flex border-[1px] rounded-md p-2 border-[#9ccddc]`}
                    >
                      <span className={data.targetFlag}></span>
                      <h1 className="text-glow md:text-xl text-md font-semibold ">
                        {data.labelTarget}
                      </h1>
                    </div>
                  </div>
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
