import http from 'src/modules/Share/utils/http'
import { AuthResponse, RefreshResponse } from '../../interfaces'

const authAPI = {
  login: (body: { userNameOrEmail: string; password: string }) =>
    http.post<AuthResponse>('/auth/admin-portal/sign-in', body),

  forgetPassword: (body: { userNameOrEmail: string; callBackUrl: string }) => http.post('auth/forget-password', body),

  resetPassword: (body: { token: string; newPassword: string }) => http.post('auth/forget-password/callback', body),

  refreshToken: (body: { accessToken: string; refreshToken: string }) =>
    http.post<RefreshResponse>('auth/refresh-token', body)
}

export default authAPI
