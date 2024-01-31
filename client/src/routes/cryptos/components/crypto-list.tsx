import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../state/index";
import CoinTable from "../../../components/crypto-table";
import Pagination from "../../../components/pagination";

interface CoinData {
  length: number;
  name: string;
  market_cap_rank: number;
  image: string;
  id: string;
  current_price: number;
  market_cap_change_percentage_24h: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
  sparkline_in_7d: { price: number[] };
}

interface HomeHeadCard {
  coinData: CoinData[];
}

const CryptoList: React.FC<HomeHeadCard> = ({ coinData }) => {
  const mode = useSelector((state: RootState) => state.mode);
  const data = coinData;

  console.log(data);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(50);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  return (
    <div className="lg:w-[1000px] w-full h-full items-center justify-center ">
      <div className="flex  w-full h-full">
        <div className="flex md:flex-row flex-col w-full lg:w-[1000px] items-center justify-between">
          <div className="flex">
            <span
              className={` mt-2 md:text-md text-sm  ${
                mode === "light" ? "text-blue-900" : "text-[#c0f0ff]"
              } `}
            >
              Crypto Ranks: #{firstPostIndex + 1} - #{lastPostIndex} Coins
              available: {data?.slice(0, 250)?.length}
            </span>
          </div>
          <div>
            <Pagination
              totalPosts={data?.slice(0, 250)?.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>

      <div
        className={`w-full flex items-center justify-center  h-full ${
          mode === "light" ? "text-blue-900" : "text-white"
        }`}
      >
        <CoinTable
          data={data}
          firstPostIndex={firstPostIndex}
          lastPostIndex={lastPostIndex}
        />
      </div>

      <div className="flex  w-full h-full">
        <div className="flex md:flex-row flex-col w-full lg:w-[1000px] items-center justify-between">
          <div className="flex">
            <span
              className={` mt-2 md:text-md text-sm  ${
                mode === "light" ? "text-blue-900" : "text-[#c0f0ff]"
              } `}
            >
              Crypto Ranks: #{firstPostIndex + 1} - #{lastPostIndex} Coins
              available: {data?.slice(0, 250)?.length}
            </span>
          </div>
          <div>
            <Pagination
              totalPosts={data?.slice(0, 250)?.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoList;
