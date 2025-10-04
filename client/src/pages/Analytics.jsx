import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "../style/analytics.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [groupBy, setGroupBy] = useState("day");

  const fetchStats = async () => {
   try {
     const res = await axios.get(`${API_URL}/api/stats/analytics?groupBy=${groupBy}`, {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY }
      })
      setStats(res.data);
    } catch (err) {
       console.error("Error fetching analytics:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [groupBy]);
  
  if (!stats) return <p>No stats available</p>;

  // Radial data
  const uptimeData = [{ name: "Uptime", value: stats.uptime }];
  const avgRespData = [{ name: "Avg Response", value: stats.avgResponseTime }];
  const reqVolumeData = [{ name: "Requests", value: stats.totalRequests }];
  const errorRateData = [{ name: "Error Rate", value: stats.errorRate }];

  return (
    <div className="main-content">
      <h2>Analysis</h2>

      <div className="filter-bar">
        <label>Group By: </label>
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="day">Daily</option>
          <option value="month">Monthly</option>
        </select>
      </div>
      
      <div className="stats-cards">
        <div className="card">
          <h4>Uptime (Last 7 Days)</h4>
          <RadialBarChart
            width={150}
            height={150}
            innerRadius="70%"
            outerRadius="100%"
            barSize={15}
            data={uptimeData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
              fill="#4caf50"
            />
          </RadialBarChart>
          <p>{stats.uptime}%</p>
          <small>
            Last downtime:{" "}
            {stats.lastDowntime
              ? new Date(stats.lastDowntime).toLocaleString()
              : "N/A"}
          </small>
        </div>

        {/* Avg Response Time */}
        <div className="card">
          <h4>Average Response Time</h4>
          <RadialBarChart
            width={150}
            height={150}
            innerRadius="70%"
            outerRadius="100%"
            barSize={15}
            data={avgRespData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
              fill="#2196f3"
            />
          </RadialBarChart>
          <p>{stats.avgResponseTime} ms</p>
          <small>Peak latency: {stats.peakLatency} ms</small>
        </div>

        <div className="card">
          <h4>Request Volume</h4>
          <RadialBarChart
            width={150}
            height={150}
            innerRadius="70%"
            outerRadius="100%"
            barSize={15}
            data={reqVolumeData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
              fill="#ffca28"
            />
          </RadialBarChart>
          <p>{stats.totalRequests}</p>
        </div>

        <div className="card">
          <h4>Error Rate</h4>
          <RadialBarChart
            width={150}
            height={150}
            innerRadius="70%"
            outerRadius="100%"
            barSize={15}
            data={errorRateData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
              fill="#e53935"
            />
          </RadialBarChart>
          <p>{stats.errorRate}%</p>
          <small>Most common error: {stats.mostCommonError || "None"}</small>
        </div>
      </div>

      <h3>Uptime Trend ({groupBy === "month" ? "By Month" : "By Day"}))</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={stats.uptimeTrend}>
          <defs>
            <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4cafef" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4cafef" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[90, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="uptime"
            stroke="#4cafef"
            strokeWidth={2}
            dot={true}
            fillOpacity={1}
            fill="url(#colorUptime)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
