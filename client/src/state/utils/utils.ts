import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getCoinData = async (id: string) => {
  const res = await axios.get(
    `${BASE_URL}/coins/${id}?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
  );

  return res.data;
};

export const getExchangeData = async (exchangeId: string) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/exchanges/${exchangeId}`
  );

  return res.data;
};

export const getBiWeekly = async (id: string) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=14&interval=daily`
  );

  return res.data;
};

export const getMonthlyChart = async (id: string) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
  );
  return res.data;
};

export const getMaxChart = async (id: string) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=max&interval=daily`
  );

  return res.data;
};

export const getTableData = async (
  currentPage: number,
  postsPerPage: number
) => {
  return await axios
    .get(
      `http://localhost:3001/services/coins?page=${currentPage}&per_page=${postsPerPage}`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

// date functions
export const dateConverter = (receivedDate: string) => {
  const timeNow: Date = new Date();
  const newDate: Date = new Date(receivedDate);
  const timeElapsed: number = Math.abs(timeNow.getTime() - newDate.getTime());

  const secs = Math.floor(timeElapsed / 1000);
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  return months > 0
    ? months === 1
      ? `${months} month ago`
      : `${months} months ago`
    : weeks > 0
    ? weeks === 1
      ? `${weeks} wk ago`
      : `${weeks} wks ago`
    : days > 0
    ? days === 1
      ? `${days} day ago`
      : `${days} days ago`
    : hours > 0
    ? hours === 1
      ? `${hours} hr ago`
      : `${hours} hrs ago`
    : mins > 0
    ? mins === 1
      ? `${mins} min ago`
      : `${mins} mins ago`
    : secs === 1
    ? `${secs} s ago`
    : `${secs} s ago`;
};

export const dateReformat = (receivedDate: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const reformattedDate: string = new Date(receivedDate).toLocaleDateString(
    undefined,
    options
  );
  return reformattedDate;
};
