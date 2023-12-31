import { Controller, Control } from 'react-hook-form'
import { EducationProgramType, FacultyType, HomeRoomType } from '../../interfaces'
import Button from 'src/modules/Share/components/Button'
import { gender } from '../../constants'
import { FormFilterStudentType } from '../../utils'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Autocomplete, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface Props {
  control: Control<FormFilterStudentType>
  onResetForm: () => void
  educationPrograms: EducationProgramType[]
  faculties: FacultyType[]
  homeRooms: HomeRoomType[]
  onChangeFaculty: (id: string) => void
}

const Filter = ({ control, onResetForm, onChangeFaculty, educationPrograms, faculties, homeRooms }: Props) => {
  return (
    <div className='w-[360px] bg-white px-6 py-8 shadow-md text-gray-600 flex flex-col gap-y-6'>
      <div className='flex items-center justify-center'>
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
      <div className='flex flex-col gap-y-6'>
        <Controller
          name='facultyId'
          control={control}
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Autocomplete
                disablePortal
                id='faculty'
                options={faculties ? faculties : []}
                value={(faculties && faculties.find((option) => option.id === value)) || null}
                getOptionLabel={(option) => option.name}
                noOptionsText='Không có lựa chọn'
                renderInput={(params) => <TextField {...params} label='Chọn khoa' />}
                onChange={(_, option) => {
                  onChange(option ? option.id : '')
                  onChangeFaculty(option?.id as string)
                }}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name='homeRoomId'
          control={control}
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Autocomplete
                disablePortal
                id='homeroom'
                options={homeRooms ? homeRooms : []}
                value={(homeRooms && homeRooms.find((option) => option.id === value)) || null}
                getOptionLabel={(option) => option.name}
                noOptionsText='Không có lựa chọn'
                renderInput={(params) => <TextField {...params} label='Chọn lớp' />}
                onChange={(_, option) => onChange(option ? option.id : '')}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name='educationProgramId'
          control={control}
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Autocomplete
                disablePortal
                id='education_program'
                options={educationPrograms ? educationPrograms : []}
                value={(educationPrograms && educationPrograms.find((option) => option.id === value)) || null}
                getOptionLabel={(option) => option.name}
                noOptionsText='Không có lựa chọn'
                renderInput={(params) => <TextField {...params} label='Chọn hệ đào tạo' />}
                onChange={(_, option) => onChange(option ? option.id : '')}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name='gender'
          control={control}
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Autocomplete
                disablePortal
                id='gender'
                options={gender}
                value={gender.find((option) => option.id === value) || null}
                getOptionLabel={(option) => option.name}
                noOptionsText='Không có lựa chọn'
                renderInput={(params) => <TextField {...params} label='Chọn giới tính' />}
                onChange={(_, option) => onChange(option ? option.id : '')}
              />
            </LocalizationProvider>
          )}
        />
      </div>
      <div className='flex justify-between'>
        <Button
          type='button'
          classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#da2626] px-4 py-3 rounded-lg'
          onClick={onResetForm}
        >
          Làm mới
        </Button>
        <Button
          type='submit'
          classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-3 rounded-lg'
        >
          Lưu
        </Button>
      </div>
    </div>
  )
}

export default Filter
