/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import proofAPI from './proof.api'
import { handleError } from 'src/modules/Share/utils'
import { ProofDetailType } from 'src/modules/ProofManagement/interfaces'

class GetProofByIdQuery {
  private _query

  constructor(id: string) {
    this._query = useQuery({
      queryKey: ['proof', id],
      queryFn: () => proofAPI.getProofById(id),
      enabled: id !== undefined,
      staleTime: 3 * 60 * 1000,
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  fetch() {
    return this._query.data?.data as ProofDetailType
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetProofByIdQuery }
