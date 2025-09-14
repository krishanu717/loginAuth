import React from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate(); // For redirect after signup
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const data = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    country: formData.get("country"),
    countryCode: formData.get("countryCode"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  try {
    const response = await fetch("http://localhost:3000/signup", { // match your backend
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // send all form data
    });

    const result = await response.json();

    if (!response.ok) {
  if (result.errors) {
    alert(result.errors.map(e => e.message).join("\n")); // show all validation errors
  } else {
    alert("Error: " + (result.msg || "Signup failed"));
  }
}else {
      // ✅ Success
      alert(result.msg || "Signup successful!");
      // Optional: redirect to login page
      navigate("/login");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
};


  return (
    <div className="login-card">
      <div className="logo">🏥</div>
      <h2>MediPrescribe</h2>
      <p>Create Your Account</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>First Name</label>
          <input type="text" name="firstname" placeholder="Enter your first name" required />
        </div>
        <div className="input-group">
          <label>Last Name</label>
          <input type="text" name="lastname" placeholder="Enter your last name" required />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input type="tel" name="phoneNumber" placeholder="Enter your phone number" required />
        </div>
        <div className="input-group">
          <label>Country</label>
          <input type="text" name="country" placeholder="e.g. India" required />
        </div>
        <div className="input-group">
          <label>Country Code</label>
          <input type="text" name="countryCode" placeholder="e.g. IN" required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Create a password" required />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" placeholder="Confirm your password" required />
        </div>

        <button type="submit" className="login-btn">Sign Up</button>
      </form>

      <div className="support">
        Already have an account? <Link to="/Login">Sign In</Link>
      </div>
    </div>
  );
}
