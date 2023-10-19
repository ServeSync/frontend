import http from 'src/modules/Share/utils/http'
import { Image } from '../../interfaces'

const imageAPI = {
  uploadImage: (body: FormData) =>
    http.post<Image>('/images', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

export default imageAPI
