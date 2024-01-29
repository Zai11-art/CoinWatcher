import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./state";

import Apps from "./routes/apps/apps";
import ViewPage from "./routes/cryptocurrencyViewPage/cryptoViewPage";
import Community from "./routes/communityPage/community";
import ProfilePage from "./routes/profilePage/ProfilePage";
import LearnPageSection from "./routes/learn/components/learn-section";
import Crypto from "./routes/cryptos/cryptos";
import WithoutNav from "./layouts/withoutNav";
import WithNav from "./layouts/withNav";
import Home from "./routes/home/home";
import ProfileFollowers from "./routes/profilePage/ProfileFollowers";
import ProfileFollowings from "./routes/profilePage/ProfileFollowing";
import ProfileWatchList from "./routes/profilePage/ProfileWatchList";
import Exchanges from "./routes/exchanges/exchanges";
import News from "./routes/news/news";
import Learn from "./routes/learn/learn";
import Login from "./routes/auth/login";
import Register from "./routes/auth/register";
import ExchangeViewPage from "./routes/view-exchange/exchange-view";

const App = () => {
  const isAuth = Boolean(useSelector((state: RootState) => state.token));

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithNav />}>
          <Route path="/" element={<Crypto />}></Route>
          <Route
            path="/cryptocurrencies/page_:pageNumber"
            element={<Crypto />}
          ></Route>
          <Route path="/cryptocurrencies" element={<Crypto />}></Route>
          <Route path="/View/:id" element={<ViewPage />}></Route>
          <Route path="/exchanges" element={<Exchanges />}></Route>
          <Route
            path={`/exchanges/:exchangeId`}
            element={<ExchangeViewPage />}
          ></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/apps" element={<Apps />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/learn" element={<Learn />}></Route>
          <Route
            path="/learn/:sectionId"
            element={<LearnPageSection />}
          ></Route>
          <Route
            path="/community"
            element={isAuth ? <Community /> : <Register />}
          ></Route>
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Crypto />}
          ></Route>
          <Route
            path="/profile/:userId/followings"
            element={isAuth ? <ProfileFollowings /> : <Crypto />}
          ></Route>
          <Route
            path="/profile/:userId/followers"
            element={isAuth ? <ProfileFollowers /> : <Crypto />}
          ></Route>
          <Route
            path="/profile/:userId/watchlist"
            element={isAuth ? <ProfileWatchList /> : <Crypto />}
          ></Route>
        </Route>
        <Route element={<WithoutNav />}>
          <Route path={`/home`} element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
