import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state";

interface TrendingLink {
  item: {
    id: string;
    score: number;
    large: string;
    symbol: string;
    price_btc: number;
  };
}

interface HomeTrendingCard {
  trendingData: TrendingLink[];
  btcPrice: { bitcoin: { usd: number } };
}

const HomeTrendingCard: React.FC<HomeTrendingCard> = ({
  trendingData,
  btcPrice,
}) => {
  const mode = useSelector((state: RootState) => state.mode);

  return (
    <div
      className={`
            h- z-[1]
            mr-1 mt-5
             h-[400px]
            w-[300px] rounded-lg 
            pb-5 pt-3 
            sm:h-[400px] sm:w-[700px] 
            md:h-[400px] md:w-[700px] 
            lg:h-[350px] lg:w-[1000px]
            ${
              mode === "light"
                ? "cryptocard-grad-light text-[#142435]"
                : "cryptocard-grad text-white"
            }`}
    >
      <h1 className=" mx-2 text-center text-[16px] font-semibold md:text-xl lg:text-2xl">
        Trending in the last 24 Hrs.
      </h1>
      <div className="flex h-full flex-col flex-wrap items-center">
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
                className={`
                        z-[1]
                        mt-4 flex
                        h-[30px]
                        w-[170px]
                        flex-row  items-center
                        rounded-lg border-[1px]
                        sm:h-[30px] sm:w-[200px] 
                        md:h-[30px] md:w-[270px] 
                        lg:h-[50px] lg:w-[210px] 
                        ${
                          mode === "light"
                            ? "border-blue-200/50 bg-slate-200/50 text-[#142435]"
                            : "border-[#9ccddc] bg-[#054569] text-[white]"
                        }
                        `}
              >
                <div className="ml-0 w-[50px] text-center text-[12px] md:ml-3 md:w-[75px] md:text-[15px]">
                  #{trend?.item?.score + 1}
                </div>
                <div className="flex w-[100px] flex-row items-center text-center text-[12px] md:w-[200px] md:text-[14px] ">
                  <Link
                    rel="noopener noreferrer"
                    className="flex flex-row items-center"
                    to={`/view/${trend?.item?.id}`}
                  >
                    <img
                      loading="lazy"
                      src={trend?.item?.large}
                      alt={trend?.item?.symbol}
                      className="ml-1 mr-2 h-[22.5px] w-[22.5px] md:ml-2 md:h-[20px] md:w-[20px] lg:ml-2 lg:h-[30px] lg:w-[30px]"
                    />
                    <span className="overflow-hidden">
                      ${trend?.item?.symbol}
                    </span>
                  </Link>
                </div>
                <div className="mx-2 w-[75px] text-center text-[11px] md:w-[175px] md:text-[15px] lg:mx-1">
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

export default HomeTrendingCard;
