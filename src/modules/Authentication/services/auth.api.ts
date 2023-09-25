import http from 'src/modules/Share/utils/http'
import { AuthResponse, RefreshResponse } from '../interfaces/auth.type'

const authAPI = {
  login: (body: { userNameOrEmail: string; password: string }) => http.post<AuthResponse>('/auth/sign-in', body),

  refreshToken: (body: { accessToken: string; refreshToken: string }) =>
    http.post<RefreshResponse>('auth/refresh-token', body),

  forgetPassword: (body: { userNameorEmail: string; callBackUrl: string }) => http.post('auth/forget-password', body),

  resetPassword: (body: { token: string; newPassword: string }) => http.post('auth/forget-password/callback', body)
}

export default authAPI
