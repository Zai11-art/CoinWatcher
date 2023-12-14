import express from "express"; // backend framework
import axios from "axios";

const router = express.Router();

interface CoinDataProps {
  id: string | null;
  symbol: string | null;
  name: string | null;
  image: string | null;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  ath_date: string | null;
  atl: number | null;
  atl_change_percentage: number | null;
  atl_date: string | null;
  roi: { times: number; currency: string; percentage: number } | null;
  last_updated: string | null;
  sparkline_in_7d: { price: number[] } | null;
}

interface ExchangeDataProps {
  id: string | null;
  name: string | null;
  year_established: number | null;
  country: string | null;
  description: string | null;
  url: string | null;
  image: string | null;
  has_trading_incentive: boolean | null;
  trust_score: number | null;
  trust_score_rank: number | null;
  trade_volume_24h_btc: number | null;
  trade_volume_24h_btc_normalized: number | null;
}

interface TrendingDataProps {
  coins: {
    item: {
      id: string | null;
      coin_id: number | null;
      name: string | null;
      symbol: string | null;
      market_cap_rank: number | null;
      thumb: string | null;
      small: string | null;
      large: string | null;
      slug: string | null;
      price_btc: number | null;
      score: number | null;
    };
  }[];
  nfts: {
    id: string | null;
    name: string | null;
    symbol: string | null;
    thumb: string | null;
    nft_contract_id: number | null;
    native_currency_symbol: string | null;
    floor_price_in_native_currency: number | null;
    floor_price_24h_percentage_change: number | null;
  }[];
  exchanges: [];
}

interface NewsDataProps {
  status: string | null;
  totalResults: number | null;
  articles: {
    source: {
      id: string | null;
      name: string | null;
    } | null;
    author: string | null;
    title: string | null;
    description: string | null;
    url: string | null;
    urlToImage: string | null;
    publishedAt: string | null;
    content: string | null;
  }[];
}

interface GlobalDataProps {
  data: {
    active_cryptocurrencies: number | null;
    upcoming_icos: number | null;
    ongoing_icos: number | null;
    ended_icos: number | null;
    markets: number | null;
    total_market_cap: {
      eth: number | null;
      btc: number | null;
      ltc: number | null;
      bch: number | null;
      bnb: number | null;
      eos: number | null;
      xrp: number | null;
      xlm: number | null;
      link: number | null;
      dot: number | null;
      yfi: number | null;
      usd: number | null;
      aed: number | null;
      ars: number | null;
      aud: number | null;
      bdt: number | null;
      bhd: number | null;
      bmd: number | null;
      brl: number | null;
      cad: number | null;
      chf: number | null;
      clp: number | null;
      cny: number | null;
      czk: number | null;
      dkk: number | null;
      eur: number | null;
      gbp: number | null;
      hkd: number | null;
      huf: number | null;
      idr: number | null;
      ils: number | null;
      inr: number | null;
      jpy: number | null;
      krw: number | null;
      kwd: number | null;
      lkr: number | null;
      mmk: number | null;
      mxn: number | null;
      myr: number | null;
      ngn: number | null;
      nok: number | null;
      nzd: number | null;
      php: number | null;
      pkr: number | null;
      pln: number | null;
      rub: number | null;
      sar: number | null;
      sek: number | null;
      sgd: number | null;
      thb: number | null;
      try: number | null;
      twd: number | null;
      uah: number | null;
      vef: number | null;
      vnd: number | null;
      zar: number | null;
      xdr: number | null;
      xag: number | null;
      xau: number | null;
      bits: number | null;
      sats: number | null;
    };
    total_volume: {
      eth: number | null;
      btc: number | null;
      ltc: number | null;
      bch: number | null;
      bnb: number | null;
      eos: number | null;
      xrp: number | null;
      xlm: number | null;
      link: number | null;
      dot: number | null;
      yfi: number | null;
      usd: number | null;
      aed: number | null;
      ars: number | null;
      aud: number | null;
      bdt: number | null;
      bhd: number | null;
      bmd: number | null;
      brl: number | null;
      cad: number | null;
      chf: number | null;
      clp: number | null;
      cny: number | null;
      czk: number | null;
      dkk: number | null;
      eur: number | null;
      gbp: number | null;
      hkd: number | null;
      huf: number | null;
      idr: number | null;
      ils: number | null;
      inr: number | null;
      jpy: number | null;
      krw: number | null;
      kwd: number | null;
      lkr: number | null;
      mmk: number | null;
      mxn: number | null;
      myr: number | null;
      ngn: number | null;
      nok: number | null;
      nzd: number | null;
      php: number | null;
      pkr: number | null;
      pln: number | null;
      rub: number | null;
      sar: number | null;
      sek: number | null;
      sgd: number | null;
      thb: number | null;
      try: number | null;
      twd: number | null;
      uah: number | null;
      vef: number | null;
      vnd: number | null;
      zar: number | null;
      xdr: number | null;
      xag: number | null;
      xau: number | null;
      bits: number | null;
      sats: number | null;
    };
    market_cap_percentage: {
      btc: number | null;
      eth: number | null;
      usdt: number | null;
      bnb: number | null;
      usdc: number | null;
      xrp: number | null;
      steth: number | null;
      ada: number | null;
      doge: number | null;
      sol: number | null;
    };
    market_cap_change_percentage_24h_usd: number | null;
    updated_at: number | null;
  };
}

