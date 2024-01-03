import Button from 'src/modules/Share/components/Button'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { FormExportFileSchema, FormExportFileType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { ExportAttendanceEventsCommandHandler } from '../../services'
import { toast } from 'react-toastify'

interface Props {
  handleCloseModalExportFile: () => void
  id: string
}

const ExportFile = ({ handleCloseModalExportFile, id }: Props) => {
  const { handleSubmit, control } = useForm<FormExportFileType>({
    resolver: yupResolver(FormExportFileSchema)
  })

  const exportAttendanceEventsCommandHandler = new ExportAttendanceEventsCommandHandler()

  const handleExportFile = handleSubmit((data) => {
    exportAttendanceEventsCommandHandler.handle(
      {
        id: id,
        data: data
      },
      () => {
        toast.error('File không đúng định dạng !')
      }
    )
  })

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg md:w-[620px] max-md:w-[400px]'>
      <div className='flex justify-between items-center w-full'>
        <h2 className='text-[16px] font-semibold max-md:text-[12px]'>Xuất file kết quả tham gia hoạt động cộng đồng</h2>
        <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalExportFile}>
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
      <form className='w-full overflow-hidden' onSubmit={handleExportFile}>
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
          <div className='flex justify-between items-center'>
            <span className='text-gray-400 text-[16px] max-md:text-[12px]'>File được xuất ở định dạng excel.</span>
            <Button
              onClick={handleExportFile}
              type='button'
              classNameButton='flex justify-center items-center bg-[#195E8E] w-[118px] h-[40px] text-white p-2 max-md:p-1 rounded-xl font-semibold transition-all duration-300 hover:bg-[#195E8E]/90 text-[16px] max-md:text-[12px]'
            >
              Xuất File
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ExportFile
