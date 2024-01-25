import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../../state";

const NewsCardHeader = () => {
  const mode = useSelector((state: RootState) => state.mode);
  return (
    <div
      className={`${
        mode === "light"
          ? "headCard-filter-light text-slate-700 text-glow"
          : "headCard-filter text-white"
      } w-full p-5 rounded-lg`}
    >
      <div className="w-full h-full">
        <h1 className="mb-6 text-3xl font-bold">
          Be updated. no FOMO. Crypto news for you.
        </h1>
        <p
          className={`text-md  md:w-[500px] ${
            mode === "light" ? "font-semibold" : "font-normal"
          }`}
        >
          Welcome to the ultimate source for all your cryptocurrency news and
          analysis! Our mission is to keep you up-to-date with the latest
          developments in the rapidly evolving world of digital currencies.
        </p>
      </div>

      <div className="flex flex-col">
        <h1 className="text-md my-2 font-bold">
          Get the Latest news in the last 24 hrs
        </h1>
        <Link
          to="/cryptocurrencies"
          className={`text-white rounded-md w-36 text-center bg-[#054569] p-1 border-[1px] border-cyan-500/20 hover:bg-blue-950/50`}
        >
          View Coins here
        </Link>
      </div>
    </div>
  );
};

export default NewsCardHeader;
