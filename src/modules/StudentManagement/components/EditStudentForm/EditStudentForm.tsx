import { Fragment, useEffect } from 'react'
import { StudentType } from '../../interfaces/student.type'
import { EducationProgramType } from '../../interfaces/education_program.type'
import { FacultyType } from '../../interfaces/faculty.type'
import { HomeRoomType } from '../../interfaces/home_room.type'
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form'
import InputFile from 'src/modules/Share/components/InputFile'
import { FormStudentType } from '../../utils/rules'
import { formatDateTime } from 'src/modules/Share/utils/utils'
import Input from 'src/modules/Share/components/Input'
import classNames from 'classnames'
import Select from 'src/modules/Share/components/Select'
import { gender } from '../../constants/gender_options'
import Button from 'src/modules/Share/components/Button'

interface Props {
  register: UseFormRegister<FormStudentType>
  errors: FieldErrors<FormStudentType>
  setValue: UseFormSetValue<FormStudentType>
  student: StudentType
  educationPrograms: EducationProgramType[]
  faculties: FacultyType[]
  homeRooms: HomeRoomType[]
  handleDeleteStudent: (id: string) => void
  isLoading: boolean
  onChange: (file?: File) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangeSelection: (event: React.ChangeEvent<HTMLSelectElement>, name: any) => void
  previewImage: string
  isLoadingEdit: boolean
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
  isLoading,
  onChange,
  onChangeSelection,
  previewImage,
  isLoadingEdit
}: Props) => {
  useEffect(() => {
    if (student && faculties && educationPrograms) {
      setValue('code', student.code)
      setValue('fullName', student.fullName)
      setValue('email', student.email)
      setValue('gender', student.gender)
      setValue('birth', formatDateTime(student.dateOfBirth))
      setValue('phone', student.phone)
      setValue('homeTown', student.homeTown)
      setValue('address', student.address)
      setValue('citizenId', student.citizenId)
      setValue('homeRoomId', student.homeRoomId)
      setValue('facultyId', student.facultyId)
      setValue('educationProgramId', student.educationProgramId)
      setValue('imageUrl', student.imageUrl)
    }
  }, [student, faculties, educationPrograms, setValue])

  return (
    <Fragment>
      <div className='grid grid-cols-6 gap-6 '>
        <div className='col-span-1'>
          <div className='flex flex-col items-center justify-center '>
            <InputFile register={register} onChange={onChange} previewImage={previewImage} student={student} />
          </div>
        </div>
        <div className='col-span-5 grid grid-cols-3 gap-x-6 gap-y-1 text-[14px]'>
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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
            isLoading={isLoading}
          />
          <Select
            register={register}
            id='gender'
            name='gender'
            label='Giới tính'
            className='col-span-1 flex flex-col'
            classNameSelect='border-[1px] border-gray-200 px-1 py-2 rounded-md'
            options={gender}
            isLoading={isLoading}
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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
            onChange={(e) => onChangeSelection(e, 'facultyId')}
            isLoading={isLoading}
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
            onChange={(e) => onChangeSelection(e, 'homeRoomId')}
            isLoading={isLoading}
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
            onChange={(e) => onChangeSelection(e, 'educationProgramId')}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className='flex justify-end gap-6 border-b-2 pb-4'>
        <Button
          type='button'
          classNameButton='bg-red-500 py-2 px-4 rounded-lg text-[16px] text-white font-semibold mt-6'
          onClick={() => handleDeleteStudent(student.id)}
        >
          Xóa
        </Button>
        <Button
          classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold mt-6 w-[90px]'
          isLoading={isLoadingEdit}
        >
          Lưu
        </Button>
      </div>
    </Fragment>
  )
}

export default EditStudentForm
