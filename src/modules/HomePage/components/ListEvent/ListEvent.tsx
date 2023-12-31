/* eslint-disable import/named */
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { listEventStatus } from 'src/modules/EventManagement/constants'
import { FormFilterEventSchema, FormFilterEventType } from 'src/modules/EventManagement/utils'
import InputSearch from 'src/modules/Share/components/InputSearch'
import Filter from 'src/modules/EventManagement/components/Filter'
import { formatDateFilter } from 'src/modules/Share/utils'
import path from 'src/modules/Share/constants/path'
import { URLSearchParamsInit, createSearchParams, useNavigate } from 'react-router-dom'
import { isEmpty, omitBy } from 'lodash'
import { EventsListType } from 'src/modules/EventManagement/interfaces'
import Pagination from 'src/modules/Share/components/Pagination'
import { listEventPage } from 'src/modules/Share/assets/image'
import CardEvent from '../CardEvent'
import useQueryEventClientConfig from 'src/modules/EventManagement/hooks/useQueryEventClientConfig'
import { Popover } from '@mui/material'
import Button from 'src/modules/Share/components/Button'

interface Props {
  events: EventsListType
  pageSize: number
}

const ListEvent = ({ events, pageSize }: Props) => {
  const navigate = useNavigate()

  const [scrolled, setScrolled] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    setScrolled(false)
  }, [events, scrolled])

  const FilterEventForm = useForm<FormFilterEventType>({
    resolver: yupResolver(FormFilterEventSchema)
  })

  const queryEventClientConfig = useQueryEventClientConfig()

  const handleSubmitFormFilter = FilterEventForm.handleSubmit((data) => {
    const config = {
      ...queryEventClientConfig,
      page: 1,
      startDate: formatDateFilter(data.startAt as string),
      endDate: formatDateFilter(data.endAt as string),
      eventType: data.type,
      eventStatus: data.status,
      search: data.search
    }
    navigate({
      pathname: path.list_events,
      search: createSearchParams(omitBy(config, isEmpty) as URLSearchParamsInit).toString()
    })
    handleClosePopover()
  })

  const handleResetFormFilter = () => {
    FilterEventForm.resetField('search')
    FilterEventForm.resetField('startAt')
    FilterEventForm.resetField('endAt')
    FilterEventForm.setValue('type', '')
    FilterEventForm.setValue('status', '')
  }
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    window.scrollTo(0, 300)
    setAnchorEl(event.currentTarget)
  }
  const handleClosePopover = () => {
    setAnchorEl(null)
  }
  const isOpen = Boolean(anchorEl)
  const id = isOpen ? 'popover' : undefined
  return (
    <Fragment>
      <div
        className='w-full flex justify-center items-center pb-24 pt-10 n'
        style={{
          background: 'linear-gradient(180deg, rgba(255, 252.88, 252.88, 0.46) 0%, #26C6DA 100%, #6BA0C6 100%)'
        }}
      >
        <img src={listEventPage} alt='' className='max-w-[20%]' />
      </div>
      <div className='flex justify-between items-center pt-[16px] pb-[40px] font-normal relative '>
        <form
          className='absolute w-full mx-auto flex items-center flex-col md:-top-16 max-md:-top-10'
          onSubmit={handleSubmitFormFilter}
        >
          <span className='lg:text-[30px] md:text-[24px] max-md:text-[14px] font-normal'>
            Tìm kiếm sự kiện phù hợp với bạn
          </span>
          <InputSearch
            classNameInput='bg-white border-[1px] rounded-md md:h-[44px] md:w-[500px] max-md:h-[30px] max-md:w-[250px] outline-none pl-8 pr-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-normal text-gray-600 placeholder:font-normal placeholder:text-[14px] max-md:placeholder:text-[12px]'
            name='search'
            placeholder='Tìm kiếm'
            register={FilterEventForm.register}
          />
        </form>
        <div className='w-full pt-12 lg:pb-12 flex justify-end mx-auto xl:px-36 lg:px-20 md:px-14 max-md:px-5'>
          <Button
            onClick={handleOpenPopover}
            classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 max-md:px-3 rounded-lg cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='lg:w-6 lg:h-6 md:w-5 md:h-5 max-md:w-4 max-md:h-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
              />
            </svg>
            <span className='max-md:text-[12px]'>Lọc</span>
          </Button>
          <Popover
            id={id}
            open={isOpen}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            anchorReference='anchorEl'
          >
            <form onSubmit={handleSubmitFormFilter}>
              <Filter options={listEventStatus} control={FilterEventForm.control} onResetForm={handleResetFormFilter} />
            </form>
          </Popover>
        </div>
      </div>
      <div className='grid grid-cols-3 max-md:grid-cols-2 lg:gap-12 md:gap-6 max-md:gap-2 mx-auto xl:px-36 lg:px-20 md:px-14 max-md:px-5'>
        {events && events.data.length > 0 && events.data.map((event, index) => <CardEvent event={event} key={index} />)}
      </div>
      {events && events.data.length > 0 && (
        <Pagination
          queryConfig={{ ...queryEventClientConfig, size: 9 }}
          pageSize={pageSize}
          pathname={path.list_events}
          className='flex justify-center'
        />
      )}
      {events && events.data.length === 0 && (
        <div className='flex w-full items-center justify-center'>
          <div className='text-center'>
            <div className='inline-flex rounded-full bg-[#c6f8ff] p-4 overflow-hidden'>
              <svg xmlns='http://www.w3.org/2000/svg' id='calendar' className='w-16 h-16'>
                <path d='M53 5h-8v4H19V5h-8v4H0v50h64V9H53V5zm-6 2h4v6h-4V7zM13 7h4v6h-4V7zM2 57V19h60v38H2zm60-46v6H2v-6h9v4h8v-4h26v4h8v-4h9z'></path>
              </svg>
            </div>
            <h1 className='mt-5 lg:text-[40px] md:text-[20px] max-md:text-[14px] font-bold text-slate-800'>
              Không có sự kiện vào thời điểm này
            </h1>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default ListEvent
