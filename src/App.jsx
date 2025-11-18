import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import HomePage from "./components/pages/HomePage";
import ArtistPage from "./components/pages/ArtistPage";
import SupportPage from "./components/pages/SupportPage";
import BuyPage from "./components/pages/BuyPage";
import SellPage from "./components/pages/SellPage";
import LoginPage from "./components/pages/LoginPage";
import ProfilePage from "./components/pages/ProfilePage";
import EventPage from "./components/pages/EventPage";
import CheckoutPage from "./components/pages/CheckoutPage";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/artist/:id" element={<ArtistPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/artist/:id/event/:eventId" element={<EventPage />} />
        <Route path="/artist/:id/event/:eventId/ticket/:ticketId" element={<CheckoutPage />} />
      </Routes>
    </AnimatePresence>
  );
}