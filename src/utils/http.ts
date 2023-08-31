import axios, { type AxiosInstance } from 'axios'
import connect from 'src/constants/connect'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: connect.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const http = new Http().instance

export default http
