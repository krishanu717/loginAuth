import React, { useEffect, useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [token, setToken] = useState("");

  useEffect(() => {
    // Get token from localStorage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "No token found");
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Your Dashboard</h1>
      <div className="token-card">
        <h2>Token</h2>
        <p>{token}</p>
      </div>
    </div>
  );
}
