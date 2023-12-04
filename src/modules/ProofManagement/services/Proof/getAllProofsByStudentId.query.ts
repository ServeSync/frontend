/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import proofAPI from './proof.api'
import { ProofsListType } from '../../interfaces'

class GetAllProofsQuery {
  private _query

  constructor(studentId: string) {
    this._query = useQuery({
      queryKey: ['proofs_of_student', studentId],
      queryFn: () => proofAPI.getListProofsByStudentId(studentId),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as ProofsListType
  }

  getTotalPages() {
    return this._query.data?.data.totalPages as number
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetAllProofsQuery }
