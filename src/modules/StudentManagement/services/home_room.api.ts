import http from 'src/modules/Share/utils/http'
import { HomeRoomType } from '../interfaces/home_room.type'

const homeroomAPI = {
  getListHomeRooms: () => http.get<HomeRoomType[]>('/homerooms')
}

export default homeroomAPI
