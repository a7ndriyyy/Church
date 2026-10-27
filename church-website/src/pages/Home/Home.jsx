import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { listEvents } from "../../lib/events";
import "./Home.css";

export function formatEventDate(date, lang) {
  if (!date) return "";
  return new Date(date + "T00:00:00").toLocaleDateString(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Home() {
  const { t, i18n } = useTranslation();

  const verses = t("verses", { returnObjects: true });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listEvents()
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const [currentVerse, setCurrentVerse] = useState(new Date().getDate() % verses.length);

  const handleNextVerse = () => {
    setCurrentVerse((prev) => (prev + 1) % verses.length);
  };

  return (
    <div className="home container-home">
      <section className="hero">
        <img src="/images/Logocross.png" alt="" className="hero-cross" />
        <h1>{t("home-page.heroTitle")}</h1>
        <p>{t("home-page.heroSubtitle")}</p>
        <div className="hero-actions">
          <Link to="/schedule" className="btn btn-gold">{t("schedule")}</Link>
          <Link to="/support" className="btn btn-ghost">{t("support")}</Link>
        </div>
      </section>

      <div className="verse-of-the-day">
        <p>{verses[currentVerse]}</p>
        <button className="next-verse-btn" onClick={handleNextVerse}>
          {t("home-page.nextVerse")}
        </button>
      </div>

      <h2 className="section-title">{t("home-page.latestEvents")}</h2>

      {!loading && events.length === 0 && (
        <p className="no-events">{t("home-page.noEvents")}</p>
      )}

      <div className="card-grid">
        {events.map((event) => (
          <Link to={`/events/${event.id}`} className="card" key={event.id}>
            <img
              src={event.image_url || "/images/eventsExemple.webp"}
              alt={event.title}
              className="card-image"
            />
            <div className="card-content">
              {event.event_date && (
                <span className="card-date">{formatEventDate(event.event_date, i18n.language)}</span>
              )}
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <span className="card-more">{t("home-page.readMore")} →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
