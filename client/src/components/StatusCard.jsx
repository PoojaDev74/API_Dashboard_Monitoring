import React from "react";
import "../style/StatusCard.css";

const getColor = (code) => {
  if (code >= 200 && code < 300) return "green";
  if (code >= 300 && code < 400) return "orange";
  if (code >= 400 && code < 600) return "red";
  return "yellow";
};

export default function StatusCard({ apiName, statuses }) {
  const latest = statuses.length > 0 ? statuses[statuses.length - 1].statusCode : 200;

  return (
    <div className="status-card">
      <h4>{apiName}</h4>
      <div className="status-blocks">
        {statuses.map((s, i) => (
          <span
            key={i}
            className={`dot ${getColor(s.statusCode)}`}
            title={`${new Date(s.timestamp).toLocaleString()} → ${s.statusCode}`}
          />
        ))}
      </div>
      <div className="latest">
        Latest: <span className={`dot ${getColor(latest)}`} />
      </div>
    </div>
  );
}
