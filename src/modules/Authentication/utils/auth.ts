export const setAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLocalStorage = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const LocalStorageEventTarget = new EventTarget()

export const clearTokenFromLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  const clearTokenEvent = new Event('clearToken')
  LocalStorageEventTarget.dispatchEvent(clearTokenEvent)
}
