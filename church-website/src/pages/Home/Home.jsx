import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const events = [
    {
      id: 1,
      title: "Sunday Service",
      image: "https://via.placeholder.com/400x200",
      description: "Join us for our weekly Sunday worship service.",
    },
    {
      id: 2,
      title: "Youth Meeting",
      image: "https://via.placeholder.com/400x200",
      description: "Our youth group gathers every Friday evening.",
    },
    {
      id: 3,
      title: "Bible Study",
      image: "https://via.placeholder.com/400x200",
      description: "Dive deeper into the Word every Wednesday.",
    },
    {
      id: 4,
      title: "Community Outreach",
      image: "https://via.placeholder.com/400x200",
      description: "Serving our community with love and compassion.",
    },
    {
      id: 5,
      title: "Christmas Concert",
      image: "https://via.placeholder.com/400x200",
      description: "Celebrate the birth of Christ with music and joy.",
    },
    {
      id: 6,
      title: "Prayer Night",
      image: "https://via.placeholder.com/400x200",
      description: "Join us for a night of prayer and worship.",
    },
  ];

  return (
    <div className="home">
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
