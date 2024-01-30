import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCoinData } from "../../state/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import CoinNews from "./CoinNews";
import CoinCarousel from "./CoinCarousel";
import Loader from "../../components/Loader";
import ViewCardUpper from "./viewcardUpper";
import ViewCardLower from "./ViewCardLower";
import axios from "axios";
import {
  getBiWeekly,
  getMonthlyChart,
  getMaxChart,
} from "../../state/utils/utils";
import { RootState } from "../../state";
import { getBtcPrice, getCoins, getTrendingCoins } from "../../api/get-data";

const CryptoView = () => {
  const mode = useSelector((state: RootState) => state.mode);
  const { id } = useParams() as { id: string };

  // MAIN DATA FOR PAGE
  const { data: coinData, refetch } = useQuery({
    queryKey: ["coinData"],
    queryFn: () => getCoinData(id),
  });

  const { data: biweeklyChartData } = useQuery({
    queryKey: ["biWeeklyChartData"],
    queryFn: () => getBiWeekly(id),
  });

  const { data: monthlyChartData } = useQuery({
    queryKey: ["monthlyChartData"],
    queryFn: () => getMonthlyChart(id),
  });

  const { data: maxChartData } = useQuery({
    queryKey: ["maxChartData"],
    queryFn: () => getMaxChart(id),
  });

  // OTHER DATA FOR PAGE
  const { data: coinListData } = useQuery({
    queryKey: ["coinListData"],
    queryFn: () => getCoins(),
  });

  const { data: coinTrending } = useQuery({
    queryKey: ["coinTrending"],
    queryFn: () => getTrendingCoins(),
  });

  const { data: btcPrice } = useQuery({
    queryKey: ["btcPrice"],
    queryFn: () => getBtcPrice(),
  });

  refetch();

  if (!coinData) {
    return (
      <div
        className={`flex h-[100vh] w-full flex-col ${
          mode === "light" ? "bg-slate-200" : "bg-[#03111a]"
        }  pb-[200px]`}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={`flex h-[6400px] w-[100%] items-center flex-col ${
        mode === "light" ? "bg-slate-300" : "bg-[#030d13]"
      }  pb-[200px] md:h-[6000px] lg:h-[100%] xl:h-[100%] `}
    >
      <ViewCardUpper data={coinData} />
      {coinData && biweeklyChartData && monthlyChartData && maxChartData ? (
        <ViewCardLower
          data={coinData}
          hourly={biweeklyChartData}
          monthly={monthlyChartData}
          max={maxChartData}
        />
      ) : (
        <Loader />
      )}
      <CoinNews />
      <CoinCarousel
        coinList={coinListData}
        trendinglist={coinTrending}
        btcPrice={btcPrice}
      />
    </div>
  );
};
export default CryptoView;
