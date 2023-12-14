import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import NewsCardHeader from "./NewsCardHeader";
import NewsCard from "./NewsCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { useSelector } from "react-redux";
import { RootState } from "../../state";

const NewsPage = () => {
  const mode = useSelector((state : RootState) => state.mode)

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
    source: {name: string};
    urlToImage: string;
  }
  
  return (
    <div
      className={`flex h-[4150px] w-full flex-col items-center ${
        mode === "light" ? "bg-slate-300" : "bg-[#051925]"
      } md:h-[3500px] lg:h-[3000px]`}
    >
      <div className="flex h-full w-full flex-row justify-center">
        <NewsCardHeader />
        <div
          className="
                newsCardHeader mt-12
                flex 
                flex-col
                rounded-lg 
                border-[0.1px] border-[#9ccddc] pb-4
                w-[100%] h-[350px]
                sm:w-[100%] sm:h-[350px]
                md:h-[300px] md:w-[700px]
                lg:h-[300px] lg:w-[1000px]"
        >
          <div className="mt-[350px] flex flex-col sm:mt-[80%] md:mt-[45%] lg:mt-[30%]">
            <div className="mb-2 mt-3 flex flex-col items-center justify-between md:flex-row lg:flex-row">
              <div>
                <h1 className={`mt-2 text-[15px] ${mode === 'light' ? "text-blue-900" : "text-[#9ccddc]"} md:text-[15px] lg:text-[15px]`}>
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
            {news?.length ? (
              news
                .slice(firstPostIndex, lastPostIndex)
                .map((data : NewsType, index : number) => (
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

          <div className="mt mb-[100px] flex flex-col items-center justify-between md:flex-row lg:flex-row ">
            <div>
              <h1 className={`mt-2 text-[15px] ${mode === 'light' ? "text-blue-900" : "text-[#9ccddc]"} md:text-[15px] lg:text-[15px]`}>
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
}

export default NewsPage;
// HEX CODES:
// #062c43
// #054569
// #5591a9
// #9ccddc
// #ced7e0
