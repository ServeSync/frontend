/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { AuthResponse } from 'src/modules/Authentication/interfaces'
import authAPI from 'src/modules/Authentication/services/Auth/auth.api'
import { TenantId } from '../../interfaces'

class ChangeTenantCommandHandler {
  private _changeTenantMutation

  constructor() {
    this._changeTenantMutation = useMutation({
      mutationFn: (tenantId: TenantId) => authAPI.exchangeTenantAccessToken(tenantId)
    })
  }

  handle = (tenantId: TenantId, handleSuccess: any, handleError: any) => {
    return this._changeTenantMutation.mutate(tenantId, {
      onSuccess: (response: AxiosResponse<AuthResponse>) => {
        const data = response.data
        localStorage.setItem('access_token', data.accessToken)
        localStorage.setItem('refresh_token', data.refreshToken)
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
  isLoading() {
    return this._changeTenantMutation.isLoading
  }
}

export { ChangeTenantCommandHandler }
