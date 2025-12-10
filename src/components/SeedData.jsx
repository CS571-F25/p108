import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";

export default function SeedData() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const seed = async () => {
      const artistSnapshot = await getDocs(collection(db, "artists"));

      const venues = [
        "Madison Square Garden",
        "United Center",
        "Delta Center",
        "American Airlines Center"
      ];

      const cities = [
        "New York, NY",
        "Chicago, IL",
        "Salt Lake City, UT",
        "Dallas, TX"
      ];

      for (const artistDoc of artistSnapshot.docs) {
        const artistId = artistDoc.id;

        // ✅ Exactly 3 events per artist (safe + predictable)
        for (let i = 0; i < 3; i++) {
          const eventRef = await addDoc(collection(db, "events"), {
            artistId,
            date: "OCT",
            day: `${7 + i}`,
            dayOfWeek: ["MON", "TUE", "WED"][i],
            location: cities[i % cities.length],
            time: "7:30 PM",
            venue: venues[i % venues.length]
          });

          const eventId = eventRef.id;

          // ✅ Exactly 3 tickets per event
          for (let t = 0; t < 3; t++) {
            await addDoc(collection(db, "tickets"), {
              artistId,
              eventId,
              price: 75 + t * 25,
              row: String.fromCharCode(65 + t),
              section: `${100 + t}`,
              seats: t + 1,
              sellerId: "SEED_USER",
              status: "available",
              createdAt: Timestamp.now()
            });
          }
        }
      }

      console.log("✅ EVENTS & TICKETS SEEDED SUCCESSFULLY");
      setDone(true);
    };

    seed();
  }, []);

  return (
    <div style={{ padding: "50px", fontSize: "20px" }}>
      {done ? "✅ Seeding Complete! You can now delete this file." : "⏳ Seeding in progress..."}
    </div>
  );
}
