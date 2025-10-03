import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Tracer from "./pages/Tracer";
import Analytics from "./pages/Analytics";
import Config from "./pages/Configuration";
import "./style/app.css";

export default function App() {
  return (
    <Router>
       <div className="app-container">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tracer" element={<Tracer />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/config" element={<Config />} />
            </Routes>
          </div>
        </div>
     </Router>
  );
}
