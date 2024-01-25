import axios from "axios";
import { useState } from "react";

import { RootState } from "../../state";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import NewsCard from "./components/news-card";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../components/Pagination";
import NewsCardHeader from "./components/news-card-header";

const News = () => {
  const mode = useSelector((state: RootState) => state.mode);

  // get latest date
  const date = new Date();
  const year = date.getFullYear();
  const month = parseInt(String(date.getMonth() + 1).padStart(2, "0"));
  const day = parseInt(String(date.getDate()).padStart(2, "0"));

  const formattedDate = `${year}-${month}-${day}`;
  const formattedDateMinus = `${year}-${month}-${day - 7}`;

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(10);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const { data: news } = useQuery(["newCoinList"], () => {
    return axios
      .get("http://localhost:3001/services/news")
      .then((res) => res.data);
  });

  interface NewsType {
    title: string;
    description: string;
    url: string;
    source: { name: string };
    urlToImage: string;
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center ${
        mode === "light" ? "bg-slate-300" : "bg-[#051925]"
      } py-20 px-5`}
    >
      <div className="flex h-full lg:w-[1000px] w-full flex-col items-center justify-center">
        <NewsCardHeader />

        <div className="py-9">
          <div className=" flex flex-col ">
            <div className="flex flex-col items-center justify-between md:flex-row lg:flex-row">
              <div>
                <h1
                  className={`mt-2 text-[15px] ${
                    mode === "light" ? "text-blue-900" : "text-[#9ccddc]"
                  } md:text-[15px] lg:text-[15px]`}
                >
                  Latest News from {formattedDateMinus} - {formattedDate}
                </h1>
              </div>
              <div>
                <Pagination
                  totalPosts={news?.length}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-7">
            {news?.length ? (
              news
                .slice(firstPostIndex, lastPostIndex)
                .map((data: NewsType, index: number) => (
                  <NewsCard
                    key={index}
                    image={data?.urlToImage}
                    title={data.title}
                    description={data.description}
                    url={data.url}
                    source={data?.source?.name}
                  />
                ))
            ) : (
              <Loader />
            )}
          </div>

          <div className=" flex flex-col items-center justify-between md:flex-row lg:flex-row ">
            <div>
              <h1
                className={`mt-2 text-[15px] ${
                  mode === "light" ? "text-blue-900" : "text-[#9ccddc]"
                } md:text-[15px] lg:text-[15px]`}
              >
                Page {currentPage} - Showing 10 results out of {news?.length}
              </h1>
            </div>
            <Pagination
              totalPosts={news?.length}
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

export default News;
// HEX CODES:
// #062c43
// #054569
// #5591a9
// #9ccddc
// #ced7e0
