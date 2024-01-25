import axios from "axios";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { RootState } from "../../state";
import Loader from "../../components/Loader";
import HeadCard from "./components/header-card";
import TrendingCrypto from "./components/trending-crypto";
import FearGreadMeter from "./components/fear-greed-meter";

const CryptoList = lazy(() => import("./components/crypto-list"));

const Crypto = () => {
  const mode = useSelector((state: RootState) => state.mode);

  const { data: coinList } = useQuery(["coinListData"], async () => {
    const res = await axios.get("http://localhost:3001/services/coins");
    return res.data;
  });

  const { data: coinTrending } = useQuery(["coinTrending"], async () => {
    const res = await axios.get("http://localhost:3001/services/trending");
    return res.data;
  });

  const { data: btcPrice } = useQuery(["btcPrice"], async () => {
    const res = await axios.get("http://localhost:3001/services/btcPrice");
    return res.data;
  });

  const { data: globalData } = useQuery(["globalData"], async () => {
    const res = await axios.get("http://localhost:3001/services/globaldata");
    return res.data;
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

  return (
    <Suspense
      fallback={
        <div className="h-[1000px]">
          <Loader />
        </div>
      }
    >
      <main
        className={`flex h-full w-full flex-col items-center justify-center ${
          mode === "light" ? "bg-slate-300/95" : "bg-[#051925]"
        } py-16 gap-5 md:px-5 px-2`}
      >
        {!globalData ? (
          <div className="h-screen w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <HeadCard cardLinks={cardLinks} />

            <div className="flex lg:w-[1000px] w-full h-full sm:flex-row  flex-col gap-5">
              <TrendingCrypto trendingData={coinTrending} btcPrice={btcPrice} />
              <FearGreadMeter />
            </div>

            <Suspense
              fallback={
                <div className="h-[1000px]">
                  <Loader />
                </div>
              }
            >
              {!coinList ? <Loader /> : <CryptoList coinData={coinList} />}
            </Suspense>
          </>
        )}
      </main>
    </Suspense>
  );
};

export default Crypto;
