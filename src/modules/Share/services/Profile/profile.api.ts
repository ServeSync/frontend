import http from 'src/modules/Share/utils/http'
import { Profile, ProfileStudent } from '../../interfaces/Profile'
import { FormChangePasswordType } from '../../utils'

const profileAPI = {
  getProfile: () => http.get<Profile>('/profile'),

  getProfileStudent: () => http.get<ProfileStudent>('/profile/student'),

  editProfileStudent: (body: ProfileStudent) => http.put('/profile/student', body),

  changePassword: (body: Omit<FormChangePasswordType, 'confirmPassword'>) =>
    http.post('./profile/change-password', body)
}

export default profileAPI
