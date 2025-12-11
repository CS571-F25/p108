import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../Navbar";
import ArtistCard from "../ArtistCard";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import PageFade from "../PageFade";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleArtistClick = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const snapshot = await getDocs(collection(db, "artists"));
        const fetchedArtists = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArtists(fetchedArtists);
      } catch (err) {
        console.error("âŒ Error loading artists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <PageFade>
      {/* â–‘â–‘â–‘ HERO â–‘â–‘â–‘ */}
<div
  className="text-white text-center d-flex flex-column justify-content-center align-items-center"
  style={{
    height: "420px",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* ✅ ACCESSIBLE HERO IMAGE */}
  <img
    src="https://i.pinimg.com/1200x/e8/68/ab/e868ab4129c0999d3294b913555c9418.jpg"
    alt="Concert crowd at night with stage lights"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
    }}
  />

  {/* ✅ DARK OVERLAY */}
  <div
    className="position-absolute top-0 start-0 end-0 bottom-0"
    style={{ backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1 }}
  />

  {/* ✅ TEXT CONTENT */}
  <div className="position-relative" style={{ zIndex: 2 }}>
    <h1 className="display-3 fw-bold mb-3">FanPass</h1>
    <p className="fs-5 opacity-75">
      A fan-first ticket marketplace built for fair resale.
    </p>
  </div>
</div>


      {/* â–‘â–‘â–‘ ARTIST GRID â–‘â–‘â–‘ */}
      <Container className="py-5">
        <h2 className="fw-bold mb-4">Your Artists</h2>

        {loading ? (
          <p className="text-center py-5">Loading artistsâ€¦</p>
        ) : artists.length === 0 ? (
          <p className="text-center py-5">No artists available.</p>
        ) : (
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
        )}
      </Container>

      {/* â–‘â–‘â–‘ FEATURE STRIP â–‘â–‘â–‘ */}
      <div style={{ backgroundColor: "#FBF8FA" }}>
        <Container className="py-5">
          <h2 className="fw-bold mb-4 text-center">Why FanPass?</h2>

          <Row className="g-4">
            <Col md={6}>
              <div className="p-4 h-100 bg-white rounded shadow-sm">
                <h3 className="fw-bold mb-2">Fast & Secure</h3>
                <p className="mb-0 text-muted">
                  Buy and sell tickets with real-time protection and verified
                  sellers.
                </p>
              </div>
            </Col>

            <Col md={6}>
              <div className="p-4 h-100 bg-white rounded shadow-sm">
                <h3 className="fw-bold mb-2">Smart Pricing</h3>
                <p className="mb-0 text-muted">
                  Fair resale pricing no outrageous markups.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </PageFade>
  );
}