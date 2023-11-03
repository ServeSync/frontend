/* eslint-disable import/named */
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { GetAllEventsPendingQuery } from '../../../services/RequestEvent/getAllEventsPending.query'
import useSorting from 'src/modules/Share/hooks/useSorting'
import path from 'src/modules/Share/constants/path'
import useQueryRequestEventConfig from '../../../hooks/useQueryRequestEventConfig'
import Pagination from 'src/modules/Share/components/Pagination'
import InputSearch from 'src/modules/Share/components/InputSearch'
import { FormFilterEventSchema, FormFilterEventType } from '../../../utils'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { URLSearchParamsInit, createSearchParams, useNavigate } from 'react-router-dom'
import { isEmpty, omitBy } from 'lodash'
import { formatDateFilter } from 'src/modules/Share/utils'
import EventPendingTable from 'src/modules/EventManagement/components/EventPending/EventPendingTable'

const EventPendingPage = () => {
  const navigate = useNavigate()

  const queryEventPendingConfig = useQueryRequestEventConfig()

  const SortEventPending = useSorting({ queryConfig: queryEventPendingConfig, pathname: path.event_pending })

  const getAllEventsPendingQuery = new GetAllEventsPendingQuery()
  const eventsPending = getAllEventsPendingQuery.fetch()

  const FilterEventForm = useForm<FormFilterEventType>({
    resolver: yupResolver(FormFilterEventSchema)
  })

  const onEditEventPending = (id: string) => {
    navigate(
      {
        pathname: path.edit_event_pending,
        search: createSearchParams({
          id: id
        }).toString()
      },
      {
        state: queryEventPendingConfig
      }
    )
  }

  const handleSubmitFormFilter = FilterEventForm.handleSubmit((data) => {
    const config = {
      ...queryEventPendingConfig,
      page: 1,
      startDate: formatDateFilter(data.startAt as string),
      endDate: formatDateFilter(data.endAt as string),
      eventType: data.type,
      eventStatus: data.status,
      search: data.search
    }
    navigate({
      pathname: path.event_pending,
      search: createSearchParams(omitBy(config, isEmpty) as URLSearchParamsInit).toString()
    })
  })

  return (
    <Fragment>
      <Helmet>
        <title>Events Pending</title>
        <meta name='description' content='This is event management page of the project' />
      </Helmet>
      <div>
        <div className='flex justify-between items-center pt-[16px] pb-[40px] font-normal'>
          <form onSubmit={handleSubmitFormFilter}>
            <InputSearch
              classNameInput='bg-white border-[1px] border-gray-200 rounded-sm h-[44px] w-[240px] outline-[#26C6DA] pl-8 pr-2 shadow-sm font-normal text-gray-600 placeholder:font-normal placeholder:text-[14px]'
              placeholder='Tìm kiếm sự kiện'
              name='search'
              register={FilterEventForm.register}
            />
          </form>
        </div>
        <EventPendingTable
          eventsPending={eventsPending}
          isLoading={getAllEventsPendingQuery.isLoading()}
          onSort={SortEventPending.handleSort}
          onEditEventPending={onEditEventPending}
        />
        <div className='flex justify-end'>
          <Pagination
            className='mt-[20px]'
            queryConfig={queryEventPendingConfig}
            pageSize={getAllEventsPendingQuery.getTotalPages()}
            pathname={path.event_pending}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default EventPendingPage
