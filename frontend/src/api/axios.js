import axios from "axios";

const api = axios.create({
  baseURL: "https://employee-attendance-system-production-6dce.up.railway.app/api",
});

export default api;