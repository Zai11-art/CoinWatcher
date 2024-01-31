import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  getBiWeekly,
  getMonthlyChart,
  getMaxChart,
} from "../../state/utils/utils";
import { RootState } from "../../state";
import Loader from "../../components/loader";
import CoinNews from "./components/coin-news";
import { getCoinData } from "../../state/utils/utils";
import CoinCarousel from "./components/coin-carousel";
import ViewLowerCard from "./components/view-lowercard";
import ViewCardUpper from "./components/view-uppercard";
import { getBtcPrice, getCoins, getTrendingCoins } from "../../api/get-data";

const CryptoView = () => {
  const mode = useSelector((state: RootState) => state.mode);
  const { id } = useParams() as { id: string };

  const { data: coinData } = useQuery({
    queryKey: ["coinData", id],
    queryFn: () => getCoinData(id),
    // refetchOnMount: true,
  });

  const { data: biweeklyChartData } = useQuery({
    queryKey: ["biWeeklyChartData"],
    queryFn: () => getBiWeekly(id),
    // refetchOnMount: true,
  });

  const { data: monthlyChartData } = useQuery({
    queryKey: ["monthlyChartData"],
    queryFn: () => getMonthlyChart(id),
    // refetchOnMount: true,
  });

  const { data: maxChartData } = useQuery({
    queryKey: ["maxChartData"],
    queryFn: () => getMaxChart(id),
    // refetchOnMount: true,
  });

  // OTHER DATA FOR PAGE
  const { data: coinListData } = useQuery({
    queryKey: ["coinListData"],
    queryFn: () => getCoins(),
    // refetchOnMount: true,
  });

  const { data: coinTrending } = useQuery({
    queryKey: ["coinTrending"],
    queryFn: () => getTrendingCoins(),
    // refetchOnMount: true,
  });

  const { data: btcPrice } = useQuery({
    queryKey: ["btcPrice"],
    queryFn: () => getBtcPrice(),
    // refetchOnMount: true,
  });

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
        <ViewLowerCard
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
