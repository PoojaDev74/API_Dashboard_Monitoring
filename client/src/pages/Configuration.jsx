import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Configuration.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Configuration() {
  const [apis, setApis] = useState([]);
  const [selectedApi, setSelectedApi] = useState(null); // track which API is selected for controls

  useEffect(() => {
    axios
      .get(`${API_URL}/controls`)
      .then((res) => setApis(res.data))
      .catch((err) => console.error("Error fetching APIs:", err));
  }, []);

  // Handle toggle
  const handleToggle = (api) => {
    if (selectedApi && selectedApi.apiName === api.apiName) {
      setSelectedApi(null); // close if same API clicked
    } else {
      setSelectedApi(api); // open for new API
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
          {apis.map((api, idx) => (
            <tr key={idx}>
              <td>{api.apiName}</td>
              <td>{new Date(api.startDate).toISOString().split("T")[0]}</td>
              <td>
                <button
                  className="dots-btn"
                  onClick={() => handleToggle(api)}
                >
                  ⋮
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Controls Panel if API is selected */}
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
