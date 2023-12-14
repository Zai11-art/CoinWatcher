import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HomeNavbar from "./HomeNavbar";
import HomeCardFirst from "./HomeCardFirst";
import HomeHero from "./HomeHero";


const HomePage = () => {
  const { data: coinList } = useQuery(["coinListData"], () => {
    return axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&locale=en"
      )
      .then((res) => res.data);
  });

  return (
    <div className="h-[100%] w-full bg-[#02070f]">
      <HomeNavbar />
      <HomeHero coinList={coinList} />

      <div className="mt-12 h-[100%] w-full bg-[#010d14]">
        {/* first card */}
        <HomeCardFirst />
      </div>
    </div>
  );
};

export default HomePage;
