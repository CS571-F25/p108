import getGlobalStyles from "../styles/globalStyles";

import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <Container>
        
        {/* TOP FOOTER CONTENT */}
        <Row className="mb-4">

          {/* Column 1 */}
          <Col md={3} className="mb-4">
            <h5 className="fw-bold">Site name</h5>
          </Col>

          {/* Column 2 */}
          <Col md={3} className="mb-4">
            <h6 className="fw-bold text-uppercase">Topic</h6>
            <ul className="list-unstyled">
              <li>Page</li>
              <li>Page</li>
              <li>Page</li>
            </ul>
          </Col>

          {/* Column 3 */}
          <Col md={3} className="mb-4">
            <h6 className="fw-bold text-uppercase">Topic</h6>
            <ul className="list-unstyled">
              <li>Page</li>
              <li>Page</li>
              <li>Page</li>
            </ul>
          </Col>

          {/* Column 4 */}
          <Col md={3} className="mb-4">
            <h6 className="fw-bold text-uppercase">Topic</h6>
            <ul className="list-unstyled">
              <li>Page</li>
              <li>Page</li>
              <li>Page</li>
            </ul>
          </Col>

        </Row>

        {/* BOTTOM BAR */}
        <div className="d-flex justify-content-between align-items-center border-top pt-3">

          <span className="text-secondary">Site name</span>

          <div className="d-flex gap-3">

            {/* ICON 1 */}
            <svg width="24" height="24" fill="#bbb" viewBox="0 0 24 24" style={{ cursor: "pointer" }}>
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>

            {/* ICON 2 */}
            <svg width="24" height="24" fill="#bbb" viewBox="0 0 24 24" style={{ cursor: "pointer" }}>
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>

            {/* ICON 3 */}
            <svg width="24" height="24" fill="#bbb" viewBox="0 0 24 24" style={{ cursor: "pointer" }}>
              <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>

            {/* ICON 4 */}
            <svg width="24" height="24" fill="#bbb" viewBox="0 0 24 24" style={{ cursor: "pointer" }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>

          </div>

        </div>

      </Container>
    </footer>
  );
}
