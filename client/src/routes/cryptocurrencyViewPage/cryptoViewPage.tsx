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

interface ChartType {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

const ViewPage = () => {
  const mode = useSelector((state: RootState) => state.mode);
  const [response, setCoinData] = useState(null);
  const [hourlyData, setHourlyData] = useState<ChartType | null>(null);
  const [monthlyData, setmonthlyData] = useState<ChartType | null>(null);
  const [maxData, setMaxData] = useState<ChartType | null>(null);
  const { id } = useParams() as { id: string };

  // const { data: response } = useQuery(["coinData"], () => {
  //   return getCoinData(id).catch((error) => {
  //     console.log(error);
  //   });
  // });
  // const { data: hourlyData } = useQuery(["hourlyChartData"], () => {
  //   return getBiWeekly(id).catch((error) => {
  //     console.log(error);
  //   });
  // });
  // const { data: monthlyData } = useQuery(["monthlyChartData"], () => {
  //   return getMonthlyChart(id).catch((error) => {
  //     console.log(error);
  //   });
  // });
  // const { data: maxData } = useQuery(["maxChartData"], () => {
  //   return getMaxChart(id).catch((error) => {
  //     console.log(error);
  //   });
  // });

  useEffect(() => {
  getCoinData(id)
    .then((data) => {
      setCoinData(data);
    })
    .catch((error) => {
      console.log(error);
    });

    getBiWeekly(id)
      .then((data) => {
        setHourlyData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    getMonthlyChart(id)
      .then((data) => {
        setmonthlyData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    getMaxChart(id)
      .then((data) => {
        setMaxData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const { data: price } = useQuery(["coinListData"], () => {
    return axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&locale=en"
      )
      .then((res) => res.data);
  });

  const { data: trending } = useQuery(["coinTrending"], () => {
    return axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => res.data.coins);
  });

  const { data: usdprice } = useQuery(["btcPrice"], () => {
    return axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((res) => res.data.bitcoin.usd);
  });

  console.log("--sparklines here");
  console.log(response);

  console.log("data to debug here");
  console.log(hourlyData);
  console.log(monthlyData);
  console.log(maxData);

  if (!response) {
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
      <ViewCardUpper data={response} />
      {response && hourlyData && monthlyData && maxData ? (
        <ViewCardLower
          data={response}
          hourly={hourlyData}
          monthly={monthlyData}
          max={maxData}
        />
      ) : (
        <Loader />
      )}
      <CoinNews />
      <CoinCarousel
        coinList={price}
        trendinglist={trending}
        btcPrice={usdprice}
      />
    </div>
  );
};
export default ViewPage;
