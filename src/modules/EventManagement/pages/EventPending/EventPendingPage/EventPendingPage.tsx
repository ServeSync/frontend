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
import PopoverCustom from 'src/modules/Share/components/Popover'
import Button from 'src/modules/Share/components/Button'
import Filter from 'src/modules/EventManagement/components/Filter'

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
      startAt: formatDateFilter(data.startAt as string),
      endAt: formatDateFilter(data.endAt as string),
      type: data.type,
      status: data.status,
      search: data.search
    }
    navigate({
      pathname: path.event_pending,
      search: createSearchParams(omitBy(config, isEmpty) as URLSearchParamsInit).toString()
    })
  })

  const handleResetFormFilter = () => {
    FilterEventForm.resetField('search')
    FilterEventForm.resetField('startAt')
    FilterEventForm.resetField('endAt')
    FilterEventForm.setValue('type', '')
    FilterEventForm.setValue('status', '')
  }

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
          <div className='flex gap-4'>
            <PopoverCustom
              renderPopover={
                <form onSubmit={handleSubmitFormFilter}>
                  <Filter control={FilterEventForm.control} onResetForm={handleResetFormFilter} />
                </form>
              }
            >
              <Button classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
                  />
                </svg>
                <span>Lọc</span>
              </Button>
            </PopoverCustom>
          </div>
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
