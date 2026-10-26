// Login.js - Login form component

import React, { useState } from "react";
import api from "../api";
import "./Auth.css";

function Login({ onLogin, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent the page from reloading
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      // Login successful - save the token and user data, then notify the parent
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Login fail ho gaya.");
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-eyebrow">WELCOME BACK</p>
        <h1>Login</h1>
        <p className="auth-intro">If you have an account, please login.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-submit">
            Login
          </button>
        </form>
        <p className="auth-switch">
          don't have an account?{" "}
          <button type="button" className="auth-link" onClick={switchToRegister}>
            Signup 
          </button>
        </p>
      </section>
    </main>
  );
}

export default Login;
