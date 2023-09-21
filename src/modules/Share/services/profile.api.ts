import http from 'src/modules/Share/utils/http'
import { Profile } from '../interfaces/profile.type'

const profileAPI = {
  getProfile: () => http.get<Profile>('/profile')
}

export default profileAPI
