import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  IoBarcodeOutline,
  IoGlobeOutline,
  IoInformationCircleOutline,
  IoLayersOutline,
  IoLogoGithub,
  IoLogoReddit,
  IoPeopleOutline,
  IoPersonOutline,
  IoStarHalfOutline,
} from "react-icons/io5";

import { RootState } from "../../../state";

const formatNum = (x: number): string => {
  let isNegative = x < 0 ? "-" : "";
  return isNegative + "$ " + Math.abs(x).toFixed(2);
};

const formatNumLessOne = (x: number): string => {
  let isNegative = x < 1 ? "-" : "";
  return isNegative + "$ " + Math.abs(x).toFixed(7);
};

interface ViewCardUpper {
  link: string;
  image: { small: string };
  tickers: { base: string }[];
  market_cap_rank: number;
  watchlist_portfolio_users: number;
  links: {
    homepage: string[];
    official_forum_url: string[];
    subreddit_url: string;
    repos_url: { github: string };
  };
  market_data: {
    current_price: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_24h: number;
    market_cap: { usd: number };
    fully_diluted_valuation: { usd: number };
    circulating_supply: number;
    total_supply: number;
  };
  hashing_algorithm: string;
  community_score: number;
  categories: string[];
}

const ViewCardUpper = ({ data }: { data: ViewCardUpper }) => {
  const mode = useSelector((state: RootState) => state.mode);
  const { id } = useParams() as { id: string };
  const response = data;

  return (
    <div
      className={`
      rounded-lg mt-12 flex justify-center 
      h-[860px] w-[100%]
      md:w-[100%] md:h-[400px]
      lg:w-[100%] lg:h-[350px]`}
    >
      <div
        className={`
        viewCardHeader absolutez-[1] flex flex-col justify-between rounded-tl-3xl
        rounded-tr-3xl border-[2px] p-[5%]   
        w-[95%] h-[850px]
        md:w-[700px] md:h-[750px]
        md:p-[3%]  lg:h-[400px] lg:w-[1000px] lg:flex-row 
        lg:p-[3%] xl:h-[350px] xl:w-[1300px] xl:p-[2%]`}
      ></div>

      <div
        className={`
        viewcard-filter absolute z-[2] rounded-tl-3xl rounded-tr-3xl border-[2px] opacity-0 flex flex-col justify-between p-[5%] 
        md:p-[3%] lg:flex-row lg:p-[3%] xl:p-[2%]
        h-[850px] w-[95%]
        md:h-[650px] md:w-[700px]
        lg:h-[400px] lg:w-[1000px]  
        xl:h-[350px] xl:w-[1300px]
        ${
          mode === "light"
            ? "border-[#054569] bg-[#062130]"
            : " border-[#054569] bg-[#062130]"
        }`}
      ></div>

      <div
        className={`
        absolute z-[3] shadow-xl rounded-tl-3xl rounded-tr-3xl flex flex-col  justify-between  border-[#054569] p-[5%] 
        md:p-[3%]  lg:flex-row lg:p-[3%] xl:p-[2%] 
        h-[850px] w-[95%]
        md:h-[750px] md:w-[700px]
        lg:h-[400px] lg:w-[1000px]
        xl:h-[350px] xl:w-[1300px] 
        ${
          mode === "light"
            ? "viewcard-filter-light border-blue-300 text-[#193155] text-glow "
            : "  viewcard-filter border-[#054569] text-white"
        }`}
      >
        <div className="flex flex-col justify-center md:w-[100%] lg:w-[430px]">
          <div className="flex flex-row items-center">
            <img
              src={response?.image.small}
              alt={id}
              className="mr-3 h-[40px] w-[40px]"
            />
            <h1 className="text-2xl font-bold">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </h1>
            <div
              className={`rounded-lg p-2 ${
                mode === "light"
                  ? "newscard-filter-light shadow-md shadow-blue-900"
                  : "bg-[#062c43]"
              }  ml-2`}
            >
              <h2 className="text-lg font-bold">
                {!response?.tickers[0].base ? "N/A" : response?.tickers[0].base}
              </h2>
            </div>
          </div>
          <div className="mt-1 flex flex-row items-center">
            <h1 className="text-glow text-4xl font-bold">
              ${response?.market_data.current_price.usd.toFixed(2)}
            </h1>
            <div
              className={`rounded-lg p-2 ${
                mode === "light"
                  ? "newscard-filter-light shadow-md shadow-blue-900"
                  : "bg-[#062c43]"
              } ml-2 mt-1`}
            >
              <h2 className="text-sm font-bold">
                Rank #{response?.market_cap_rank}
              </h2>
            </div>
            <div
              className={`rounded-lg p-2 ${
                mode === "light"
                  ? "newscard-filter-light shadow-md shadow-blue-900"
                  : "bg-[#062c43]"
              } ml-2 mt-1 flex items-center `}
            >
              <IoPersonOutline />
              <h2 className="text-[12px] font-bold">
                {" "}
                {response?.watchlist_portfolio_users.toLocaleString()}
              </h2>
            </div>
          </div>
          <div className="mt-2 flex flex-col font-semibold">
            <h1 className="text-md flex flex-row items-center font-semibold">
              <IoInformationCircleOutline /> Links:
            </h1>
            <div className="mt-1 flex flex-row">
              {[
                {
                  link: response?.links.homepage[0],
                  icon: <IoGlobeOutline />,
                  label: "Website",
                },
                {
                  link: response?.links.official_forum_url[0],
                  icon: <IoPeopleOutline />,
                  label: "Forum",
                },
                {
                  link: response?.links.subreddit_url,
                  icon: <IoLogoReddit />,
                  label: "Subreddit",
                },
                {
                  link: response?.links.repos_url.github[0],
                  icon: <IoLogoGithub />,
                  label: "Github",
                },
              ].map((data) => (
                <a
                  href={data.link}
                  key={data.label}
                  className={`rounded-lg px-2 py-1 cursor-pointer ${
                    mode === "light"
                      ? "newscard-filter-light shadow-md shadow-blue-900"
                      : "bg-[#062c43]"
                  } mx-1 text-sm  duration-200 ease-in-out hover:scale-[1.05]`}
                >
                  {data.icon}
                  {data.label}
                </a>
              ))}
            </div>
            <div
              className={`
                h-[70px] w-[98%]
                md:h-[90px] md:w-[98%]
                lg:h-[90px] lg:w-[98%]
                xl:h-[90px] xl:w-[98%]
                ${
                  mode === "light"
                    ? "bg-slate-300/50 newscard-filter-light shadow-md shadow-blue-900"
                    : "meter-bgMain bg-[#062c43]"
                } mt-3 flex flex-row justify-around rounded-xl p-1 `}
            >
              {[
                {
                  content: "$" + response?.market_data.high_24h.usd.toFixed(2),
                  label: "24hr-High",
                },
                {
                  content: "$" + response?.market_data.low_24h.usd.toFixed(2),
                  label: "24hr-Low",
                },
              ].map((data) => (
                <div className="flex flex-col items-center justify-center">
                  <h1 className="font-bold">{data.label}</h1>
                  <h1
                    className={`${
                      mode === "light"
                        ? "text-[#28a733] bg-slate-300/80 border-blue-200/60 border-[2px]"
                        : "text-[#2ae937] bg-slate-900/80 border-cyan-200 "
                    } font-bold md:text-lg lg:text-[16px] xl:text-lg p-1 rounded-lg `}
                  >
                    {data.content}
                  </h1>
                </div>
              ))}

              <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold">Change-24hr</h1>
                <h1
                  className={`font-bold md:text-lg lg:text-[16px] xl:text-lg p-1 rounded-lg ${
                    response?.market_data.price_change_24h > 0
                      ? `${
                          mode === "light"
                            ? "text-[#28a733] bg-slate-300/80 border-blue-200/60 border-[2px]"
                            : "text-[#2ae937] bg-slate-900/80 border-cyan-200"
                        }`
                      : `${
                          mode === "light"
                            ? "text-[#d82e2e] bg-slate-300/80 border-blue-200/60 border-[2px]"
                            : "text-[#ff6666] bg-slate-900/80 border-cyan-200"
                        }`
                  }`}
                >
                  {response?.market_data.price_change_24h > 1
                    ? formatNum(response?.market_data.price_change_24h)
                    : formatNumLessOne(response?.market_data.price_change_24h)}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`
        mx-0 my-3 flex flex-wrap items-center justify-center rounded-3xl 
        p-[5%] shadow-md
        w-[99%] h-[400px]
        md:h-[95%] md:w-[99%]  md:p-[2%]  lg:mx-6 lg:my-0  
        lg:h-[100%] lg:w-[500px] lg:p-[1%] xl:mx-3 xl:my-0 xl:h-[100%] xl:w-[500px]  xl:flex-row xl:p-[2%]
        ${
          mode === "light"
            ? "newscard-filter-light shadow-blue-900 text-slate-900 font-semibold"
            : "bg-[#03111a] shadow-cyan-700 text-white font-semibold"
        }`}
        >
          {[
            {
              content:
                "$" + response?.market_data.market_cap.usd == null
                  ? "n/a"
                  : response?.market_data.market_cap.usd.toLocaleString(),
              label: "Market Cap",
            },
            {
              content:
                "$" + response?.market_data.fully_diluted_valuation.usd == null
                  ? "n/a"
                  : response?.market_data.fully_diluted_valuation.usd.toLocaleString(),
              label: "Fully Dilluted Valuation",
            },
            {
              content:
                "$" + response?.market_data.circulating_supply == null
                  ? "n/a"
                  : response?.market_data.circulating_supply.toLocaleString(),
              label: "Circulating Supply",
            },
            {
              content:
                response?.market_data.total_supply == null
                  ? "n/a"
                  : response?.market_data.total_supply.toLocaleString(),
              label: "Total Supply",
            },
          ].map((data) => (
            <div
              className={`
              m-1 flex 
              h-[60px] w-[167.5px]
              flex-col items-center
              justify-center rounded-md
              md:h-[70px] md:w-[190px] lg:h-[70px] lg:w-[135px] xl:h-[60px] xl:w-[192.5px]
              ${
                mode === "light"
                  ? "bg-slate-300/50 border-[1px] border-blue-300"
                  : "bg-[#062c43] "
              }`}
            >
              <h1 className="md:text-md text-glow text-[15px] lg:text-[15px] text-center">
                {data.label}
              </h1>
              <span className="md:text-md text-[15px] lg:text-[15px]">
                {data.content}
              </span>
            </div>
          ))}
        </div>
        <div
          className={`flex w-full flex-row flex-wrap items-center justify-center rounded-3xl  py-2 shadow-md  
          ${
            mode === "light"
              ? "newscard-filter-light border-blue-300 shadow-blue-900 text-slate-900 font-semibold text-glow"
              : " bg-[#03111a] border-[white] shadow-cyan-700 text-white font-semibold"
          } md:w-[100%] lg:w-[350px]`}
        >
          {[
            {
              label: "Hashing Algorithm:",
              icon: <IoBarcodeOutline />,
              color: "text-green-400",
              content:
                response?.hashing_algorithm == null ||
                response?.hashing_algorithm == ""
                  ? "n/a"
                  : response?.hashing_algorithm,
            },
            {
              label: "Community Score:",
              icon: <IoStarHalfOutline />,
              color: "text-violet-400",
              content: response?.community_score,
            },
            {
              label: "Layer type:",
              icon: <IoLayersOutline />,
              color: "text-teal-400",
              content: response?.categories[1],
            },
          ].map((data) => (
            <div
              className={`
                m-2 flex 
                h-[110px] w-[27%] 
                flex-col items-center 
                justify-center rounded-xl
                text-center md:h-[110px] md:w-[27.5%] 
                md:flex-col md:justify-center lg:h-[70px] lg:w-[200px] lg:flex-row lg:justify-around xl:h-[110px] xl:w-[130px] xl:flex-col xl:justify-center
                ${
                  mode === "light"
                    ? "bg-slate-300/90 border-[1px] border-blue-300"
                    : "bg-[#062c43]"
                }`}
            >
              <span
                className={`text-4xl ${data.color} md:text-5xl lg:text-5xl`}
              >
                {data.icon}
              </span>
              <div>
                <h2 className="text-[12px] xl:text-[13px]">{data.label}</h2>
                <h2 className="text-[13px] xl:text-[13px]">{data.content}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCardUpper;
