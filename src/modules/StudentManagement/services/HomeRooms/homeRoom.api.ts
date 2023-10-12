import http from 'src/modules/Share/utils/http'
import { HomeRoomType } from '../../interfaces'

const homeroomAPI = {
  getListHomeRooms: (id?: string) => http.get<HomeRoomType[]>('/homerooms', { params: { FacultyId: id } })
}

export default homeroomAPI
