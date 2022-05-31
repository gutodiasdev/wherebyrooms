import axios from 'axios';

const api = axios.create({
  baseURL: "https://wherebyserver.herokuapp.com/",
})

export default api;
