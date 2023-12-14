import { lazy, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import Loader from "../../components/Loader";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import FearGreedIndex from "./FearGreedIndex";
import HomeHeadCard from "./HomeHeadCard";
import HomeTrendingCard from "./HomeTrendingCard";

const HomeMarketListProto = lazy(() => import("./HomeMarketListProto"));

const CryptocurrencyPage = () => {

   // for pagination
   const { page } : {page: string} | any= useParams();
   const currentPage = parseInt(page, 10) || 1;
  
  const mode = useSelector((state: RootState) => state.mode);

  const { data: coinList } = useQuery(["coinListData"], () => {
    return axios
      .get("http://localhost:3001/services/coins")
      .then((res) => res.data);
  });

  const { data: coinTrending } = useQuery(["coinTrending"], () => {
    return axios
      .get("http://localhost:3001/services/trending")
      .then((res) => res.data);
  });

  const { data: btcPrice } = useQuery(["btcPrice"], () => {
    return axios
      .get("http://localhost:3001/services/btcPrice")
      .then((res) => res.data);
  });

  const { data: globalData } = useQuery(["globalData"], () => {
    return axios
      .get("http://localhost:3001/services/globaldata")
      .then((res) => res.data);
  });

  let cardLinks: {
    icon: string | null;
    label: string;
    details: string;
    id: number;
  }[] = [
    {
      icon: null,
      label: "Global Cryptocurrencies ",
      details: `${globalData?.data?.active_cryptocurrencies}`,
      id: 0,
    },
    {
      icon: null,
      label: "Exchanges:",
      details: `${globalData?.data?.markets}`,
      id: 1,
    },
    {
      icon: null,
      label: "Crypto Global MarketCap ",
      details: `$${globalData?.data?.total_market_cap.usd.toLocaleString()}`,
      id: 2,
    },
    {
      icon: null,
      label: "24 hour Trading Volume",
      details: `$${globalData?.data?.total_volume.usd.toLocaleString()}`,
      id: 3,
    },
  ];

  console.log(coinList);

  return (
    <main
      className={`flex  h-[100%] w-[100%] flex-col items-center ${
        mode === "light" ? "bg-slate-300/95" : "bg-[#051925]"
      } `}
    >
      <HomeHeadCard cardLinks={cardLinks} />

      <div
        className="flex h-[420px] w-[90%] flex-row items-center sm:h-[410px]
            sm:w-[95%] sm:flex-row
            md:h-[410px] md:w-[700px] 
            md:flex-row lg:h-[360px]
            lg:w-[1000px] lg:flex-row
            xl:h-[360px] xl:w-[1000px]
            xl:flex-row"
      >
        <HomeTrendingCard trendingData={coinTrending} btcPrice={btcPrice} />
        <FearGreedIndex />
      </div>

      <Suspense
        fallback={
          <div className="h-[1000px]">
            <Loader />
          </div>
        }
      >
        <HomeMarketListProto coinData={coinList} />
      </Suspense>
    </main>
  );
};

export default CryptocurrencyPage;
