import React from 'react';
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./components/pages/HomePage";
import ArtistPage from "./components/pages/ArtistPage";
import SupportPage from "./components/pages/SupportPage";
import SellPage from "./components/pages/SellPage";
import LoginPage from "./components/pages/LoginPage";
import ProfilePage from "./components/pages/ProfilePage";
import EventPage from "./components/pages/EventPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import SignupPage from './components/pages/SignupPage';

function Layout() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column" 
    }}>
      <NavBar />

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/buy" element={<HomePage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/artist/:id/event/:eventId" element={<EventPage />} />
          <Route path="/artist/:id/event/:eventId/ticket/:ticketId" element={<CheckoutPage />} />
          <Route path="/checkout/:orderId" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
