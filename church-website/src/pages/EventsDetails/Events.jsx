import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { getEvent } from "../../lib/events";
import { formatEventDate } from "../Home/Home";
import "./Events.css";

export default function EventDetails() {
  const { t, i18n } = useTranslation();

  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvent(id)
      .then(setEvent)
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return null;

  if (!event) {
    return (
      <div className="event-details">
        <h2>{t("event-details-page.eventNotFound")}</h2>
        <Link to="/" className="back-btn">{t("event-details-page.labels.backBtn")}</Link>
      </div>
    );
  }

  const notSpecified = t("event-details-page.labels.notSpecified");

  return (
    <article className="event-details">
      {event.image_url && <img src={event.image_url} alt={event.title} />}

      <h2>{event.title}</h2>

      <div className="event-info">
        <p><strong>{t("event-details-page.labels.date")}:</strong> {formatEventDate(event.event_date, i18n.language) || notSpecified}</p>
        <p><strong>{t("event-details-page.labels.time")}:</strong> {event.event_time || notSpecified}</p>
        <p><strong>{t("event-details-page.labels.location")}:</strong> {event.location || notSpecified}</p>
      </div>

      <p className="event-description">{event.description}</p>

      <Link to="/" className="back-btn">{t("event-details-page.labels.backBtn")}</Link>
    </article>
  );
}
