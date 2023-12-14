import express from "express"; // backend framework
import axios from "axios";
const router = express.Router();
let fetchedCoinsAll = [];
const getAllCoins = async () => {
    try {
        const resPageOne = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&locale=en");
        const resPageTwo = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2&sparkline=true&locale=en");
        const resPageThree = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=3&sparkline=true&locale=en");
        fetchedCoinsAll = [
            ...resPageOne?.data,
            ...resPageTwo?.data,
            ...resPageThree?.data,
        ];
        console.log("Data fetched and stored in fetchedCoinsAll:", fetchedCoinsAll);
    }
    catch (err) {
        console.log(err);
    }
};
let fetchedExchanges = [];
const getAllExchanges = async () => {
    try {
        const resPageOne = await axios.get("https://api.coingecko.com/api/v3/exchanges?per_page=250&page=1");
        const resPageTwo = await axios.get("https://api.coingecko.com/api/v3/exchanges?per_page=250&page=2");
        const resPageThree = await axios.get("https://api.coingecko.com/api/v3/exchanges?per_page=250&page=3");
        fetchedExchanges = [
            ...resPageOne?.data,
            ...resPageTwo?.data,
            ...resPageThree?.data,
        ];
        console.log("Data fetched and stored in fetchedCoinsAll:", fetchedCoinsAll);
    }
    catch (err) {
        console.log(err);
    }
};
let fetchedTrendingCoins = [];
const getTrending = async () => {
    try {
        const res = await axios.get("https://api.coingecko.com/api/v3/search/trending");
        fetchedTrendingCoins = [...res?.data?.coins];
        console.log(fetchedCoinsAll);
    }
    catch (error) {
        console.log(error);
    }
};
let btcPrice;
const getBtcPrice = async () => {
    try {
        const res = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        btcPrice = res.data;
    }
    catch (error) {
        console.log(error);
    }
};
let fetchedNews = [];
const getAllNews = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = Number(String(date.getDate()).padStart(2, "0"));
    const formattedDate = `${year}-${month}-${day}`;
    const formattedDateMinus = `${year}-${month}-${day - 7}`;
    try {
        const res = await axios.get(`https://newsapi.org/v2/everything?q=cryptocurrency&from=${formattedDateMinus}&to=${formattedDate}&sortBy=popularity&apiKey=b5daf3d3eadc418380996387610a8218`);
        fetchedNews = res.data.articles;
        console.log(fetchedNews);
    }
    catch (error) {
        console.log(error);
    }
};
let globalData;
const getGlobal = async () => {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/global`);
        globalData = res.data;
    }
    catch (error) { }
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
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
router.get("/exchanges", async (req, res) => {
    try {
        res.status(200).json(fetchedExchanges);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
router.get("/trending", async (req, res) => {
    try {
        res.status(200).json(fetchedTrendingCoins);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
router.get("/btcPrice", async (req, res) => {
    try {
        res.status(200).json(btcPrice);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
router.get("/news", async (req, res) => {
    try {
        res.status(200).json(fetchedNews);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
router.get("/globaldata", async (req, res) => {
    try {
        res.status(200).json(globalData);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
export default router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yb3V0ZXMvc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDLENBQUMsb0JBQW9CO0FBQ25ELE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFvUGhDLElBQUksZUFBZSxHQUFvQixFQUFFLENBQUM7QUFFMUMsTUFBTSxXQUFXLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDN0IsSUFBSTtRQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FDaEMsbUlBQW1JLENBQ3BJLENBQUM7UUFDRixNQUFNLFVBQVUsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQ2hDLG1JQUFtSSxDQUNwSSxDQUFDO1FBQ0YsTUFBTSxZQUFZLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUNsQyxtSUFBbUksQ0FDcEksQ0FBQztRQUVGLGVBQWUsR0FBRztZQUNoQixHQUFHLFVBQVUsRUFBRSxJQUFJO1lBQ25CLEdBQUcsVUFBVSxFQUFFLElBQUk7WUFDbkIsR0FBRyxZQUFZLEVBQUUsSUFBSTtTQUN0QixDQUFDO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxlQUFlLENBQUMsQ0FBQztLQUM3RTtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtBQUNILENBQUMsQ0FBQztBQUVGLElBQUksZ0JBQWdCLEdBQXdCLEVBQUUsQ0FBQztBQUUvQyxNQUFNLGVBQWUsR0FBRyxLQUFLLElBQUksRUFBRTtJQUNqQyxJQUFJO1FBQ0YsTUFBTSxVQUFVLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUNoQyxnRUFBZ0UsQ0FDakUsQ0FBQztRQUNGLE1BQU0s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