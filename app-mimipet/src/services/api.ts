import axios from "axios"

const api = axios.create({
  baseURL: "https://30f52e6a50557596bd656d21889a4a73.serveo.net",
  timeout: 5000
})

export default api