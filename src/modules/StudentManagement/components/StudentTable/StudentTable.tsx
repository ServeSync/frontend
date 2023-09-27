import { formatDateTime } from 'src/modules/Share/utils/utils'
import { StudentType } from '../../interfaces/student.type'
import { studentTableHeader } from 'src/modules/Share/constants/student_table_header'
import { useState } from 'react'
import classNames from 'classnames'

interface Props {
  students: StudentType[]
  onEditStudent: (id: string) => void
  onSort: (column: string) => void
}

const StudentTable = ({ students, onEditStudent, onSort }: Props) => {
  const [isSorting, setIsSorting] = useState<string>('')

  const handleSort = (column: string) => {
    onSort(column)
    setIsSorting(column)
  }

  return (
    <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2'>
      <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
        <tr className='text-[14px] text-gray-600'>
          {studentTableHeader.map((item) => (
            <th
              className='px-2 py-2 font-medium cursor-pointer hover:text-black hover:font-semibold'
              onClick={() => handleSort(item.sort)}
              key={item.id}
            >
              <span className={classNames({ 'text-[#46cbdd]': item.sort === isSorting })}>{item.name}</span>
              {item.sort === isSorting && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-4 h-4 mb-[3px] mr-[2px] inline-block text-[#46cbdd]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                  />
                </svg>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {students &&
          students.map((student) => (
            <tr
              className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
              key={student.id}
              onClick={() => onEditStudent(student.id)}
            >
              <th className='px-2 py-4 font-medium w-[8%]'>{student.code}</th>
              <th className='px-2 py-4 font-medium w-[14%]'>{student.fullName}</th>
              <th className='px-2 py-4 font-medium w-[8%]'>{student.gender ? 'Nam' : 'Nữ'}</th>
              <th className='px-2 py-4 font-medium w-[9%]'>{formatDateTime(student.dateOfBirth)}</th>
              <th className='px-2 py-4 font-medium w-[20%]'>{student.homeRoom.name}</th>
              <th className='px-2 py-4 font-medium w-[25%]'>{student.faculty.name}</th>
              <th className='px-2 py-4 font-medium w-[9.2%]'>{student.educationProgram.name}</th>
              <th className='px-2 py-4 font-medium'>0</th>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default StudentTable
