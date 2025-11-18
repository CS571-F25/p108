import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "../Navbar";
import Footer from "../Footer";

export default function BuyPage() {
  return (
    <>
    <NavBar/>
    <Container className="py-5">
      <h1>Buy</h1>
      <p>This is the Buy page. see Listings here.</p>
    </Container>
    <Footer/>
    </>

  );
}
