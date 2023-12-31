import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Fragment, useEffect } from 'react'
import { Control, Controller, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import Button from 'src/modules/Share/components/Button'
import InputAvatar from 'src/modules/Share/components/InputAvatar'
import { ProfileStudent } from 'src/modules/Share/interfaces'
import { formatDateOfBirth } from 'src/modules/Share/utils'
import { FormStudentType } from 'src/modules/StudentManagement/utils'

interface Props {
  register: UseFormRegister<FormStudentType>
  setValue: UseFormSetValue<FormStudentType>
  control: Control<FormStudentType>
  profile: ProfileStudent
  onChange: (file?: File) => void
  previewImage: string
  isLoadingEdit: boolean
}

const EditProfileForm = ({ profile, onChange, previewImage, setValue, control, register, isLoadingEdit }: Props) => {
  useEffect(() => {
    if (profile) {
      setValue('code', profile.code)
      setValue('fullName', profile.fullName)
      setValue('email', profile.email)
      setValue('gender', profile.gender.toString())
      setValue('birth', profile.dateOfBirth)
      setValue('phone', profile.phone)
      setValue('homeTown', profile.homeTown)
      setValue('address', profile.address)
      setValue('citizenId', profile.citizenId)
      setValue('facultyId', profile.faculty.name)
      setValue('homeRoomId', profile.homeRoom.name)
      setValue('educationProgramId', profile.educationProgram.name)
      setValue('imageUrl', profile.imageUrl)
    }
  }, [profile, setValue])

  const handleReset = () => {
    if (profile) {
      setValue('email', profile.email)
      setValue('phone', profile.phone)
      setValue('homeTown', profile.homeTown)
      setValue('address', profile.address)
      setValue('imageUrl', profile.imageUrl)
    }
  }
  return (
    <Fragment>
      <div className='md:grid md:grid-cols-6 max-md:flex max-md:flex-col gap-6'>
        <div className='col-span-1'>
          <div className='flex flex-col items-center justify-center max-md:w-[30%] mx-auto'>
            <InputAvatar
              register={register}
              onChange={onChange}
              previewImage={previewImage}
              avatar={profile && profile.imageUrl}
            />
          </div>
        </div>
        <div className='col-span-5 grid grid-cols-3 lg:gap-x-6 lg:gap-y-4 md:gap-x-4 md:gap-y-3 max-md:gap-x-2 max-md:gap-y-2 '>
          <Controller
            name='code'
            control={control}
            defaultValue=''
            render={({ field: { value = profile && profile.code } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='w-full'>
                  <TextField
                    id='code'
                    label='Mã số sinh viên'
                    value={value}
                    placeholder='Nhập mã số sinh viên'
                    className='w-full bg-white'
                    sx={{
                      '& .MuiInputBase-root': {
                        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                          sm: {
                            padding: '10px 14px',
                            height: '28px',
                            fontSize: '14px'
                          },
                          xs: {
                            padding: '8px 10px',
                            height: '20px',
                            fontSize: '10px'
                          }
                        }
                      }
                    }}
                    InputProps={{
                      disabled: true
                    }}
                  />
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='fullName'
            control={control}
            defaultValue=''
            render={({ field: { value = profile && profile.fullName } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='fullName'
                    label='Họ và tên'
                    value={value}
                    placeholder='Nhập họ và tên'
                    className='w-full bg-white'
                    sx={{
                      '& .MuiInputBase-root': {
                        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                          sm: {
                            padding: '10px 14px',
                            height: '28px',
                            fontSize: '14px'
                          },
                          xs: {
                            padding: '8px 10px',
                            height: '20px',
                            fontSize: '10px'
                          }
                        }
                      }
                    }}
                    InputProps={{
                      disabled: true
                    }}
                  />
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = profile && profile.email }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='email'
                    label='Email'
                    value={value}
                    placeholder='Nhập Email'
                    className='w-full bg-white'
                    sx={{
                      '& .MuiInputBase-root': {
                        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                          sm: {
                            padding: '10px 14px',
                            height: '28px',
                            fontSize: '14px'
                          },
                          xs: {
                            padding: '8px 10px',
                            height: '20px',
                            fontSize: '10px'
                          }
                        }
                      }
                    }}
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
            render={({ field: { value = profile && profile.gender } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='gender'
                    label='Giới tính'
                    value={value == false ? 'Nữ' : 'Nam'}
                    className='w-full bg-white'
                    sx={{
                      '& .MuiInputBase-root': {
                        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                          sm: {
                            padding: '10px 14px',
                            height: '28px',
                            fontSize: '14px'
                          },
                          xs: {
                            padding: '8px 10px',
                            height: '20px',
                            fontSize: '10px'
                          }
                        }
                      }
                    }}
                    InputProps={{
                      disabled: true
                    }}
                  />
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='birth'
            control={control}
            defaultValue=''
            render={({ field: { value = profile && profile.dateOfBirth } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='birth'
                    label='Ngày sinh'
                    value={formatDateOfBirth(value)}
                    className='w-full bg-white'
                    sx={{
                      '& .MuiInputBase-root': {
                        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                          sm: {
                            padding: '10px 14px',
                            height: '28px',
                            fontSize: '14px'
                          },
                          xs: {
                            padding: '8px 10px',
                            height: '20px',
                            fontSize: '10px'
                          }
                        }
                      }
                    }}
                    InputProps={{
                      disabled: true
                    }}
                  />
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='phone'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value = profile && profile.phone }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='phone'
                    label='Số điện thoại'
                    value={value}
                    placeholder='Nhập số điện thoại'
                    className='w-full bg-white'
                    sx={{
                      '& .MuiInputBase-root': {
                        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                          sm: {
                            padding: '10px 14px',
                            height: '28px',
                            fontSize: '14px'
                          },
                          xs: {
                            padding: '8px 10px',
                            height: '20px',
                            fontSize: '10px'
                          }
                        }
                      }
                    }}
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
            render={({ field: { onChange, value = profile && profile.homeTown }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='homeTown'
                    label='Nơi sinh'
                    value={value}
                    placeholder='Nhập nơi sinh'
                    className='w-full bg-white'
                    sx={{
                      '& .MuiInputBase-root': {
                        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                          sm: {
                            padding: '10px 14px',
                            height: '28px',
                            fontSize: '14px'
                          },
                          xs: {
                            padding: '8px 10px',
                            height: '20px',
                            fontSize: '10px'
                          }
                        }
                      }
                    }}
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
            render={({ field: { onChange, value = profile && profile.address }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='address'
                    label='Địa địa chỉ cư trú'
                    value={value}
                    placeholder='Nhập địa chỉ cư trú'
                    className='w-full bg-white'
                    sx={{
                      '& .MuiInputBase-root': {
                        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                          sm: {
                            padding: '10px 14px',
                            height: '28px',
                            fontSize: '14px'
                          },
                          xs: {
                            padding: '8px 10px',
                            height: '20px',
                            fontSize: '10px'
                          }
                        }
                      }
                    }}
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
            render={({ field: { value = profile && profile.citizenId } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='citizenId'
                    label='Căn cước công dân'
                    value={value}
                    className='w-full bg-white'
                    sx={{
                      '& .MuiInputBase-root': {
                        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                          sm: {
                            padding: '10px 14px',
                            height: '28px',
                            fontSize: '14px'
                          },
                          xs: {
                            padding: '8px 10px',
                            height: '20px',
                            fontSize: '10px'
                          }
                        }
                      }
                    }}
                    InputProps={{
                      disabled: true
                    }}
                  />
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='facultyId'
            control={control}
            defaultValue=''
            render={({ field: { value = profile && profile.faculty.id } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='faculty'
                    label='Khoa'
                    value={value}
                    className='w-full bg-white'
                    sx={{
                      '& .MuiInputBase-root': {
                        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                          sm: {
                            padding: '10px 14px',
                            height: '28px',
                            fontSize: '14px'
                          },
                          xs: {
                            padding: '8px 10px',
                            height: '20px',
                            fontSize: '10px'
                          }
                        }
                      }
                    }}
                    InputProps={{
                      disabled: true
                    }}
                  />
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='homeRoomId'
            control={control}
            defaultValue=''
            render={({ field: { value = profile && profile.homeRoom.id } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='homeroom'
                    label='Lớp sinh hoạt'
                    value={value}
                    className='w-full bg-white'
                    sx={{
                      '& .MuiInputBase-root': {
                        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                          sm: {
                            padding: '10px 14px',
                            height: '28px',
                            fontSize: '14px'
                          },
                          xs: {
                            padding: '8px 10px',
                            height: '20px',
                            fontSize: '10px'
                          }
                        }
                      }
                    }}
                    InputProps={{
                      disabled: true
                    }}
                  />
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='educationProgramId'
            control={control}
            defaultValue=''
            render={({ field: { value = profile && profile.educationProgram.id } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='education_program'
                    label='Hệ đào tạo'
                    value={value}
                    className='w-full bg-white'
                    sx={{
                      '& .MuiInputBase-root': {
                        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                          sm: {
                            padding: '10px 14px',
                            height: '28px',
                            fontSize: '14px'
                          },
                          xs: {
                            padding: '8px 10px',
                            height: '20px',
                            fontSize: '10px'
                          }
                        }
                      }
                    }}
                    InputProps={{
                      disabled: true
                    }}
                  />
                </div>
              </LocalizationProvider>
            )}
          />
        </div>
      </div>
      <div className='flex md:justify-end max-md:justify-center gap-6 py-5 border-b-[2px]'>
        <Button
          onClick={handleReset}
          type='button'
          classNameButton='bg-[#9a9a9a] py-2 md:px-4 max-md:px-2 rounded-lg md:text-[16px] max-md:text-[12px] text-white font-semibold w-[100px]'
        >
          Làm mới
        </Button>
        <Button
          type='submit'
          classNameButton='bg-[#26C6DA] py-2 md:px-4 max-md:px-2 rounded-lg md:text-[16px] max-md:text-[12px] text-white font-semibold w-[90px]'
          isLoading={isLoadingEdit}
        >
          Lưu
        </Button>
      </div>
    </Fragment>
  )
}

export default EditProfileForm
