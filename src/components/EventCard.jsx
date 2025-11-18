import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function EventCard({
  event,
  hovered,
  onHoverStart,
  onHoverEnd,
  onToggleFavorite,
  isFavorite,
  styles,
  onClick
}) {
  return (
    <Card
      className="p-3 mb-3"
      style={{
        ...styles.eventCard,
        ...(hovered ? styles.eventCardHover : {})
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <Row>

  {/* Date Section */}
  <Col xs={3} lg={2} className="text-center">
    <div style={styles.dateMonth}>{event.date}</div>
    <div style={styles.dateDay}>{event.day}</div>
    <div style={styles.dateDayOfWeek}>{event.dayOfWeek}</div>

    {event.badge && (
      <div className="mt-2">
        <span style={styles.badge}>{event.badge}</span>
      </div>
    )}
  </Col>

  {/* Event Details */}
  <Col xs={6} lg={7}>
    <h5 style={styles.eventArtist}>{event.artist}</h5>

    <div style={styles.eventInfo}>
      {event.time} | {event.venue} | 🇺🇸 {event.location}
    </div>

    {event.ticketsRemaining && (
      <div style={styles.ticketsRemaining}>
        <svg width="16" height="16" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
        </svg>
        {event.ticketsRemaining}
      </div>
    )}

    {event.specialNote && (
      <div style={styles.specialNote}>
        <svg width="16" height="16" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
        </svg>
        {event.specialNote}
      </div>
    )}
  </Col>

  {/* Favorite + Button */}
  <Col 
    xs={3} 
    lg={3}
    className="d-flex flex-column justify-content-center align-items-end gap-2"
  >
    <Button
      variant="light"
      style={{
        ...styles.favoriteBtn,
        ...(isFavorite ? styles.favoriteBtnActive : {})
      }}
      onClick={onToggleFavorite}
    >
      <svg
        width="20"
        height="20"
        fill={isFavorite ? "white" : "none"}
        stroke={isFavorite ? "white" : "#dee2e6"}
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </Button>

    <Button style={styles.seeTicketsBtn} onClick={()=>onClick(event.id)}>See Tickets</Button>
  </Col>

</Row>

    </Card>
  );
}
