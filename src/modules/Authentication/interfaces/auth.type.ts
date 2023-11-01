export interface AuthResponse {
  accessToken: string
  refreshToken: string
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
}

export interface ResetPasswordTokenConfig {
  token?: string
}
