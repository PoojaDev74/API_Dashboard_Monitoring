import React, { useEffect, useState } from "react";
import StatusCard from "../components/StatusCard";
import "../style/StatusCard.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [statusData, setStatusData] = useState([]);
  const [page, setPage] = useState(1);
  const [year, setYear] = useState(2025);
  const [loading, setLoading] = useState(false);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const loadData = async (pageNum) => {
    setLoading(true);
    try {
      const res = await fetch( `${API_URL}/api/logs/time?year=${year}&month=${month}`, {
        params: { page: pageNum, year }, 
        headers: { "x-api-key": import.meta.env.VITE_API_KEY }  
      });
      setStatusData(res.data.data || []);  
    } catch (err) {
      console.error("❌ Error fetching status data:", err);
      setStatusData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(page);
  }, [page, year]);

  const prevMonth = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const nextMonth = () => {
    if (page < 12) setPage((p) => p + 1);
  };

  const handleDateChange = (e) => {
    const [selectedYear, selectedMonth] = e.target.value.split("-");
    setYear(parseInt(selectedYear, 10));
    setPage(parseInt(selectedMonth, 10));
  };

    useEffect(() => {
    Object.keys(containerRefs.current).forEach((key) => {
      const container = containerRefs.current[key];
      if (container) {
        container.scrollLeft = container.scrollWidth;
      }
    });
  }, [logs]);

  const getStatusIcon = (status) => {
    if (status === 200 ) {
      return "✔️";
    } else if (status >= 200 && status < 600) {
      return "❌";
    }
    return "";
   };
  
  return (
    <div>
      <h2>Home</h2>
      <div className="month-selector">
        <button onClick={prevMonth} disabled={page === 1}>⬅</button>
        <span>{monthNames[page - 1]} {year}</span>
        <button onClick={nextMonth} disabled={page === 12}>➡</button>
        <input
          type="month"
          value={`${year}-${String(page).padStart(2,"0")}`}
          onChange={handleDateChange}
        />
      </div>

      {loading && <p>Loading...</p>}
      {statusData.length === 0 && !loading && <p>No data found</p>}
      {statusData.map((log) => (
        <StatusCard key={log.traceId} log={log} />
      ))}
    </div>
  );
}
