import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import NavBar from "../Navbar";
import Footer from "../Footer";
import PageFade from "../PageFade";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";

import {
  setDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";


// SignupPage.jsx - Almost identical, just different title and form
export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: serverTimestamp()
      });

      navigate("/");
    } catch (err) {
      console.error("❌ Signup failed:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Same pageStyles as LoginPage
  const pageStyles = {
    container: {
      background: "linear-gradient(180deg, #FFF5F8 0%, #FFFFFF 100%)",
      minHeight: "100vh",
      paddingTop: "80px",
      paddingBottom: "80px",
      display: "flex",
      alignItems: "center",
    },

    card: {
      backgroundColor: "white",
      borderRadius: "24px",
      border: "1px solid #F0E4E8",
      boxShadow: "0 8px 32px rgba(201, 124, 130, 0.12)",
      padding: "50px",
      width: "100%",
      maxWidth: "480px",
    },

    title: {
      fontSize: "36px",
      fontWeight: "700",
      color: "#2D2D2D",
      marginBottom: "40px",
      textAlign: "center",
    },

    label: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#2D2D2D",
      marginBottom: "10px",
      display: "block",
    },

    input: {
      borderRadius: "12px",
      border: "2px solid #F0E4E8",
      padding: "14px 18px",
      fontSize: "15px",
      marginBottom: "20px",
    },

    button: (isDisabled) => ({
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
    }),

    footer: {
      textAlign: "center",
      marginTop: "30px",
      fontSize: "15px",
      color: "#666666",
    },

    link: {
      color: "#E91E63",
      fontWeight: "600",
      textDecoration: "none",
    },
  };

  return (
    <PageFade>
      <NavBar />

      <div style={pageStyles.container}>
        <Container className="d-flex justify-content-center">
          <div style={pageStyles.card}>
            <h3 style={pageStyles.title}>Create Account</h3>

            <Form onSubmit={handleSignup}>
              <Form.Group>
                <Form.Label style={pageStyles.label}>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={pageStyles.input}
                  placeholder="Jane Smith"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label style={pageStyles.label}>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={pageStyles.input}
                  placeholder="you@example.com"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label style={pageStyles.label}>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={pageStyles.input}
                  placeholder="At least 6 characters"
                />
                <Form.Text style={{ fontSize: "13px", color: "#999999" }}>
                  Must be at least 6 characters
                </Form.Text>
              </Form.Group>

              <Button
                type="submit"
                style={pageStyles.button(loading)}
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </Form>

            <p style={pageStyles.footer}>
              Already have an account?{" "}
              <Link to="/login" style={pageStyles.link}>Log in</Link>
            </p>
          </div>
        </Container>
      </div>

      <Footer />
    </PageFade>
  );
}