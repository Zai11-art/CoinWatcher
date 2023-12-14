import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PriceBar from "../components/PriceBar";
import AiWidget from "../components/aiWidget/AiWidget";
import { Outlet } from "react-router-dom";
import NotificationPopUp from "../components/NotificationPopUp";


export default () => {
  return (
    <>
      <Navbar />
      <NotificationPopUp/>
      <AiWidget />
      <Outlet />
      <PriceBar />
      <Footer />
    </>
  );
};


