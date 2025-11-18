import React from "react";
import { Card, Row, Col, Badge, Image, Button } from "react-bootstrap";

export default function TicketCard({
  image,
  section,
  row,
  seats,
  price,
  rating,
  ratingLabel,
  feature,
  logo,
  onBuy
}) {
  return (
    <Card className="mb-4 shadow-sm border-0 rounded-3 hover-shadow">
      <Row className="g-0">

        {/* CONTENT SECTION */}
        <Col xs={12} md={5} className="p-4 d-flex flex-column justify-content-between">
          <div>
            <h2 className="fw-bold mb-2">{section}</h2>
            <p className="text-muted mb-3">
              {row}, Seats {seats}
            </p>

            {/* Rating + Feature */}
            <div className="d-flex flex-wrap gap-2">
              <Badge bg="success" className="py-2 px-3 fs-6 d-flex align-items-center">
                <span className="fw-bold me-1">{rating}</span>
                {ratingLabel}
              </Badge>

              {feature && (
                <Badge bg="light" text="dark" className="py-2 px-3 fs-6">
                  🎫 {feature}
                </Badge>
              )}
            </div>
          </div>
        </Col>

        {/* PRICE + BUY BUTTON */}
        <Col 
          xs={12} 
          md={3} 
          className="p-4 d-flex flex-column justify-content-center text-md-end text-start gap-2"
          style={{ borderLeft: "1px solid #eee" }}
        >
          <div>
            <div className="fs-1 fw-bold">${price}</div>
            <div className="text-muted small">incl. fees</div>
          </div>
        </Col>
        <Col>
        <Button 
            variant="primary" 
            className="mt-3 fw-bold px-4 py-2"
            onClick={onBuy}
          >
            Buy Ticket
          </Button>
        </Col>

      </Row>
    </Card>
  );
}
