import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RatingBar from "../../components/RatingBar";
import { RootState } from "../../state";
import { IoBookOutline, IoFlagOutline, IoGlobeOutline, IoInformationCircleOutline, IoLogoReddit, IoLogoTwitter } from "react-icons/io5";

interface ExchangeViewCardUpData {
  image: string;
  centralized: boolean;
  name: string;
  trust_score_rank: number;
  country: string;
  url: string;
  reddit_url: string;
  twitter_handle: string;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
  year_established: number;
  has_trading_incentives: boolean;
  tickers: {}[];
  trust_score: number;
  status_updates: {
    project: {image: {small: string}};
    user_title: string;
    description: string;
  }[]
}

interface ExchangeViewCardUpType {
  data: ExchangeViewCardUpData
}

const ExchangeViewCardUp: React.FC<ExchangeViewCardUpType> = ({data}) => {
  const mode = useSelector((state : RootState) => state.mode);
  const { exchangeId } = useParams();
  const response = data;
  console.log(response);

  const { data: usdprice } = useQuery(["btcPrice"], () => {
    return axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((res) => res.data.bitcoin.usd);
  });

  console.log(usdprice);

  return (
    <div className={`
         rounded-lg mt-12 flex justify-center 
         h-[875px] w-full
         md:h-[750px] md:w-[100%] 
         lg:h-[425px] lg:w-[100%] 
         xl:h-[350px]`}>
      <div className={`
           viewCardHeader absolute z-[1] flex flex-col
           justify-between rounded-tl-3xl
           rounded-tr-3xl border-[2px] lg:flex-row 
           p-[5%] md:p-[3%] xl:p-[2%] lg:p-[3%]
           w-[95%] h-[875px]
           md:h-[750px] md:w-[700px]
           lg:h-[425px] lg:w-[1000px]  
           xl:h-[350px] xl:w-[1300px]`}></div>

      <div className={`
           viewcard-filter absolute z-[2] border-[2px] opacity-0
           md:p-[3%] lg:flex-row lg:p-[3%] xl:p-[2%] 
           flex  flex-col  justify-between p-[5%] 
           rounded-tl-3xl rounded-tr-3xl
           h-[875px] w-[95%]
           md:h-[750px] md:w-[700px]
           lg:h-[425px] lg:w-[1000px]  
           xl:h-[350px] xl:w-[1300px]
           ${mode === "light" ? "border-[#054569] bg-[#062130]"
           : " border-[#054569] bg-[#062130]"}`}></div>

      <div className={`
           abslute z-[3] rounded-tl-3xl rounded-tr-3xl
           flex flex-col  justify-between  border-[#054569] p-[5%] 
           md:p-[3%]  lg:flex-row lg:p-[3%] xl:p-[2%] 
           h-[875px] w-[95%]
           md:h-[750px] md:w-[700px]
           lg:h-[425px] lg:w-[1000px]
           xl:h-[350px] xl:w-[1300px] 
           ${ mode === "light" ? "viewcard-filter-light text-glow border-blue-300 text-[#193155] "
           : "  viewcard-filter border-[#054569] text-white"}`}>
        <div
          className="flex flex-col 
        justify-center md:w-[100%] lg:w-[430px]
        "
        >
          <div className="flex flex-row items-center">
            <img
              src={response?.image}
              alt={exchangeId}
              className="mr-3 h-[40px] w-[40px]"
            />
            <div
              className={`rounded-lg p-2 ${
                mode === "light"
                  ? "newscard-filter-light shadow-md shadow-blue-900"
                  : "bg-[#062c43]"
              }  ml-2`}
            >
              <h2 className="text-lg font-bold">
                {response?.centralized === true
                  ? "Centralized"
                  : "Decentralized"}
              </h2>
            </div>
          </div>
          <div className="mt-1 flex flex-row items-center">
            <h1 className="text-glow text-4xl font-bold">{response?.name}</h1>
            <div
              className={`rounded-lg p-2 ${
                mode === "light"
                  ? "newscard-filter-light shadow-md shadow-blue-900"
                  : "bg-[#062c43]"
              } ml-2 mt-1`}
            >
              <h2 className="text-sm font-bold">
                Rank #{response?.trust_score_rank}
              </h2>
            </div>
            <div
              className={`rounded-lg p-2 ${
                mode === "light"
                  ? "newscard-filter-light shadow-md shadow-blue-900"
                  : "bg-[#062c43]"
              } ml-2 mt-1 flex items-center `}
            >
              <IoFlagOutline />
              <h2 className="ml-2 text-[12px] font-bold">
                {response?.country}
              </h2>
            </div>
          </div>
          <div className="mt-2 flex flex-col font-semibold">
            <h1 className="text-md flex flex-row items-center font-semibold">
              <IoInformationCircleOutline /> Links:
            </h1>
            <div className="mt-1 flex flex-row">
              {[
                {label: "Website", icon: <IoGlobeOutline />, link: response?.url},
                {label: "Subreddit", icon: <IoLogoReddit /> , link: response?.reddit_url ? response?.reddit_url : `http://localhost:5173/exchanges/${exchangeId}`},
                {label: "@" + response?.twitter_handle, icon: <IoLogoTwitter />, link: response?.twitter_handle},
              ].map((data) => 
              <a className={`rounded-lg px-2 py-1 ${mode === "light"
                 ? "newscard-filter-light shadow-md shadow-blue-900"
                 : "bg-[#062c43]"} mx-1 text-sm  duration-200 ease-in-out 
                 hover:scale-[1.05]`}
                 href={data.link}>
                  {data.icon}
                  {data.label}
              </a>
              )}
              
            </div>
            <div className={`
                h-[70px] w-[98%]
                md:h-[90px] md:w-[98%]
                lg:h-[90px] lg:w-[98%]
                xl:h-[90px] xl:w-[98%]
                ${mode === "light" ? "newscard-filter-light bg-slate-300/50 shadow-md shadow-blue-900"
                : "meter-bgMain bg-[#062c43]"} mt-3 flex flex-row justify-around rounded-xl p-1`}>
              <div className="flex flex-col items-center justify-center">
                <h1 className="lg:text-md text-md mb-1 font-bold">24hr-Vol</h1>
                <h1
                  className={`lg:text-md text-md mb-1 ${
                    mode === "light"
                      ? "border-[2px] border-blue-200/60 bg-slate-200/80 text-[#1f9729]"
                      : "border-cyan-200 bg-slate-900/80 text-[#2ae937] "
                  } rounded-lg p-1 font-bold `}
                >
                  $
                  {(
                    Number(response?.trade_volume_24h_btc.toFixed(2)) * usdprice
                  ).toLocaleString()}
                </h1>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className="lg:text-md text-md mb-1 font-bold">
                  24hr-Vol-N
                </h1>
                <h1
                  className={`lg:text-md text-md mb-1 ${
                    mode === "light"
                      ? "border-[2px] border-blue-200/60 bg-slate-200/80 text-[#1f9729]"
                      : "border-cyan-200 bg-slate-900/80 text-[#2ae937]"
                  } rounded-lg p-1 font-bold `}
                >
                  $
                  {(
                    Number(response?.trade_volume_24h_btc_normalized.toFixed(2)) *
                    usdprice
                  ).toLocaleString()}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`
        mx-0 my-3   
        flex h-[675px]
        w-[99%] flex-wrap
        items-center justify-center
        rounded-3xl 
        p-[5%] shadow-md
         md:h-[95%]
        md:w-[99%]  md:p-[2%]  lg:mx-6 lg:my-0  
        lg:h-[100%] lg:w-[500px] lg:p-[3%] xl:mx-3 xl:my-0 xl:h-[100%] xl:w-[500px]  xl:flex-row xl:p-[2%]
        ${mode === "light"
        ? "newscard-filter-light font-semibold text-slate-900 shadow-blue-900"
        : "bg-[#03111a] font-semibold text-white shadow-cyan-700"}`}>
          {[
            {label: "Year Established", content: response?.year_established},
            {label: "Trading Incentives", content: response?.has_trading_incentives === true ? "Present": "Not available"},
            {label: "Tickers Available", content: response?.tickers.length},
            {label: "Trust Score", content: <RatingBar rating={response?.trust_score} />},
          ].map((data) => 
          <div
            className={`
            m-1 flex 
            h-[60px] w-[167.5px]
            flex-col items-center
            justify-center rounded-md
            md:h-[70px] md:w-[190px] lg:h-[70px] lg:w-[100%] xl:h-[60px] xl:w-[192.5px]
            ${
              mode === "light"
                ? "box-shadow-inner border-[1px] border-blue-300 bg-slate-200"
                : "bg-[#062c43] "
            }`}
          >
            <h1 className="md:text-md text-glow mb-1 text-[12px] lg:text-[15px]">
              {data.label}
            </h1>
            <span className="md:text-md text-[12px] lg:text-[15px]">
              {data.content}
            </span>
          </div>
          )}
        </div>
        <div
          className={`flex w-full flex-col items-center
        rounded-3xl  py-5 shadow-md  ${
          mode === "light"
            ? "newscard-filter-light text-glow border-blue-300 font-semibold text-slate-900 shadow-blue-900"
            : " border-[white] bg-[#03111a] font-semibold text-white shadow-cyan-700"
        } md:w-[100%] lg:w-[350px]`}
        >
          <h1 className="text-lg font-bold ">{response?.name} updates</h1>
          <div
            className={`
            flex h-full
            w-full flex-col
            flex-wrap items-center justify-center
           `}
          >
            {response?.status_updates?.length > 0 ? (
              response?.status_updates?.slice(0, 3).map((item) => (
                <div
                  className={`${
                    mode === "light"
                      ? "bg-slate-200/80"
                      : "bg-[#062c43] shadow-cyan-400/10"
                  } my-2 flex w-[90%] flex-row items-center justify-between rounded-lg shadow-xl lg:h-12  xl:h-10`}
                >
                  <div className="flex flex-row items-center justify-center">
                    <img
                      className="ml-1 h-6 w-6 rounded-lg"
                      src={item.project.image.small}
                      alt=""
                    />
                    <span className="ml-1 text-sm font-normal lg:text-[0.7rem] xl:text-sm">
                      {item.user_title}
                    </span>
                    <span className="ml-1 text-sm font-normal italic lg:text-[0.7rem] xl:text-sm">
                      "{item.description.slice(0, 21) + "..."}"
                    </span>
                  </div>
                  <button className="mr-2 text-lg transition-all ease-in-out hover:text-blue-300 ">
                    <IoBookOutline />
                  </button>
                </div>
              ))
            ) : (
              <h1 className="text-xl font-bold">No updates available</h1>
            )}
          </div>
          <span
            className={`cursor-pointer p-1 text-center hover:underline ${
              mode === "light" ? "" : ""
            } h-12 w-[50%] rounded-lg text-xs font-bold`}
          >
            View All updates
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExchangeViewCardUp;
