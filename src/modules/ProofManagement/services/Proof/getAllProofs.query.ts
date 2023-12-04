/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import proofAPI from './proof.api'
import { ProofListConfig, ProofListType } from '../../interfaces'
import useQueryProofConfig from '../../hooks/useQueryProofConfig'

class GetAllProofsQuery {
  private _query
  private _queryProofConfig

  constructor() {
    this._queryProofConfig = useQueryProofConfig()
    this._query = useQuery({
      queryKey: ['proofs', this._queryProofConfig],
      queryFn: () => proofAPI.getListProofs(this._queryProofConfig as ProofListConfig),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as ProofListType
  }

  getTotalPages() {
    return this._query.data?.data.totalPages as number
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetAllProofsQuery }
