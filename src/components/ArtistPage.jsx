import React, { useState } from 'react';

export default function ArtistPage({ artistId, onBack }) {
  const [favorites, setFavorites] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const artistData = {
    1: { name: 'Olivia Rodrigo', image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200' },
    2: { name: 'Taylor Swift', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200' },
    3: { name: 'Artist 3', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200' },
    4: { name: 'Artist 4', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200' },
    5: { name: 'Artist 5', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200' },
  };

  const artist = artistData[artistId] || { name: 'Artist', image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200' };

  const events = [
    {
      id: 1,
      date: 'OCT',
      day: '7',
      dayOfWeek: 'TUE',
      artist: 'Tate McRae',
      time: '7:30 PM',
      venue: 'Delta Center',
      location: 'Salt Lake City, UT, USA',
      ticketsRemaining: '182 tickets remaining',
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

  const styles = {
    navbar: {
      backgroundColor: '#c77d7d',
      padding: '15px 50px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    navLinks: {
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      listStyle: 'none'
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
      cursor: 'pointer'
    },
    profileBtn: {
      backgroundColor: 'transparent',
      color: 'white',
      border: '2px solid white',
      borderRadius: '20px',
      padding: '8px 25px',
      cursor: 'pointer',
      fontSize: '16px'
    },
    hero: {
      backgroundImage: `url(${artist.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    heroContent: {
      position: 'relative',
      zIndex: 1,
      color: 'white',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '56px',
      fontWeight: 'bold',
      margin: 0
    },
    container: {
      padding: '50px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '30px'
    },
    eventCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '25px',
      marginBottom: '20px',
      display: 'flex',
      gap: '25px',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'box-shadow 0.3s'
    },
    eventCardHover: {
      boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
    },
    dateBox: {
      textAlign: 'center',
      minWidth: '80px'
    },
    dateMonth: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#7b3fa0',
      textTransform: 'uppercase'
    },
    dateDay: {
      fontSize: '42px',
      fontWeight: 'bold',
      color: '#7b3fa0',
      lineHeight: 1
    },
    dateDayOfWeek: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#7b3fa0',
      textTransform: 'uppercase'
    },
    badgeContainer: {
      marginTop: '5px'
    },
    badge: {
      backgroundColor: '#e83e8c',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      display: 'inline-block'
    },
    eventDetails: {
      flex: 1
    },
    eventArtist: {
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    eventInfo: {
      fontSize: '16px',
      color: '#6c757d',
      marginBottom: '4px'
    },
    ticketsRemaining: {
      color: '#e83e8c',
      fontSize: '14px',
      fontWeight: 'bold',
      marginTop: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    specialNote: {
      color: '#6c757d',
      fontSize: '14px',
      marginTop: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    eventActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    favoriteBtn: {
      backgroundColor: 'transparent',
      border: '2px solid #dee2e6',
      borderRadius: '50%',
      width: '45px',
      height: '45px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s'
    },
    favoriteBtnActive: {
      backgroundColor: '#e83e8c',
      borderColor: '#e83e8c'
    },
    seeTicketsBtn: {
      backgroundColor: 'transparent',
      color: '#7b3fa0',
      border: '2px solid #7b3fa0',
      borderRadius: '25px',
      padding: '10px 30px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s'
    }
  };

  return (
    <div>
      {/* Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={onBack}>LOGO HERE.</div>
        <ul style={styles.navLinks}>
          <li><div style={styles.navLink}>Support</div></li>
          <li><div style={styles.navLink}>Buy</div></li>
          <li><div style={styles.navLink}>Sell</div></li>
          <li><button style={styles.profileBtn}>Profile</button></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>{artist.name}</h1>
        </div>
      </div>

      {/* Events Section */}
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>All {artist.name} Tickets</h2>
        
        {events.map((event) => (
          <div 
            key={event.id}
            style={{
              ...styles.eventCard,
              ...(hoveredCard === event.id ? styles.eventCardHover : {})
            }}
            onMouseEnter={() => setHoveredCard(event.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.dateBox}>
              <div style={styles.dateMonth}>{event.date}</div>
              <div style={styles.dateDay}>{event.day}</div>
              <div style={styles.dateDayOfWeek}>{event.dayOfWeek}</div>
              <div style={styles.badgeContainer}>
                <span style={styles.badge}>{event.badge}</span>
              </div>
            </div>

            <div style={styles.eventDetails}>
              <div style={styles.eventArtist}>{event.artist}</div>
              <div style={styles.eventInfo}>
                {event.time} | {event.venue} | 🇺🇸 {event.location}
              </div>
              {event.ticketsRemaining && (
                <div style={styles.ticketsRemaining}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {event.ticketsRemaining}
                </div>
              )}
              {event.specialNote && (
                <div style={styles.specialNote}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {event.specialNote}
                </div>
              )}
            </div>

            <div style={styles.eventActions}>
              <button 
                style={{
                  ...styles.favoriteBtn,
                  ...(favorites.includes(event.id) ? styles.favoriteBtnActive : {})
                }}
                onClick={() => toggleFavorite(event.id)}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill={favorites.includes(event.id) ? "white" : "none"}
                  stroke={favorites.includes(event.id) ? "white" : "#dee2e6"}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
              <button style={styles.seeTicketsBtn}>See Tickets</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}