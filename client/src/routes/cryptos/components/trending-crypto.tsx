import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../../../components/Loader";
import { RootState } from "../../../state/index";

interface TrendingLink {
  item: {
    id: string;
    score: number;
    large: string;
    symbol: string;
    price_btc: number;
  };
}

interface TrendingCrypto {
  trendingData: TrendingLink[];
  btcPrice: { bitcoin: { usd: number } };
}

const TrendingCrypto: React.FC<TrendingCrypto> = ({
  trendingData,
  btcPrice,
}) => {
  const mode = useSelector((state: RootState) => state.mode);

  return (
    <div
      className={`flex rounded-md p-5 items-center flex-col w-full h-full ${
        mode === "light"
          ? "cryptocard-grad-light text-[#142435]"
          : "cryptocard-grad text-white"
      } gap-5`}
    >
      <h1 className="text-md text-center uppercase font-bold text-glow">
        Trending in the last 24 Hrs
      </h1>
      <div className="flex w-full h-full flex-col items-center gap-2">
        {trendingData?.length ? (
          trendingData.slice(0, 7).map(
            (trend: {
              item: {
                id: string;
                score: number;
                large: string;
                symbol: string;
                price_btc: number;
              };
            }) => (
              <div
                key={trend?.item?.id}
                className={`md:w-[300px] w-full flex rounded-md border-[1px]  ${
                  mode === "light"
                    ? "border-blue-200/50 bg-slate-200/50 text-[#142435] hover:border-blue-200"
                    : "border-cyan-500/50 bg-[#092231] text-[white] hover:border-cyan-500"
                } justify-between p-2 md:text-md text-sm`}
              >
                <div className="">{trend?.item?.score + 1}</div>

                <Link
                  rel="noopener noreferrer"
                  className="flex flex-row items-center justify-center gap-2  w-32"
                  to={`/view/${trend?.item?.id}`}
                >
                  <img
                    loading="lazy"
                    src={trend?.item?.large}
                    alt={trend?.item?.symbol}
                    className="w-5 h-5 "
                  />
                  <span className="overflow-hidden ">
                    ${trend?.item?.symbol}
                  </span>
                </Link>

                <div className="">
                  $
                  {(
                    (trend?.item?.price_btc * btcPrice?.bitcoin?.usd) /
                    1
                  ).toFixed(2)}
                </div>
              </div>
            )
          )
        ) : (
          <div className="mb-32">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingCrypto;
