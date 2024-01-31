import React from "react";
import { useState } from "react";
import { Interweave } from "interweave";
import { useSelector } from "react-redux";

import CoinChart from "./coin-chart";
import { RootState } from "../../../state";
import CoinMarketList from "./coin-market-list";

interface DataType {
  market_data: {
    current_price: { usd: number; php: number; inr: number };
    price_change_24h_in_currency: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    ath: { usd: number };
    atl: { usd: number };
    total_volume: { usd: number };
    sparkline_7d: { price: number[] };
  };
  genesis_date: string;
  localization: { en: string };
  description: { en: string };
  symbol: string;
  tickers: {
    market: { name: string };
    trade_url: string;
    base: string;
    target: string;
    converted_last: { usd: string };
    trust_score: string;
    last: string;
  }[];
}

interface ViewLowerCard {
  data: DataType;
  hourly: {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
  };
  monthly: {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
  };
  max: {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
  };
}

const ViewLowerCard: React.FC<ViewLowerCard> = ({
  data,
  hourly,
  monthly,
  max,
}) => {
  console.log("ViewLowerCard here");
  console.log(data);
  console.log(monthly);
  console.log(max);

  const mode = useSelector((state: RootState) => state.mode);
  const response = data;

  const formatNum = (x: number): string => {
    let isNegative = x < 0 ? "-" : "";
    return isNegative + "$" + Number(Math.abs(x).toFixed(2));
  };

  const formatNumLessOne = (x: number): string => {
    let isNegative = x < 0 ? "-" : "";
    return isNegative + "$" + Number(Math.abs(x).toFixed(6));
  };

  console.log("hey check here u need me");
  console.log(hourly);

  // logic for buttons
  const [selectedButton, setSelectedButton] = useState("Price");
  const [selectedDuration, setSelectedDuration] = useState("2 wk");

  const handleButtonToggle = (label: string) => {
    setSelectedButton(label);
    setSelectedDuration("2 wk"); // Reset the duration when switching buttons
  };

  const handleDurationToggle = (label: string) => {
    setSelectedDuration(label);
  };

  let dataPassed, label;
  if (selectedButton === "Price") {
    if (selectedDuration === "2 wk") {
      dataPassed = hourly?.prices;
    } else if (selectedDuration === "1 M") {
      dataPassed = monthly?.prices;
    } else if (selectedDuration === "Max") {
      dataPassed = max?.prices;
    }
  } else if (selectedButton === "Market Cap") {
    if (selectedDuration === "2 wk") {
      dataPassed = hourly?.market_caps;
    } else if (selectedDuration === "1 M") {
      dataPassed = monthly?.market_caps;
    } else if (selectedDuration === "Max") {
      dataPassed = max?.market_caps;
    }
  } else if (selectedButton === "Volume") {
    if (selectedDuration === "2 wk") {
      dataPassed = hourly?.total_volumes;
    } else if (selectedDuration === "1 M") {
      dataPassed = monthly?.total_volumes;
    } else if (selectedDuration === "Max") {
      dataPassed = max?.total_volumes;
    }
  }

  label = selectedDuration;

  return (
    <div
      className="
        mb-5 
        mt-[0%]
        sm:mt-[0px]
        flex h-[780px]
        w-[100%] justify-center
        rounded-lg md:mt-[350px]
        md:h-[400px]  md:w-[100%] lg:mt-[50px] lg:h-[100%]
        lg:w-[100%]  xl:mt-[0px]"
    >
      <div
        className={`justify-
          flex 
          h-[2600px]
          sm:h-[2500px]
          w-[95%] flex-col
          rounded-bl-3xl rounded-br-3xl
          border-[2px] shadow-xl
          ${
            mode === "light"
              ? "newscard-filter-light text-glow border-blue-300 text-blue-900"
              : " border-[#054569] bg-[#062130]  text-white"
          } p-[3%] md:h-[2400px] md:w-[700px] md:p-[3%]  lg:h-[1400px]  lg:w-[1000px] lg:flex-col 
          lg:p-[1.5%] xl:h-[100%]  xl:w-[1300px] xl:flex-col xl:p-[1%]`}
      >
        <div className="flex flex-col justify-between lg:flex-row xl:flex-row ">
          {/* Coin Chart */}
          <div className="flex flex-col ">
            <div
              className={`mb-0 flex h-[50px] w-full items-center justify-between rounded-t-xl ${
                mode === "light" ? "bg-slate-200" : "bg-[#040b16]"
              } bg p-1`}
            >
              <div>
                {["Price", "Market Cap", "Volume"].map((label) => (
                  <button
                    key={label}
                    className={`w-15 mx-[4px] rounded-md ${
                      selectedButton === label
                        ? "bg-[#0c1e46] text-slate-200 shadow-xl shadow-cyan-400/20 hover:bg-blue-400"
                        : "bg-slate-200 text-slate-900 shadow-xl hover:bg-blue-200"
                    }  p-1 md:px-2 px-1 text-[0.65rem] font-bold transition-all ease-in-out uppercase`}
                    onClick={() => handleButtonToggle(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div>
                {["2 wk", "1 M", "Max"].map((label) => (
                  <button
                    key={label}
                    className={`w-15 mx-[4px] rounded-md ${
                      selectedDuration === label
                        ? "bg-[#0c1e46] text-slate-200 shadow-xl shadow-cyan-400/20 hover:bg-blue-400"
                        : "bg-slate-200 text-slate-900 shadow-xl hover:bg-blue-200"
                    }  p-1 md:px-2 px-1 text-[0.65rem] font-bold transition-all ease-in-out uppercase`}
                    onClick={() => handleDurationToggle(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`
            ${mode === "light" ? "bg-slate-200/90" : "chart"} 
              flex mb-2
              h-[350px] w-[100%] flex-col
              rounded-b-xl p-2 shadow-xl md:h-[350px]
              md:w-[640px] lg:h-[380px] lg:w-[600px] xl:h-[400px] xl:w-[800px]`}
            >
              <CoinChart dataPassed={dataPassed} label={selectedDuration} />
            </div>
          </div>

          {/* coin stats right */}
          <div
            className={`
              ${
                mode === "light"
                  ? "bg-slate-200/90 font-semibold text-slate-900"
                  : "chart text-white"
              }
              flex h-[420px]
              w-[100%] flex-col rounded-xl
              p-3 shadow-xl md:h-[400px] md:w-[640px]
              lg:h-[380px] lg:w-[350px] xl:h-[430px] xl:w-[445px]`}
          >
            <div className="mx-7">
              <h1 className="mb-4 text-center text-2xl font-bold  md:text-center md:text-3xl lg:text-left lg:text-xl xl:text-left xl:text-3xl">
                Coin Stats
              </h1>
              {[
                {
                  label: "Current Price",
                  content:
                    "$" +
                    response.market_data.current_price.usd.toLocaleString(),
                },
                {
                  label: "Price Change 24hr",
                  content:
                    response.market_data.price_change_24h_in_currency.usd > 1
                      ? formatNum(
                          response.market_data.price_change_24h_in_currency.usd
                        )
                      : formatNumLessOne(
                          response.market_data.price_change_24h_in_currency.usd
                        ),
                },
                {
                  label: "24hr High / 24hr Low",
                  content: `$ ${response.market_data.high_24h.usd.toLocaleString()} / $ ${response.market_data.low_24h.usd.toLocaleString()}`,
                },
                {
                  label: "Total trading Vol.",
                  content:
                    "$" +
                    response.market_data.total_volume.usd.toLocaleString(),
                },
                {
                  label: "All Time High",
                  content: "$" + response.market_data.ath.usd.toLocaleString(),
                },
                {
                  label: "All Time Low",
                  content:
                    response.market_data.atl.usd > 1
                      ? formatNum(response.market_data.atl.usd)
                      : formatNumLessOne(response.market_data.atl.usd),
                },
                {
                  label: "Genesis Date",
                  content:
                    !response.genesis_date || response.genesis_date == ""
                      ? "N/A"
                      : response.genesis_date,
                },
              ].map((data) => (
                <>
                  <div className="mb-2 mt-3 flex justify-between md:text-[15px] lg:text-[13.5px] xl:text-[16px]">
                    <span>{data.label}</span>
                    <span className="font-semibold">{data.content}</span>
                  </div>
                  <hr className="border-blue-500" />
                </>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`my-5 p-3 ${
            mode === "light" ? "font-semibold text-slate-900" : "text-white"
          }`}
        >
          <h1 className="mb-4 text-center text-2xl font-bold  md:text-center md:text-3xl lg:text-left lg:text-xl xl:text-left xl:text-3xl">
            {response.localization.en} Info{" "}
            {response.description.en == "" ? "Unavailable" : ""}
          </h1>
          <Interweave
            className="xl:text-md text-[12px]  md:text-[13.5px] lg:text-[15px] "
            content={response.description.en}
          />
        </div>

        <div className=" flex flex-col lg:flex-row xl:flex-row">
          <CoinMarketList data={response} />
          <div
            className={`
            ${
              mode === "light"
                ? "bg-slate-200/90 font-semibold text-slate-900"
                : "chart text-white"
            } 
            mt-3 flex h-[100%] w-[100%] flex-col rounded-xl p-3 md:h-[400px] md:w-[640px] lg:h-[380px] lg:w-[400px] xl:h-[400px] xl:w-[600px] `}
          >
            <div className="mx-7">
              <h1 className="mb-4 text-center text-xl font-bold  md:text-center md:text-3xl lg:text-left lg:text-xl xl:text-left xl:text-3xl">
                Currency to {response.localization.en}
              </h1>
              {[
                {
                  label: `${response.symbol.toUpperCase()} / ${Object.keys(
                    response.market_data.current_price
                  )[48].toUpperCase()}`,
                  content: "$" + response.tickers[0].last.toLocaleString(),
                },
                {
                  label: `${response.symbol.toUpperCase()} / ${Object.keys(
                    response.market_data.current_price
                  )[61 - 24].toUpperCase()}`,
                  content:
                    "P" +
                    response.market_data.current_price.php.toLocaleString(),
                },
                {
                  label: `${response.symbol.toUpperCase()} / ${Object.keys(
                    response.market_data.current_price
                  )[25].toUpperCase()}`,
                  content:
                    "R" +
                    response.market_data.current_price.inr.toLocaleString(),
                },
                {
                  label: `${response.symbol.toUpperCase()} / ${Object.keys(
                    response.market_data.current_price
                  )[48].toUpperCase()}`,
                  content: "Y" + response.tickers[0].last.toLocaleString(),
                },
              ].map((data) => (
                <>
                  <div className="mb-2 mt-3 flex text-sm justify-between md:text-[15px] lg:text-[15px] xl:text-[16px]">
                    <span>{data.label}</span>
                    <span className="font-semibold">{data.content}</span>
                  </div>
                  <hr className="border-blue-500" />
                </>
              ))}

              <div
                className={`mb-2 mt-6 flex justify-center rounded-lg p-1 duration-200 ease-in-out
                    md:text-[15px] lg:text-[13px] xl:text-[13px] ${
                      mode === "light"
                        ? "newscard-filter-light text-blue-800 hover:scale-[1.02] hover:text-slate-200"
                        : "bg-blue-500 hover:bg-blue-100 hover:text-blue-500"
                    }`}
              >
                <a href="#" className="font-bold">
                  {" "}
                  Full Currency List{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLowerCard;
