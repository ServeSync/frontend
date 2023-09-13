export const setAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}

export const LocalStorageEventTarget = new EventTarget()

export const clearTokenFromLocalStorage = () => {
  localStorage.removeItem('access_token')
  const clearTokenEvent = new Event('clearToken')
  LocalStorageEventTarget.dispatchEvent(clearTokenEvent)
}
