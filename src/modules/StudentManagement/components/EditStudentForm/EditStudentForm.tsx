import { Fragment, useEffect } from 'react'
import { StudentForm, StudentType } from '../../interfaces/student.type'
import { EducationProgramType } from '../../interfaces/education_program.type'
import { FacultyType } from '../../interfaces/faculty.type'
import { HomeRoomType } from '../../interfaces/home_room.type'
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { formatDateTime } from 'src/modules/Share/utils/utils'
import Skeleton from 'react-loading-skeleton'

interface Props {
  register: UseFormRegister<StudentForm>
  errors: FieldErrors<StudentForm>
  setValue: UseFormSetValue<StudentForm>
  student: StudentType
  educationPrograms: EducationProgramType[]
  faculties: FacultyType[]
  homeRooms: HomeRoomType[]
  handleDeleteStudent: (id: string) => void
  isLoading: boolean
}

const EditStudentForm = ({
  register,
  errors,
  setValue,
  student,
  educationPrograms,
  faculties,
  homeRooms,
  handleDeleteStudent,
  isLoading
}: Props) => {
  useEffect(() => {
    if (student) {
      setValue('code', student.code)
      setValue('fullName', student.fullName)
      setValue('email', student.email)
      setValue('gender', student.gender)
      setValue('dateOfBirth', formatDateTime(student.dateOfBirth))
      setValue('phone', student.phone)
      setValue('homeTown', student.homeTown)
      setValue('address', student.address)
      setValue('citizenId', student.citizenId)
      setValue('facultyId', student.facultyId)
      setValue('homeRoomId', student.homeRoomId)
      setValue('educationProgramId', student.educationProgramId)
    }
  }, [student, faculties, homeRooms, educationPrograms, setValue])

  return (
    <Fragment>
      <div className='grid grid-cols-3 gap-x-6 gap-y-1 text-[14px]'>
        <div className='col-span-1 flex flex-col mb-2'>
          <label htmlFor='studentId' className='mb-2'>
            Mã số sinh viên
          </label>
          {isLoading ? (
            <Skeleton className='h-[34px]' />
          ) : (
            <input
              type='text'
              id='studentId'
              className='border-[1px] border-gray-200 rounded-md py-2 px-2 outline-[#26C6DA]'
              {...register('code')}
            />
          )}
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>{errors.code?.message}</span>
        </div>

        <div className='col-span-1 flex flex-col mb-2'>
          <label htmlFor='fullName' className='mb-2'>
            Họ tên
          </label>
          {isLoading ? (
            <Skeleton className='h-[34px]' />
          ) : (
            <input
              type='text'
              id='fullName'
              className='border-[1px] border-gray-200 rounded-md py-2 px-2 outline-[#26C6DA]'
              {...register('fullName')}
            />
          )}
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>{errors.fullName?.message}</span>
        </div>

        <div className='col-span-1 flex flex-col mb-2'>
          <label htmlFor='email' className='mb-2'>
            Email
          </label>
          {isLoading ? (
            <Skeleton className='h-[34px]' />
          ) : (
            <input
              type='text'
              id='email'
              className='border-[1px] border-gray-200 rounded-md py-2 px-2 outline-[#26C6DA]'
              {...register('email')}
            />
          )}
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>{errors.email?.message}</span>
        </div>

        <div className='col-span-1 flex flex-col mb-2'>
          <label htmlFor='gender' className='mb-2'>
            Giới tính
          </label>
          {isLoading ? (
            <Skeleton className='h-[34px]' />
          ) : (
            <select
              defaultValue='male'
              id='gender'
              className='border-[1px] border-gray-200 px-2 py-2 rounded-md'
              {...register('gender')}
            >
              <option value='0'>Chọn giới tính</option>
              <option value={'true'}>Nam</option>
              <option value={'false'}>Nữ</option>
            </select>
          )}
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>{errors.gender?.message}</span>
        </div>

        <div className='col-span-1 flex flex-col mb-2'>
          <label htmlFor='date_of_birth' className='mb-2'>
            Ngày sinh
          </label>
          {isLoading ? (
            <Skeleton className='h-[34px]' />
          ) : (
            <input
              type='text'
              id='date_of_birth'
              placeholder='Chọn ngày sinh'
              className='border-[1px] border-gray-200 rounded-md py-2 px-2 outline-[#26C6DA] font-normal h-[40px]'
              {...register('dateOfBirth')}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
            />
          )}
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>
            {errors.dateOfBirth?.message}
          </span>
        </div>

        <div className='col-span-1 flex flex-col mb-2'>
          <label htmlFor='phone' className='mb-2'>
            Số điện thoại
          </label>
          {isLoading ? (
            <Skeleton className='h-[34px]' />
          ) : (
            <input
              type='text'
              id='phone'
              className='border-[1px] border-gray-200 rounded-md py-2 px-2 outline-[#26C6DA]'
              {...register('phone')}
            />
          )}
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>{errors.phone?.message}</span>
        </div>

        <div className='col-span-1 flex flex-col mb-2'>
          <label htmlFor='homeTown' className='mb-2'>
            Quê quán
          </label>
          {isLoading ? (
            <Skeleton className='h-[34px]' />
          ) : (
            <input
              type='text'
              id='homeTown'
              className='border-[1px] border-gray-200 rounded-md py-2 px-2 outline-[#26C6DA]'
              {...register('homeTown')}
            />
          )}
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>{errors.homeTown?.message}</span>
        </div>

        <div className='col-span-1 flex flex-col mb-2'>
          <label htmlFor='address' className='mb-2'>
            Địa chỉ cư trú
          </label>
          {isLoading ? (
            <Skeleton className='h-[34px]' />
          ) : (
            <input
              type='text'
              id='address'
              className='border-[1px] border-gray-200 rounded-md py-2 px-2 outline-[#26C6DA]'
              {...register('address')}
            />
          )}
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>{errors.address?.message}</span>
        </div>

        <div className='col-span-1 flex flex-col mb-2'>
          <label htmlFor='citizenId' className='mb-2'>
            Căn cước công dân
          </label>
          {isLoading ? (
            <Skeleton className='h-[34px]' />
          ) : (
            <input
              type='text'
              id='citizenId'
              className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA]'
              {...register('citizenId')}
            />
          )}
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>{errors.citizenId?.message}</span>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='faculty' className='mb-2'>
            Khoa
          </label>
          {isLoading ? (
            <Skeleton className='h-[34px]' />
          ) : (
            <select
              id='faculty'
              className='border-[1px] border-gray-200 px-2 py-2 rounded-md'
              {...register('facultyId')}
            >
              <option value='0'>Chọn khoa</option>
              {faculties &&
                faculties.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          )}
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>{errors.facultyId?.message}</span>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='class' className='mb-2'>
            Lớp
          </label>
          {isLoading ? (
            <Skeleton className='h-[34px]' />
          ) : (
            <select
              id='class'
              className='border-[1px] border-gray-200 px-2 py-2 rounded-md'
              {...register('homeRoomId')}
            >
              <option value='0'>Chọn lớp sinh hoạt</option>
              {homeRooms &&
                homeRooms.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          )}
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>{errors.homeRoomId?.message}</span>
        </div>

        <div className='col-span-1 flex flex-col'>
          <label htmlFor='education_program' className='mb-2'>
            Hệ đào tạo
          </label>
          {isLoading ? (
            <Skeleton className='h-[34px]' />
          ) : (
            <select
              id='education_program'
              className='border-[1px] border-gray-200 px-2 py-2 rounded-md'
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
          )}
          <span className='block min-h-[14px] text-red-600 text-xs mt-1 font-medium'>
            {errors.educationProgramId?.message}
          </span>
        </div>
      </div>
      <div className='flex justify-end gap-6'>
        <button
          type='button'
          onClick={() => handleDeleteStudent(student.id)}
          className='bg-red-500 py-2 px-4 rounded-lg text-[16px] text-white font-semibold mt-6'
        >
          Xóa
        </button>
        <button type='submit' className='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold mt-6'>
          Lưu
        </button>
      </div>
    </Fragment>
  )
}

export default EditStudentForm
