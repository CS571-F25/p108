import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import getGlobalStyles from "../../styles/globalStyles";
import NavBar from '../Navbar';
import EventCard from '../EventCard';
import Footer from '../Footer';
import { useParams, useNavigate } from "react-router-dom";
import PageFade from '../PageFade';

// ✅ FIREBASE
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export default function ArtistPage() {
  const [favorites, setFavorites] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [artist, setArtist] = useState(null);
  const [events, setEvents] = useState([]);
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // ✅ ROUTE PARAM
  const { id } = useParams();        // "1"
  const artistId = id;              // STRING → for Firestore doc()

  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/artist/${artistId}/event/${eventId}`);
  };

  // ✅ LOAD ARTIST (doc ID must be STRING)
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const ref = doc(db, "artists", artistId);   // ✅ STRING ID
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setArtist({ id: snap.id, ...snap.data() });
        } else {
          console.error("❌ Artist not found");
        }
      } catch (err) {
        console.error("❌ Error loading artist:", err);
      } finally {
        setLoadingArtist(false);
      }
    };

    fetchArtist();
  }, [artistId]);

  // ✅ LOAD EVENTS (artistId is NUMBER in Firestore)
useEffect(() => {
  const fetchEvents = async () => {
    try {
      const q = query(
        collection(db, "events"),
        where("artistId", "==", artistId)
      );

      const snapshot = await getDocs(q);

      const fetchedEvents = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .sort((a, b) => Number(a.day) - Number(b.day)); // ✅ SORTED

      setEvents(fetchedEvents);
    } catch (err) {
      console.error("❌ Error loading events:", err);
    } finally {
      setLoadingEvents(false);
      console.log("Route ID (string):", artistId);
    }
  };

  fetchEvents();
}, [artistId]);


  const toggleFavorite = (eventId) => {
    setFavorites(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const styles = getGlobalStyles(
    artist?.image || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200'
  );

  return (
    <PageFade>
      <div>

        {/* NAVIGATION */}
        <NavBar />

        {/* HERO HEADER */}
        <section style={styles.hero}   aria-hidden="true">
          <div style={styles.heroOverlay}></div>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle} className="display-3 fw-bold mb-3">
              {loadingArtist ? "Loading..." : artist?.name}
            </h1>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <Container className="mt-5 mb-5">
          <h2 style={styles.sectionTitle}>
            All {artist?.name || ""} Tickets
          </h2>

          <Row>
            <Col lg={10} className="mx-auto">

              {loadingEvents ? (
                <p className="text-center">Loading events...</p>
              ) : events.length === 0 ? (
                <p className="text-center">No events available.</p>
              ) : (
                events.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    styles={styles}
                    hovered={hoveredCard === event.id}
                    onHoverStart={() => setHoveredCard(event.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    isFavorite={favorites.includes(event.id)}
                    onToggleFavorite={() => toggleFavorite(event.id)}
                    onClick={() => handleEventClick(event.id)}
                  />
                ))
              )}

            </Col>
          </Row>
        </Container>

        <Footer />
      </div>
    </PageFade>
  );
}
