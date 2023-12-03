/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import proofAPI from './proof.api'
import { handleError } from 'src/modules/Share/utils'
import { ProofDetailType } from 'src/modules/Proof/interfaces'

class GetProofDetail {
  private _query
  private _navigate

  constructor(id: string) {
    this._navigate = useNavigate()
    this._query = useQuery({
      queryKey: ['proof', id],
      queryFn: () => proofAPI.getProofDetail(id),
      enabled: id !== undefined,
      staleTime: 3 * 60 * 1000,
      onError: (error: any) => {
        handleError(error)
        this._navigate('/proofs')
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

export { GetProofDetail }
