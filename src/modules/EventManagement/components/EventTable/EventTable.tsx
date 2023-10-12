import Skeleton from 'react-loading-skeleton'
import { EventTableHeader } from '../../constants'
import classNames from 'classnames'
import { EventsListType } from '../../interfaces'
import { useState } from 'react'

interface Props {
  events?: EventsListType
  isLoading: boolean
}

const EventTable = ({ events, isLoading }: Props) => {
  const [isSorting, setIsSorting] = useState<string>('')

  const handleSort = (column: string) => {
    column === isSorting ? setIsSorting(`${column} desc`) : setIsSorting(column)
  }

  return (
    <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2'>
      <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
        <tr className='text-[14px] text-gray-600'>
          {EventTableHeader.map((item) => (
            <th
              className='px-2 py-2 font-medium cursor-pointer hover:text-black hover:font-semibold'
              onClick={() => handleSort(item.sort)}
              key={item.id}
            >
              <span
                className={classNames({
                  'text-[#46cbdd]': isSorting === item.sort || isSorting === `${item.sort} desc`
                })}
              >
                {item.name}
              </span>
              {item.sort === isSorting && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4 ml-[4px] inline-block text-[#46cbdd]'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                </svg>
              )}
              {isSorting === `${item.sort} desc` && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4 ml-[4px] inline-block text-[#46cbdd]'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
                </svg>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <tr
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                  key={index}
                >
                  <th className='px-2 py-4 font-medium w-[20%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[10%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-w-[10%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[10%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[10%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[10%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[10%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[10%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                </tr>
              ))
          : events &&
            events.data.map((event, index) => (
              <tr
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                key={index}
              >
                <th className='px-2 py-4 font-medium w-[20%]'></th>
                <th className='px-2 py-4 font-medium w-[10%]'></th>
                <th className='px-2 py-4 font-medium w-[10%]'></th>
                <th className='px-2 py-4 font-medium w-[10%]'></th>
                <th className='px-2 py-4 font-medium w-[10%]'></th>
                <th className='px-2 py-4 font-medium w-[10%]'></th>
                <th className='px-2 py-4 font-medium w-[10%]'></th>
                <th className='px-2 py-4 font-medium'>0</th>
              </tr>
            ))}
      </tbody>
    </table>
  )
}

export default EventTable
