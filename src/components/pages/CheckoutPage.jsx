import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Navbar";
import Footer from "../Footer";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import PageFade from "../PageFade";

export default function CheckoutPage() {
  const { id, eventId, ticketId } = useParams();

  // Fake ticket fetch (normally this would use an API)
  const ticket = {
    price: 285,
    section: "Section 112 - Lower Bowl",
    row: "Row G",
    seats: "12–13",
    fees: 35,
  };

  return (
    <PageFade>
      <NavBar />

      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="p-4 shadow-sm">
              <h2 className="mb-3">Checkout</h2>

              <p><strong>Artist:</strong> {id}</p>
              <p><strong>Event:</strong> {eventId}</p>
              <p><strong>Ticket:</strong> {ticketId}</p>

              <hr />

              <h4>Order Summary</h4>

              <div className="d-flex justify-content-between">
                <span>{ticket.section}</span>
                <span>${ticket.price}</span>
              </div>

              <div className="d-flex justify-content-between text-muted">
                <span>Fees</span>
                <span>${ticket.fees}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${ticket.price + ticket.fees}</span>
              </div>

              <Button className="mt-4 w-100" variant="primary">
                Pay Now
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </PageFade>
  );
}
