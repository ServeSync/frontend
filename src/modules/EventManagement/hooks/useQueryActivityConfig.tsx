import { isUndefined, omitBy } from 'lodash'
import { ActivitiesListConfig } from '../interfaces'

export type QueryActivityConfig = {
  [key in keyof ActivitiesListConfig]: string
}

const useQueryActivityConfig = (search: string | undefined) => {
  if (search !== '') {
    const queryActivityConfig: QueryActivityConfig = omitBy(
      {
        search: search
      },
      isUndefined
    )
    return queryActivityConfig
  }
}

export default useQueryActivityConfig
