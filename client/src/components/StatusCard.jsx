import React from "react";
import "../style/StatusCard.css";

function StatusCard({ log }) {
  const getStatus = (status) => {
    if (status >= 200 && status<300  ) return "green";
    if (status >= 300 && status < 400) return "orange"; 
    if (status >= 400 && status < 600) return "red";
    if (status >= 100 && status < 200) return "yellow"; 
    return ""; 
};

  return (
    <div className="status-card">
        <div className={`status-box ${getStatus(status)}`}></div>
    </div>
  );
}

export default StatusCard;
