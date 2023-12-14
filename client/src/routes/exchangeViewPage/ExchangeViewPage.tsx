import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getExchangeData } from "../../state/utils/utils";
import { useSelector } from "react-redux";
import ExchangeViewCardUp from "./ExchangeViewCardUp";
import Pagination from "../../components/Pagination";
import ExchangeViewTable from "./ExchangeViewTable";
import { RootState } from "../../state";

const ExchangeViewPage = () => {
  const mode = useSelector((state : RootState) => state.mode);
  const { exchangeId } = useParams() as {exchangeId : string};



  interface ExchangeDataType {
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
    tickers: {
      base: string;
      target: string;
      id: string;
      coin_id : string;
      target_coin_id: string;
      converted_last: {usd : number};
      volume: number;
      market: {has_trading_incentive : boolean};
      bid_ask_spread_percentage: number;
      trust_score: string;
    }[];
    trust_score: number;
    status_updates: {
      project: {image: {small: string}};
      user_title: string;
      description: string;
    }[]
  }
  

  const [exchangeDataState, setExchangeDataState] = useState<ExchangeDataType | null>(null);
  const exchangeData : ExchangeDataType = exchangeDataState as ExchangeDataType;


  console.log("exchange data here")
  console.log(exchangeData?.tickers.length)

  // for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setpostsPerPage] = useState<number>(50);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  useEffect(() => {
    getExchangeData(exchangeId)
      .then((data) => {
        setExchangeDataState(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [exchangeId]);

  return (
    <div
      className={`flex h-[100%] w-full flex-col items-center ${
        mode === "light" ? "bg-slate-300" : "bg-[#030d13]"
      }  pb-[200px] md:h-[6000px] lg:h-[100%] xl:h-[100%]`}
    >
      <ExchangeViewCardUp data={exchangeData} />
      <div
        className={`text-glow z-[1]
        mt-1 flex  mb-1
        h-[50px] w-[100%] 
        flex-col  items-center
        justify-between     md:w-[700px] 
        lg:w-[1000px]   lg:flex-row xl:w-[1300px] ${
          mode === "light" ? "text-blue-900" : "text-white"
        }`}
      >
        <div className="flex items-center">
          <span className="mr-2">
            Ticker Ranks: #{firstPostIndex + 1} - #{lastPostIndex + ""}
          </span>
          <span> Tickers available: {exchangeData?.tickers.length}</span>
        </div>
        <div className="flex items-center">
          <Pagination
            totalPosts={exchangeData && exchangeData?.tickers.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
      <div
        className={`text-glow z-[1]
        flex mt-6
        h-full w-[100%]
        flex-col items-center
        justify-between  md:w-[700px] 
        lg:w-[1000px]   lg:flex-col xl:w-[1300px]  ${
          mode === "light" ? "text-blue-900" : "text-white"
        }`}
      >
        <ExchangeViewTable
          firstPostIndex={firstPostIndex}
          lastPostIndex={lastPostIndex}
          data={exchangeData?.tickers}
        />
      </div>
      <div
        className={`text-glow z-[1]
        mt-3 flex
        h-[50px] w-[95%]
        flex-col items-center
        justify-between     md:w-[700px] 
        lg:w-[1000px]   lg:flex-row xl:w-[1300px] ${
          mode === "light" ? "text-blue-900" : "text-white"
        }`}
      >
        <div className="">
          <span> Tickers available: {exchangeData?.tickers.length}</span>
        </div>
        <div>
          <Pagination
            totalPosts={exchangeData?.tickers?.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ExchangeViewPage;
