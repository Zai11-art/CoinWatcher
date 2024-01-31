import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import PriceBar from "../components/price-bar";
import NotificationPopUp from "../components/toast";
import AiWidget from "../components/aiWidget/AiWidget";

export default () => {
  return (
    <>
      <Navbar />
      <NotificationPopUp />
      <AiWidget />
      <Outlet />
      <PriceBar />
      <Footer />
    </>
  );
};
