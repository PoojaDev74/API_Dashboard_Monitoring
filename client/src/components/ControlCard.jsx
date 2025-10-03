import React, { useState } from "react";
import "../style/Configuration.css";

export default function Control({ api }) {
  const [settings, setSettings] = useState(api);

  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const saveConfig = () => {
    fetch(`${API_URL}/controls/${api.apiName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    })
      .then(res => res.json())
      .then(() => alert("✅ Configuration saved"));
  };

  return (
    <div className="control-card">
      <h4>{api.apiName}</h4>
      <label>
        API Enabled
        <input type="checkbox" checked={settings.enabled} onChange={e => updateSetting("enabled", e.target.checked)} />
      </label>
      <label>
        Tracer
        <input type="checkbox" checked={settings.tracer} onChange={e => updateSetting("tracer", e.target.checked)} />
      </label>
      <label>
        Limit
        <input type="checkbox" checked={settings.limitEnabled} onChange={e => updateSetting("limitEnabled", e.target.checked)} />
      </label>
      {settings.limitEnabled && (
        <>
          <label>
            Requests
            <input type="number" value={settings.requestLimit} onChange={e => updateSetting("requestLimit", e.target.value)} />
          </label>
          <label>
            Rate
            <input type="number" value={settings.rate} onChange={e => updateSetting("rate", e.target.value)} />
          </label>
        </>
      )}
      <label>
        Schedule
        <input type="checkbox" checked={settings.scheduleEnabled} onChange={e => updateSetting("scheduleEnabled", e.target.checked)} />
      </label>
      {settings.scheduleEnabled && (
        <>
          <label>
            Start Time
            <input type="time" value={settings.startTime} onChange={e => updateSetting("startTime", e.target.value)} />
          </label>
          <label>
            End Time
            <input type="time" value={settings.endTime} onChange={e => updateSetting("endTime", e.target.value)} />
          </label>
        </>
      )}
      <button onClick={saveConfig}>Save</button>
    </div>
  );
}
