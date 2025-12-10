import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab, Card, Button } from "react-bootstrap";
import { data, useNavigate } from "react-router-dom";
import NavBar from "../Navbar";
import Footer from "../Footer";
import PageFade from "../PageFade";

// ✅ FIREBASE
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc
} from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bought, setBought] = useState([]);
  const [sold, setSold] = useState([]);
  const [listed, setListed] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ AUTH GUARD
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) navigate("/login");
      else setUser(u);
    });

    return () => unsub();
  }, []);

  // ✅ HYDRATE TICKETS WITH ARTIST + EVENT DATA
  const hydrateTickets = async (ticketDocs) => {
    return await Promise.all(
      ticketDocs.map(async (docSnap) => {
        const ticket = { id: docSnap.id, ...docSnap.data() };

        const eventSnap = await getDoc(doc(db, "events", ticket.eventId));
        const artistSnap = await getDoc(
          doc(db, "artists", ticket.artistId)
        );

        return {
          ...ticket,
          eventDate: eventSnap.data()?.date,
          venue: eventSnap.data()?.venue,
          location: eventSnap.data()?.location,
          artistName: artistSnap.data()?.name
        };
      })
    );
  };

useEffect(() => {
  if (!user || !user.uid) {
    console.log("⏳ No user yet in effect:", user);
    return;
  }

  console.log("👤 Profile effect running for UID:", user.uid);

  const loadProfileData = async () => {
    try {
      /* ========== BOUGHT ORDERS ========== */
      console.log("🔎 Querying orders for user:", user.uid);

      const ordersQ = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        where("status", "==", "completed")
      );

      const orderSnap = await getDocs(ordersQ);
      console.log("📦 ordersSnap.size =", orderSnap.size);

      const hydratedOrders = await Promise.all(
        orderSnap.docs.map(async (docSnap, idx) => {
          console.log("➡️ Hydrating order idx", idx, "id", docSnap.id);
          const order = { id: docSnap.id, ...docSnap.data() };
          console.log("   Raw order data:", order);

          // EVENT
          const eventRef = doc(db, "events", order.eventId);
          const eventSnap = await getDoc(eventRef);
          console.log("   eventSnap.exists?", eventSnap.exists());
          const eventData = eventSnap.exists() ? eventSnap.data() : {};
          console.log("   eventData:", eventData);

          // ARTIST
          let artistData = {};
          if (eventData.artistId) {
            const artistRef = doc(db, "artists", eventData.artistId);
            const artistSnap = await getDoc(artistRef);
            console.log("   artistSnap.exists?", artistSnap.exists());
            if (artistSnap.exists()) artistData = artistSnap.data();
          } else {
            console.log("   ⚠️ No artistId on event", order.eventId);
          }

          // TICKETS
          console.log("   order.tickets =", order.tickets);
          const ticketDocs = Array.isArray(order.tickets)
            ? await Promise.all(
                order.tickets.map((ticketId) => {
                  console.log("      fetching ticket", ticketId);
                  return getDoc(doc(db, "tickets", ticketId));
                })
              )
            : [];

          const hydratedTickets = ticketDocs
            .filter(t => t.exists())
            .map(t => {
              const data = t.data();
              console.log("      ✅ ticket", t.id, data);
              return { id: t.id, ...data };
            });

          console.log("   ✅ About to return hydrated order object for", docSnap.id);

          return {
            ...order,
            artistName: artistData.name || "",
            venue: eventData.venue || "",
            location: eventData.location || "",
            date: eventData.date || "",
            tickets: hydratedTickets
          };
        })
      );

      console.log("✅ hydratedOrders:", hydratedOrders);
      setBought(hydratedOrders);

      /* ========== SOLD TICKETS ========== */
      console.log("🔎 Querying SOLD tickets for seller:", user.uid);

      const soldQ = query(
        collection(db, "tickets"),
        where("sellerId", "==", user.uid),
        where("status", "==", "sold")
      );

      const soldSnap = await getDocs(soldQ);
      console.log("📦 soldSnap.size =", soldSnap.size);
      soldSnap.docs.forEach(d =>
        console.log("   SOLD raw ticket:", d.id, d.data())
      );

      const hydratedSold = await hydrateTickets(soldSnap.docs);
      console.log("✅ hydratedSold:", hydratedSold);
      setSold(hydratedSold);

      /* ========== ACTIVE LISTINGS ========== */
      console.log("🔎 Querying LISTED tickets for seller:", user.uid);

      const listedQ = query(
        collection(db, "tickets"),
        where("sellerId", "==", user.uid),
        where("status", "in", ["available", "reserved"])
      );

      const listedSnap = await getDocs(listedQ);
      console.log("📦 listedSnap.size =", listedSnap.size);
      listedSnap.docs.forEach(d =>
        console.log("   LISTED raw ticket:", d.id, d.data())
      );

      const hydratedListed = await hydrateTickets(listedSnap.docs);
      console.log("✅ hydratedListed:", hydratedListed);
      setListed(hydratedListed);

    } catch (err) {
      console.error("❌ Error in loadProfileData:", err);
    } finally {
      setLoading(false);
    }
  };

  loadProfileData();
}, [user]);



  // ✅ DELETE LISTING
  const deleteListing = async (ticketId) => {
    if (!window.confirm("Delete this listing permanently?")) return;

    try {
      await deleteDoc(doc(db, "tickets", ticketId));
      setListed(prev => prev.filter(t => t.id !== ticketId));
      alert("✅ Listing deleted.");
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Delete failed.");
    }
  };

  return (
    <PageFade>

      <Container className="mt-5 mb-5">
        <h1 className="mb-4">Your Profile</h1>

        {loading ? (
          <p>Loading your account...</p>
        ) : (
          <Tabs defaultActiveKey="bought" className="mb-4">
            {/*BOUGHT */}
        <Tab eventKey="bought" title="Bought Tickets">
          {bought.length === 0 ? (
            <p>You haven't purchased any tickets yet.</p>
          ) : (
            bought.map(order => (
              <Card key={order.id} className="p-3 mb-3">
                <strong>{order.artistName}</strong>
                <div>{order.venue} — {order.location}</div>
                <div>Date: {order.date}</div>

                <div className="mt-2">
                  {order.tickets.map(ticket => (
                    <div key={ticket.id}>
                      Section {ticket.section}, Row {ticket.row}, Seat {ticket.seats}
                    </div>
                  ))}
                </div>

                <div className="mt-2">
                  Total Paid: ${order.total}
                </div>

                <div>Status: {order.status}</div>
                <small className="text-muted">Order ID: {order.id}</small>
              </Card>
            ))
          )}
        </Tab>


            {/* ✅ SOLD */}
            <Tab eventKey="sold" title="Sold Tickets">
              {sold.length === 0 ? (
                <p>You haven't sold any tickets yet.</p>
              ) : (
                sold.map(ticket => (
                  <Card key={ticket.id} className="p-3 mb-3">
                    <strong>{ticket.artistName}</strong>
                    <div>{ticket.venue} — {ticket.location}</div>
                    <div>Date: {ticket.eventDate}</div>

                    <div className="mt-2">
                      Section {ticket.section}, Row {ticket.row}, Seat {ticket.seats}
                    </div>

                    <div>Sold For: ${ticket.price}</div>
                  </Card>
                ))
              )}
            </Tab>

            {/* ✅ ACTIVE LISTINGS */}
            <Tab eventKey="listed" title="My Listings">
              {listed.length === 0 ? (
                <p>You have no active listings.</p>
              ) : (
                listed.map(ticket => (
                  <Card key={ticket.id} className="p-3 mb-3">
                    <strong>{ticket.artistName}</strong>
                    <div>{ticket.venue} — {ticket.location}</div>
                    <div>Date: {ticket.eventDate}</div>

                    <div className="mt-2">
                      Section {ticket.section}, Row {ticket.row}, Seat {ticket.seats}
                    </div>

                    <div>Price: ${ticket.price}</div>
                    <div>Status: {ticket.status}</div>

                    <div className="mt-2">

                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => deleteListing(ticket.id)}
                      >
                        Delete Listing
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </Tab>

          </Tabs>
        )}
      </Container>
    </PageFade>
  );
}
