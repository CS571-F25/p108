import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "../Navbar";
import Footer from "../Footer";

export default function ProfilePage() {
  return (
    <>
    <NavBar/>
    <Container className="py-5">
      <h1>Profile</h1>
      <p>This is the Profile Page</p>
    </Container>
    <Footer/>
    </>

  );
}
