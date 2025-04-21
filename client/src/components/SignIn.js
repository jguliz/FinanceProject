// src/components/SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PlaidLinkComponent from "./PlaidLinkComponent";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      // In a real app, this would call your authentication API
      // Mock authentication for demo purposes
      if (email === "user@example.com" && password === "password") {
        // Store authentication state (in a real app, you'd store a token)
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userId", "user-123"); // Use a real user ID in production
        setIsLoggedIn(true);
      } else {
        setError("Invalid credentials. Try user@example.com/password");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h1>Financial Dashboard</h1>

      {!isLoggedIn ? (
        <div className="signin-form-container">
          <h2>Sign In</h2>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSignIn} className="signin-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />
            </div>

            <button type="submit" className="signin-button">
              Sign In
            </button>
          </form>
        </div>
      ) : (
        <div className="bank-connect-container">
          <h2>Connect Your Bank Account</h2>
          <p>
            To analyze your finances, connect your bank account using Plaid.
          </p>
          <PlaidLinkComponent />
        </div>
      )}
    </div>
  );
};

export default SignIn;
