/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance } from 'axios'
import {
  clearTokenFromLocalStorage,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage
} from 'src/modules/Authentication/utils/auth'
import connect from 'src/modules/Share/constants/connect'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import authAPI from 'src/modules/Authentication/services/Auth/auth.api'
import { isAxiosUnauthorizedError } from './utils'
import { AuthResponse, RefreshResponse } from 'src/modules/Authentication/interfaces'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<{ access_token: string; refresh_token: string }> | null
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: connect.baseUrl,
      timeout: 15000,
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
        if (url === '/auth/admin-portal/sign-in' || url === '/auth/student-portal/sign-in') {
          const data = response.data as AuthResponse | RefreshResponse
          this.accessToken = data.accessToken
          this.refreshToken = data.refreshToken
          setAccessTokenToLocalStorage(this.accessToken)
          setRefreshTokenToLocalStorage(this.refreshToken)
        }
        return response
      },
      async (error: any) => {
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.code || error.code
          console.log(message)
        }
        if (isAxiosUnauthorizedError(error)) {
          const config = error.response?.config
          const url = config?.url
          if (url !== '/refresh-token') {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((res) => {
              if (config) {
                config.headers.authorization = res.access_token
                return this.instance({
                  ...config,
                  headers: { ...config.headers, Authorization: `Bearer ${res.access_token}` }
                })
              }
            })
          }
        }
        return Promise.reject(error)
      }
    )
  }
  private async handleRefreshToken() {
    return authAPI
      .refreshToken({
        accessToken: this.accessToken,
        refreshToken: this.refreshToken
      })
      .then((res) => {
        const { accessToken, refreshToken } = res.data
        setAccessTokenToLocalStorage(accessToken)
        setRefreshTokenToLocalStorage(refreshToken)
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        return { access_token: accessToken, refresh_token: refreshToken }
      })
      .catch((error) => {
        this.accessToken = ''
        this.refreshToken = ''
        clearTokenFromLocalStorage()
        throw error
      })
  }
}

const http = new Http().instance

export default http
