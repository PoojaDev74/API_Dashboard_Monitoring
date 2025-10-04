import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler 
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler); 

const API_URL = import.meta.env.VITE_API_URL;

export default function Chart({ year, month }) {
  const [uptimeData, setUptimeData] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/uptime?year=${year}&month=${month}`, {
      headers: { "x-api-key": import.meta.env.VITE_API_KEY }
    })
      .then(res => res.json())
      .then(res => setUptimeData(res.data));
  }, [year, month]);

  const labels = uptimeData.map(d => d.date);
  const values = uptimeData.map(d => d.uptime);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Uptime %",
        data: values,
        borderColor: "#4bf9cff",
        tension: 0.3,
        fill: true,
        backgroundColor: "rgba(79,156,255,0.3)",
        pointRadius: 3
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.1)" },
        title: { display: true, text: "Uptime (%)", color: "#fff" },
      },
      x: {
        ticks: { maxRotation: 45, minRotation: 45, color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.05)"},
      },
    },
  };

  return (
    <div>
      <h3>Uptime Over Time</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}
