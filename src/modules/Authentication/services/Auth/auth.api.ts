import http from 'src/modules/Share/utils/http'
import { AuthResponse, RefreshResponse } from '../../interfaces'
import { FormSignInType } from '../../utils'
import { TenantId } from 'src/modules/Share/interfaces'

const authAPI = {
  adminSignIn: (body: FormSignInType) => http.post<AuthResponse>('/auth/admin-portal/sign-in', body),

  studentSignIn: (body: FormSignInType) => http.post<AuthResponse>('/auth/student-portal/sign-in', body),

  forgetPassword: (body: { userNameOrEmail: string; callBackUrl: string }) => http.post('auth/forget-password', body),

  resetPassword: (body: { token: string; newPassword: string }) => http.post('auth/forget-password/callback', body),

  refreshToken: (body: { accessToken: string; refreshToken: string }) =>
    http.post<RefreshResponse>('auth/refresh-token', body),

  exchangeTenantAccessToken: (tenantId: TenantId) =>
    http.post<AuthResponse>('auth/exchange-tenant-access-token', tenantId)
}

export default authAPI
