/* eslint-disable import/named */
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import InputSearch from 'src/modules/Share/components/InputSearch'
import { FormFilterOrganizationSchema, FormFilterOrganizationType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import useSorting from 'src/modules/Share/hooks/useSorting'
import path from 'src/modules/Share/constants/path'
import Pagination from 'src/modules/Share/components/Pagination'
import useQueryOrganizationConfig from '../../hooks/useQueryOrganizationConfig'
import EventOrganizationTable from '../../components/EventOrganizationTable'
import { Link, URLSearchParamsInit, createSearchParams, useNavigate } from 'react-router-dom'
import Restricted from 'src/modules/Share/components/Restricted'
import { GetAllEventOrganizationsQuery } from '../../services'
import { isEmpty, omitBy } from 'lodash'

const EventOrganizationPage = () => {
  const navigate = useNavigate()

  const queryOrganizationConfig = useQueryOrganizationConfig()

  const getAllOrganizationQuery = new GetAllEventOrganizationsQuery()
  const organizers = getAllOrganizationQuery.fetch()

  const SortOrganizer = useSorting({ queryConfig: queryOrganizationConfig, pathname: path.event_organization })

  const FilterOrganizationForm = useForm<FormFilterOrganizationType>({
    resolver: yupResolver(FormFilterOrganizationSchema)
  })

  const handleSubmitFormFilter = FilterOrganizationForm.handleSubmit((data) => {
    const config = {
      ...queryOrganizationConfig,
      page: 1,
      search: data.search
    }
    navigate({
      pathname: path.event_organization,
      search: createSearchParams(omitBy(config, isEmpty) as URLSearchParamsInit).toString()
    })
  })

  const onEditEventOrganization = (id: string) => {
    navigate(
      {
        pathname: path.edit_event_organization,
        search: createSearchParams({
          id: id
        }).toString()
      },
      {
        state: queryOrganizationConfig
      }
    )
  }

  return (
    <Fragment>
      <Helmet>
        <title>Organizations</title>
        <meta name='description' content='Organizations Page' />
      </Helmet>
      <div>
        <div className='flex justify-between items-center pt-[16px] pb-[40px] font-normal'>
          <form onSubmit={handleSubmitFormFilter}>
            <InputSearch
              classNameInput='bg-white border-[1px] border-gray-200 rounded-md h-[44px] w-[240px] outline-[#26C6DA] pl-8 pr-2 shadow-sm font-normal text-gray-600 placeholder:font-normal placeholder:text-[14px]'
              placeholder='Tìm kiếm nhà tổ chức'
              name='search'
              register={FilterOrganizationForm.register}
            />
          </form>
          <Restricted to='ServeSync.Permissions.EventOrganizations.Create'>
            <Link
              to={path.create_organization}
              state={queryOrganizationConfig}
              className='flex items-center text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
            >
              Mời nhà tổ chức
            </Link>
          </Restricted>
        </div>
      </div>
      <EventOrganizationTable
        organizers={organizers}
        isLoading={getAllOrganizationQuery.isLoading()}
        onSort={SortOrganizer.handleSort}
        onEditOrganization={onEditEventOrganization}
      />
      <Pagination
        queryConfig={queryOrganizationConfig}
        pageSize={getAllOrganizationQuery.getTotalPages()}
        pathname={path.event_organization}
        className='flex justify-end'
      />
    </Fragment>
  )
}

export default EventOrganizationPage
