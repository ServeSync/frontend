/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from 'react'
import { UseFormRegister, FieldErrors, Control, Controller } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { FormStudentType } from '../../utils/rules'
import { EducationProgramType, FacultyType } from '../../interfaces'
import { GetAllHomeRoomsByFacultyIdQuery } from '../../services'
import InputImage from 'src/modules/Share/components/InputImage'
import Button from 'src/modules/Share/components/Button'
import { gender } from '../../constants'

interface Props {
  register: UseFormRegister<FormStudentType>
  errors: FieldErrors<FormStudentType>
  control: Control<FormStudentType>
  educationPrograms: EducationProgramType[]
  faculties: FacultyType[]
  onChange: (file?: File) => void
  previewImage: string
  onPreviousPage: () => void
  isLoading: boolean
}

const CreateStudentForm = ({
  register,
  control,
  errors,
  educationPrograms,
  faculties,
  onChange,
  previewImage,
  onPreviousPage,
  isLoading
}: Props) => {
  const [facultyId, setFacultyId] = useState<string>('')

  const getAllHomeRoomsByFacultyIdQuery = new GetAllHomeRoomsByFacultyIdQuery(facultyId)
  const homeRooms = getAllHomeRoomsByFacultyIdQuery.fetch()

  const handleChangeFaculty = (id: string) => {
    setFacultyId(id)
  }

  return (
    <Fragment>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-1 flex flex-col items-center mx-6'>
          <InputImage register={register} onChange={onChange} previewImage={previewImage} />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.imageUrl?.message}</span>
        </div>
        <div className='col-span-3 grid grid-cols-2 gap-x-6 gap-y-4 text-[14px] font-semibold text-gray-600 placeholder:text-black'>
          <div>
            <TextField
              id='code'
              {...register('code')}
              label='Mã số sinh viên'
              placeholder='Nhập mã số sinh viên'
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.code?.message}</span>
          </div>
          <div>
            <TextField
              id='fullName'
              {...register('fullName')}
              label='Họ và tên'
              placeholder='Nhập họ và tên'
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.fullName?.message}</span>
          </div>
          <Controller
            name='gender'
            control={control}
            render={({ field: { onChange, value } }) => (
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
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.gender?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <div>
            <TextField
              id='email'
              {...register('email')}
              label='Email'
              placeholder='Nhập Email'
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.email?.message}</span>
          </div>
          <div>
            <TextField
              id='homeTown'
              {...register('homeTown')}
              label='Nơi sinh'
              placeholder='Nhập nơi sinh'
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.homeTown?.message}</span>
          </div>
          <div>
            <TextField
              id='phone'
              {...register('phone')}
              label='Số điện thoại'
              placeholder='Nhập số điện thoại'
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.phone?.message}</span>
          </div>
          <Controller
            name='birth'
            control={control}
            render={({ field: { onChange, value = null } }) => (
              <div className='mt-[-8px]'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimeField']}>
                    <DateTimePicker
                      label='Ngày sinh'
                      format='DD/MM/YYYY'
                      onChange={onChange}
                      value={value}
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
          <div>
            <TextField
              id='citizenId'
              {...register('citizenId')}
              label='Căn cước công dân'
              placeholder='Nhập căn cước công dân'
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.citizenId?.message}
            </span>
          </div>
          <div>
            <TextField
              id='address'
              {...register('address')}
              label='Địa chỉ cư trú'
              placeholder='Nhập địa chỉ cư trú'
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.address?.message}</span>
          </div>
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
                    noOptionsText='Không có lựa chọn'
                    renderInput={(params) => <TextField {...params} label='Khoa' />}
                    onChange={(_, option) => {
                      onChange(option ? option.id : '')
                      handleChangeFaculty(option?.id as string)
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
                    onChange={(_, option) => onChange(option ? option.id : '')}
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
                    noOptionsText='Không có lựa chọn'
                    renderInput={(params) => <TextField {...params} label='Hệ đào tạo' />}
                    onChange={(_, option) => onChange(option ? option.id : '')}
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
      <div className='flex justify-end gap-6'>
        <Button
          type='button'
          classNameButton='bg-gray-300 py-2 px-4 rounded-lg text-[14px] text-gray-800 font-semibold mt-6'
          onClick={onPreviousPage}
        >
          Hủy
        </Button>
        <Button
          classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold mt-6 w-[90px]'
          isLoading={isLoading}
        >
          Tạo
        </Button>
      </div>
    </Fragment>
  )
}

export default CreateStudentForm
