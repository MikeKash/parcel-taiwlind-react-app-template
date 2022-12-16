import axios from "axios";
const BASE_URL = "https://localhost:44389";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
