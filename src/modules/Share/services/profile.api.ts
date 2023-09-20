import http from 'src/modules/Share/utils/http'
import { ProfileResponse } from '../interfaces/profile.type'

const profileAPI = {
  getProfile: () => http.get<ProfileResponse>('/profile')
}

export default profileAPI
