import http from 'src/modules/Share/utils/http'
import { Profile, ProfileStudent } from '../../interfaces/Profile'

const profileAPI = {
  getProfile: () => http.get<Profile>('/profile'),

  getProfileStudent: () => http.get<ProfileStudent>('/profile/student')
}

export default profileAPI
