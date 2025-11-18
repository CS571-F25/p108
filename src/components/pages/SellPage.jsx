import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "../Navbar";
import Footer from "../Footer";
import PageFade from "../PageFade";

export default function SellPage() {
  return (
    <PageFade>
    <NavBar/>
    <Container className="py-5">
      <h1>Support</h1>
      <p>This is the Sell page. Add Listings here.</p>
    </Container>
    <Footer/>
    </PageFade>

  );
}
