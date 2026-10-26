// App.js - Main component that decides whether to show Login, Register, or TaskList

import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";

function App() {
  // Check localStorage to restore the user if they are already logged in, including after a page refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showRegister, setShowRegister] = useState(false);

  function handleLogin(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  // Show TaskList if the user is logged in
  if (user) {
    return <TaskList user={user} onLogout={handleLogout} />;
  }

  // Otherwise, show Login or Register with a toggle
  return showRegister ? (
    <Register onLogin={handleLogin} switchToLogin={() => setShowRegister(false)} />
  ) : (
    <Login onLogin={handleLogin} switchToRegister={() => setShowRegister(true)} />
  );
}

export default App;
