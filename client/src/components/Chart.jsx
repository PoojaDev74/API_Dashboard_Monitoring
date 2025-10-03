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

export default function Chart({ year, month }) {
  const [uptimeData, setUptimeData] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/uptime?year=${year}&month=${month}`)
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
        borderColor: "#4bc0c0",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { mode: "index", intersect: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: "Uptime (%)" }
      },
      x: {
        ticks: { maxRotation: 45, minRotation: 45 }
      }
    }
  };

  return (
    <div>
      <h3>Uptime Over Time</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}
