import axios from 'axios';

const api = axios.create({
  baseURL: "https://api.whereby.dev/v1",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    "Content-Type": "application/json",
  }
})

export default api;