import axios from "axios"

const api = axios.create({
  baseURL: "https://56acaab3d36139a1d5e2b293a3087461.serveo.net",
  timeout: 5000
})

export default api