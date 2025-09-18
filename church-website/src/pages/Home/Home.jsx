import { Link } from "react-router-dom";
import { useState } from "react";
import { verses } from "./verse";
import "./Home.css";

export default function Home() {
  const events = [
    { id: 1, title: "Sunday Service", image: "/images/eventsExemple.webp", description: "Join us for our weekly Sunday worship service." },
    { id: 2, title: "Youth Meeting", image: "/images/eventsExemple.webp", description: "Our youth group gathers every Friday evening." },
    { id: 3, title: "Bible Study", image: "/images/eventsExemple.webp", description: "Dive deeper into the Word every Wednesday." },
    { id: 4, title: "Community Outreach", image: "/images/eventsExemple.webp", description: "Serving our community with love and compassion." },
    { id: 5, title: "Christmas Concert", image: "/images/eventsExemple.webp", description: "Celebrate the birth of Christ with music and joy." },
    { id: 6, title: "Prayer Night", image: "/images/eventsExemple.webp", description: "Join us for a night of prayer and worship." }
  ];

  const [currentVerse, setCurrentVerse] = useState(new Date().getDate() % verses.length);

  const handleNextVerse = () => {
    setCurrentVerse((prev) => (prev + 1) % verses.length);
  };

  return (
    <div className="home container-home">
      <div className="verse-of-the-day">
        <p>{verses[currentVerse]}</p>
        <button className="next-verse-btn" onClick={handleNextVerse}>
          Next Verse
        </button>
      </div>

      <h2 className="home-title">Latest Events</h2>
      <div className="card-grid">
        {events.map((event) => (
          <div className="card" key={event.id}>
            <img src={event.image} alt={event.title} className="card-image" />
            <div className="card-content">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <Link to={`/events/${event.id}`} className="btn">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
