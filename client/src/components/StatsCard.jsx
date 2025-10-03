import React from "react";
import "../style/StatusCard.css";

export default function StatCard({ title, value, unit }) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <p>{value} {unit}</p>
    </div>
  );
}
