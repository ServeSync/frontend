import classNames from 'classnames'
import { useState } from 'react'

interface Props {
  header: {
    id: string
    name: string
    sort: string
  }[]
  onSort: (column: string) => void
}

const HeaderTable = ({ header, onSort }: Props) => {
  const [isSorting, setIsSorting] = useState<string>('')

  const handleSort = (column: string) => {
    if (column !== '') {
      onSort(column)
      column === isSorting ? setIsSorting(`${column} desc`) : setIsSorting(column)
    }
  }

  return (
    <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
      <tr className='text-[14px] text-gray-600'>
        {header.map((item) => (
          <th
            className='px-2 py-2 font-medium cursor-pointer hover:text-black hover:font-semibold '
            onClick={() => handleSort(item.sort)}
            key={item.id}
          >
            <span
              className={classNames({
                'text-[#46cbdd]': (isSorting === item.sort || isSorting === `${item.sort} desc`) && isSorting !== ''
              })}
            >
              {item.name}
            </span>
            {isSorting === item.sort && isSorting !== '' && (
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
            {isSorting === `${item.sort} desc` && isSorting !== '' && (
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
  )
}

export default HeaderTable
