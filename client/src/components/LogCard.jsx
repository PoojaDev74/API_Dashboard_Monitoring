import React from "react";
import "../style/Tracer.css";

export default function LogCard({ log }) {
  // pick class based on status code
  let statusClass = "info";
  if (log.statusCode >= 500) statusClass = "error";
  else if (log.statusCode >= 400) statusClass = "warn";
  else if (log.statusCode >= 200) statusClass = "success";

  return (
    <div className="log-card">
      <p>
        <strong>{log.apiName}</strong> → {log.method}
      </p>
      <p>
        Status:{" "}
        <span className={statusClass}>
          {log.statusCode}
        </span>
      </p>
      {log.errorMessage && (
        <p className="error">Error: {log.errorMessage}</p>
      )}
      <p className="meta">
        {new Date(log.timestamp).toLocaleString()} · {log.responseTime}ms
      </p>
    </div>
  );
}
