import { UseFormRegister } from 'react-hook-form'
import { EducationProgramType, FacultyType, HomeRoomType } from '../../interfaces'
import Select from 'src/modules/Share/components/Select'
import Button from 'src/modules/Share/components/Button'
import { gender } from '../../constants'

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
  educationPrograms: EducationProgramType[]
  faculties: FacultyType[]
  homeRooms: HomeRoomType[]
  onChangeFaculty: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Filter = ({ register, onResetForm, onChangeFaculty, educationPrograms, faculties, homeRooms }: Props) => {
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
      <Select
        register={register}
        id='faculty'
        name='facultyId'
        label='Khoa'
        className='flex flex-col text-[15px]'
        classNameSelect='border-[1px] border-gray-200 px-1 py-2 rounded h-[48px]'
        defaultOptions='Chọn khoa'
        options={faculties}
        onChange={onChangeFaculty}
      />
      <Select
        register={register}
        id='homeRoom'
        name='homeRoomId'
        label='Lớp'
        className='flex flex-col text-[15px]'
        classNameSelect='border-[1px] border-gray-200 px-1 py-2 rounded h-[48px]'
        defaultOptions='Chọn lớp sinh hoạt'
        options={homeRooms}
      />
      <Select
        register={register}
        id='education_program'
        name='educationProgramId'
        label='Hệ đào tạo'
        className='flex flex-col text-[15px]'
        classNameSelect='border-[1px] border-gray-200 px-1 py-2 rounded h-[48px]'
        defaultOptions='Chọn hệ đào tạo'
        options={educationPrograms}
      />
      <Select
        register={register}
        id='gender'
        name='gender'
        label='Giới tính'
        className='flex flex-col text-[15px]'
        classNameSelect='border-[1px] border-gray-200 px-1 py-2 rounded h-[48px]'
        defaultOptions='Chọn giới tính'
        options={gender}
      />
      <div className='flex justify-between'>
        <Button
          type='button'
          classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#da2626] px-4 py-2 rounded-lg'
          onClick={onResetForm}
        >
          Làm mới
        </Button>
        <Button
          type='submit'
          classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
        >
          Lưu
        </Button>
      </div>
    </div>
  )
}

export default Filter
