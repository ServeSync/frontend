/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import homeroomAPI from './homeRoom.api'
import { HomeRoomType } from '../../interfaces'

class GetAllHomeRoomsByFacultyIdQuery {
  private _query

  constructor(facultyId: string) {
    this._query = useQuery({
      queryKey: ['home_rooms', facultyId],
      queryFn: () => homeroomAPI.getListHomeRooms(facultyId),
      enabled: facultyId !== ''
    })
  }

  fetch() {
    return this._query.data?.data as HomeRoomType[]
  }
}

export { GetAllHomeRoomsByFacultyIdQuery }
