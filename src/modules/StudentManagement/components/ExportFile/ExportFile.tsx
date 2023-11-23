import Button from 'src/modules/Share/components/Button'
import { QueryStudentConfig } from '../../hooks'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { FormExportFileSchema, FormExportFileType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { ExportAttendanceEventsCommandHandler } from '../../services'
import { toast } from 'react-toastify'
import * as FileSaver from 'file-saver'

interface Props {
  handleCloseModalExportFile: () => void
  queryStudentConfig: QueryStudentConfig
}

const ExportFile = ({ handleCloseModalExportFile, queryStudentConfig }: Props) => {
  const { handleSubmit, control } = useForm<FormExportFileType>({
    resolver: yupResolver(FormExportFileSchema)
  })

  const exportAttendanceEventsCommandHandler = new ExportAttendanceEventsCommandHandler()

  const handleExportFile = handleSubmit((data) => {
    exportAttendanceEventsCommandHandler.handle(
      {
        id: queryStudentConfig.id as string,
        data: data
      },
      () => {
        const data = exportAttendanceEventsCommandHandler.onSuccess()
        const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        })
        FileSaver.saveAs(blob, 'student.xlsx')
      },
      () => {
        toast.error('File không đúng định dạng')
      }
    )
  })

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[620px]'>
      <div className='flex justify-between items-center w-full'>
        <h2 className='text-[20px] font-semibold'>Xuất file kết quả tham gia hoạt động cộng đồng</h2>
        <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalExportFile}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 '
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </Button>
      </div>
      <form className='w-full' onSubmit={handleExportFile}>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <Controller
              name='formDate'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <div className='col-span-6 mt-[-8px]'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimeField']}>
                      <DatePicker
                        label='Thời gian bắt đầu'
                        format='DD/MM/YYYY'
                        onChange={onChange}
                        value={value}
                        className='bg-white'
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
                <div className='col-span-6 mt-[-8px]'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimeField']}>
                      <DatePicker
                        label='Thời gian kết thúc'
                        format='DD/MM/YYYY'
                        onChange={onChange}
                        value={value}
                        className='bg-white'
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              )}
            />
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-gray-400'>File được xuất ở định dạng excel.</span>
            <Button
              onClick={handleExportFile}
              type='button'
              classNameButton='flex justify-center items-center bg-[#195E8E] w-[118px] h-[40px] text-white p-2 rounded-xl font-semibold transition-all duration-300 hover:bg-[#195E8E]/90'
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
