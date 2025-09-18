import { useParams, Link } from "react-router-dom";
import { events } from "../Home/eventsData";
import "./Events.css";

export default function EventDetails() {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Event not found</h2>
      </div>
    );
  }

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <img src={event.image} alt={event.title} />

      <p>{event.description}</p>

      <div className="event-info">
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Organizer:</strong> {event.organizer}</p>
        <p><strong>Contact:</strong> {event.contact}</p>
      </div>

      <Link to="/" className="back-btn">← Back to Events</Link>
    </div>
  );
}
