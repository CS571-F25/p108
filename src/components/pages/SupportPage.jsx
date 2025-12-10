import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "../Navbar";
import Footer from "../Footer";
import PageFade from "../PageFade";

export default function SupportPage() {
  return (
    <PageFade>
    <Container className="py-5">
      <h1>Support</h1>
      <p>Welcome to the support page. This page is meant to answer questions users might have about our website fanpass. If you need to contact somebody for further advice, we recommend contacting our email, fanpass@gmail.com</p>
    </Container>
    </PageFade>

  );
}
