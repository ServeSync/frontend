/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSearchParams, useNavigate } from 'react-router-dom'
import { EventType } from 'src/modules/EventManagement/interfaces'
import path from 'src/modules/Share/constants/path'
import classNames from 'classnames'
import { formatDateTimeVN } from 'src/modules/Share/utils'
import { StatusToMessage } from 'src/modules/Share/constants'

interface Props {
  event: EventType
}

const CardEvent = ({ event }: Props) => {
  const navigate = useNavigate()

  const onShowDetail = (id: string) => {
    navigate({
      pathname: path.event_detail,
      search: createSearchParams({
        id: id
      }).toString()
    })
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      onShowDetail(event.id)
    }
  }
  //  xl lg md max-md
  return (
    <div
      className='min-w-[30%] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] sm:rounded-3xl max-sm:rounded-xl cursor-pointer'
      onClick={() => onShowDetail(event.id)}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
    >
      <div className='md:px-4 md:py-4 max-md:px-2 max-md:py-1 flex justify-center items-center w-full'>
        <img
          src={event.imageUrl}
          alt='ui/ux review check'
          className='sm:rounded-2xl max-sm:rounded-lg border object-cover lg:h-[320px] md:h-[180px] max-md:h-[100px] w-full '
        />
      </div>
      <div className='lg:pb-8 md:px-4 md:pb-6 max-md:px-2 max-md:pb-4 overflow-hidden'>
        <div className='flex flex-col'>
          <span className='font-normal leading-7 text-[#F85E9F] lg:text-[24px] md:text-[16px] max-md:text-[12px] whitespace-nowrap break-words truncate'>
            {event.name}
          </span>
          <div className='flex items-end justify-between md:gap-4 lg:text-[16px] md:text-[12px] max-md:text-[8px] overflow-hidden'>
            <div className='max-w-[80%]'>
              <span className='line-clamp-1'>{event.introduction}</span>
            </div>
            <div className='flex items-center justify-center md:gap-1.5 max-md:gap-1 font-normal'>
              <span className='font-normal break-words text-[#195E8E]'>{event.capacity}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='text-[#195E8E] lg:w-5 lg:h-5 md:w-4 md:h-4 max-md:w-2 max-md:h-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
                />
              </svg>
            </div>
          </div>
        </div>
        <div className='mt-4 flex flex-col justify-start md:gap-4 max-md:gap-2 overflow-hidden'>
          <div className='flex items-center gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='text-[#E80505] flex-shrink-0 lg:w-5 lg:h-5 md:w-4 md:h-4 max-md:w-3 max-md:h-3'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
              />
            </svg>
            <span className='text-[#A0A2A4] font-normal lg:text-[14px] md:text-[10px] max-md:text-[8px] truncate'>
              {event.address.fullAddress}
            </span>
          </div>
          <div className='flex items-center gap-1 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='text-[#00F335] flex-shrink-0 lg:w-5 lg:h-5 md:w-4 md:h-4 max-md:w-3 max-md:h-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z'
              />
            </svg>
            <div className='flex items-center gap-2 text-[#A0A2A4] font-normal lg:text-[14px] md:text-[10px] max-md:text-[8px]'>
              <span>{formatDateTimeVN(event.startAt)}</span>
              <span>-</span>
              <span>{formatDateTimeVN(event.endAt)}</span>
            </div>
          </div>
          <div className='flex justify-between lg:items-center w-full max-lg:flex-col lg:flex-row lg:gap-0 md:gap-4 max-md:gap-2'>
            <div className='flex items-end gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='text-[#51cbff] flex-shrink-0 lg:w-5 lg:h-5 md:w-4 md:h-4 max-md:w-3 max-md:h-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
                />
              </svg>
              <span className='text-[#A0A2A4] font-normal lg:text-[14px] md:text-[10px] max-md:text-[8px] truncate'>
                {event.activity.minScore} - {event.activity.maxScore} Điểm
              </span>
            </div>
            <div
              className={classNames(
                'md:px-4 max-md:px-2 md:py-2 max-md:py-1 rounded-full flex justify-center items-center cursor-pointer',
                {
                  'bg-[#00F335]/50': event.status === 'Done',
                  'bg-[#58CCFE]': event.status === 'Happening',
                  'bg-[#FFE55A]/50': event.status === 'Upcoming'
                }
              )}
            >
              <span className='font-normal break-words lg:text-[14px] md:text-[10px] max-md:text-[8px] '>
                {StatusToMessage(event.status)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardEvent
