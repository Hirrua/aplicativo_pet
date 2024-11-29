import axios from "axios"

const api = axios.create({
  baseURL: "https://donkey-factual-slug.ngrok-free.app",
  timeout: 2000
})

export default api