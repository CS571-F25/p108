import theme from "./theme";

const getGlobalStyles = (artistImage) => ({
  /* ========== APP WRAPPER ========== */
  appContainer: {
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    boxSizing: "border-box",
    backgroundColor: "#FBF8FA", // soft blush background
  },

  /* ========== NAVBAR ========== */
  navbar: {
  background: "#b0555bff",
  padding: "18px 60px",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0 6px 24px rgba(201, 124, 130, 0.12)",
},

logo: {
  fontSize: "24px",
  fontWeight: "700",
  color: "#ffffffff",
  letterSpacing: "0.5px",
  textDecoration: "none",
},

navLink: {
  fontSize: "14px",
  fontWeight: "600",
  color: "#ffffffff",
  letterSpacing: "0.5px",
  textDecoration: "none",
  transition: "all 0.25s ease",
},

profileBtn: {
  background: "#b0555bff",
  border: "white",
  borderRadius: "30px",
  padding: "10px 28px",
  fontSize: "14px",
  letterSpacing: "0.5px",
  color: "white",
  boxShadow: "0 6px 24px rgba(201, 124, 130, 0.3)",
  transition: "all 0.3s ease",
},

authBtnOutline: {
  background: "transparent",
  border: "2px solid #F0E4E8",
  borderRadius: "30px",
  padding: "10px 26px",
  fontSize: "14px",
  letterSpacing: "0.5px",
  color: "#C97C83",
  transition: "all 0.3s ease",
},


  /* ========== SECTION WRAPPERS ========== */
  section: {
    padding: "90px 60px",
    width: "100%",
    boxSizing: "border-box",
  },

sectionTitle: {
  fontSize: "32px",
  marginBottom: "40px",
  color: "#2b2b2b",
},


  /* ========== ARTIST GRID ========== */
  artistGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "30px",
    marginTop: "40px",
    padding: "1000px"
  },

  artistCard: {
    position: "relative",
    height: "260px",
    borderRadius: "26px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.4s ease",
    backgroundColor: "white",
    boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
  },

  artistCardHover: {
    transform: "translateY(-6px)",
    boxShadow: "0 26px 60px rgba(201,124,131,0.28)",
  },

  artistImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  artistOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "22px",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.75))",
    color: "white",
    fontSize: "20px",
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: "0.7px",
  },

  /* ========== EVENT CARDS ========== */
  eventCard: {
    backgroundColor: "white",
    borderRadius: "26px",
    padding: "36px",
    marginBottom: "28px",
    display: "flex",
    alignItems: "center",
    minHeight: "180px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
    transition: "all 0.35s ease",
  },

  eventCardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 26px 60px rgba(201,124,131,0.28)",
  },

  dateBox: {
    textAlign: "center",
    minWidth: "92px",
    backgroundColor: "rgba(219, 162, 167, 0.15)",
    borderRadius: "20px",
    padding: "16px 10px",
    height: "120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  dateMonth: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#b0555bff",
    letterSpacing: "1px",
  },

  dateDay: {
    fontSize: "38px",
    fontWeight: "900",
    color: "#b0555bff",
    lineHeight: 1,
  },

  dateDayOfWeek: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#5b5b61ff",
    letterSpacing: "1px",
  },

  badge: {
    backgroundColor: "#E83E8C",
    color: "white",
    padding: "6px 16px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "800",
    display: "inline-block",
  },

eventArtist: {
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "10px",
  letterSpacing: "-0.01em",
},


  eventInfo: {
    fontSize: "15px",
    color: "#6F7285",
    marginBottom: "6px",
  },

  ticketsRemaining: {
    color: "#E83E8C",
    fontSize: "14px",
    fontWeight: "800",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  favoriteBtn: {
    backgroundColor: "white",
    border: "2px solid #EADFE3",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
  },

  favoriteBtnActive: {
    backgroundColor: "#E83E8C",
    borderColor: "#E83E8C",
    color: "white",
  },

seeTicketsBtn: {
  fontSize: "14px",
  fontWeight: "700",
  letterSpacing: "0.3px",
  backgroundColor: "#b0555bff",
  borderColor: "#b0555bff",
},


/* ========== FOOTER ========== */
footer: {
  backgroundColor: "#de7497db",     // soft warm blush
  color: "#2b2b2b",
  padding: "90px 60px 36px",
  width: "100%",
  boxSizing: "border-box",
  borderTop: "1px solid rgba(201,124,131,0.25)",  // blush divider
},

footerContent: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "56px",                    // more airy
  marginBottom: "44px",
},

footerTitle: {
  fontSize: "12px",
  fontWeight: "800",
  textTransform: "uppercase",
  letterSpacing: "1.6px",
  marginBottom: "18px",
  color: "#2b2b2b",
},

footerLink: {
  color: "#8A6A6A",               // muted blush-brown (very chic)
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  marginBottom: "12px",
  transition: "all 0.2s ease",
},

footerLinkHover: {               // optional for hover
  color: "#C97C83",
},

footerBottom: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "28px",
  borderTop: "1px solid rgba(201,124,131,0.25)",
},


hero: {
  backgroundImage: artistImage
    ? `url(${artistImage})`
    : "linear-gradient(135deg, #f3c6ce, #f8e8ec)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "440px",
  display: "flex",              // ✅
  alignItems: "center",         // ✅ vertical center
  justifyContent: "center",     // ✅ horizontal center
  position: "relative",
  width: "100%",
},


heroOverlay: {
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.35)",
  zIndex: 1
},

heroContent: {
  position: "relative",
  zIndex: 2,
  color: "white",
  textAlign: "center"
}
});

export default getGlobalStyles;

