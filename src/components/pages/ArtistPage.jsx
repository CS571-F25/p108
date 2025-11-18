import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import getGlobalStyles from "../../styles/globalStyles";
import NavBar from '../Navbar';
import EventCard from '../EventCard';
import Footer from '../Footer';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PageFade from '../PageFade';

export default function ArtistPage() {
  const [favorites, setFavorites] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { id } = useParams();      // <-- GET ID FROM ROUTE
  const artistId = parseInt(id);   // convert "1" → 1
  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/artist/${artistId}/event/${eventId}`);
  };

  //fake FETCH data
  const artistData = {
    1: { name: 'Olivia Rodrigo', image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200' },
    2: { name: 'Taylor Swift', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200' },
    3: { name: 'Artist 3', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200' },
    4: { name: 'Artist 4', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200' },
    5: { name: 'Artist 5', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200' },
  };

  const artist =
    artistData[artistId] ||
    { name: 'Artist', image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200' };

  const styles = getGlobalStyles(artist.image);

  const events = [
    {
      id: 1,
      date: 'OCT',
      day: '7',
      dayOfWeek: 'TUE',
      artist: 'Olivia Rodrigo',
      time: '7:30 PM',
      venue: 'Delta Center',
      location: 'Salt Lake City, UT, USA',
      ticketsRemaining: '190 tickets remaining',
      badge: 'Today'
    },
    {
      id: 2,
      date: 'OCT',
      day: '9',
      dayOfWeek: 'THU',
      artist: 'Tate McRae',
      time: '7:30 PM',
      venue: 'CHI Health Center',
      location: 'Omaha, NE, USA',
      badge: 'This week'
    },
    {
      id: 3,
      date: 'OCT',
      day: '11',
      dayOfWeek: 'SAT',
      artist: 'Tate McRae',
      time: '7:30 PM',
      venue: 'Enterprise Center',
      location: 'St. Louis, MO, USA',
      specialNote: "Indigenous Peoples' Day weekend",
      badge: 'This weekend'
    }
  ];

  const toggleFavorite = (eventId) => {
    setFavorites(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <PageFade>
      <div>
      {/* NAVIGATION */}
      <NavBar />

      {/* HERO HEADER */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>{artist.name}</h1>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <Container className="mt-5 mb-5">
        <h2 style={styles.sectionTitle}>All {artist.name} Tickets</h2>

        <Row>
          <Col lg={10} className="mx-auto">
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                styles={styles}
                hovered={hoveredCard === event.id}
                onHoverStart={() => setHoveredCard(event.id)}
                onHoverEnd={() => setHoveredCard(null)}
                isFavorite={favorites.includes(event.id)}
                onToggleFavorite={() => toggleFavorite(event.id)}
                onClick={handleEventClick}
              />
            ))}
          </Col>
        </Row>
      </Container>
      <Footer/>
      </div>
    </PageFade>
  );
}
