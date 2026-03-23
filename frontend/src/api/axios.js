import axios from "axios";

//  axios instance with base config
const API = axios.create({
  baseURL: "/api",
});

// JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
