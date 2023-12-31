import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./state";

import NewsPage from "./routes/newsPage/NewsPage";
import AppPage from "./routes/appsPage/route";
import ViewPage from "./routes/cryptocurrencyViewPage/cryptoViewPage";
import RegisterPage from "./routes/loginPage/LoginPage";
import CommunityPage from "./routes/communityPage/CommunityPage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import LearnPage from "./routes/learnPage/LearnPage";
import LearnPageSection from "./routes/learnPage/LearnPageSection";
import CryptocurrencyPage from "./routes/cryptocurrencyPage/CryptocurrencyPage";
import WithoutNav from "./layouts/withoutNav";
import WithNav from "./layouts/withNav";
import HomePage from "./routes/homePage/HomePage";
import ProfileFollowers from "./routes/profilePage/ProfileFollowers";
import ProfileFollowings from "./routes/profilePage/ProfileFollowing";
import ProfileWatchList from "./routes/profilePage/ProfileWatchList";
import ExchangePage from "./routes/exchangePage/ExchangePage";
import ExchangeViewPage from "./routes/exchangeViewPage/ExchangeViewPage";

const App = () => {
  const isAuth = Boolean(useSelector((state: RootState) => state.token));

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithNav />}>
          <Route path="/" element={<CryptocurrencyPage />}></Route>
          <Route
            path="/Cryptocurrencies/page_:pageNumber"
            element={<CryptocurrencyPage />}
          ></Route>
          <Route
            path="/Cryptocurrencies"
            element={<CryptocurrencyPage />}
          ></Route>
          <Route path="/View/:id" element={<ViewPage />}></Route>
          <Route path="/Exchanges" element={<ExchangePage />}></Route>
          <Route
            path={`/Exchanges/:exchangeId`}
            element={<ExchangeViewPage />}
          ></Route>
          <Route path="/News" element={<NewsPage />}></Route>
          <Route path="/Apps" element={<AppPage />}></Route>
          <Route path="/login" element={<RegisterPage />}></Route>
          <Route path="/Learn" element={<LearnPage />}></Route>
          <Route
            path="/Learn/:sectionId"
            element={<LearnPageSection />}
          ></Route>
          <Route
            path="/community"
            element={isAuth ? <CommunityPage /> : <RegisterPage />}
          ></Route>
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <CryptocurrencyPage />}
          ></Route>
          <Route
            path="/profile/:userId/followings"
            element={isAuth ? <ProfileFollowings /> : <CryptocurrencyPage />}
          ></Route>
          <Route
            path="/profile/:userId/followers"
            element={isAuth ? <ProfileFollowers /> : <CryptocurrencyPage />}
          ></Route>
          <Route
            path="/profile/:userId/watchlist"
            element={isAuth ? <ProfileWatchList /> : <CryptocurrencyPage />}
          ></Route>
        </Route>
        <Route element={<WithoutNav />}>
          <Route path={`/Home`} element={<HomePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
