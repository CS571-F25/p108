import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Navbar";
import Footer from "../Footer";
import { Card, Row, Col, Badge, Image, Container } from "react-bootstrap";
import EventCard from "../EventCard";
import getGlobalStyles from "../../styles/globalStyles";
import TicketCard from "../TicketCard";
import { useNavigate } from "react-router-dom";
import PageFade from "../PageFade";

export default function EventPage() {
  const { id, eventId } = useParams();
  const styles = getGlobalStyles(null);
  const navigate = useNavigate();

const handleTicketClick = (ticketId) => {
  navigate(`/artist/${id}/event/${eventId}/ticket/${ticketId}`);
};

  //fake FETCH data
  const ticketListings = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?w=1200",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Ticket_Icon.png",
    section: "Section 112 - Lower Bowl",
    row: "Row G",
    seats: "12–13",
    price: 285,
    rating: "9.3",
    ratingLabel: "Excellent",
    feature: "Mobile Transfer"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1463107971871-fbac9ddb920f?w=1200",
    logo: null,
    section: "Section 204 - Upper Corner",
    row: "Row Q",
    seats: "7–8",
    price: 89,
    rating: "7.8",
    ratingLabel: "Good",
    feature: "Instant Download"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=1200",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Check_green_circle.svg",
    section: "VIP Floor - Pit Left",
    row: "Row 2",
    seats: "4–5",
    price: 640,
    rating: "9.8",
    ratingLabel: "Premium",
    feature: "Verified Resale"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1503424886307-b090341d25f0?w=1200",
    section: "Section 316 - Upper Back",
    row: "Row H",
    seats: "22–23",
    price: 54,
    rating: "6.2",
    ratingLabel: "Decent",
    feature: "Mobile Transfer"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200",
    section: "Floor GA - Standing",
    row: "General Admission",
    seats: "N/A",
    price: 180,
    rating: "8.7",
    ratingLabel: "Great",
    feature: "Early Entry Eligible"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1580136645127-6a0bbf19c9df?w=1200",
    logo: null,
    section: "Section 129 - Side View",
    row: "Row M",
    seats: "3–4",
    price: 212,
    rating: "8.4",
    ratingLabel: "Solid",
    feature: "Instant Download"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200",
    section: "Section 105 - Lower Bowl",
    row: "Row D",
    seats: "9–10",
    price: 310,
    rating: "9.1",
    ratingLabel: "Excellent",
    feature: "Aisle Seats"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Gold_Star_Icon.png",
    section: "Club Level - VIP Lounge",
    row: "Row A",
    seats: "1–2",
    price: 525,
    rating: "9.6",
    ratingLabel: "Premium",
    feature: "Lounge Access"
  }
];


  return (
    <PageFade>
      <NavBar />

      <Container className="mt-5 mb-5">
        <h1>Event Details</h1>
        <p>Artist ID: {id}</p>
        <p>Event ID: {eventId}</p>
        {/* TO DO!!! ADD TICKET CARD and list them on this page, which prompts to checkout page (for now, just list) */}
        <p>This is a placeholder page for ticket listings for this show.</p>
        <Row>
          <Col lg={10} className="mx-auto">
          {ticketListings.map(ticketListing => (
            <TicketCard
              key={ticketListing.id}
              image={ticketListing.image}
              section={ticketListing.section}
              row={ticketListing.row}
              seats={ticketListing.seats}
              price={ticketListing.price}
              rating={ticketListing.rating}
              ratingLabel={ticketListing.ratingLabel}
              feature={ticketListing.feature}
              logo={ticketListing.logo}
              onBuy={() => handleTicketClick(ticketListing.id)}   // ← pass ID
            />

          ))}

          </Col>
        </Row>
      </Container>

      <Footer />
    </PageFade>
  );
}
