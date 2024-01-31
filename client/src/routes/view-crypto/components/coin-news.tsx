import { useId } from "react";
import { Carousel } from "flowbite-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { RootState } from "../../../state";

interface NewsType {
  author: string;
  urlToImage: string;
  title: string;
  description: string;
  url: string;
  source: { name: string };
}

const CoinNews = () => {
  const mode = useSelector((state: RootState) => state.mode);
  const ident = useId();
  const { id } = useParams() as { id: string };
  const date = new Date();
  const year = date.getFullYear();
  const month = parseInt(String(date.getMonth() + 1).padStart(2, "0"));
  const day = parseInt(String(date.getDate()).padStart(2, "0"));
  const formattedDate = `${year}-${month}-${day}`;
  const formattedDateMinus = `${year}-${month}-${day - 7}`;
  const [newsState, setNewsState] = useState<NewsType[]>([]);
  const news: NewsType[] = newsState;

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=${id}%20crypto&from=${formattedDateMinus}&to=${formattedDate}&sortBy=popularity&apiKey=b5daf3d3eadc418380996387610a8218`
    )
      .then((response) => response.json())
      .then((data) => setNewsState([...data.articles]))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      className="xl:mt-[70px] lg:mt-[10px] md:mt-[1700px] sm:mt-[1100px] mt-[1200px]
         mb-[100px] flex justify-center items-center
         w-[100%] h-[500px]   
         md:h-[500px] md:w-[100%]  
         lg:h-[500px] lg:w-[100%] 
         xl:h-[500px] xl:w-[100%]"
    >
      <div
        className={`mt-[2400px] md:mt-[1800px] lg:mt-[250px] xl:mt-[200px]
            ${
              mode === "light"
                ? "bg-slate-200 text-blue-900 shadow-xl"
                : "chart text-white"
            } flex items-center justify-around
             flex-col md:flex-col lg:flex-col xl:flex-col rounded-3xl pb-[0]
             w-[95%] h-[1650px]
             md:h-[1650px] md:w-[700px] 
             lg:h-[700px] lg:w-[1000px]  
             xl:h-[800px] xl:w-[1300px]`}
      >
        <div className="mx-4 mb-[20px] mt-4 flex flex-col items-center xl:mb-[-20px] xl:text-[1rem]">
          <h1 className="text-center text-3xl font-bold ">
            {id.toLocaleUpperCase()} NEWS
          </h1>
          <span className="text-[16px] font-semibold italic ">
            {formattedDateMinus} to {formattedDate}
          </span>
        </div>

        <Carousel slide={true} className="px-16 pb-12">
          {[
            { first: 0, second: 3 },
            { first: 3, second: 6 },
            { first: 6, second: 9 },
            { first: 9, second: 12 },
            { first: 12, second: 15 },
          ].map((data) => (
            <div className="flex flex-col items-center justify-around md:flex-col lg:flex-row xl:flex-row">
              {news.slice(data.first, data.second).map((data, index) => (
                <div
                  className={`${mode === "light" ? "" : "shadow-blue-500/50"}
                flex flex-col rounded-xl    shadow-lg 
                w-[85%] h-[500px] mx-3 my-4
                md:h-[500px] md:w-[400px] 
                lg:h-[550px] lg:w-[300px]
                xl:h-[600px] xl:w-[400px]`}
                  key={`${ident}-${data.author}-${index}`}
                >
                  <div className="h-[40%] w-[100%] rounded-t-xl">
                    <img
                      className="h-[100%] w-[100%] rounded-t-xl"
                      src={data.urlToImage}
                      alt="news_image"
                    />
                  </div>
                  <div
                    className={`flex h-[60%] w-[100%] flex-col justify-around rounded-b-xl 
                  ${
                    mode === "light"
                      ? "bg-slate-300/30 font-semibold text-slate-900 shadow-xl"
                      : "bg-[#161c26] text-white"
                  } p-3`}
                  >
                    <h1 className="text-md font-semibol my-2 md:text-xl lg:text-xl">
                      {data.title.slice(0, 50) + "..."}
                    </h1>
                    <p className="my-2 text-[13px] lg:text-[14px]">
                      {data.description.slice(0, 150) + "..."}
                    </p>
                    <span className="text-right text-[13px] lg:text-[14.5px]">
                      Source: <a href={data.url}>{data.source.name}</a>
                    </span>
                    <a
                      className={`mb-2 mt-6 flex cursor-pointer justify-center rounded-lg p-1 
                    ${
                      mode === "light"
                        ? "newscard-filter-light text-glow font-bold text-blue-900 hover:bg-blue-100 hover:text-blue-500"
                        : "bg-blue-500 text-white hover:bg-blue-100 hover:text-blue-500"
                    } 
                    duration-200 ease-in-out md:text-[15px] lg:text-[13px] xl:text-[13px]`}
                      href={data.url}
                    >
                      Read more here
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CoinNews;
