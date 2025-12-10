import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../Navbar";
import Footer from "../Footer";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import PageFade from "../PageFade";

// âœ… FIREBASE
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function EventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [groupedSeats, setGroupedSeats] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [bundles, setBundles] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredBundle, setHoveredBundle] = useState(null);

  // âœ… AUTH GUARD
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) navigate("/login");
      else setUser(u);
    });

    return () => unsub();
  }, []);

  // âœ… LOAD TICKETS
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const q = query(
          collection(db, "tickets"),
          where("eventId", "==", eventId),
          where("status", "==", "available")
        );

        const snapshot = await getDocs(q);

        const fetched = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          seatNumber: Number(doc.data().seats)
        }));

        const grouped = {};
        fetched.forEach(t => {
          const key = `${t.section}|||${t.row}`;
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(t);
        });

        Object.values(grouped).forEach(group =>
          group.sort((a, b) => a.seatNumber - b.seatNumber)
        );

        setGroupedSeats(grouped);
      } catch (err) {
        console.error("âŒ Error loading tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [eventId]);

  // âœ… GENERATE ADJACENT BUNDLES
  useEffect(() => {
    const newBundles = [];

    Object.values(groupedSeats).forEach(seats => {
      for (let i = 0; i <= seats.length - quantity; i++) {
        const slice = seats.slice(i, i + quantity);

        let isAdjacent = true;
        for (let j = 1; j < slice.length; j++) {
          if (slice[j].seatNumber !== slice[j - 1].seatNumber + 1) {
            isAdjacent = false;
            break;
          }
        }

        if (isAdjacent) newBundles.push(slice);
      }
    });

    setBundles(newBundles);
    setSelectedBundle(null);
  }, [quantity, groupedSeats]);

  const bundleTotal =
    selectedBundle?.reduce((sum, t) => sum + t.price, 0) || 0;

  // âœ… CREATE ORDER & RESERVE TICKETS
  const checkoutNow = async () => {
    if (!selectedBundle || !user) return;

    try {
      const orderRef = doc(collection(db, "orders"));

      await setDoc(orderRef, {
        userId: user.uid,
        eventId,
        tickets: selectedBundle.map(t => t.id),
        total: bundleTotal,
        status: "pending",
        createdAt: serverTimestamp()
      });

      for (const ticket of selectedBundle) {
        await setDoc(
          doc(db, "tickets", ticket.id),
          { status: "reserved" },
          { merge: true }
        );
      }

      navigate(`/checkout/${orderRef.id}`);
    } catch (err) {
      console.error("âŒ Checkout failed:", err);
      alert("Checkout failed.");
    }
  };

  /* ========== FANPASS BLUSH STYLES ========== */

  const pageHeaderStyle = {
    fontSize: "36px",
    color: "#2b2b2b",
    letterSpacing: "0.5px",
    marginBottom: "36px",
    paddingBottom: "18px",
    borderBottom: "1px solid #F0E7EA"
  };

  const sectionHeaderStyle = {
    fontSize: "18px",
    color: "#2b2b2b",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const bundleCardStyle = (isSelected, isHovered) => ({
    backgroundColor: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "26px",
    padding: "28px",
    marginBottom: "22px",
    border: isSelected ? "2px solid #C97C83" : "1px solid #F0E7EA",
    transition: "all 0.35s ease",
    transform: isHovered || isSelected ? "translateY(-4px)" : "translateY(0)",
    cursor: "pointer"
  });

  const sectionBadgeStyle = {
    backgroundColor: "rgba(201,124,131,0.15)",
    color: "#C97C83",
    fontSize: "13px",
    padding: "8px 18px",
    borderRadius: "999px",
    display: "inline-block",
    marginBottom: "12px",
    letterSpacing: "0.4px"
  };

  const seatInfoStyle = {
    fontSize: "15px",
    color: "#6F7285",
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  };

  const priceStyle = {
    fontSize: "32px",
    color: "#2b2b2b",
    letterSpacing: "-0.02em"
  };

  const summaryBoxStyle = {
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(12px)",
    borderRadius: "28px",
    padding: "34px",
    border: "1px solid #F0E7EA",
    position: "sticky",
    top: "110px"
  };

  return (
    <PageFade>
      <NavBar />

      <Container className="mt-5 mb-5">
        <h1 style={pageHeaderStyle}>Select Your Tickets</h1>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#6F7285" }}>
            Loading available seats...
          </div>
        ) : (
          <Row>

            {/* LEFT COLUMN */}
            <Col lg={8}>
              <div style={sectionHeaderStyle}>How many tickets do you need?</div>

              <Form.Select
                className="mb-4"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{
                  borderRadius: "14px",
                  border: "2px solid #F0E7EA",
                  padding: "12px 16px",
                  fontSize: "15px",
                  fontWeight: "600"
                }}
              >
                {[1, 2, 3, 4].map(n => (
                  <option key={n} value={n}>
                    {n} Ticket{n > 1 ? "s" : ""}
                  </option>
                ))}
              </Form.Select>

              <div style={sectionHeaderStyle}>Available Seat Groups</div>

              {bundles.length === 0 ? (
                <Card style={{
                  borderRadius: "26px",
                  border: "1px solid #F0E7EA",
                  padding: "50px",
                  textAlign: "center"
                }}>
                  <h4 style={{ color: "#6F7285", fontWeight: "700" }}>
                    No adjacent seat groups available
                  </h4>
                  <p style={{ color: "#999999", marginTop: "10px" }}>
                    Try selecting fewer tickets or check back later
                  </p>
                </Card>
              ) : (
                bundles.map((bundle, idx) => {
                  const first = bundle[0];
                  const last = bundle[bundle.length - 1];
                  const total = bundle.reduce((sum, t) => sum + t.price, 0);
                  const isSelected = selectedBundle === bundle;
                  const isHovered = hoveredBundle === idx;

                  return (
                    <div
                      key={idx}
                      style={bundleCardStyle(isSelected, isHovered)}
                      onMouseEnter={() => setHoveredBundle(idx)}
                      onMouseLeave={() => setHoveredBundle(null)}
                      onClick={() => setSelectedBundle(bundle)}
                    >
                      <div style={sectionBadgeStyle}>
                        {first.section}
                      </div>

                      <div style={seatInfoStyle}>
                        {first.row} · Seat {first.seatNumber}
                        {bundle.length > 1 && `“${last.seatNumber}`}
                      </div>

                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "18px"
                      }}>
                        <div style={priceStyle}>
                          ${total}
                        </div>

                        <Button
                          style={{
                            borderRadius: "999px",
                            padding: "10px 30px",
                            backgroundColor: isSelected ? "#C97C83" : "transparent",
                            color: isSelected ? "white" : "#C97C83",
                            border: `2px solid #C97C83`,
                          }}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </Col>

            {/* RIGHT COLUMN */}
            <Col lg={4}>
              <div style={summaryBoxStyle}>
                <h3 style={{
                  fontSize: "24px",
                  color: "#2b2b2b",
                  marginBottom: "20px"
                }}>
                  Order Summary
                </h3>

                {!selectedBundle ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#999999" }}>
                    Select tickets to continue
                  </div>
                ) : (
                  <>
                    <div style={{
                      padding: "20px",
                      backgroundColor: "#FFF5F8",
                      borderRadius: "16px",
                      marginBottom: "20px"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                        <span style={{ color: "#6F7285" }}>Tickets</span>
                        <span>{selectedBundle.length}</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#6F7285" }}>Seats</span>
                        <span>
                          {selectedBundle[0].seatNumber}
                          {selectedBundle.length > 1 &&
                            `â€“${selectedBundle[selectedBundle.length - 1].seatNumber}`}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "24px"
                    }}>
                      <span style={{ fontSize: "18px" }}>Total</span>
                      <span style={{ fontSize: "34px",  color: "#2b2b2b" }}>
                        ${bundleTotal}
                      </span>
                    </div>

                    <Button
                      className="w-100"
                      onClick={checkoutNow}
                      style={{
                        backgroundColor: "#C97C83",
                        border: "none",
                        borderRadius: "999px",
                        padding: "16px",
                        fontSize: "16px",
                      }}
                    >
                      Proceed to Checkout
                    </Button>

                    <p style={{
                      textAlign: "center",
                      fontSize: "13px",
                      color: "#999999",
                      marginTop: "16px",
                      marginBottom: 0
                    }}>
                      Secure checkout
                    </p>
                  </>
                )}
              </div>
            </Col>

          </Row>
        )}
      </Container>

      <Footer />
    </PageFade>
  );
}