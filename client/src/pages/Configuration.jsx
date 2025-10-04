import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Configuration.css";
import ControlCard from "../components/ControlCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function Configuration() {
  const [apis, setApis] = useState([]);
  const [selectedApi, setSelectedApi] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/controls`, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
       })
      .then((res) => setApis(res.data || []))
      .catch((err) => console.error("Error fetching APIs:", err));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; 
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? "Invalid Date" : d.toISOString().split("T")[0];
  };

  return (
       <div className="main-content">
      <h2>API List</h2>
      <table className="api-table">
        <thead>
          <tr>
            <th>API Name</th>
            <th>Start Date</th>
            <th>⋮</th>
          </tr>
        </thead>
        <tbody>
          {apis.length > 0 ? (
            apis.map((api, idx) => (
              <tr key={idx}>
                <td>{api.apiName}</td>
                <td>{formatDate(api.startDate)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No APIs found</td>
            </tr>
          )}
        </tbody>
      </table>
         
      <div className="controls-section">
        {apis.map((api, idx) => (
          <ControlCard key={idx} api={api} />
        ))}
      </div>
    </div>
  );
}
