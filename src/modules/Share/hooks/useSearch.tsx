import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputSearchSchema, InputSearchType } from '../utils/rules'
import _ from 'lodash'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryConfig: any
  pathname: string
}

const useSearch = ({ queryConfig, pathname }: Props) => {
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<InputSearchType>({
    resolver: yupResolver(InputSearchSchema)
  })

  const handleSubmitSearch = handleSubmit((data) => {
    if (data.search !== '') {
      navigate({
        pathname: pathname,
        search: createSearchParams({
          ...queryConfig,
          search: data.search as string
        }).toString()
      })
    } else {
      navigate({
        pathname: pathname,
        search: createSearchParams({
          ..._.omit(queryConfig, 'search')
        }).toString()
      })
    }
  })

  return { register, handleSubmitSearch }
}

export default useSearch
