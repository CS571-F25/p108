import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../Navbar";
import ArtistCard from "../ArtistCard";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import PageFade from "../PageFade";


export default function HomePage({ onArtistClick }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleArtistClick = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  const artists = [
    { id: 1, image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400", name: "Artist 1" },
    { id: 2, image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400", name: "Artist 2" },
    { id: 3, color: "#c77d7d", name: "Artist 3" },
    { id: 4, color: "#4a90a4", name: "Artist 4" },
    { id: 5, color: "#5a6c7d", name: "Artist 5" },
    { id: 6, color: "#8b5fb5", name: "Artist 6" },
    { id: 7, color: "#2d7d52", name: "Artist 7" },
    { id: 8, color: "#7b3fa0", name: "Artist 8" },
    { id: 9, color: "#e683b8", name: "Artist 9" },
  ];

  return (
    <PageFade>
      {/* NAVBAR */}
      <NavBar />

      {/* HERO */}
      <div className="text-white text-center d-flex flex-column justify-content-center align-items-center"
           style={{
             height: "450px",
             backgroundImage: "url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200')",
             backgroundSize: "cover",
             backgroundPosition: "center",
             position: "relative"
           }}>
        <div className="position-absolute top-0 start-0 end-0 bottom-0"
             style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
        <div className="position-relative">
          <h1 className="display-3 fw-bold">Fan Pass</h1>
          <p className="fs-5">Ticket resell site from fans, for fans</p>
        </div>
      </div>

      {/* ARTIST GRID SECTION */}
      <Container className="py-5">
        <h2 className="fw-bold mb-4">Your Artists.</h2>

        <Row xs={1} sm={2} md={2} lg={3} className="g-4">
          {artists.map((artist) => (
            <Col key={artist.id}>
              <ArtistCard
                artist={artist}
                hovered={hoveredCard === artist.id}
                onHoverStart={() => setHoveredCard(artist.id)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => handleArtistClick(artist.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>

      {/* FEATURE SECTION */}
      <Container className="py-5 bg-light">
        <h2 className="fw-bold mb-4">Why Fan Pass?</h2>

        <Row className="g-4">

          {/* Feature 1 */}
          <Col md={6}>
            <div className="d-flex gap-3">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M12 6v6l4 2" strokeWidth="2" />
              </svg>
              <div>
                <h4 className="fw-bold">Fast & Secure</h4>
                <p>Buy and sell tickets with confidence.</p>
              </div>
            </div>
          </Col>

          {/* Feature 2 */}
          <Col md={6}>
            <div className="d-flex gap-3">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
              </svg>
              <div>
                <h4 className="fw-bold">Smart Pricing</h4>
                <p>Fair resale prices. No outrageous markups.</p>
              </div>
            </div>
          </Col>

        </Row>
      </Container>

      {/* FOOTER */}
      <Footer/>
    </PageFade>
  );
}
