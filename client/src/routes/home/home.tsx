import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import HomeNavbar from "./components/home-navbar";
import HeadCardHome from "./components/head-card-home";
import HomeHero from "./components/home-hero";
import Loader from "../../components/Loader";

const Home = () => {
  const { isLoading, data: coinList } = useQuery(["coinListData"], async () => {
    const res = await axios.get("http://localhost:3001/services/coins");
    return res.data;
  });

  return (
    <div className="h-full w-full items-center justify-center bg-[#02070f] flex flex-col gap-5">
      {isLoading ? (
        <div className="w-screen h-screen items-center flex justify-center text-white">
          <Loader />
        </div>
      ) : (
        <>
          <HomeNavbar />
          <HomeHero coinList={coinList} />
          <HeadCardHome />
        </>
      )}
    </div>
  );
};

export default Home;
