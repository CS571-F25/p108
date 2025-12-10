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
  const heartShadow = isFavorite
    ? "0 6px 14px rgba(232, 62, 140, 0.35)"
    : "none";

  return (
    <Card
      style={{
        ...styles.eventCard,
        ...(hovered ? styles.eventCardHover : {})
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <Row className="align-items-center w-100">

        {/* DATE */}
        <Col
          xs={3}
          lg={2}
          className="d-flex justify-content-center align-items-center"
        >
          <div style={styles.dateBox}>
            <div style={styles.dateMonth}>{event.date || "--"}</div>
            <div style={styles.dateDay}>{event.day || "--"}</div>
            <div style={styles.dateDayOfWeek}>{event.dayOfWeek || "--"}</div>

            {/* ✅ INVISIBLE PLACEHOLDER when no badge */}
            <div className="mt-2" style={{ minHeight: "22px" }}>
              {event.badge ? (
                <span style={styles.badge}>{event.badge}</span>
              ) : (
                <span style={{ visibility: "hidden" }}>badge</span>
              )}
            </div>
          </div>
        </Col>

        {/* DETAILS */}
        <Col xs={6} lg={7}>

          <div style={styles.eventInfo}>
            {event.time || "--"} · {event.venue || "TBA"}
          </div>

          <div style={styles.eventInfo}>
            🇺🇸 {event.location || "TBA"}
          </div>

          {/* ✅ INVISIBLE PLACEHOLDER when no ticket count */}
          <div style={{ minHeight: "20px" }}>
            {event.ticketsRemaining ? (
              <div style={styles.ticketsRemaining}>
                🎟 {event.ticketsRemaining}
              </div>
            ) : (
              <span style={{ visibility: "hidden" }}>tickets</span>
            )}
          </div>

          {/* ✅ INVISIBLE PLACEHOLDER when no special note */}
          <div style={{ minHeight: "20px" }}>
            {event.specialNote ? (
              <div style={styles.specialNote}>
                ✨ {event.specialNote}
              </div>
            ) : (
              <span style={{ visibility: "hidden" }}>note</span>
            )}
          </div>
        </Col>

        {/* ACTIONS */}
        <Col
          xs={3}
          lg={3}
          className="d-flex flex-column justify-content-center align-items-end gap-3 h-100"
        >
          <Button
            variant="light"
            style={{
              ...styles.favoriteBtn,
              ...(isFavorite ? styles.favoriteBtnActive : {}),
              boxShadow: heartShadow,
            }}
            onClick={onToggleFavorite}
          >
            <svg
              width="20"
              height="20"
              fill={isFavorite ? "white" : "none"}
              stroke={isFavorite ? "white" : "#b0555bff"}
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Button>

          <Button
            style={styles.seeTicketsBtn}
            onClick={() => onClick(event.id)}
          >
            See Tickets
          </Button>
        </Col>

      </Row>
    </Card>
  );
}
