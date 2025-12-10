import React from "react";
import { Card } from "react-bootstrap";

export default function ArtistCard({
  artist,
  hovered,
  onHoverStart,
  onHoverEnd,
  onClick,
}) {
  const cardStyle = {
    cursor: "pointer",
    transform: hovered ? "translateY(-6px) scale(1.02)" : "scale(1)",
    transition: "all 0.35s ease",
    backgroundColor: "#fff",
    height: "320px",
    borderRadius: "22px",
    overflow: "hidden",
    border: "none",
    boxShadow: hovered
      ? "0 18px 44px rgba(232, 62, 140, 0.28)"
      : "0 10px 26px rgba(0,0,0,0.12)",
  };

  const imageStyle = {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    filter: hovered ? "brightness(0.85)" : "brightness(0.95)",
    transition: "all 0.35s ease",
  };

  const overlayStyle = {
    background:
      "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.75) 100%)",
    display: "flex",
    alignItems: "flex-end",
    padding: "22px",
  };

  const titleStyle = {
    color: "white",
    fontWeight: "800",
    fontSize: "20px",
    letterSpacing: "0.6px",
    margin: 0,
    textShadow: "0 3px 10px rgba(0,0,0,0.4)",
  };

  return (
    <Card
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={cardStyle}
    >
      {/* IMAGE */}
      {artist.image && (
        <Card.Img src={artist.image} alt={artist.name} style={imageStyle} />
      )}

      {/* OVERLAY */}
      <Card.ImgOverlay style={overlayStyle}>
        <Card.Title style={titleStyle}>{artist.name}</Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
}
