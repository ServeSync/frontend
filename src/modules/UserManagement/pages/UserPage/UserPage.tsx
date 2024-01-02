// eslint-disable-next-line import/named
import { URLSearchParamsInit, createSearchParams, useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { GetAllUsersQuery } from '../../services/User'
import UserTable from '../../components/UserTable'
import path from 'src/modules/Share/constants/path'
import useQueryUserConfig from '../../hooks/useQueryUserConfig'
import useSorting from 'src/modules/Share/hooks/useSorting'
import Pagination from 'src/modules/Share/components/Pagination'
import InputSearch from 'src/modules/Share/components/InputSearch'
import { FormFilterUserSchema, FormFilterUserType } from '../../utils'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty, omitBy } from 'lodash'

const UserPage = () => {
  const navigate = useNavigate()

  const queryUserConfig = useQueryUserConfig()

  const SortUSer = useSorting({ queryConfig: queryUserConfig, pathname: path.user })

  const getAllUsersQuery = new GetAllUsersQuery()
  const users = getAllUsersQuery.fetch()

  const FilterUserForm = useForm<FormFilterUserType>({
    resolver: yupResolver(FormFilterUserSchema)
  })

  const handleSubmitFormFilter = FilterUserForm.handleSubmit((data) => {
    const config = {
      ...queryUserConfig,
      page: 1,
      search: data.search
    }
    navigate({
      pathname: path.user,
      search: createSearchParams(omitBy(config, isEmpty) as URLSearchParamsInit).toString()
    })
  })

  return (
    <Fragment>
      <Helmet>
        <title>Users</title>
        <meta name='description' content='This is user management page of the project' />
      </Helmet>
      <div>
        <div className='flex justify-between items-center pt-[16px] pb-[40px] font-normal'>
          <form onSubmit={handleSubmitFormFilter}>
            <InputSearch
              classNameInput='bg-white border-[1px] border-gray-200 rounded-md h-[44px] w-[240px] outline-[#26C6DA] pl-8 pr-2 shadow-sm font-normal text-gray-600 placeholder:font-normal placeholder:text-[14px]'
              placeholder='Tìm kiếm người dùngg'
              name='search'
              register={FilterUserForm.register}
            />
          </form>
        </div>
        <UserTable users={users} onSort={SortUSer.handleSort} isLoading={getAllUsersQuery.isLoading()} />
        <Pagination
          className='flex justify-end'
          queryConfig={queryUserConfig}
          pageSize={getAllUsersQuery.getTotalPages()}
          pathname={path.user}
        />
      </div>
    </Fragment>
  )
}

export default UserPage
