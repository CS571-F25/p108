import React, { useState } from 'react';

function ArtistPage({ artistId, onBack }) {
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

function HomePage({ onArtistClick }) {
  const artists = [
    { id: 1, image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400', name: 'Artist 1' },
    { id: 2, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', name: 'Artist 2' },
    { id: 3, color: '#c77d7d', name: 'Artist 3' },
    { id: 4, color: '#4a90a4', name: 'Artist 4' },
    { id: 5, color: '#5a6c7d', name: 'Artist 5' },
    { id: 6, color: '#8b5fb5', name: 'Artist 6' },
    { id: 7, color: '#2d7d52', name: 'Artist 7' },
    { id: 8, color: '#7b3fa0', name: 'Artist 8' },
    { id: 9, color: '#e683b8', name: 'Artist 9' },
  ];

  const styles = {
    navbar: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      padding: '15px 50px',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
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
      backgroundImage: 'url(https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      position: 'relative',
      textAlign: 'center'
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
      zIndex: 1
    },
    heroTitle: {
      fontSize: '56px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    heroSubtitle: {
      fontSize: '20px',
      fontWeight: '300'
    },
    section: {
      padding: '80px 50px'
    },
    sectionTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '40px'
    },
    artistGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginBottom: '80px'
    },
    artistCard: {
      height: '200px',
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.3s, box-shadow 0.3s',
      position: 'relative'
    },
    artistCardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
    },
    artistImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    artistOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '15px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    featureSection: {
      padding: '60px 50px',
      backgroundColor: '#f8f9fa'
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '40px',
      marginTop: '40px'
    },
    featureItem: {
      display: 'flex',
      gap: '15px'
    },
    featureIcon: {
      width: '24px',
      height: '24px',
      flexShrink: 0
    },
    featureContent: {
      flex: 1
    },
    featureTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    featureText: {
      color: '#6c757d',
      fontSize: '14px',
      lineHeight: '1.6'
    },
    footer: {
      backgroundColor: '#f8f9fa',
      padding: '40px 50px',
      borderTop: '1px solid #dee2e6'
    },
    footerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '30px'
    },
    footerColumn: {
      flex: 1
    },
    footerTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    footerLinks: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    footerLink: {
      color: '#6c757d',
      textDecoration: 'none',
      fontSize: '14px',
      display: 'block',
      marginBottom: '8px',
      cursor: 'pointer'
    },
    footerBottom: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '20px',
      borderTop: '1px solid #dee2e6'
    },
    socialLinks: {
      display: 'flex',
      gap: '15px',
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    socialIcon: {
      width: '20px',
      height: '20px',
      fill: '#6c757d',
      cursor: 'pointer'
    }
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div>
      {/* Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>LOGO HERE.</div>
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
          <h1 style={styles.heroTitle}>Fan Pass</h1>
          <p style={styles.heroSubtitle}>Ticket resell site from fans, for fans</p>
        </div>
      </div>

      {/* Artists Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Your Artists.</h2>
        <div style={styles.artistGrid}>
          {artists.map((artist) => (
            <div 
              key={artist.id} 
              style={{
                ...styles.artistCard,
                backgroundColor: artist.color || 'transparent',
                ...(hoveredCard === artist.id ? styles.artistCardHover : {})
              }}
              onClick={() => onArtistClick(artist.id)}
              onMouseEnter={() => setHoveredCard(artist.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {artist.image && (
                <>
                  <img src={artist.image} alt={artist.name} style={styles.artistImage} />
                  <div style={styles.artistOverlay}>{artist.name}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.featureSection}>
        <h2 style={styles.sectionTitle}>Section heading</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureItem}>
            <svg style={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path d="M12 6v6l4 2" strokeWidth="2"/>
            </svg>
            <div style={styles.featureContent}>
              <h3 style={styles.featureTitle}>Subheading</h3>
              <p style={styles.featureText}>
                Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.
              </p>
            </div>
          </div>

          <div style={styles.featureItem}>
            <svg style={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
            </svg>
            <div style={styles.featureContent}>
              <h3 style={styles.featureTitle}>Subheading</h3>
              <p style={styles.featureText}>
                Body text for whatever you'd like to suggest. Add main takeaway points, quotes, anecdotes, or even a very short story.
              </p>
            </div>
          </div>

          <div style={styles.featureItem}>
            <svg style={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 3v18h18" strokeWidth="2"/>
              <path d="M18 17V9" strokeWidth="2"/>
              <path d="M13 17V5" strokeWidth="2"/>
              <path d="M8 17v-3" strokeWidth="2"/>
            </svg>
            <div style={styles.featureContent}>
              <h3 style={styles.featureTitle}>Subheading</h3>
              <p style={styles.featureText}>
                Body text for whatever you'd like to claim. Add main takeaway points, quotes, anecdotes, or even a very short story.
              </p>
            </div>
          </div>

          <div style={styles.featureItem}>
            <svg style={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" strokeWidth="2"/>
            </svg>
            <div style={styles.featureContent}>
              <h3 style={styles.featureTitle}>Subheading</h3>
              <p style={styles.featureText}>
                Body text for whatever you'd like to type. Add main takeaway points, quotes, anecdotes, or even a very short story.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerColumn}>
            <div style={styles.footerTitle}>Site name</div>
          </div>
          <div style={styles.footerColumn}>
            <div style={styles.footerTitle}>Topic</div>
            <ul style={styles.footerLinks}>
              <li><div style={styles.footerLink}>Page</div></li>
              <li><div style={styles.footerLink}>Page</div></li>
              <li><div style={styles.footerLink}>Page</div></li>
            </ul>
          </div>
          <div style={styles.footerColumn}>
            <div style={styles.footerTitle}>Topic</div>
            <ul style={styles.footerLinks}>
              <li><div style={styles.footerLink}>Page</div></li>
              <li><div style={styles.footerLink}>Page</div></li>
              <li><div style={styles.footerLink}>Page</div></li>
            </ul>
          </div>
          <div style={styles.footerColumn}>
            <div style={styles.footerTitle}>Topic</div>
            <ul style={styles.footerLinks}>
              <li><div style={styles.footerLink}>Page</div></li>
              <li><div style={styles.footerLink}>Page</div></li>
              <li><div style={styles.footerLink}>Page</div></li>
            </ul>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <div style={{...styles.footerLink, marginBottom: 0}}>Site name</div>
          <ul style={styles.socialLinks}>
            <li>
              <svg style={styles.socialIcon} viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </li>
            <li>
              <svg style={styles.socialIcon} viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </li>
            <li>
              <svg style={styles.socialIcon} viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </li>
            <li>
              <svg style={styles.socialIcon} viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default function FanPassWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  const handleArtistClick = (artistId) => {
    setSelectedArtistId(artistId);
    setCurrentPage('artist');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedArtistId(null);
  };

  return (
    <div>
      {currentPage === 'home' && <HomePage onArtistClick={handleArtistClick} />}
      {currentPage === 'artist' && <ArtistPage artistId={selectedArtistId} onBack={handleBackToHome} />}
    </div>
  );
}