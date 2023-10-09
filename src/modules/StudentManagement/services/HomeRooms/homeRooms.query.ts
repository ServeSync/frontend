/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { HomeRoomType } from '../../interfaces/home_room.type'
import homeroomAPI from './homeRoom.api'

class GetAllHomeRoomByFacultyIdQuery {
  private query

  constructor(facultyId: string) {
    this.query = useQuery({
      queryKey: ['home_rooms', facultyId],
      queryFn: () => homeroomAPI.getListHomeRooms(facultyId),
      enabled: facultyId !== ''
    })
  }

  fetch() {
    return this.query.data?.data as HomeRoomType[]
  }

  getQuery() {
    return this.query
  }
}

export { GetAllHomeRoomByFacultyIdQuery }
