import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { StatisticConfig, StatisticType } from '../../interfaces'
import { Autocomplete, TextField } from '@mui/material'
import { StatisticOptions } from '../../constants'
import { StatusToMessage } from 'src/modules/Share/constants'
import { useState } from 'react'
import ModalCustom from 'src/modules/Share/components/Modal'
import Button from 'src/modules/Share/components/Button'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { FormTimeStatisticSchema, FormTimeStatisticType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { formatDateOfBirth } from 'src/modules/Share/utils'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  eventsOfStatistic: StatisticType[]
  eventsOfStatisticConfig: StatisticConfig
  setEventsOfStatisticConfig: React.Dispatch<React.SetStateAction<StatisticConfig>>
}

const EventStatistics = ({ eventsOfStatistic, eventsOfStatisticConfig, setEventsOfStatisticConfig }: Props) => {
  const isZeroValues = eventsOfStatistic && eventsOfStatistic.every((item) => item.count === 0)

  const [isOpenModalEvents, setIsOpenModalEvents] = useState<boolean>(false)

  const handleCloseModalEvents = () => {
    setIsOpenModalEvents(false)
  }

  const { handleSubmit, control } = useForm<FormTimeStatisticType>({
    resolver: yupResolver(FormTimeStatisticSchema)
  })

  const handleSelectTimeStatistic = handleSubmit((data) => {
    setEventsOfStatisticConfig({ Type: 'Custom', StartAt: data.formDate, EndAt: data.toDate })
    handleCloseModalEvents()
  })

  const data = {
    labels: eventsOfStatistic && eventsOfStatistic.map((item) => StatusToMessage(item.status)),
    datasets: [
      {
        data: eventsOfStatistic && eventsOfStatistic.map((item) => item.count),
        backgroundColor: ['#ff0037', '#29a9ff', '#fbc94c', '#a2ff56', '#eb56ff', '#fb8a00', '#00fbea'],
        borderColor: ['#ff0037', '#29a9ff', '#fbc94c', '#a2ff56', '#eb56ff', '#fb8a00', '#00fbea'],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg p-6 w-[45%] bg-white'>
      <div className='flex items-center justify-between'>
        <div className='mb-4'>
          <h1 className='font-bold text-[18px]'>Sự kiện</h1>
          <h2 className='text-[13px] text-gray-400'>Thống kê sự kiện theo trạng thái</h2>
        </div>
        <div className='w-[160px] text-gray-600'>
          <Autocomplete
            disablePortal
            id='gender'
            options={StatisticOptions}
            value={
              StatisticOptions.find((option) => option.id === eventsOfStatisticConfig.Type && option.id !== 'Custom') ||
              null
            }
            getOptionLabel={(option) => option.name}
            noOptionsText='Không có lựa chọn'
            renderInput={(params) => <TextField {...params} label='Chọn loại' />}
            onChange={(_, option) => {
              if (option && option.id === 'Custom') {
                setIsOpenModalEvents(true)
              }
              if (option && option.id !== undefined && option.id !== 'Custom') {
                setEventsOfStatisticConfig({ Type: option.id as string })
              }
            }}
          />
        </div>
      </div>
      <Button
        onClick={() => setIsOpenModalEvents(true)}
        classNameButton='mb-2 h-[24px] text-[14px] text-[#26c6da] font-medium hover:text-[#26c6da]/70 hover:underline'
      >
        {eventsOfStatisticConfig.StartAt !== undefined &&
          eventsOfStatisticConfig.EndAt !== undefined &&
          formatDateOfBirth(eventsOfStatisticConfig.StartAt as string) +
            ' - ' +
            formatDateOfBirth(eventsOfStatisticConfig.EndAt as string)}
      </Button>
      {eventsOfStatistic &&
        (isZeroValues ? (
          <div className='flex flex-col justify-center items-center w-full'>
            <img
              src='http://res.cloudinary.com/dboijruhe/image/upload/v1704248704/Assets/618722f3-06d8-42a6-a1dd-982eefeaafcb-377151126_764025928879576_8805692657770243620_n_1.png'
              alt=''
              className='w-[280px]'
            />
            <span className='font-semibold'>Không có dữ liệu</span>
          </div>
        ) : (
          <Doughnut
            data={data}
            className='max-h-[280px]'
            options={{
              maintainAspectRatio: false,
              cutout: '80%',
              responsive: true,
              plugins: {
                legend: {
                  position: 'left' as const
                }
              }
            }}
          />
        ))}
      <ModalCustom isOpenModal={isOpenModalEvents} handleClose={handleCloseModalEvents}>
        <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg md:w-[620px] max-md:w-[400px]'>
          <div className='flex justify-between items-center w-full'>
            <h2 className='text-[16px] font-semibold max-md:text-[12px]'>Chọn khoảng thời gian để thống kê sự kiện</h2>
            <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalEvents}>
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
                      <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
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
                      <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
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
  )
}

export default EventStatistics
