import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "../components/Chart"; 
import {
  RadialBarChart,
  RadialBar,
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
  
  if (!stats) return <p>Loading analytics..</p>;

  const uptimeData = [{ name: "Uptime", value: Number(stats.uptime) }];
  const avgRespData = [{ name: "Avg Resp", value: Number(stats.avgResponseTime) }];
  const reqVolumeData = [{ name: "Requests", value: Number(stats.totalRequests) }];
  const errorRateData = [{ name: "Errors", value: Number(stats.errorRate) }];
  
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
          <ResponsiveContainer width="100%" height={180}>
          <RadialBarChart
            cx="50%"
            cy="50%"
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
          </ResponsiveContainer>
          <p>{stats.uptime}%</p>
          <small>
            Last downtime:{" "}
            {stats.lastDowntime
              ? new Date(stats.lastDowntime).toLocaleString()
              : "N/A"}
          </small>
        </div>

        <div className="card">
          <h4>Average Response Time</h4>
          <ResponsiveContainer width="100%" height={180}>
          <RadialBarChart
            cx="50%"
            cy="50%"
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
          </ResponsiveContainer>
          <p>{stats.avgResponseTime} ms</p>
          <small>Peak latency: {stats.peakLatency} ms</small>
        </div>

        <div className="card">
          <h4>Request Volume</h4>
          <ResponsiveContainer width="100%" height={180}>
          <RadialBarChart
            cx="50%"
            cy="50%"
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
          </ResponsiveContainer>
          <p>{stats.totalRequests}</p>
        </div>

        <div className="card">
          <h4>Error Rate</h4>
          <ResponsiveContainer width="100%" height={180}>
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
          </ResponsiveContainer>
          <p>{stats.errorRate}%</p>
          <small>Most common error: {stats.mostCommonError || "None"}</small>
        </div>
      </div>

      <h3>Uptime Trend ({groupBy === "month" ? "By Month" : "By Day"}))</h3>
      <Chart
        year={new Date().getFullYear()}
        month={new Date().getMonth() + 1}
      />
    </div>
  );
}
