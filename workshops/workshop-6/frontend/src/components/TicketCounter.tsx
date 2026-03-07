import { useState } from "react";

type Props = {
  eventTitle: string;
  maxTickets: number;
};

export function TicketCounter({ eventTitle, maxTickets }: Props) {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', margin: '16px 0' }}>
      <h3>{eventTitle}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => setCount(c => Math.max(0, c - 1))}
          style={{ fontSize: '20px', width: '36px', height: '36px', cursor: 'pointer' }}
        >−</button>
        <span style={{ fontSize: '20px' }}>{count}</span>
        <button
          onClick={() => setCount(c => Math.min(maxTickets, c + 1))}
          style={{ fontSize: '20px', width: '36px', height: '36px', cursor: 'pointer' }}
        >+</button>
      </div>
      {count > 0 && (
        <p style={{ marginTop: '8px', color: 'green' }}>
          {count} ticket{count > 1 ? 's' : ''} selected for {eventTitle}.
        </p>
      )}
    </div>
  );
}