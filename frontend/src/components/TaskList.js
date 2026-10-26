// TaskList.js - This component appears after login
// Users can view their tasks, add new ones, and mark them complete or delete them

import React, { useState, useEffect } from "react";
import api from "../api";
import "./TaskList.css";

function TaskList({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch tasks once when the component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Tasks fetch error:", err);
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await api.post("/tasks", { title, description });
      setTasks([res.data, ...tasks]); // Add the new task to the top of the list
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Task add  error:", err);
    }
  }

  async function toggleComplete(task) {
    try {
      const res = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error("Task update error:", err);
    }
  }

  async function deleteTask(id) {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Task delete error:", err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    onLogout();
  }

  return (
    <main className="task-page">
      <section className="task-card">
        <div className="task-header">
          <div>
            <p className="task-eyebrow">YOUR PERSONAL WORKSPACE</p>
            <h1>Namaste, {user.name}!</h1>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="task-input"
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="task-input"
          />
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>

        <ul className="task-list">
          {tasks.length === 0 && (
            <li className="empty-state">You dont have any tasks. Add a new task to get started!</li>
          )}
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <div
                onClick={() => toggleComplete(task)}
                className={`task-text${task.completed ? " is-complete" : ""}`}
              >
                <strong>{task.title}</strong>
                {task.description && (
                  <div className="task-description">{task.description}</div>
                )}
              </div>
              <button onClick={() => deleteTask(task._id)} className="delete-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default TaskList;
