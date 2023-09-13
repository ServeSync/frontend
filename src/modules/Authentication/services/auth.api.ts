import http from 'src/modules/Share/utils/http'
import { AuthResponse } from '../interfaces/auth.type'

const authAPI = {
  login: (body: { userNameOrEmail: string; password: string }) => http.post<AuthResponse>('/auth/sign-in', body)
}

export default authAPI
