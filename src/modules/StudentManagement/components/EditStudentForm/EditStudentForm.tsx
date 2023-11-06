/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect } from 'react'
import { UseFormRegister, UseFormSetValue, Controller, Control } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { EducationProgramType, FacultyType, HomeRoomType, StudentType } from '../../interfaces'
import InputAvatar from 'src/modules/Share/components/InputAvatar'
import Button from 'src/modules/Share/components/Button'
import { gender } from '../../constants'
import { FormStudentType } from '../../utils'

interface Props {
  register: UseFormRegister<FormStudentType>
  setValue: UseFormSetValue<FormStudentType>
  control: Control<FormStudentType>
  student: StudentType
  educationPrograms: EducationProgramType[]
  faculties: FacultyType[]
  homeRooms: HomeRoomType[]
  handleDeleteStudent: (id: string) => void
  onChange: (file?: File) => void
  onChangeFaculty: (id: string) => void
  onCancel: () => void
  previewImage: string
  isLoadingEdit: boolean
}

const EditStudentForm = ({
  register,
  setValue,
  control,
  student,
  educationPrograms,
  faculties,
  homeRooms,
  handleDeleteStudent,
  onCancel,
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
            <InputAvatar
              register={register}
              onChange={onChange}
              previewImage={previewImage}
              avatar={student && student.imageUrl}
            />
          </div>
        </div>
        <div className='col-span-5 grid grid-cols-3 gap-x-6 gap-y-4 text-[14px]'>
          <Controller
            name='code'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.code }, fieldState: { error } }) => (
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
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='fullName'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.fullName }, fieldState: { error } }) => (
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
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.email }, fieldState: { error } }) => (
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
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='gender'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <Autocomplete
                    disablePortal
                    id='gender'
                    options={gender}
                    value={gender.find((option) => option.id === value) || null}
                    getOptionLabel={(option) => option.name}
                    noOptionsText='Không có lựa chọn'
                    renderInput={(params) => <TextField {...params} label='Giới tính' />}
                    onChange={(_, option) => onChange(option ? option.id : '')}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='birth'
            control={control}
            render={({ field: { onChange, value = student && student.dateOfBirth }, fieldState: { error } }) => (
              <div className='mt-[-8px]'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label='Ngày sinh'
                      format='DD/MM/YYYY'
                      onChange={onChange}
                      value={dayjs(value)}
                      className='bg-white w-full'
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            )}
          />
          <Controller
            name='phone'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.phone }, fieldState: { error } }) => (
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
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='homeTown'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.homeTown }, fieldState: { error } }) => (
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
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='address'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.address }, fieldState: { error } }) => (
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
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='citizenId'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = student && student.citizenId }, fieldState: { error } }) => (
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
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='facultyId'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <Autocomplete
                    disablePortal
                    id='faculty'
                    options={faculties ? faculties : []}
                    value={(faculties && faculties.find((option) => option.id === value)) || null}
                    getOptionLabel={(option) => option.name}
                    noOptionsText='Không có lựa chọn'
                    renderInput={(params) => <TextField {...params} label='Khoa' />}
                    onChange={(_, option) => {
                      onChange(option ? option.id : '')
                      onChangeFaculty(option?.id as string)
                    }}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='homeRoomId'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                    onChange={(_, option) => onChange(option ? option.id : '')}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='educationProgramId'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <Autocomplete
                    disablePortal
                    id='education_program'
                    options={educationPrograms ? educationPrograms : []}
                    value={(educationPrograms && educationPrograms.find((option) => option.id === value)) || null}
                    getOptionLabel={(option) => option.name}
                    noOptionsText='Không có lựa chọn'
                    renderInput={(params) => <TextField {...params} label='Hệ đào tạo' />}
                    onChange={(_, option) => onChange(option ? option.id : '')}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
        </div>
      </div>
      <div className='flex justify-end gap-6 border-b-2 pb-5'>
        <Button
          type='button'
          classNameButton='bg-[#9a9a9a] py-2 px-4 rounded-lg text-[16px] text-white font-semibold'
          onClick={onCancel}
        >
          Hủy
        </Button>
        <Button
          type='button'
          classNameButton='bg-red-500 py-2 px-4 rounded-lg text-[16px] text-white font-semibold'
          onClick={() => handleDeleteStudent(student.id)}
        >
          Xóa
        </Button>
        <Button
          classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold w-[90px]'
          isLoading={isLoadingEdit}
        >
          Lưu
        </Button>
      </div>
    </Fragment>
  )
}

export default EditStudentForm
