import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function TicketCard({
  section,
  row,
  seats,
  price,
  rating,
  ratingLabel,
  feature,
  onBuy
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBuyHovered, setIsBuyHovered] = useState(false);

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
    boxShadow: isHovered 
      ? "0 8px 24px rgba(233, 30, 99, 0.15)" 
      : "0 4px 16px rgba(233, 30, 99, 0.08)",
    border: isHovered ? "1px solid #F8BBD0" : "1px solid #F0E4E8",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isHovered ? "translateY(-4px)" : "translateY(0)"
  };

  const leftCol = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  };

  const pillRow = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "8px"
  };

  const ratingStyle = {
    background: "linear-gradient(135deg, #F8BBD0, #E1BEE7)",
    color: "#C2185B",
    fontWeight: "700",
    fontSize: "13px",
    padding: "6px 16px",
    borderRadius: "20px",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    boxShadow: "0 2px 8px rgba(233, 30, 99, 0.15)"
  };

  const featureStyle = {
    backgroundColor: "#FFF5F8",
    color: "#666666",
    fontWeight: "600",
    fontSize: "12px",
    padding: "6px 16px",
    borderRadius: "20px",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    border: "1px solid #F0E4E8"
  };

  const sectionTitleStyle = {
    fontSize: "26px",
    fontWeight: "700",
    color: "#2D2D2D",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "4px"
  };

  const locationStyle = {
    color: "#666666",
    fontSize: "15px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  };

  const priceColumn = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "8px",
    minWidth: "120px"
  };

  const priceStyle = {
    fontSize: "42px",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    color: "#E91E63",
    lineHeight: 1,
    fontFamily: "'Playfair Display', serif"
  };

  const feesStyle = {
    fontSize: "13px",
    color: "#666666",
    fontWeight: "500"
  };

  const buyBtnStyle = {
    background: isBuyHovered
      ? "linear-gradient(135deg, #C2185B, #7B1FA2)"
      : "linear-gradient(135deg, #E91E63, #9C27B0)",
    border: "none",
    borderRadius: "30px",
    padding: "14px 36px",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow: isBuyHovered
      ? "0 6px 20px rgba(233, 30, 99, 0.35)"
      : "0 4px 12px rgba(233, 30, 99, 0.25)",
    transition: "all 0.3s ease",
    transform: isBuyHovered ? "translateY(-2px)" : "translateY(0)",
    whiteSpace: "nowrap"
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ========== LEFT INFO ========== */}
      <div style={leftCol}>
        <div style={sectionTitleStyle}>
          {section}
        </div>

        <div style={locationStyle}>
          📍 {row} · Seats {seats}
        </div>

        <div style={pillRow}>
          <span style={ratingStyle}>
            ⭐ {rating} {ratingLabel}
          </span>

          {feature && (
            <span style={featureStyle}>
              🎟️ {feature}
            </span>
          )}
        </div>
      </div>

      {/* ========== PRICE + CTA ========== */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={priceColumn}>
          <div style={priceStyle}>${price}</div>
          <div style={feesStyle}>incl. fees</div>
        </div>

        <Button 
          style={buyBtnStyle} 
          onMouseEnter={() => setIsBuyHovered(true)}
          onMouseLeave={() => setIsBuyHovered(false)}
          onClick={onBuy}
        >
          Buy Ticket
        </Button>
      </div>
    </div>
  );
}