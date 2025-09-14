import React from "react";
import "./Login.css";
 import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); // for redirect after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/api/signin", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        if (result.token) localStorage.setItem("token", result.token); // save token
        navigate("/dashboard"); // redirect to dashboard
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="login-card">
      {/* Logo */}
      <div className="logo">🏥</div>

      <h2>MediPrescribe</h2>
      <p>Your Smart Prescription Assistant</p>

      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" required />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" required />
        </div>

     
        <button type="submit" className="login-btn">
          Sign In
        </button>
      </form>

      <div className="support">
  Don't have an account? <Link to="/signup">Signup</Link>
</div>
    </div>
  );
}
