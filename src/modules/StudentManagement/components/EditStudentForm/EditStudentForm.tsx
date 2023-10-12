/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect } from 'react'
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form'
import classNames from 'classnames'
import { FormStudentType } from '../../utils/rules'
import { EducationProgramType, FacultyType, HomeRoomType, StudentType } from '../../interfaces'
import { formatDateTime } from 'src/modules/Share/utils'
import InputImage from 'src/modules/Share/components/InputImage'
import Input from 'src/modules/Share/components/Input'
import Select from 'src/modules/Share/components/Select'
import Button from 'src/modules/Share/components/Button'
import { gender } from '../../constants'

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
  onChangeSelection: (event: React.ChangeEvent<HTMLSelectElement>, name: any) => void
  previewImage: string
  isLoadingEdit: boolean
  onPreviousPage: () => void
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
  onPreviousPage,
  isLoading,
  onChange,
  onChangeSelection,
  previewImage,
  isLoadingEdit
}: Props) => {
  useEffect(() => {
    if (homeRooms && student) {
      setValue('homeRoomId', student.homeRoomId)
    }
  }, [homeRooms, student, setValue])
  useEffect(() => {
    if (faculties && educationPrograms && student) {
      setValue('code', student.code)
      setValue('fullName', student.fullName)
      setValue('email', student.email)
      setValue('gender', student.gender)
      setValue('birth', formatDateTime(student.dateOfBirth))
      setValue('phone', student.phone)
      setValue('homeTown', student.homeTown)
      setValue('address', student.address)
      setValue('citizenId', student.citizenId)
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
            <InputImage register={register} onChange={onChange} previewImage={previewImage} student={student} />
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
            classNameInput={classNames('border-[1px] border-gray-200 rounded py-2 px-4 outline-[#26C6DA] h-[48px]', {
              'border-red-600 outline-red-600': errors.code
            })}
            error={errors.code?.message}
            isLoading={isLoading}
          />
          <Input
            register={register}
            id='fullName'
            name='fullName'
            label='Họ và tên'
            placeholder='Nhập họ và tên'
            className='col-span-1 flex flex-col'
            classNameInput={classNames('border-[1px] border-gray-200 rounded py-2 px-4 outline-[#26C6DA] h-[48px]', {
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
            classNameInput={classNames('border-[1px] border-gray-200 rounded py-2 px-4 outline-[#26C6DA] h-[48px]', {
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
            classNameSelect='border-[1px] border-gray-200 rounded px-4 outline-[#26C6DA] h-[48px]'
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
            classNameInput={classNames('border-[1px] border-gray-200 rounded py-2 px-4 outline-[#26C6DA] h-[48px]', {
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
            classNameInput={classNames('border-[1px] border-gray-200 rounded py-2 px-4 outline-[#26C6DA] h-[48px]', {
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
            classNameInput={classNames('border-[1px] border-gray-200 rounded py-2 px-4 outline-[#26C6DA] h-[48px]', {
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
            classNameInput={classNames('border-[1px] border-gray-200 rounded py-2 px-4 outline-[#26C6DA] h-[48px]', {
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
            classNameInput={classNames('border-[1px] border-gray-200 rounded py-2 px-4 outline-[#26C6DA] h-[48px]', {
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
            classNameSelect={classNames('border-[1px] border-gray-200 rounded px-4 outline-[#26C6DA] h-[48px]', {
              'border-red-600 outline-red-600': errors.facultyId?.message !== '' && errors.facultyId
            })}
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
            classNameSelect={classNames('border-[1px] border-gray-200 rounded px-4 outline-[#26C6DA] h-[48px]', {
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
            classNameSelect={classNames('border-[1px] border-gray-200 rounded px-4 outline-[#26C6DA] h-[48px]', {
              'border-red-600 outline-red-600': errors.educationProgramId?.message !== '' && errors.educationProgramId
            })}
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
          classNameButton='bg-[#9a9a9a] py-2 px-4 rounded-lg text-[16px] text-white font-semibold mt-6'
          onClick={onPreviousPage}
        >
          Hủy
        </Button>
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
