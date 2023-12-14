import React from "react";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { useSelector } from "react-redux";
import CoinTable from "../../components/CoinTable";
import { RootState } from "../../state";


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

const HomeMarketListProto : React.FC<HomeHeadCard> = ({coinData}) => {

  const mode = useSelector((state : RootState) => state.mode);
  const data  = coinData;

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(50);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  return (
    <>
      <div
        className="
            flex
            h-[100%] w-[100%] 
            items-center justify-center
            sm:h-[100%] sm:w-[100%]
            md:h-[100%] md:w-[700px]
            lg:h-[100%] lg:w-[1000px]
            xl:h-[100%] xl:w-[1000px] 
             "
      >
        <div className="my-2 flex w-[100%] flex-col items-center justify-between md:flex-row lg:flex-row">
          <div className="flex">
            <span
              className={`mr-4 mt-2 text-[15px] ${
                mode === "light" ? "text-blue-900" : "text-[#c0f0ff]"
              } md:text-[15px] lg:text-[17px]`}
            >
              Crypto Ranks: #{firstPostIndex + 1} - #{lastPostIndex} Coins
              available: {data?.length}
            </span>
          </div>
          <div>
            <Pagination
              totalPosts={data?.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>

      <div className={`text-glow z-[1]
        mt-3 flex
        h-full w-[100%]
        flex-col
        justify-center  md:w-[700px] 
        lg:w-[1000px]   lg:flex-col xl:w-[1000px]  ${
          mode === "light" ? "text-blue-900" : "text-white"
        }`}>
        <CoinTable
          data={data}
          firstPostIndex={firstPostIndex}
          lastPostIndex={lastPostIndex}
        />
      </div>

      <div
        className="
                mb-[75px] mt-3
                flex h-[100%] w-[100%]  items-center
                justify-center md:h-[100%] md:w-[700px] lg:h-[100%] lg:w-[1000px]"
      >
        <div className="my-2 flex w-full flex-col items-center justify-between md:flex-row lg:flex-row">
          <div>
            <h1
              className={`mt-2 text-[15px] ${
                mode === "light" ? "text-blue-900" : "text-[#9ccddc]"
              }  md:text-[15px] lg:text-[17px]`}
            >
              Showing {Math.ceil(data?.length / (data?.length / postsPerPage))}{" "}
              results out of {data?.length}
            </h1>
          </div>
          <div>
            <Pagination
              totalPosts={data?.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeMarketListProto;
