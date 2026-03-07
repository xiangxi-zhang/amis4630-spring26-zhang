import { Event } from "../data/events";

type Props = {
  event: Event;
};

export function EventCard({ event }: Props) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px 0',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 8px 0' }}>{event.title}</h3>
      <p>📅 {event.date}</p>
      <p>📍 {event.location}</p>
      <p>🎟️ {event.availableTickets} tickets available</p>
      <p>{event.description}</p>
      <p style={{ fontWeight: 'bold' }}>
        {event.price === 0 ? 'Free' : `$${event.price}`}
      </p>
    </div>
  );
}