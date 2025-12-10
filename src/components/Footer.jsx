import getGlobalStyles from "../styles/globalStyles";
import theme from "../styles/theme";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
const styles = {
  footer: {
    backgroundColor: "#b0555bff", // ✅ your exact blush
    color: "#ffffffff",
    padding: "80px 0 36px",
    marginTop: "90px",
    borderTop: "1px solid #ffffffff",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "0.6px",
    marginBottom: "18px",
    color: "#ffffffff",
  },

  footerTitle: {
    fontSize: "13px",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "16px",
    color: "#ffffffff",
  },

  link: {
    fontSize: "14px",
    color: "#ffffffff",
    marginBottom: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  bottomBar: {
    borderTop: "1px solid rgba(255,255,255,0.35)",
    paddingTop: "24px",
    marginTop: "46px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  },

  copyright: {
    fontSize: "13px",
    color: "#ffffffff",
  },

  socials: {
    display: "flex",
    gap: "20px",
  },

  socialIcon: {
    width: "20px",
    height: "20px",
    fill: "#ffffffff",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
};



  return (
    <footer style={styles.footer}>
      <Container>
        {/* TOP FOOTER */}
        <Row className="mb-4">

          {/* BRAND COLUMN */}
          <Col md={3} className="mb-4">
            <div style={styles.logo}>FanPass</div>
            <p style={{ fontSize: "14px", color: "#ffffffff", lineHeight: 1.7 }}>
              A fan-first ticket marketplace built for fair pricing,
              secure resale, and unforgettable nights.
            </p>
          </Col>

          {/* COLUMN 2 */}
          <Col md={3} className="mb-4">
            <div style={styles.footerTitle}>Browse</div>
            <div style={styles.link}>Artists</div>
            <div style={styles.link}>Events</div>
            <div style={styles.link}>Tickets</div>
          </Col>

          {/* COLUMN 3 */}
          <Col md={3} className="mb-4">
            <div style={styles.footerTitle}>Account</div>
            <div style={styles.link}>My Tickets</div>
            <div style={styles.link}>Favorites</div>
            <div style={styles.link}>Profile</div>
          </Col>

          {/* COLUMN 4 */}
          <Col md={3} className="mb-4">
            <div style={styles.footerTitle}>Support</div>
            <div style={styles.link}>Help Center</div>
            <div style={styles.link}>Safety & Trust</div>
            <div style={styles.link}>Contact Us</div>
          </Col>

        </Row>

        {/* BOTTOM BAR */}
        <div style={styles.bottomBar}>
          <span style={styles.copyright}>
            © {new Date().getFullYear()} FanPass. All rights reserved.
          </span>

          <div style={styles.socials}>

            {/* Facebook */}
            <svg style={styles.socialIcon} viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>

            {/* Twitter/X */}
            <svg style={styles.socialIcon} viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8.09v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>

            {/* YouTube */}
            <svg style={styles.socialIcon} viewBox="0 0 24 24">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>

            {/* Instagram */}
            <svg style={styles.socialIcon} viewBox="0 0 24 24">
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
