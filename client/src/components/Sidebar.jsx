import React from "react";
import { Link } from "react-router-dom";
import "../style/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>API Dashboard</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tracer">Tracer</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/config">Config</Link></li>
      </ul>
    </div>
  );
}
