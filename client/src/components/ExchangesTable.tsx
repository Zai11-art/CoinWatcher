import React from "react";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RatingBar from "./RatingBar";
import { useId } from "react";
import { RootState } from "../state";

interface DataType {
  trust_score_rank: number;
  image: string;
  id: string;
  name: string;
  country: string;
  trade_volume_24h_btc_normalized: number;
  trade_volume_24h_btc: number;
  trust_score: number;
}

interface ExchangesTableType {
  data: DataType[];
  firstPostIndex: number;
  lastPostIndex: number;
}

const ExchangesTable: React.FC<ExchangesTableType> = ({
  data,
  firstPostIndex,
  lastPostIndex,
}) => {
  const mode = useSelector((state: RootState) => state.mode);
  const keyId = useId();

  console.log(data?.length);

  return (
    <>
      <div
        className={`flex flex-row ${
          mode === "light" ? "shadow-slate-900/30" : "shadow-blue-200/20"
        } shadow-2xl `}
      >
        <div
          className="flex h-full w-[40%]
        flex-col md:w-[200px] lg:w-[220px]"
        >
          <div>
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border-b border-gray-200 shadow ">
                <table className="min-w-full divide-y divide-blue-400 shadow-xl">
                  <thead
                    className={`text-glow  ${
                      mode === "light"
                        ? "bg-slate-200/70 text-slate-900"
                        : " bg-[#082030] text-gray-300"
                    }`}
                  >
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Exchange
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y divide-gray-600 ${
                      mode === "light"
                        ? "bg-slate-200/70 text-slate-900"
                        : " bg-[#082030] text-gray-300"
                    }  `}
                  >
                    {/* Add rows and data */}
                    {data?.length ? (
                      data?.slice(firstPostIndex, lastPostIndex).map((data) => (
                        <tr key={data.name}>
                          <td className="whitespace-nowrap  py-3 pl-3 pr-0 text-sm">
                            {/* watchlist button */}
                            <span className="text-[0.8rem]">
                              {data.trust_score_rank}
                            </span>
                          </td>
                          <td className="flex whitespace-nowrap px-3 py-[16px] text-sm">
                            <a className="flex" href={`/exchanges/${data.id}`}>
                              <img
                                src={data.image}
                                className="mr-1 h-[20px] w-[20px]"
                              />
                              {data.name}
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>
                          <Loader></Loader>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex h-full w-[60%]
        flex-col md:w-[500px] lg:w-[780px]"
        >
          <div className="no-scrollbar overflow-x-auto ">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border-b border-gray-200 shadow">
                <table className="min-w-full divide-y divide-blue-300">
                  <thead
                    className={`text-glow  ${
                      mode === "light"
                        ? "bg-slate-200 text-slate-900"
                        : " bg-[#061720] text-gray-300"
                    } `}
                  >
                    <tr className="">
                      {["Country", " Nominal", "24h vol", "trust score"].map(
                        (label, index) => (
                          <th
                            key={`${keyId}-${index}`}
                            scope="col"
                            className="w-64 px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                          >
                            {label}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y divide-gray-600 ${
                      mode === "light"
                        ? "bg-slate-200 text-slate-900"
                        : " bg-[#061720] text-gray-300"
                    } text-gray-300`}
                  >
                    {data?.length ? (
                      data
                        ?.slice(firstPostIndex, lastPostIndex)
                        .map((data, index) => (
                          <tr
                            key={`${keyId}-${index}-${data.name}`}
                            className={` ${
                              mode === "light"
                                ? "hover:bg-[#c1d3ee]"
                                : "hover:bg-[#0c1824]"
                            } `}
                          >
                            <td className="w-64 whitespace-nowrap px-5 py-4 text-sm ">
                              {data.country != null
                                ? data?.country?.length > 31
                                  ? data?.country?.slice(0, 25) + "..."
                                  : data?.country
                                : "---"}
                            </td>
                            <td
                              className={`w-64 whitespace-nowrap px-5 py-4 text-sm`}
                            >
                              $
                              {data.trade_volume_24h_btc_normalized?.toLocaleString()}
                            </td>
                            <td
                              className={`w-64 whitespace-nowrap px-5 py-4 text-sm`}
                            >
                              ${data.trade_volume_24h_btc?.toLocaleString()}
                            </td>

                            <td className="w-64 whitespace-nowrap px-5 py-4 text-sm ">
                              <div className="w-[130px] text-center text-[11px] md:w-[100px] md:text-[15px]  ">
                                <RatingBar rating={data.trust_score} />
                              </div>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td>
                          <Loader></Loader>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExchangesTable;
