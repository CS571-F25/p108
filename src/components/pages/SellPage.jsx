import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar";
import Footer from "../Footer";
import PageFade from "../PageFade";
import getGlobalStyles from "../../styles/globalStyles";

// ✅ FIREBASE
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function SellTicketPage() {
  const navigate = useNavigate();
  const styles = getGlobalStyles(null);

  const [user, setUser] = useState(null);
  const [artists, setArtists] = useState([]);
  const [events, setEvents] = useState([]);

  const [artistId, setArtistId] = useState("");
  const [eventId, setEventId] = useState("");

  const [section, setSection] = useState("");
  const [row, setRow] = useState("");
  const [seat, setSeat] = useState("");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ✅ AUTH GUARD
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) navigate("/login");
      else setUser(u);
    });

    return () => unsub();
  }, []);

  // ✅ LOAD ARTISTS
  useEffect(() => {
    const fetchArtists = async () => {
      const snap = await getDocs(collection(db, "artists"));
      setArtists(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };

    fetchArtists();
  }, []);

  // ✅ LOAD EVENTS WHEN ARTIST CHANGES
  useEffect(() => {
    if (!artistId) {
      setEvents([]);
      setEventId("");
      return;
    }

    const fetchEvents = async () => {
      const q = query(
        collection(db, "events"),
        where("artistId", "==", artistId)
      );

      const snap = await getDocs(q);
      setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchEvents();
  }, [artistId]);

  // ✅ SUBMIT TICKET
  const submitTicket = async (e) => {
    e.preventDefault();

    if (!artistId || !eventId || !section || !row || !seat || !price) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, "tickets"), {
        artistId,
        eventId,
        section,
        row,
        seats: Number(seat),
        price: Number(price),
        status: "available",
        sellerId: user.uid,
        createdAt: serverTimestamp()
      });

      alert("✅ Ticket listed successfully!");
      
      // Reset form
      setArtistId("");
      setEventId("");
      setSection("");
      setRow("");
      setSeat("");
      setPrice("");
      
      navigate("/");
    } catch (err) {
      console.error("Ticket listing failed:", err);
      alert("Failed to list ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  const pageStyles = {
    container: {
      minHeight: "100vh",
      paddingTop: "60px",
      paddingBottom: "80px",
    },

    headerSection: {
      textAlign: "center",
      marginBottom: "50px",
    },

    pageTitle: {
      fontSize: "48px",
      color: "#2D2D2D",
      marginBottom: "16px",
      letterSpacing: "-0.01em",
    },

    pageSubtitle: {
      fontSize: "18px",
      color: "#666666",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
    },

    formCard: {
      backgroundColor: "white",
      borderRadius: "24px",
      border: "1px solid #F0E4E8",
      boxShadow: "0 8px 32px rgba(201, 124, 130, 0.12)",
      padding: "50px",
      maxWidth: "700px",
      margin: "0 auto",
    },

    sectionHeader: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#E91E63",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "24px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },

    formLabel: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#2D2D2D",
      marginBottom: "10px",
      display: "block",
    },

    formInput: {
      borderRadius: "12px",
      border: "2px solid #F0E4E8",
      padding: "14px 18px",
      fontSize: "15px",
      transition: "all 0.3s ease",
    },

    submitButton: (isDisabled) => ({
      background: isDisabled 
        ? "#E0E0E0"
        : "linear-gradient(135deg, #C97C83, #F2A1B3)",
      color: isDisabled ? "#999999" : "white",
      border: "none",
      borderRadius: "30px",
      padding: "16px 48px",
      fontSize: "16px",
      fontWeight: "700",
      letterSpacing: "0.5px",
      boxShadow: isDisabled 
        ? "none"
        : "0 6px 24px rgba(201, 124, 130, 0.3)",
      transition: "all 0.3s ease",
      cursor: isDisabled ? "not-allowed" : "pointer",
      width: "100%",
      marginTop: "16px",
    }),

    infoBox: {
      background: "linear-gradient(135deg, #FFF5F8, #FFFFFF)",
      borderRadius: "16px",
      padding: "24px",
      border: "1px solid #F8BBD0",
      marginBottom: "30px",
    },

    infoTitle: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#E91E63",
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },

    infoText: {
      fontSize: "14px",
      color: "#666666",
      lineHeight: "1.6",
      margin: 0,
    },

    divider: {
      height: "1px",
      background: "linear-gradient(90deg, transparent, #F0E4E8, transparent)",
      border: "none",
      margin: "40px 0",
    },

    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 0",
      gap: "20px",
    },

    loadingSpinner: {
      width: "50px",
      height: "50px",
      border: "4px solid #F8BBD0",
      borderTop: "4px solid #E91E63",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  };

  const isFormValid = artistId && eventId && section && row && seat && price;

  return (
    <PageFade>

      <div style={pageStyles.container}>
        <Container>
          {/* HEADER */}
          <div style={pageStyles.headerSection}>
            <h1 style={pageStyles.pageTitle}>List Your Ticket</h1>
            <p style={pageStyles.pageSubtitle}>
              Sell your tickets safely and easily. Fill out the form below and 
              your listing will be live instantly.
            </p>
          </div>

          {/* FORM CARD */}
          <div style={pageStyles.formCard}>
            {loading ? (
              <div style={pageStyles.loadingContainer}>
                <div style={pageStyles.loadingSpinner} />
                <p style={{ color: "#666666", fontSize: "16px" }}>
                  Loading form...
                </p>
              </div>
            ) : (
              <>
                {/* INFO BOX */}
                <div style={pageStyles.infoBox}>
                  <div style={pageStyles.infoTitle}>
                    Quick Tips
                  </div>
                  <p style={pageStyles.infoText}>
                    Make sure your ticket details match exactly what's printed on 
                    your ticket. Accurate listings sell faster and help maintain 
                    trust in our community.
                  </p>
                </div>

                <Form onSubmit={submitTicket}>
                  {/* EVENT DETAILS SECTION */}
                  <div style={pageStyles.sectionHeader}>
                    Event Details
                  </div>

                  <Row className="g-3">
                    {/* ARTIST */}
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label style={pageStyles.formLabel}>
                          Artist / Performer
                        </Form.Label>
                        <Form.Select
                          value={artistId}
                          onChange={(e) => setArtistId(e.target.value)}
                          style={pageStyles.formInput}
                          required
                        >
                          <option value="">Select an artist</option>
                          {artists.map(a => (
                            <option key={a.id} value={a.id}>
                              {a.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* EVENT */}
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label style={pageStyles.formLabel}>
                          Event Date & Venue
                        </Form.Label>
                        <Form.Select
                          value={eventId}
                          onChange={(e) => setEventId(e.target.value)}
                          disabled={!artistId}
                          style={{
                            ...pageStyles.formInput,
                            opacity: !artistId ? 0.5 : 1,
                            cursor: !artistId ? "not-allowed" : "pointer",
                          }}
                          required
                        >
                          <option value="">
                            {!artistId ? "Select an artist first" : "Select an event"}
                          </option>
                          {events.map(e => (
                            <option key={e.id} value={e.id}>
                              {e.venue} — {e.date} {e.time}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr style={pageStyles.divider} />

                  {/* SEAT DETAILS SECTION */}
                  <div style={pageStyles.sectionHeader}>
                    Seat Information
                  </div>

                  <Row className="g-3">
                    {/* SECTION */}
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label style={pageStyles.formLabel}>
                          Section
                        </Form.Label>
                        <Form.Control
                          value={section}
                          onChange={(e) => setSection(e.target.value)}
                          placeholder="e.g. 112"
                          style={pageStyles.formInput}
                          required
                        />
                      </Form.Group>
                    </Col>

                    {/* ROW */}
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label style={pageStyles.formLabel}>
                          Row
                        </Form.Label>
                        <Form.Control
                          value={row}
                          onChange={(e) => setRow(e.target.value)}
                          placeholder="e.g. G"
                          style={pageStyles.formInput}
                          required
                        />
                      </Form.Group>
                    </Col>

                    {/* SEAT */}
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label style={pageStyles.formLabel}>
                          Seat #
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={seat}
                          onChange={(e) => setSeat(e.target.value)}
                          placeholder="e.g. 8"
                          style={pageStyles.formInput}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr style={pageStyles.divider} />

                  {/* PRICING SECTION */}
                  <div style={pageStyles.sectionHeader}>
                    Pricing
                  </div>

                  <Form.Group>
                    <Form.Label style={pageStyles.formLabel}>
                      Ticket Price (USD)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="150"
                      style={pageStyles.formInput}
                      min="1"
                      step="0.01"
                      required
                    />
                    <Form.Text style={{ 
                      fontSize: "13px", 
                      color: "#999999",
                      display: "block",
                      marginTop: "8px" 
                    }}>
                      Set a competitive price to sell faster
                    </Form.Text>
                  </Form.Group>

                  {/* SUBMIT BUTTON */}
                  <Button
                    type="submit"
                    style={pageStyles.submitButton(!isFormValid || submitting)}
                    disabled={!isFormValid || submitting}
                    onMouseEnter={(e) => {
                      if (isFormValid && !submitting) {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 8px 32px rgba(201, 124, 130, 0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 6px 24px rgba(201, 124, 130, 0.3)";
                    }}
                  >
                    {submitting ? "Listing Ticket..." : "List Ticket for Sale"}
                  </Button>

                  <p style={{
                    textAlign: "center",
                    fontSize: "13px",
                    color: "#999999",
                    marginTop: "16px",
                    marginBottom: 0,
                  }}>
                    Your listing will be reviewed for authenticity
                  </p>
                </Form>
              </>
            )}
          </div>

        </Container>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        input:focus, select:focus {
          border-color: #E91E63 !important;
          box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1) !important;
          outline: none !important;
        }

        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23E91E63' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 18px center;
          padding-right: 40px;
        }
      `}</style>
    </PageFade>
  );
}