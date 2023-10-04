import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { EducationProgramType } from '../../interfaces/education_program.type'
import { FacultyType } from '../../interfaces/faculty.type'
import { HomeRoomType } from '../../interfaces/home_room.type'
import { UseFormRegister, FieldErrors, UseFormSetError } from 'react-hook-form'
import InputFile from 'src/modules/Share/components/InputFile'
import { FormStudentType } from '../../utils/rules'
import { useQuery } from '@tanstack/react-query'
import homeroomAPI from '../../services/home_room.api'
import Input from 'src/modules/Share/components/Input'
import Select from 'src/modules/Share/components/Select'
import { gender } from '../../constants/gender_options'

interface Props {
  register: UseFormRegister<FormStudentType>
  errors: FieldErrors<FormStudentType>
  setError: UseFormSetError<FormStudentType>
  educationPrograms: EducationProgramType[]
  faculties: FacultyType[]
  onChange: (file?: File) => void
  previewImage: string
  onPreviousPage: () => void
}

const CreateStudentForm = ({
  register,
  errors,
  setError,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeSelection = (event: React.ChangeEvent<HTMLSelectElement>, name: any) => {
    if (name == 'facultyId') {
      setFacultyId(event.target.value)
      event.target.value && setError(name, { message: '' })
    } else {
      event.target.value && setError(name, { message: '' })
    }
  }

  return (
    <Fragment>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-1 flex flex-col items-center mx-6'>
          <InputFile register={register} onChange={onChange} previewImage={previewImage} />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.imageUrl?.message}</span>
        </div>
        <div className='col-span-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[14px] font-semibold text-gray-600 placeholder:text-black'>
          <Input
            register={register}
            id='studentId'
            name='code'
            label='Mã số sinh viên'
            placeholder='Nhập mã số sinh viên'
            className='col-span-1 flex flex-col'
            classNameInput={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
              'border-red-600 outline-red-600': errors.code
            })}
            error={errors.code?.message}
          />
          <Input
            register={register}
            id='fullname'
            name='fullName'
            label='Họ và tên'
            placeholder='Nhập họ và tên'
            className='col-span-1 flex flex-col'
            classNameInput={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
              'border-red-600 outline-red-600': errors.fullName
            })}
            error={errors.fullName?.message}
          />
          <Select
            register={register}
            id='gender'
            name='gender'
            label='Giới tính'
            className='col-span-1 flex flex-col'
            classNameSelect='border-[1px] border-gray-200 px-1 py-2 rounded-md'
            options={gender}
          />
          <Input
            register={register}
            id='email'
            name='email'
            label='Email'
            placeholder='Nhập Email'
            className='col-span-1 flex flex-col'
            classNameInput={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
              'border-red-600 outline-red-600': errors.email
            })}
            error={errors.email?.message}
          />
          <Input
            register={register}
            id='homeTown'
            name='homeTown'
            label='Nơi sinh'
            placeholder='Nhập nơi sinh'
            className='col-span-1 flex flex-col'
            classNameInput={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
              'border-red-600 outline-red-600': errors.homeTown
            })}
            error={errors.homeTown?.message}
          />
          <Input
            register={register}
            id='phone'
            name='phone'
            label='Số điện thoại'
            placeholder='Nhập số điện thoại'
            className='col-span-1 flex flex-col'
            classNameInput={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
              'border-red-600 outline-red-600': errors.phone
            })}
            error={errors.phone?.message}
          />
          <Input
            register={register}
            id='birth'
            name='birth'
            type='date'
            label='Ngày sinh'
            placeholder='Nhập ngày sinh'
            className='col-span-1 flex flex-col'
            classNameInput={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
              'border-red-600 outline-red-600': errors.birth
            })}
            error={errors.birth?.message}
          />
          <Input
            register={register}
            id='citizenId'
            name='citizenId'
            label='Căn cước công dân'
            placeholder='Nhập căn cước công dân'
            className='col-span-1 flex flex-col'
            classNameInput={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
              'border-red-600 outline-red-600': errors.citizenId
            })}
            error={errors.citizenId?.message}
          />
          <Input
            register={register}
            id='address'
            name='address'
            label='Địa chỉ cư trú'
            placeholder='Nhập địa chỉ cư trú'
            className='col-span-1 flex flex-col'
            classNameInput={classNames('border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#26C6DA] h-[40px]', {
              'border-red-600 outline-red-600': errors.address
            })}
            error={errors.address?.message}
          />
          <Select
            register={register}
            id='faculty'
            name='facultyId'
            label='Khoa'
            className='col-span-1 flex flex-col'
            classNameSelect={classNames('border-[1px] border-gray-200 rounded-md px-4 outline-[#26C6DA] h-[40px]', {
              'border-red-600 outline-red-600': errors.facultyId?.message !== '' && errors.facultyId
            })}
            defaultOptions='Chọn khoa'
            options={faculties}
            error={errors.facultyId?.message}
            onChange={(e) => handleChangeSelection(e, 'facultyId')}
          />
          <Select
            register={register}
            id='homeroom'
            name='homeRoomId'
            label='Lớp sinh hoạt'
            className='col-span-1 flex flex-col'
            classNameSelect={classNames('border-[1px] border-gray-200 rounded-md px-4 outline-[#26C6DA] h-[40px]', {
              'border-red-600 outline-red-600': errors.homeRoomId?.message !== '' && errors.homeRoomId
            })}
            defaultOptions='Chọn lớp sinh hoạt'
            options={homeRooms}
            error={errors.homeRoomId?.message}
            onChange={(e) => handleChangeSelection(e, 'homeRoomId')}
          />
          <Select
            register={register}
            id='education_program'
            name='educationProgramId'
            label='Hệ đào tạo'
            className='col-span-1 flex flex-col'
            classNameSelect={classNames('border-[1px] border-gray-200 rounded-md px-4 outline-[#26C6DA] h-[40px]', {
              'border-red-600 outline-red-600': errors.educationProgramId?.message !== '' && errors.educationProgramId
            })}
            defaultOptions='Chọn hệ đào tạo'
            options={educationPrograms}
            error={errors.educationProgramId?.message}
            onChange={(e) => handleChangeSelection(e, 'educationProgramId')}
          />
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
