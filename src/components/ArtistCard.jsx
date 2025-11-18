import React from "react";
import { Card } from "react-bootstrap";

export default function ArtistCard({ artist, hovered, onHoverStart, onHoverEnd, onClick }) {
  const cardStyle = {
    cursor: "pointer",
    transform: hovered ? "scale(1.03)" : "scale(1)",
    transition: "0.3s",
    backgroundColor: artist.color || "#ddd",
    height: "300px",
    overflow: "hidden",
  };

  return (
    <Card 
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={cardStyle}
    >
      {artist.image && (
        <Card.Img 
          src={artist.image} 
          alt={artist.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <Card.ImgOverlay className="d-flex align-items-end">
        <Card.Title className="text-white fw-bold">
          {artist.name}
        </Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
}
