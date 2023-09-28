import { EducationProgramType } from 'src/modules/StudentManagement/interfaces/education_program.type'
import { FacultyType } from 'src/modules/StudentManagement/interfaces/faculty.type'
import { HomeRoomType } from 'src/modules/StudentManagement/interfaces/home_room.type'
import { UseFormRegister } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import educationProgramAPI from '../../services/education_program.api'
import facultyAPI from '../../services/faculty.api'
import homeroomAPI from '../../services/home_room.api'

interface FilterConfig {
  homeRoomId?: string | undefined
  facultyId?: string | undefined
  educationProgramId?: string | undefined
  gender?: boolean | undefined
}

interface Props {
  register: UseFormRegister<FilterConfig>
  onResetForm: () => void
}

const Filter = ({ register, onResetForm }: Props) => {
  const EducationProgramsListQuery = useQuery({
    queryKey: ['education_programs'],
    queryFn: () => educationProgramAPI.getListEducationPrograms()
  })
  const educationPrograms = EducationProgramsListQuery.data?.data as EducationProgramType[]

  const FacultiesListQuery = useQuery({
    queryKey: ['faculties'],
    queryFn: () => facultyAPI.getListFaculties()
  })
  const faculties = FacultiesListQuery.data?.data as FacultyType[]

  const HomeRoomsListQuery = useQuery({
    queryKey: ['home_rooms'],
    queryFn: () => homeroomAPI.getListHomeRooms()
  })
  const homeRooms = HomeRoomsListQuery.data?.data as HomeRoomType[]

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
        <select id='faculty' className='border-[1px] border-gray-200 px-1 py-2 rounded-md' {...register('facultyId')}>
          <option value='0'>Chọn khoa</option>
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
          <option value='0'>Chọn lớp sinh hoạt</option>
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
          <option value='0'>Chọn hệ đào tạo</option>
          {educationPrograms &&
            educationPrograms.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className='flex flex-col text-[15px] mb-2'>
        <label htmlFor='gender' className='mb-2'>
          Giới tính
        </label>
        <div className='mb-2 grid grid-cols-2'>
          <div className='col-span-1 flex items-center'>
            <input type='radio' id='male' {...register('gender')} />
            <label htmlFor='male' className='ml-2'>
              Nam
            </label>
          </div>
          <div className='col-span-1 flex items-center'>
            <input type='radio' id='female' {...register('gender')} />
            <label htmlFor='female' className='ml-2'>
              Nữ
            </label>
          </div>
        </div>
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