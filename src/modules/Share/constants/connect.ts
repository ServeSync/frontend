const connect = {
  baseUrl: import.meta.env.VITE_APP_API_URL,
  callBackUrl: import.meta.env.VITE_APP_RESETPASSWORD_URL
} as const
export default connect
