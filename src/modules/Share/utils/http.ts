import axios, { AxiosError, type AxiosInstance } from 'axios'
import { AuthResponse } from 'src/modules/Authentication/interfaces/auth.type'
import {
  clearTokenFromLocalStorage,
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage
} from 'src/modules/Authentication/utils/auth'
import connect from 'src/modules/Share/constants/connect'
import HttpStatusCode from '../constants/httpStatusCode.enum'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: connect.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/auth/login') {
          const data = response.data as AuthResponse
          this.accessToken = data.accessToken
          setAccessTokenToLocalStorage(this.accessToken)
        }
        return response
      },
      (error: AxiosError) => {
        // Change status code to message error
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          console.log(message)
        }
        // Check authorization
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearTokenFromLocalStorage()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
