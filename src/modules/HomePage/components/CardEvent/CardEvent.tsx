/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSearchParams, useNavigate } from 'react-router-dom'
import { EventType } from 'src/modules/EventManagement/interfaces'
import path from 'src/modules/Share/constants/path'
import classNames from 'classnames'
import { formatDateTime } from 'src/modules/Share/utils'
import { StatusToMessage } from 'src/modules/EventManagement/constants'

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

  return (
    <div
      className='max-sm:min-w-[100%] sm:min-w-[45%] lg:min-w-[30%] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-3xl cursor-pointer'
      onClick={() => onShowDetail(event.id)}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
    >
      <div className='px-4 py-6 flex justify-center items-center w-full'>
        <img
          src={event.imageUrl}
          alt='ui/ux review check'
          className='rounded-2xl border object-cover max-sm:h-[80px] max-md:h-[160px] h-[240px] lg:h-[320px] w-full'
        />
      </div>
      <div className='px-6 pb-8'>
        <div className='flex flex-col'>
          <span className='font-normal leading-7 text-[#F85E9F] whitespace-nowrap break-words max-sm:text-[10px] max-md:text-[14px] text-[20px] lg:text-[23px] truncate'>
            {event.name}
          </span>
          <div className='flex items-end justify-between gap-4 max-sm:text-[8px] text-[14px] lg:text-[16px] max-md:flex-col-reverse '>
            <div className='max-w-[80%] '>
              <span className='line-clamp-1'>{event.introduction}</span>
            </div>
            <div className='flex items-center justify-center gap-1.5 font-normal'>
              <span className='font-normal leading-7 break-words max-sm:text-[14px] text-[16px] lg:text-[18px] text-[#195E8E]'>
                {event.capacity}
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 max-sm:w-4 text-[#195E8E] max-sm:h-4 '
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
        <div className='mt-4 flex flex-col'>
          <div className='flex flex-col justify-start gap-4 '>
            <div className='flex items-center gap-1 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 max-sm:w-4 max-sm:h-4 text-[#E80505] flex-shrink-0'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                />
              </svg>
              <span className='text-[#A0A2A4] font-normal leading-6 break-words max-sm:text-[10px] text-[13px] lg:text-[15px] truncate'>
                {event.address.fullAddress}
              </span>
            </div>
            <div className='flex items-center gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 max-sm:w-4 max-sm:h-4 text-[#00F335] flex-shrink-0'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z'
                />
              </svg>
              <div className='flex items-center gap-2 text-[#A0A2A4] font-normal leading-4 break-words  max-sm:text-[10px] text-[13px] lg:text-[15px]'>
                <span>{formatDateTime(event.startAt)}</span>
                <span>-</span>
                <span>{formatDateTime(event.endAt)}</span>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-[#51cbff]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
                  />
                </svg>

                <div className='flex items-center gap-1 text-[#A0A2A4] font-normal leading-4 break-words  max-sm:text-[10px] text-[13px] lg:text-[15px]'>
                  <span>{event.activity.minScore}</span>
                  <span>-</span>
                  <span>{event.activity.maxScore}</span>
                  <span>Điểm</span>
                </div>
              </div>
              <div className='flex items-center max-md:flex-col'>
                <div
                  className={classNames('px-4 py-[6px] rounded-full flex justify-center items-center cursor-pointer', {
                    'bg-[#00F335]/50': event.status === 'Done',
                    'bg-[#58CCFE]': event.status === 'Happening',
                    'bg-[#FFE55A]/50': event.status === 'Upcoming'
                  })}
                >
                  <span className='font-normal leading-5 max-sm:leading-3 break-words max-sm:text-[6px] text-[13px]'>
                    {StatusToMessage(event.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardEvent
