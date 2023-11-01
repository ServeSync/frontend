import Skeleton from 'react-loading-skeleton'
import { StudentsListType } from '../../interfaces'
import { StudentTableHeader } from '../../constants'
import { formatDateOfBirth } from 'src/modules/Share/utils'
import HeaderTable from 'src/modules/Share/components/HeaderTable'

interface Props {
  students: StudentsListType
  onEditStudent: (id: string) => void
  onSort: (column: string) => void
  isLoading: boolean
}

const StudentTable = ({ students, onEditStudent, onSort, isLoading }: Props) => {
  return (
    <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2'>
      <HeaderTable header={StudentTableHeader} onSort={onSort} />
      <tbody>
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <tr
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                  key={index}
                >
                  <th className='px-2 py-4 font-medium w-[9%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[20%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[8%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[9%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[12%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[25%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[10%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                </tr>
              ))
          : students &&
            students.data.map((student) => (
              <tr
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                key={student.id}
                onClick={() => onEditStudent(student.id)}
              >
                <th className='px-2 py-4 font-medium w-[8%]'>{student.code}</th>
                <th className='px-2 py-4 font-medium w-[20%]'>{student.fullName}</th>
                <th className='px-2 py-4 font-medium w-[9%]'>{student.gender ? 'Nam' : 'Nữ'}</th>
                <th className='px-2 py-4 font-medium w-[9%]'>{formatDateOfBirth(student.dateOfBirth)}</th>
                <th className='px-2 py-4 font-medium w-[12%]'>{student.homeRoom.name}</th>
                <th className='px-2 py-4 font-medium w-[25%]'>{student.faculty.name}</th>
                <th className='px-2 py-4 font-medium w-[10%]'>{student.educationProgram.name}</th>
                <th className='px-2 py-4 font-medium'>0</th>
              </tr>
            ))}
      </tbody>
    </table>
  )
}

export default StudentTable
