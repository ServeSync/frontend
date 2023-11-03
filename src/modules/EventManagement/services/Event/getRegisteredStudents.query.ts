/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from '@tanstack/react-query'
import eventAPI from './event.api'
import { handleError } from 'src/modules/Share/utils'
import { RegisteredStudentsListType } from '../../interfaces'
class GetRegisteredStudentsQuery {
  private _query

  constructor(id: string) {
    this._query = useQuery({
      queryKey: ['registered_students', id],
      queryFn: () => eventAPI.getRegisteredStudents(id),
      enabled: id !== undefined,
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
  fetch() {
    return this._query.data?.data as RegisteredStudentsListType
  }
}
export { GetRegisteredStudentsQuery }
