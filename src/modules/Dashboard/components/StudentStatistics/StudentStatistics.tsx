import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { StudentsStatisticConfig, StudentsStatisticType } from '../../interfaces'
import { Autocomplete, TextField } from '@mui/material'
import { StudentStatisticOptions } from '../../constants'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormTimeStudentsStatisticSchema, FormTimeStudentsStatisticType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from 'src/modules/Share/components/Button'
import { formatDateOfBirth, formatVNDateTime } from 'src/modules/Share/utils'
import ModalCustom from 'src/modules/Share/components/Modal'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
  registeredStudentsOfStatistic: StudentsStatisticType[]
  attendanceStudentsOfStatistic: StudentsStatisticType[]
  studentsOfStatisticConfig: StudentsStatisticConfig
  setStudentsOfStatisticConfig: React.Dispatch<React.SetStateAction<StudentsStatisticConfig>>
}

const StudentStatistics = ({
  registeredStudentsOfStatistic,
  attendanceStudentsOfStatistic,
  studentsOfStatisticConfig,
  setStudentsOfStatisticConfig
}: Props) => {
  const [isOpenModalStudents, setIsOpenModalStudents] = useState<boolean>(false)

  const handleCloseModalStudents = () => {
    setIsOpenModalStudents(false)
  }

  const { handleSubmit, control } = useForm<FormTimeStudentsStatisticType>({
    resolver: yupResolver(FormTimeStudentsStatisticSchema)
  })

  const handleSelectTimeStatistic = handleSubmit((data) => {
    setStudentsOfStatisticConfig({
      Type: 'Custom',
      StartAt: formatVNDateTime(data.formDate as string),
      EndAt: formatVNDateTime(data.toDate as string)
    })
    handleCloseModalStudents()
  })

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Sinh viên đăng kí / tham gia sự kiện',
        font: {
          size: 20
        }
      }
    },
    scales: {
      y: {
        min: 0
      }
    }
  }

  const chart = {
    labels: registeredStudentsOfStatistic && registeredStudentsOfStatistic.map((item) => item.name),
    datasets: [
      {
        label: 'Sinh viên đăng kí',
        data: registeredStudentsOfStatistic && registeredStudentsOfStatistic.map((item) => item.value),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4
      },
      {
        label: 'Sinh viên tham gia',
        data: attendanceStudentsOfStatistic && attendanceStudentsOfStatistic.map((item) => item.value),
        fill: true,
        backgroundColor: 'rgba(192, 28, 28, 0.2)',
        borderColor: 'rgba(192, 28, 28, 1)',
        tension: 0.4
      }
    ]
  }

  return (
    <div className='flex justify-center'>
      <div className='w-[90%] mx-auto relative'>
        <Button
          onClick={() => setIsOpenModalStudents(true)}
          classNameButton='absolute top-[32px] left-[32px] outline-none mb-2 h-[24px] text-[14px] text-[#26c6da] font-medium hover:text-[#26c6da]/70 hover:underline'
        >
          {studentsOfStatisticConfig.StartAt !== undefined &&
            studentsOfStatisticConfig.EndAt !== undefined &&
            formatDateOfBirth(studentsOfStatisticConfig.StartAt as string) +
              ' - ' +
              formatDateOfBirth(studentsOfStatisticConfig.EndAt as string)}
        </Button>
        <Line options={options} data={chart} />
        <div className='w-[140px] text-gray-600 absolute top-[12px] right-[32px]'>
          <Autocomplete
            disablePortal
            id='gender'
            options={StudentStatisticOptions}
            value={
              StudentStatisticOptions.find(
                (option) => option.id === studentsOfStatisticConfig.Type && option.id !== 'Custom'
              ) || null
            }
            getOptionLabel={(option) => option.name}
            noOptionsText='Không có lựa chọn'
            renderInput={(params) => <TextField {...params} label='Chọn loại' />}
            onChange={(_, option) => {
              if (option && option.id === 'Custom') {
                setIsOpenModalStudents(true)
              }
              if (option && option.id !== undefined && option.id !== 'Custom') {
                setStudentsOfStatisticConfig({ Type: option.id as string })
              }
            }}
          />
        </div>
        <ModalCustom isOpenModal={isOpenModalStudents} handleClose={handleCloseModalStudents}>
          <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg md:w-[620px] max-md:w-[400px]'>
            <div className='flex justify-between items-center w-full'>
              <h2 className='text-[16px] font-semibold max-md:text-[12px]'>
                Chọn khoảng thời gian để thống kê sinh viên
              </h2>
              <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalStudents}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 max-md:w-5 max-md:h-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </Button>
            </div>
            <form className='w-full overflow-hidden' onSubmit={handleSelectTimeStatistic}>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between max-md:flex-col'>
                  <Controller
                    name='formDate'
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <div className='col-span-6'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DateTimeField']}>
                            <DatePicker
                              label='Thời gian bắt đầu'
                              format='DD/MM/YYYY'
                              onChange={onChange}
                              value={value}
                              className='bg-white'
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
                                      height: '24px',
                                      fontSize: '12px'
                                    }
                                  }
                                }
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                        <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                          {error?.message}
                        </span>
                      </div>
                    )}
                  />
                  <Controller
                    name='toDate'
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <div className='col-span-6'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DateTimeField']}>
                            <DatePicker
                              label='Thời gian kết thúc'
                              format='DD/MM/YYYY'
                              onChange={onChange}
                              value={value}
                              className='bg-white'
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
                                      height: '24px',
                                      fontSize: '12px'
                                    }
                                  }
                                },
                                '& .css-a643pv-MuiStack-root': {
                                  '& .MuiTextField-root': {
                                    xs: {
                                      minWidth: '240px'
                                    }
                                  }
                                }
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                        <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                          {error?.message}
                        </span>
                      </div>
                    )}
                  />
                </div>
                <div className='flex justify-end items-center'>
                  <Button
                    type='submit'
                    classNameButton='flex justify-center items-center bg-[#195E8E] w-[118px] h-[40px] text-white p-2 max-md:p-1 rounded-xl font-semibold transition-all duration-300 hover:bg-[#195E8E]/90 text-[16px] max-md:text-[12px]'
                  >
                    Hoàn tất
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </ModalCustom>
      </div>
    </div>
  )
}

export default StudentStatistics
