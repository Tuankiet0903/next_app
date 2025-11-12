import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
