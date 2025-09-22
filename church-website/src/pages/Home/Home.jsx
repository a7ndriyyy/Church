import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next'; 
import "./Home.css";

export default function Home() {
const { t } = useTranslation();

 const verses = t("verses", { returnObjects: true });

  const events = [
    { id: 1, data: t("home-page.events.sundayService", { returnObjects: true }), image: "/images/eventsExemple.webp", description: "Join us for our weekly Sunday worship service." },
    { id: 2, data: t("home-page.events.youthMeeting", { returnObjects: true }), image: "/images/eventsExemple.webp", description: "Our youth group gathers every Friday evening." },
    { id: 3, data: t("home-page.events.bibleStudy", { returnObjects: true }), image: "/images/eventsExemple.webp", description: "Dive deeper into the Word every Wednesday." },
    { id: 4, data: t("home-page.events.communityOutreach", { returnObjects: true }), image: "/images/eventsExemple.webp", description: "Serving our community with love and compassion." },
    { id: 5, data: t("home-page.events.christmasConcert", { returnObjects: true }), image: "/images/eventsExemple.webp", description: "Celebrate the birth of Christ with music and joy." },
    { id: 6, data: t("home-page.events.prayerNight", { returnObjects: true }), image: "/images/eventsExemple.webp", description: "Join us for a night of prayer and worship." }
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
          {t("home-page.nextVerse")}
        </button>
      </div>

      <h2 className="home-title">{t("home-page.latestEvents")}</h2>
      <div className="card-grid">
        {events.map((event) => (
          <div className="card" key={event.id}>
            <img src={event.image} alt={event.title} className="card-image" />
            <div className="card-content">
              <h3>{event.data.title}</h3>
              <p>{event.data.description}</p>
              <Link to={`/events/${event.id}`} className="btn">
                {t("home-page.readMore")}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
