import http from 'src/modules/Share/utils/http'
import { Profile } from '../../interfaces'

const profileAPI = {
  getProfile: () => http.get<Profile>('/profile')
}

export default profileAPI
