import axios from 'axios';

const api = axios.create({
  baseURL: "https://wherebyserver.vercel.app/",
})

export default api;