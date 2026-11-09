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

  const { upcoming, past } = splitEvents(events);

  const [currentVerse, setCurrentVerse] = useState(new Date().getDate() % verses.length);

  const handleNextVerse = () => {
    setCurrentVerse((prev) => (prev + 1) % verses.length);
  };

  return (
    <div className="home container-home">
      <section className="hero">
        <img src={`${process.env.PUBLIC_URL}/images/Logocross.png`} alt="" className="hero-cross" />
        <h1>{t("home-page.heroTitle")}</h1>
        <p>{t("home-page.heroSubtitle")}</p>
        <div className="hero-actions">
          <Link to="/schedule" className="btn btn-gold">{t("schedule")}</Link>
          <Link to="/support" className="btn btn-ghost">{t("support")}</Link>
        </div>
      </section>

      <div className="verse-of-the-day">
        <p key={currentVerse} className="verse-text">{verses[currentVerse]}</p>
        <button className="next-verse-btn" onClick={handleNextVerse}>
          {t("home-page.nextVerse")}
        </button>
      </div>

      <h2 className="section-title">{t("home-page.upcomingEvents")}</h2>

      {!loading && upcoming.length === 0 && (
        <p className="no-events">{t("home-page.noUpcoming")}</p>
      )}

      <EventGrid events={upcoming} lang={i18n.language} readMore={t("home-page.readMore")} />

      <h2 className="section-title past-title">{t("home-page.pastEvents")}</h2>

      {!loading && past.length === 0 && (
        <p className="no-events">{t("home-page.noPast")}</p>
      )}

      <EventGrid events={past} lang={i18n.language} readMore={t("home-page.readMore")} past />
    </div>
  );
}

function EventGrid({ events, lang, readMore, past = false }) {
  return (
    <div className={`card-grid ${past ? "card-grid-past" : ""}`}>
      {events.map((event) => (
        <Link to={`/events/${event.id}`} className="card" key={event.id}>
          <img
            src={event.image_url || `${process.env.PUBLIC_URL}/images/eventsExemple.webp`}
            alt={event.title}
            className="card-image"
          />
          <div className="card-content">
            {event.event_date && (
              <span className="card-date">{formatEventDate(event.event_date, lang)}</span>
            )}
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <span className="card-more">{readMore} →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

// "YYYY-MM-DD" for today in the visitor's time zone, comparable with event_date
function todayString() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

// Upcoming: today or later, soonest first; events without a date go last.
// Past: before today, most recent first, only the last few.
const PAST_EVENTS_SHOWN = 6;

function splitEvents(events) {
  const today = todayString();
  const upcoming = events
    .filter((e) => !e.event_date || e.event_date >= today)
    .sort((a, b) => {
      if (!a.event_date) return 1;
      if (!b.event_date) return -1;
      return a.event_date.localeCompare(b.event_date);
    });
  const past = events
    .filter((e) => e.event_date && e.event_date < today)
    .sort((a, b) => b.event_date.localeCompare(a.event_date))
    .slice(0, PAST_EVENTS_SHOWN);
  return { upcoming, past };
}
