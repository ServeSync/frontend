/* eslint-disable import/named */
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, URLSearchParamsInit, createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty, omitBy } from 'lodash'
import useQueryEventConfig from '../../hooks/useQueryEventConfig'
import path from 'src/modules/Share/constants/path'
import { GetAllEventsQuery } from '../../services'
import useSorting from 'src/modules/Share/hooks/useSorting'
import { FormFilterEventSchema, FormFilterEventType } from '../../utils'
import { formatDate } from 'src/modules/Share/utils'
import InputSearch from 'src/modules/Share/components/InputSearch'
import PopoverCustom from 'src/modules/Share/components/Popover'
import Filter from '../../components/Filter'
import Button from 'src/modules/Share/components/Button'
import EventTable from '../../components/EventTable'
import Pagination from 'src/modules/Share/components/Pagination'

const Event = () => {
  const navigate = useNavigate()

  const queryEventConfig = useQueryEventConfig()

  const SortEvent = useSorting({ queryConfig: queryEventConfig, pathname: path.event })

  const getAllEventsQuery = new GetAllEventsQuery()
  const events = getAllEventsQuery.fetch()

  const FilterEventForm = useForm<FormFilterEventType>({
    resolver: yupResolver(FormFilterEventSchema)
  })

  const handleSubmitFormFilter = FilterEventForm.handleSubmit((data) => {
    const config = {
      ...queryEventConfig,
      page: 1,
      startDate: formatDate(data.startAt as string),
      endDate: formatDate(data.endAt as string),
      eventType: data.type,
      eventStatus: data.status,
      search: data.search
    }
    navigate({
      pathname: path.event,
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
        <title>Events</title>
        <meta name='description' content='This is event management page of the project' />
      </Helmet>
      <div>
        <div className='flex justify-between items-center pt-[16px] pb-[40px] font-normal'>
          <form onSubmit={handleSubmitFormFilter}>
            <InputSearch
              classNameInput='bg-white border-[1px] border-gray-200 rounded h-[44px] w-[240px] outline-[#26C6DA] pl-8 pr-2 shadow-sm font-normal text-gray-600 placeholder:font-normal placeholder:text-[14px]'
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
            <Link
              to={path.create_event}
              className='flex items-center text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
            >
              Thêm sự kiện
            </Link>
          </div>
        </div>
        <EventTable events={events} isLoading={getAllEventsQuery.isLoading()} onSort={SortEvent.handleSort} />
        <div className='flex justify-end'>
          <Pagination
            queryConfig={queryEventConfig}
            pageSize={getAllEventsQuery.getTotalPages()}
            pathname={path.event}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Event
