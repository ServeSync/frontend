/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect } from 'react'
import { UseFormRegister, FieldErrors, UseFormSetValue, Controller, Control } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { FormStudentType } from '../../utils/rules'
import { EducationProgramType, FacultyType, HomeRoomType, StudentType } from '../../interfaces'
import InputImage from 'src/modules/Share/components/InputImage'
import Button from 'src/modules/Share/components/Button'
import { gender } from '../../constants'

interface Props {
  register: UseFormRegister<FormStudentType>
  errors: FieldErrors<FormStudentType>
  setValue: UseFormSetValue<FormStudentType>
  control: Control<FormStudentType>
  student: StudentType
  educationPrograms: EducationProgramType[]
  faculties: FacultyType[]
  homeRooms: HomeRoomType[]
  handleDeleteStudent: (id: string) => void
  isLoading: boolean
  onChange: (file?: File) => void
  onChangeFaculty: (id: string) => void
  previewImage: string
  isLoadingEdit: boolean
  onPreviousPage: () => void
}

const EditStudentForm = ({
  register,
  errors,
  setValue,
  control,
  student,
  educationPrograms,
  faculties,
  homeRooms,
  handleDeleteStudent,
  onPreviousPage,
  onChange,
  onChangeFaculty,
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
      setValue('gender', student.gender.toString())
      setValue('birth', student.dateOfBirth)
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
      <div className='grid grid-cols-6 gap-6'>
        <div className='col-span-1'>
          <div className='flex flex-col items-center justify-center '>
            <InputImage register={register} onChange={onChange} previewImage={previewImage} student={student} />
          </div>
        </div>
        <div className='col-span-5 grid grid-cols-3 gap-x-6 gap-y-4 text-[14px]'>
          <Controller
            name='code'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = (student && student.code) || null } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='code'
                    label='Mã số sinh viên'
                    value={value}
                    placeholder='Nhập mã số sinh viên'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.code?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='fullName'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.fullName } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='fullName'
                    label='Họ và tên'
                    value={value}
                    placeholder='Nhập họ và tên'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.fullName?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.email } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='email'
                    label='Email'
                    value={value}
                    placeholder='Nhập Email'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.email?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='gender'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <Autocomplete
                    disablePortal
                    id='gender'
                    options={gender}
                    value={gender.find((option) => option.id === value) || null}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label='Giới tính' />}
                    onChange={(_, option) => onChange(option?.id)}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.gender?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='birth'
            control={control}
            render={({ field: { onChange, value = student && student.dateOfBirth } }) => (
              <div className='mt-[-8px]'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimeField']}>
                    <DateTimePicker
                      label='Ngày sinh'
                      format='DD/MM/YYYY'
                      onChange={onChange}
                      value={dayjs(value)}
                      className='bg-white'
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                  {errors.birth?.message}
                </span>
              </div>
            )}
          />
          <Controller
            name='phone'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.phone } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='phone'
                    label='Số điện thoại'
                    value={value}
                    placeholder='Nhập số điện thoại'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.phone?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='homeTown'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.homeTown } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='homeTown'
                    label='Nơi sinh'
                    value={value}
                    placeholder='Nhập nơi sinh'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.homeTown?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='address'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.address } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='address'
                    label='Địa địa chỉ cư trú'
                    value={value}
                    placeholder='Nhập địa chỉ cư trú'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.address?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='citizenId'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.citizenId } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='citizenId'
                    label='Căn cước công dân'
                    value={value}
                    placeholder='Nhập căn cước công dân'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.citizenId?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='facultyId'
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <Autocomplete
                    disablePortal
                    id='faculty'
                    options={faculties ? faculties : []}
                    value={(faculties && faculties.find((option) => option.id === value)) || null}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label='Khoa' />}
                    onChange={(_, option) => {
                      onChange(option?.id)
                      onChangeFaculty(option?.id as string)
                    }}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.facultyId?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='homeRoomId'
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <Autocomplete
                    disablePortal
                    id='homeroom'
                    options={homeRooms ? homeRooms : []}
                    value={(homeRooms && homeRooms.find((option) => option.id === value)) || null}
                    getOptionLabel={(option) => option.name}
                    noOptionsText='Không có lựa chọn'
                    renderInput={(params) => <TextField {...params} label='Lớp sinh hoạt' />}
                    onChange={(_, option) => onChange(option?.id)}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.homeRoomId?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='educationProgramId'
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <Autocomplete
                    disablePortal
                    id='education_program'
                    options={educationPrograms ? educationPrograms : []}
                    value={(educationPrograms && educationPrograms.find((option) => option.id === value)) || null}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label='Hệ đào tạo' />}
                    onChange={(_, option) => onChange(option?.id)}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.educationProgramId?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
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
