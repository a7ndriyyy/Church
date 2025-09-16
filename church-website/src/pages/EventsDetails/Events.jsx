import { useParams } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Event #{id}</h2>
      <p>Here you can put full details about this event.</p>
    </div>
  );
}
