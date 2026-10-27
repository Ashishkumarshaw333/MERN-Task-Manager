// api.js - Central place for all backend requests
// Automatically attaches the token to each request when one is available

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL?.trim().replace(/\/+$/, "");

if (!apiUrl) {
  throw new Error("REACT_APP_API_URL is missing. Set it in frontend/.env and restart the frontend.");
}


const api = axios.create({
  baseURL: `${apiUrl}/api`,
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
