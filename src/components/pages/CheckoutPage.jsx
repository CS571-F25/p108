import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../Navbar";
import Footer from "../Footer";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import PageFade from "../PageFade";

import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function CheckoutPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) navigate("/login");
      else setUser(u);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const loadCheckout = async () => {
      try {
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);

        if (!orderSnap.exists()) throw new Error("Order not found");

        const orderData = { id: orderSnap.id, ...orderSnap.data() };

        if (orderData.userId !== auth.currentUser.uid) {
          navigate("/");
          return;
        }

        setOrder(orderData);

        const q = query(
          collection(db, "tickets"),
          where("__name__", "in", orderData.tickets)
        );

        const ticketSnap = await getDocs(q);

        setTickets(
          ticketSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        );
      } catch (err) {
        console.error("❌ Checkout load failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCheckout();
  }, [orderId]);

  const confirmPurchase = async () => {
    setProcessing(true);

    try {
      await setDoc(
        doc(db, "orders", orderId),
        {
          status: "completed",
          completedAt: serverTimestamp()
        },
        { merge: true }
      );

      for (const t of tickets) {
        await setDoc(
          doc(db, "tickets", t.id),
          { status: "sold" },
          { merge: true }
        );
      }

      alert("✅ Purchase successful!");
      navigate("/profile");
    } catch (err) {
      console.error("❌ Purchase failed:", err);
      alert("Purchase failed.");
    } finally {
      setProcessing(false);
    }
  };

  const pageStyles = {
    container: {
      background: "linear-gradient(180deg, #FFF5F8 0%, #FFFFFF 100%)",
      minHeight: "100vh",
      paddingTop: "60px",
      paddingBottom: "80px",
    },

    pageTitle: {
      fontSize: "48px",
      fontWeight: "700",
      color: "#2D2D2D",
      marginBottom: "50px",
      textAlign: "center",
      fontFamily: "'Playfair Display', serif",
      letterSpacing: "-0.01em",
    },

    checkoutCard: {
      backgroundColor: "white",
      borderRadius: "24px",
      border: "1px solid #F0E4E8",
      padding: "50px",
    },

    sectionHeader: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#2D2D2D",
      marginBottom: "24px",
      paddingBottom: "12px",
      borderBottom: "2px solid #FFF5F8",
    },

    ticketItem: {
      padding: "20px",
      backgroundColor: "#FFF5F8",
      borderRadius: "16px",
      marginBottom: "16px",
    },

    ticketSection: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#2D2D2D",
      marginBottom: "8px",
    },

    ticketDetails: {
      fontSize: "15px",
      color: "#666666",
      marginBottom: "12px",
    },

    priceRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "15px",
      color: "#666666",
    },

    priceValue: {
      fontWeight: "700",
      color: "#2D2D2D",
    },

    divider: {
      height: "1px",
      background: "linear-gradient(90deg, transparent, #F0E4E8, transparent)",
      border: "none",
      margin: "30px 0",
    },

    totalRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },

    totalLabel: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#2D2D2D",
      fontFamily: "'Playfair Display', serif",
    },

    totalAmount: {
      fontSize: "42px",
      fontWeight: "700",
      color: "#E91E63",
      fontFamily: "'Playfair Display', serif",
      letterSpacing: "-0.02em",
    },

    submitButton: (isDisabled) => ({
      background: isDisabled 
        ? "#E0E0E0"
        : "linear-gradient(135deg, #C97C83, #F2A1B3)",
      color: isDisabled ? "#999999" : "white",
      border: "none",
      borderRadius: "30px",
      padding: "18px 48px",
      fontSize: "16px",
      fontWeight: "700",
      letterSpacing: "0.5px",
      transition: "all 0.3s ease",
      cursor: isDisabled ? "not-allowed" : "pointer",
      width: "100%",
    }),

    securityNote: {
      textAlign: "center",
      fontSize: "13px",
      color: "#999999",
      marginTop: "20px",
    },

    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 0",
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

  if (loading || !order) {
    return (
      <PageFade>
        <NavBar />
        <div style={pageStyles.container}>
          <Container>
            <div style={pageStyles.loadingContainer}>
              <div style={pageStyles.loadingSpinner} />
              <p style={{ color: "#666666", fontSize: "16px" }}>
                Loading checkout...
              </p>
            </div>
          </Container>
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </PageFade>
    );
  }

  const fees = 35;
  const total = order.total + fees;

  return (
    <PageFade>
      <div style={pageStyles.container}>
        <Container>
          <h1 style={pageStyles.pageTitle}>Checkout</h1>

          <Row className="justify-content-center">
            <Col lg={8}>
              <div style={pageStyles.checkoutCard}>
                <h2 style={pageStyles.sectionHeader}>Order Summary</h2>

                {tickets.map(t => (
                  <div key={t.id} style={pageStyles.ticketItem}>
                    <div style={pageStyles.ticketSection}>
                      Section {t.section}
                    </div>
                    <div style={pageStyles.ticketDetails}>
                      {t.row}, Seat {t.seats}
                    </div>
                    <div style={pageStyles.priceRow}>
                      <span>Price</span>
                      <span style={pageStyles.priceValue}>${t.price}</span>
                    </div>
                  </div>
                ))}

                <hr style={pageStyles.divider} />

                <div style={{ marginBottom: "20px" }}>
                  <div style={{...pageStyles.priceRow, marginBottom: "12px"}}>
                    <span>Subtotal</span>
                    <span style={pageStyles.priceValue}>${order.total}</span>
                  </div>
                  <div style={pageStyles.priceRow}>
                    <span>Service Fees</span>
                    <span style={pageStyles.priceValue}>${fees}</span>
                  </div>
                </div>

                <hr style={pageStyles.divider} />

                <div style={pageStyles.totalRow}>
                  <span style={pageStyles.totalLabel}>Total</span>
                  <span style={pageStyles.totalAmount}>${total}</span>
                </div>

                <Button
                  style={pageStyles.submitButton(processing)}
                  onClick={confirmPurchase}
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Confirm Purchase"}
                </Button>

                <p style={pageStyles.securityNote}>
                  Secure checkout powered by Fan Pass
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </PageFade>
  );
}