/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSearchParams, useNavigate } from 'react-router-dom'
import _ from 'lodash'

interface Props {
  queryConfig: any
  pathname: string
}

const useSorting = ({ queryConfig, pathname }: Props) => {
  const navigate = useNavigate()

  const handleSort = (column: string) => {
    const sort = queryConfig.sorting

    let config = {}

    if (sort === column) {
      config = {
        ...queryConfig,
        sorting: `${column} desc`
      }
    } else if (sort !== column) {
      config = {
        ...queryConfig,
        sorting: column
      }
    } else {
      config = {
        ..._.omit(queryConfig, 'sorting')
      }
    }

    navigate({
      pathname: pathname,
      search: createSearchParams(config).toString()
    })
  }

  return { handleSort }
}

export default useSorting
