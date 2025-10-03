import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Configuration.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Configuration() {
  const [apis, setApis] = useState([]);
  const [selectedApi, setSelectedApi] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/controls`, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
       })
      .then((res) => setApis(res.data || []))
      .catch((err) => console.error("Error fetching APIs:", err));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // if null or undefined
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? "Invalid Date" : d.toISOString().split("T")[0];
  };

  // Handle toggle
  const handleToggle = (api) => {
    if (selectedApi && selectedApi.apiName === api.apiName) {
      setSelectedApi(null);
    } else {
      setSelectedApi(api);
    }
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
                <td>
                  <button
                    className="dots-btn"
                    onClick={() => handleToggle(api)}
                  >
                    ⋮
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No APIs found</td>
            </tr>
          )}
        </tbody>
      </table>

      // Show Controls Panel if API is selected 
      {selectedApi && (
        <div className="controls-card">
          <h3>Controls for {selectedApi.apiName}</h3>
          <div className="control-item">
            <label>API</label>
            <input type="checkbox" />
          </div>
          <div className="control-item">
            <label>Tracer</label>
            <input type="checkbox" />
          </div>
          <div className="control-item">
            <label>Limit</label>
            <input type="checkbox" />
          </div>
          <div className="control-item">
            <label>Number of Requests</label>
            <input type="number" placeholder="0" />
          </div>
          <div className="control-item">
            <label>Schedule On/Off</label>
            <input type="checkbox" />
          </div>
          <div className="control-item">
            <label>Start Time</label>
            <input type="time" />
          </div>
          <div className="control-item">
            <label>End Time</label>
            <input type="time" />
          </div>
          <button className="save-btn">Save</button>
        </div>
      )}
    </div>
  );
}
