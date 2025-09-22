import { useParams, Link } from "react-router-dom";
import { events } from "../Home/eventsData";
import { useTranslation } from 'react-i18next'; 
import "./Events.css";

export default function EventDetails() {
const { t } = useTranslation();

  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>{t("event-details-page.eventNotFound")}</h2>
      </div>
    );
  }

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <img src={event.image} alt={event.title} />

      <p>{event.description}</p>

      <div className="event-info">
        <p><strong>{t("event-details-page.labels.date")}:</strong>{event.date || t("event-details-page.labels.notSpecified")}</p>
        <p><strong>{t("event-details-page.labels.time")}:</strong> {event.time || t("event-details-page.labels.notSpecified")}</p>
        <p><strong>{t("event-details-page.labels.location")}:</strong> {event.location || t("event-details-page.labels.notSpecified")}</p>
        <p><strong>{t("event-details-page.labels.organizer")}::</strong> {event.organizer || t("event-details-page.labels.notSpecified")}</p>
        <p><strong>{t("event-details-page.labels.contact")}:</strong> {event.contact || t("event-details-page.labels.notSpecified")}</p>
      </div>

      <Link to="/" className="back-btn">{t("event-details-page.labels.backBtn")}</Link>
    </div>
  );
}
