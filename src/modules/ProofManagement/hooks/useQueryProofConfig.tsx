import { useQueryParams } from 'src/modules/Share/hooks'
import { ProofListConfig } from '../interfaces'
import { isUndefined, omitBy } from 'lodash'

export type QueryProofConfig = {
  [key in keyof ProofListConfig]: string
}

const useQueryProofConfig = () => {
  const queryProofParams: QueryProofConfig = useQueryParams()
  const queryProofConfig: QueryProofConfig = omitBy(
    {
      search: queryProofParams.search,
      status: queryProofParams.status,
      type: queryProofParams.type,
      sorting: queryProofParams.sorting,
      page: queryProofParams.page || 1,
      size: queryProofParams.size || 10
    },
    isUndefined
  )
  return queryProofConfig
}

export default useQueryProofConfig
