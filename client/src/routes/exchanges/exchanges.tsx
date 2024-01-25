import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import Pagination from "../../components/Pagination";
import ExchangesTable from "../../components/ExchangesTable";
import HeadCard from "../cryptos/components/header-card";

const Exchanges = () => {
  console.log(`exchange Page here`);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(50);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const mode = useSelector((state: RootState) => state.mode);

  const { data: exchangeList } = useQuery(["exchangeList"], () => {
    return axios
      .get("http://localhost:3001/services/exchanges")
      .then((res) => res?.data);
  });

  const cardLinks = [
    {
      icon: null,
      label: "No. of available exchanges: ",
      details: `${exchangeList?.length}`,
      id: 0,
    },
    {
      icon: `${exchangeList?.length > 0 ? exchangeList[0].image : null}`,
      label: "Highest Rated Exchange: ",
      details: `${exchangeList?.length > 0 ? exchangeList[0].name : null}`,
      id: 1,
    },
  ];
  console.log(exchangeList);

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center ${
        mode === "light" ? "bg-slate-300/95" : "bg-[#051925]"
      } py-16 gap-5 md:px-5 px-2 `}
    >
      <HeadCard cardLinks={cardLinks} />

      {/* PAGINATION */}
      <div className="flex justify-center  w-full h-full">
        <div className="flex md:flex-row flex-col w-full lg:w-[1000px] items-center justify-between">
          <div className="flex">
            <span
              className={` mt-2 md:text-md text-sm  ${
                mode === "light" ? "text-blue-900" : "text-[#c0f0ff]"
              } `}
            >
              Crypto Ranks: #{firstPostIndex + 1} - #{lastPostIndex} Coins
              available: {exchangeList?.slice(0, 250)?.length}
            </span>
          </div>
          <div>
            <Pagination
              totalPosts={exchangeList?.slice(0, 250)?.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>

      <div
        className={`lg:w-[1000px] w-full flex items-center justify-center  h-full ${
          mode === "light" ? "text-blue-900" : "text-white"
        }`}
      >
        <ExchangesTable
          data={exchangeList}
          firstPostIndex={firstPostIndex}
          lastPostIndex={lastPostIndex}
        />
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center  w-full h-full">
        <div className="flex md:flex-row flex-col w-full lg:w-[1000px] items-center justify-between">
          <div className="flex">
            <span
              className={` mt-2 md:text-md text-sm  ${
                mode === "light" ? "text-blue-900" : "text-[#c0f0ff]"
              } `}
            >
              Crypto Ranks: #{firstPostIndex + 1} - #{lastPostIndex} Coins
              available: {exchangeList?.slice(0, 250)?.length}
            </span>
          </div>
          <div>
            <Pagination
              totalPosts={exchangeList?.slice(0, 250)?.length}
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

export default Exchanges;
