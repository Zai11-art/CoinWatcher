import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./loader";
import { RootState } from "../state";
import { IoSearchOutline } from "react-icons/io5";

interface CryptocurrenciesType {
    id: string;
    image: string;
    link: string;
    name: string;
    market_cap_rank: number;
}

interface ExchangesType {
    id: string;
    image: string;
    link: string;
    name: string;
    trust_score_rank: number;
}

interface SectionsType {
    link: string;
    name: string;
}

const SearchBar = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState<CryptocurrenciesType[]>([]);
  const [exchanges, setExchanges] = useState<ExchangesType[]>([]);
  const [sections, setSections] = useState<SectionsType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);

  const mode = useSelector((state : RootState) => state.mode);

  const { data: exchangeList } = useQuery(["exchangeList"], () => {
    return axios
      .get("http://localhost:3001/services/exchanges")
      .then((res) => res?.data);
  });

  const { data: coinList } = useQuery(["coinListData"], () => {
    return axios
      .get("http://localhost:3001/services/coins")
      .then((res) => res.data);
  });

  const { data: coinTrending } = useQuery(["coinTrending"], () => {
    return axios
      .get("http://localhost:3001/services/trending")
      .then((res) => res.data);
  });

  const performSearch = () => {
    const data = [...exchangeList, ...coinList, ...coinTrending];

    const filteredCryptocurrencies = coinList.filter((item : { name: string}) =>
      item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredExchanges = exchangeList.filter((item : { name: string}) =>
      item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredTrending = coinTrending.filter((item : { name: string}) =>
      item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setCryptocurrencies(filteredCryptocurrencies);
    setExchanges(filteredExchanges);
    setSections(filteredTrending);
    setShowResults(true);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchInputFocus = () => {
    setShowResults(true);
  };

  const handleSearchInputBlur = () => {
    // Delay hiding the results to allow clicks on them
    setTimeout(() => {
      setShowResults(false);
    }, 500);
  };

  useEffect(() => {
    let searchTimeout : string | number | any | undefined;

    if (searchQuery === "") {
      setShowResults(false);
    } else {
      setIsLoading(true);
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch();
        setIsLoading(false);
      }, 500);
    }

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchQuery]);

  return (
    <div className="relative ">
      <div className="my-3 flex h-[100%] flex-row items-center md:mx-2">
     
        <input
          ref={searchInputRef}
          name="search"
          className={`p-1 w-full rounded-lg placeholder-gray-500 ${
            mode === "light" ? "" : "bg-[#0f1b33] text-white"
          }`}
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          onFocus={handleSearchInputFocus}
          onBlur={handleSearchInputBlur}
        />
      </div>

      {showResults && searchQuery !== "" && (
        <div className={`absolute  right-0 top-[calc(100%+10px)] z-50 max-h-[500px]  
          w-full rounded-lg shadow-xl lg:w-[380px] xl:w-[380px] overflow-y-scroll  px-4 py-2 
          ${
            mode === "light"
              ? "bg-slate-200 text-slate-900  search-results"
              : "bg-[#060e1a] text-slate-300  search-results-light"
          }`}
        >
          <h1>Search Results</h1>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {cryptocurrencies.length > 0 && (
                <div className="p-2">
                  <p className="text-md mb-2 font-bold">Cryptocurrencies:</p>
                  <div>
                    {cryptocurrencies.map((item, index) => (
                      <Link
                        to={`/view/${item.id}`}
                        key={index}
                        className="my-1 flex flex-col p-1"
                      >
                        <div
                          className={`flex justify-between ${
                            mode === "light"
                              ? "hover:bg-slate-300"
                              : "hover:bg-[#203350]"
                          }  cursor-pointer`}
                        >
                          <div className="flex">
                            <img className="h-5 w-5" src={item.image} alt="" />
                            <a className="ml-1 text-sm" href={item.link}>
                              {item.name}
                            </a>
                          </div>
                          <span className="text-xs">
                            # {item.market_cap_rank}
                          </span>
                        </div>
                        <div
                          className={`${
                            mode === "light"
                              ? "h-[2px] bg-blue-900"
                              : "h-[0.9px] bg-blue-300"
                          }  my-[0.2rem] w-full opacity-20`}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {exchanges.length > 0 && (
                <div className="p-2">
                  <p className="text-md mb-2 font-bold">Exchanges:</p>
                  <ul>
                    {exchanges.map((item, index) => (
                      <Link
                        to={`/exchanges/${item.id}`}
                        key={index}
                        className="my-1 flex flex-col p-1"
                      >
                        <div
                          className={`flex justify-between ${
                            mode === "light"
                              ? "hover:bg-slate-300"
                              : "hover:bg-[#203350]"
                          }  cursor-pointer`}
                        >
                          {" "}
                          <div className="flex">
                            <img className="h-5 w-5" src={item.image} alt="" />
                            <a className="ml-1 text-sm" href={item.link}>
                              {item.name}
                            </a>
                          </div>
                          <span className="text-xs">
                            # {item.trust_score_rank}
                          </span>
                        </div>
                        <div
                          className={`${
                            mode === "light"
                              ? "h-[2px] bg-blue-900"
                              : "h-[0.9px] bg-blue-300"
                          }  my-[0.2rem] w-full opacity-20`}
                        />
                      </Link>
                    ))}
                  </ul>
                </div>
              )}

              {sections.length > 0 && (
                <div>
                  <p>Sections:</p>
                  <ul>
                    {sections.map((item, index) => (
                      <li key={index}>
                        <a href={item.link}>{item.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {cryptocurrencies.length === 0 &&
                exchanges.length === 0 &&
                sections.length === 0 && 
                <p>No matching sections found.</p>
                }
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
