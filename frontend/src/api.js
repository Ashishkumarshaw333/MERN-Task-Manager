// api.js - Central place for all backend requests
// Automatically attaches the token to each request when one is available

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor: check localStorage for a token before sending each request
// If present, add it to the "Authorization" header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