let fetchedCoinsAll: CoinDataProps[] = [];

const getAllCoins = async () => {
  try {
    const resPageOne = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&locale=en"
    );
    const resPageTwo = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2&sparkline=true&locale=en"
    );
    const resPageThree = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=3&sparkline=true&locale=en"
    );

    fetchedCoinsAll = [
      ...resPageOne?.data,
      ...resPageTwo?.data,
      ...resPageThree?.data,
    ];

    console.log("Data fetched and stored in fetchedCoinsAll:", fetchedCoinsAll);
  } catch (err) {
    console.log(err);
  }
};

let fetchedExchanges: ExchangeDataProps[] = [];

const getAllExchanges = async () => {
  try {
    const resPageOne = await axios.get(
      "https://api.coingecko.com/api/v3/exchanges?per_page=250&page=1"
    );
    const resPageTwo = await axios.get(
      "https://api.coingecko.com/api/v3/exchanges?per_page=250&page=2"
    );
    const resPageThree = await axios.get(
      "https://api.coingecko.com/api/v3/exchanges?per_page=250&page=3"
    );

    fetchedExchanges = [
      ...resPageOne?.data,
      ...resPageTwo?.data,
      ...resPageThree?.data,
    ];

    console.log("Data fetched and stored in fetchedCoinsAll:", fetchedCoinsAll);
  } catch (err) {
    console.log(err);
  }
};

let fetchedTrendingCoins: TrendingDataProps[] = [];

const getTrending = async () => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending"
    );

    fetchedTrendingCoins = [...res?.data?.coins];

    console.log(fetchedCoinsAll);
  } catch (error) {
    console.log(error);
  }
};

let btcPrice: number;

const getBtcPrice = async () => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );

    btcPrice = res.data;
  } catch (error) {
    console.log(error);
  }
};

let fetchedNews: NewsDataProps[] = [];

const getAllNews = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = Number(String(date.getDate()).padStart(2, "0"));

  const formattedDate = `${year}-${month}-${day}`;
  const formattedDateMinus = `${year}-${month}-${day - 7}`;
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=cryptocurrency&from=${formattedDateMinus}&to=${formattedDate}&sortBy=popularity&apiKey=b5daf3d3eadc418380996387610a8218`
    );

    fetchedNews = res.data.articles;

    console.log(fetchedNews);
  } catch (error) {
    console.log(error);
  }
};

let globalData: GlobalDataProps;

const getGlobal = async () => {
  try {
    const res = await axios.get(`https://api.coingecko.com/api/v3/global`);

    globalData = res.data;
  } catch (error) {}
};

const startFetchingData = () => {
  // Call getAllCoins immediately on server startup
  getAllCoins();
  getAllExchanges();
  getTrending();
  getBtcPrice();
  getAllNews();
  getGlobal();

  // Schedule getAllCoins to be called every 2 minutes
  setInterval(getAllCoins, 3 * 60 * 1000); // 2 minutes in milliseconds
  setInterval(getAllExchanges, 3 * 60 * 1000); // 2 minutes in milliseconds
  setInterval(getTrending, 3 * 60 * 1000); // 2 minutes in milliseconds
  setInterval(getBtcPrice, 3 * 60 * 1000); // 2 minutes in milliseconds
  setInterval(getAllNews, 3 * 60 * 1000); // 2 minutes in milliseconds
  setInterval(getGlobal, 3 * 60 * 1000); // 2 minutes in milliseconds

  console.log("after two minutes");
};

startFetchingData();

// router.get("/coins", async (req, res) => {
//   const { page = 1, per_page = 50 } = req.query; // Default to page 1 and 20 items per page

//   const startIndex = (page - 1) * per_page;
//   const endIndex = startIndex + parseInt(per_page);
//   try {
//      // Slice the fetchedCoinsAll array based on pagination parameters
//      const paginatedCoins = fetchedCoinsAll.slice(startIndex, endIndex);

//      // Return the paginated data along with the total count of items
//      res.status(200).json({
//        totalItems: fetchedCoinsAll.length,
//        coins: paginatedCoins,
//      });
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// });
router.get("/coins", async (req, res) => {
  try {
    res.status(200).json(fetchedCoinsAll);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/exchanges", async (req, res) => {
  try {
    res.status(200).json(fetchedExchanges);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/trending", async (req, res) => {
  try {
    res.status(200).json(fetchedTrendingCoins);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/btcPrice", async (req, res) => {
  try {
    res.status(200).json(btcPrice);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/news", async (req, res) => {
  try {
    res.status(200).json(fetchedNews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/globaldata", async (req, res) => {
  try {
    res.status(200).json(globalData);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

export default router;
