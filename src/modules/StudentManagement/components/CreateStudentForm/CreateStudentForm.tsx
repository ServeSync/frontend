import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { EducationProgramType } from '../../interfaces/education_program.type'
import { FacultyType } from '../../interfaces/faculty.type'
import { HomeRoomType } from '../../interfaces/home_room.type'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import InputFile from 'src/modules/Share/components/InputFile'
import { FormStudentType } from '../../utils/rules'
import { useQuery } from '@tanstack/react-query'
import homeroomAPI from '../../services/home_room.api'

interface Props {
  register: UseFormRegister<FormStudentType>
  errors: FieldErrors<FormStudentType>
  educationPrograms: EducationProgramType[]
  faculties: FacultyType[]
  onChange: (file?: File) => void
  previewImage: string
  onPreviousPage: () => void
}

const CreateStudentForm = ({
  register,
  errors,
  educationPrograms,
  faculties,
  onChange,
  previewImage,
  onPreviousPage
}: Props) => {
  const [facultyId, setFacultyId] = useState<string>('')

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
    <Fragment>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-1 flex flex-col items-center'>
          <InputFile register={register} onChange={onChange} previewImage={previewImage} />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.imageUrl?.message}</span>
        </div>
        <div className='col-span-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[14px] font-semibold text-gray-600'>
          <div className='col-span-1 flex flex-col'>
            <label htmlFor='studentId' className='mb-2'>
              Mã số sinh viên
            </label>
            <input
              type='text'
              id='studentId'
              className={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
                'border-red-600 outline-red-600': errors.code
              })}
              {...register('code')}
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.code?.message}</span>
          </div>

          <div className='col-span-1 flex flex-col'>
            <label htmlFor='fullname' className='mb-2'>
              Họ tên
            </label>
            <input
              type='text'
              id='fullname'
              className={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
                'border-red-600 outline-red-600': errors.fullName
              })}
              {...register('fullName')}
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.fullName?.message}</span>
          </div>

          <div className='col-span-1 flex flex-col'>
            <label htmlFor='gender' className='mb-2'>
              Giới tính
            </label>
            <select
              id='gender'
              className={classNames('border-[1px] border-gray-200 rounded-md px-4 outline-[#26C6DA] h-[40px]', {
                'border-red-600 outline-red-600': errors.gender
              })}
              {...register('gender')}
            >
              <option value='true'>Nam</option>
              <option value='false'>Nữ</option>
            </select>
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.gender?.message}</span>
          </div>

          <div className='col-span-1 flex flex-col'>
            <label htmlFor='email' className='mb-2'>
              Email
            </label>
            <input
              type='text'
              id='email'
              className={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
                'border-red-600 outline-red-600': errors.email
              })}
              {...register('email')}
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.email?.message}</span>
          </div>

          <div className='col-span-1 flex flex-col'>
            <label htmlFor='homeTown' className='mb-2'>
              Quê quán
            </label>
            <input
              type='text'
              id='homeTown'
              className={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
                'border-red-600 outline-red-600': errors.homeTown
              })}
              {...register('homeTown')}
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.homeTown?.message}</span>
          </div>

          <div className='col-span-1 flex flex-col'>
            <label htmlFor='phone' className='mb-2'>
              Số điện thoại
            </label>
            <input
              type='text'
              id='phone'
              className={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
                'border-red-600 outline-red-600': errors.phone
              })}
              {...register('phone')}
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.phone?.message}</span>
          </div>

          <div className='col-span-1 flex flex-col'>
            <label htmlFor='date_of_birth' className='mb-2'>
              Ngày sinh
            </label>
            <input
              type='text'
              id='date_of_birth'
              placeholder='Chọn ngày sinh'
              className={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
                'border-red-600 outline-red-600': errors.birth
              })}
              {...register('birth')}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.birth?.message}</span>
          </div>

          <div className='col-span-1 flex flex-col'>
            <label htmlFor='citizenId' className='mb-2'>
              Căn cước công dân
            </label>
            <input
              type='text'
              id='citizenId'
              className={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
                'border-red-600 outline-red-600': errors.citizenId
              })}
              {...register('citizenId')}
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.citizenId?.message}
            </span>
          </div>

          <div className='col-span-1 flex flex-col'>
            <label htmlFor='address' className='mb-2'>
              Địa chỉ cư trú
            </label>
            <input
              type='text'
              id='address'
              className={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
                'border-red-600 outline-red-600': errors.address
              })}
              {...register('address')}
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.address?.message}</span>
          </div>

          <div className='col-span-1 flex flex-col'>
            <label htmlFor='faculty' className='mb-2'>
              Khoa
            </label>
            <select
              id='faculty'
              className={classNames('border-[1px] border-gray-200 rounded-md px-4 outline-[#26C6DA] h-[40px]', {
                'border-red-600 outline-red-600': errors.facultyId
              })}
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
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.facultyId?.message}
            </span>
          </div>

          <div className='col-span-1 flex flex-col'>
            <label htmlFor='homeroom' className='mb-2'>
              Lớp
            </label>
            <select
              id='homeroom'
              className={classNames('border-[1px] border-gray-200 rounded-md px-4 outline-[#26C6DA] h-[40px]', {
                'border-red-600 outline-red-600': errors.homeRoomId
              })}
              {...register('homeRoomId')}
            >
              <option value=''>Chọn lớp sinh hoạt</option>
              {homeRooms &&
                homeRooms.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.homeRoomId?.message}
            </span>
          </div>

          <div className='col-span-1 flex flex-col'>
            <label htmlFor='education_program' className='mb-2'>
              Hệ đào tạo
            </label>
            <select
              id='education_program'
              className={classNames('border-[1px] border-gray-200 rounded-md px-4 outline-[#26C6DA] h-[40px]', {
                'border-red-600 outline-red-600': errors.educationProgramId
              })}
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
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.educationProgramId?.message}
            </span>
          </div>
        </div>
      </div>
      <div className='flex justify-end gap-6'>
        <button
          type='button'
          className='bg-gray-300 py-2 px-4 rounded-lg text-[14px] text-gray-800 font-semibold mt-6'
          onClick={onPreviousPage}
        >
          Hủy
        </button>
        <button type='submit' className='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold mt-6'>
          Tạo
        </button>
      </div>
    </Fragment>
  )
}

export default CreateStudentForm
