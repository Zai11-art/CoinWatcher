import axios from "axios";

export const getCoins = async () => {
  const res = await axios.get("http://localhost:3001/services/coins");
  return res.data;
};

export const getTrendingCoins = async () => {
  const res = await axios.get("http://localhost:3001/services/trending");
  return res.data;
};

export const getBtcPrice = async () => {
  const res = await axios.get("http://localhost:3001/services/btcPrice");
  return res.data;
};

export const getGlobalData = async () => {
  const res = await axios.get("http://localhost:3001/services/globaldata");
  return res.data;
};
