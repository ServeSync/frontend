import { EducationProgramType } from 'src/modules/StudentManagement/interfaces/education_program.type'
import { FacultyType } from 'src/modules/StudentManagement/interfaces/faculty.type'
import { HomeRoomType } from 'src/modules/StudentManagement/interfaces/home_room.type'
import { UseFormRegister } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import homeroomAPI from '../../services/home_room.api'

interface FilterConfig {
  homeRoomId?: string | undefined
  facultyId?: string | undefined
  educationProgramId?: string | undefined
  gender?: string | undefined
  search?: string | undefined
}

interface Props {
  register: UseFormRegister<FilterConfig>
  onResetForm: () => void
  facultyId: string
  setFacultyId: React.Dispatch<React.SetStateAction<string>>
  educationPrograms: EducationProgramType[]
  faculties: FacultyType[]
}

const Filter = ({ register, onResetForm, facultyId, setFacultyId, educationPrograms, faculties }: Props) => {
  const HomeRoomsListQuery = useQuery({
    queryKey: ['home_rooms', facultyId],
    queryFn: () => homeroomAPI.getListHomeRooms(facultyId),
    enabled: facultyId !== ''
  })
  const homeRooms = HomeRoomsListQuery.data?.data as HomeRoomType[]

  const handleChangeFaculty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFacultyId(event.target.value)
  }

  return (
    <div className='w-[360px] bg-white border-[1px] border-gray-300 rounded-lg p-6 shadow-md text-gray-600'>
      <div className='flex items-center justify-center mb-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-6 h-6 text-[#26C6DA] mr-2'
        >
          <path
            fillRule='evenodd'
            d='M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z'
            clipRule='evenodd'
          />
        </svg>
        <span className='text-[18px] font-semibold'>Bộ lọc</span>
      </div>
      <div className='flex flex-col text-[15px] mb-3'>
        <label htmlFor='faculty' className='mb-2'>
          Khoa
        </label>
        <select
          id='faculty'
          className='border-[1px] border-gray-200 px-1 py-2 rounded-md'
          {...register('facultyId')}
          onChange={handleChangeFaculty}
        >
          <option value=''>Chọn khoa</option>
          {faculties &&
            faculties.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className='flex flex-col text-[15px] mb-3'>
        <label htmlFor='class' className='mb-2'>
          Lớp
        </label>
        <select id='class' className='border-[1px] border-gray-200 px-1 py-2 rounded-md' {...register('homeRoomId')}>
          <option value=''>Chọn lớp sinh hoạt</option>
          {homeRooms &&
            homeRooms.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className='flex flex-col text-[15px] mb-3'>
        <label htmlFor='education_program' className='mb-2'>
          Hệ đào tạo
        </label>
        <select
          id='education_program'
          className='border-[1px] border-gray-200 px-1 py-2 rounded-md'
          {...register('educationProgramId')}
        >
          <option value=''>Chọn hệ đào tạo</option>
          {educationPrograms &&
            educationPrograms.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className='flex flex-col text-[15px] mb-3'>
        <label htmlFor='education_program' className='mb-2'>
          Giới tính
        </label>
        <select id='gender' className='border-[1px] border-gray-200 px-1 py-2 rounded-md' {...register('gender')}>
          <option value=''>Chọn giới tính</option>
          <option value='true'>Nam</option>
          <option value='false'>Nữ</option>
        </select>
      </div>
      <div className='flex justify-between'>
        <button
          type='button'
          className='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#da2626] px-4 py-2 rounded-lg'
          onClick={onResetForm}
        >
          Làm mới
        </button>
        <button
          type='submit'
          className='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
        >
          Lưu
        </button>
      </div>
    </div>
  )
}

export default Filter
