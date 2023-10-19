import http from 'src/modules/Share/utils/http'
import { Profile } from '../../interfaces/Profile'

const profileAPI = {
  getProfile: () => http.get<Profile>('/profile')
}

export default profileAPI
