import { isUndefined, omitBy } from 'lodash'
import { EventCategoriesListConfig } from '../interfaces'

export type QueryEventCategoryConfig = {
  [key in keyof EventCategoriesListConfig]: string
}

const useQueryEventCategoryConfig = (search: string) => {
  if (search !== '') {
    const queryActivityConfig: QueryEventCategoryConfig = omitBy(
      {
        search: search
      },
      isUndefined
    )
    return queryActivityConfig
  }
}

export default useQueryEventCategoryConfig
