import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/LogCard.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Tracer() {
  const [logs, setLogs] = useState({ today: [], yesterday: [] });

  useEffect(() => {
    axios.get(`${API_URL}/tracer/logs`, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY }
    })
      .then(res => setLogs(res.data))
      .catch(err => console.error("Error fetching tracer logs:", err));
  }, []);

  return (
    <div className="main-content">
      <h2>📜 API Trace Logs</h2>

      {/* Today Section */}
      <div className="logs-section">
        <h3>📅 Today</h3>
        {logs.today.length ? (
          logs.today.map((log, i) => (
            <div key={i} className="log-card">
              <p>
                <strong>[{log.traceId}]</strong> → {log.method} {log.apiName}
              </p>
              {log.logs.map((line, idx) => (
                <p key={idx} className={line.type}>
                  {new Date(line.timestamp).toLocaleTimeString()} ↪ {line.message}
                </p>
              ))}
              <p style={{ color: "lightgreen" }}>
                {log.status} {log.apiName} ({log.responseTimeMs}ms)
              </p>
            </div>
          ))
        ) : (
          <p>No logs for today</p>
        )}
      </div>

      {/* Yesterday Section */}
      <div className="logs-section">
        <h3>📅 Yesterday</h3>
        {logs.yesterday.length ? (
          logs.yesterday.map((log, i) => (
            <div key={i} className="log-card">
              <p>
                <strong>[{log.traceId}]</strong> → {log.method} {log.apiName}
              </p>
              {log.logs.map((line, idx) => (
                <p key={idx} className={line.type}>
                  {new Date(line.timestamp).toLocaleTimeString()} ↪ {line.message}
                </p>
              ))}
              <p style={{ color: "lightgreen" }}>
                {log.status} {log.apiName} ({log.responseTimeMs}ms)
              </p>
            </div>
          ))
        ) : (
          <p>No logs for yesterday</p>
        )}
      </div>
    </div>
  );
}
