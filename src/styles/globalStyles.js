import theme from "./theme";

const getGlobalStyles = (artistImage) => ({
  appContainer: {
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    boxSizing: "border-box",
  },

  navbar: {
    backgroundColor: theme.colors.primary,
    padding: "15px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
  },

  logo: {
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  navLinks: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },

  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    cursor: "pointer",
  },

  profileBtn: {
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid white",
    borderRadius: "20px",
    padding: "8px 25px",
    cursor: "pointer",
    fontSize: "16px",
  },

  hero: {
    backgroundImage: artistImage ? `url(${artistImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },

  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  heroContent: {
    position: "relative",
    zIndex: 1,
    color: "white",
    textAlign: "center",
  },

  heroTitle: {
    fontSize: "56px",
    fontWeight: "bold",
    margin: 0,
  },

  heroSubtitle: {
    fontSize: "20px",
    fontWeight: "300",
    marginTop: "10px",
  },

  section: {
    padding: "60px 50px",
    backgroundColor: "#f8f9fa",
    width: "100%",
    boxSizing: "border-box",
  },

  container: {
    padding: theme.spacing.pagePadding,
    backgroundColor: theme.colors.backgroundLight,
    minHeight: "100vh",
  },

  sectionTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#333",
  },

  artistGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },

  artistCard: {
    position: "relative",
    height: "200px",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  artistCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
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
    padding: "15px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
  },

  featureSection: {
    padding: "60px 50px",
    backgroundColor: "white",
    width: "100%",
    boxSizing: "border-box",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "40px",
    marginTop: "40px",
  },

  featureItem: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  },

  featureIcon: {
    width: "48px",
    height: "48px",
    color: "#667eea",
    flexShrink: 0,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },

  featureText: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
  },

  footer: {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "50px 50px 20px",
    width: "100%",
    boxSizing: "border-box",
  },

  footerContent: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "40px",
    marginBottom: "40px",
  },

  footerColumn: {
    display: "flex",
    flexDirection: "column",
  },

  footerTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
  },

  footerLinks: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  footerLink: {
    color: "#bdc3c7",
    fontSize: "14px",
    cursor: "pointer",
    transition: "color 0.3s",
    marginBottom: "5px",
  },

  footerBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20px",
    borderTop: "1px solid #34495e",
  },

  socialLinks: {
    display: "flex",
    gap: "20px",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  socialIcon: {
    width: "24px",
    height: "24px",
    fill: "#bdc3c7",
    cursor: "pointer",
    transition: "fill 0.3s",
  },

  eventCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "20px",
    display: "flex",
    gap: "25px",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.3s",
  },

  eventCardHover: {
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  },

  dateBox: {
    textAlign: "center",
    minWidth: "80px",
  },

  dateMonth: {
    fontSize: "14px",
    fontWeight: "bold",
    color: theme.colors.purple,
    textTransform: "uppercase",
  },

  dateDay: {
    fontSize: "42px",
    fontWeight: "bold",
    color: theme.colors.purple,
    lineHeight: 1,
  },

  dateDayOfWeek: {
    fontSize: "14px",
    fontWeight: "bold",
    color: theme.colors.purple,
    textTransform: "uppercase",
  },

  badgeContainer: {
    marginTop: "5px",
  },

  badge: {
    backgroundColor: theme.colors.accentPink,
    color: "white",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
    display: "inline-block",
  },

  eventDetails: {
    flex: 1,
  },

  eventArtist: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "8px",
  },

  eventInfo: {
    fontSize: "16px",
    color: theme.colors.textGray,
    marginBottom: "4px",
  },

  ticketsRemaining: {
    color: theme.colors.accentPink,
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },

  specialNote: {
    color: theme.colors.textGray,
    fontSize: "14px",
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },

  eventActions: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  favoriteBtn: {
    backgroundColor: "transparent",
    border: `2px solid ${theme.colors.borderGray}`,
    borderRadius: "50%",
    width: "45px",
    height: "45px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
  },

  favoriteBtnActive: {
    backgroundColor: theme.colors.accentPink,
    borderColor: theme.colors.accentPink,
  },

  seeTicketsBtn: {
    backgroundColor: "transparent",
    color: theme.colors.purple,
    border: `2px solid ${theme.colors.purple}`,
    borderRadius: "25px",
    padding: "10px 30px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s",
  },
});

export default getGlobalStyles;