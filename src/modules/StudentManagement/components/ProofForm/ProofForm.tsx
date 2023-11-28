import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GetEventByIdQuery } from 'src/modules/EventManagement/services'
import Button from 'src/modules/Share/components/Button'
import InputImage from 'src/modules/Share/components/InputImage'
import { FormProofSchema, FormProofType } from '../../utils'

interface Props {
  handleCloseModalProofForm: () => void
  eventId: string | undefined
}

const ProofForm = ({ handleCloseModalProofForm, eventId }: Props) => {
  const getEventByIdQuery = new GetEventByIdQuery(eventId as string)
  const event = getEventByIdQuery.fetch()

  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  const { register } = useForm<FormProofType>({
    resolver: yupResolver(FormProofSchema)
  })

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[620px]'>
      <div className='flex justify-between items-center w-full'>
        <div>
          <h2 className='text-[20px] font-semibold'>Đơn nộp minh chứng</h2>
          <h4 className='text-[12px]'>Đơn này với mục đích nhà trường sẽ xác nhận bạn đã tham gia sự kiện trước đó.</h4>
        </div>
        <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalProofForm}>
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
      <form className='w-full'>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-2 gap-3'>
            <h2 className='col-span-2'>Thông tin sự kiện</h2>
            <TextField
              id='name'
              value={event && event.name}
              className='w-full bg-white col-span-2'
              InputProps={{
                disabled: true
              }}
            />
            <TextField
              id='address'
              value={event && event.address.fullAddress}
              className='w-full bg-white col-span-2'
              InputProps={{
                disabled: true
              }}
            />
            <div className='mt-[-8px] col-span-1'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimeField']}>
                  <DatePicker format='DD/MM/YYYY' value={event && dayjs(event.startAt)} className='bg-white' disabled />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className='mt-[-8px] col-span-1'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimeField']}>
                  <DatePicker format='DD/MM/YYYY' value={event && dayjs(event.endAt)} className='bg-white' disabled />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <TextField
              id='name'
              value={event && event.introduction}
              className='w-full bg-white col-span-2'
              InputProps={{
                disabled: true
              }}
            />
            <h2 className='col-span-2'>Thông tin tham gia sự kiện</h2>
            <TextField
              id='name'
              value={event && event.introduction}
              className='w-full bg-white col-span-1'
              InputProps={{
                disabled: true
              }}
            />
            <TextField
              id='name'
              value={event && event.introduction}
              className='w-full bg-white col-span-1'
              InputProps={{
                disabled: true
              }}
            />
            <TextField
              id='name'
              value={event && event.name}
              className='w-full bg-white col-span-2'
              InputProps={{
                disabled: true
              }}
            />
            <TextField
              id='name'
              value={event && event.name}
              className='w-full bg-white col-span-2'
              InputProps={{
                disabled: true
              }}
              multiline
              rows={2}
            />
          </div>
          <div className='col-span-2'>
            <div className='w-full h-[80px] rounded-xl'>
              <InputImage register={register} onChange={handleChangeFile} previewImage={previewImage} />
            </div>
          </div>
          <div className='flex justify-end items-center'>
            <Button
              type='button'
              classNameButton='flex justify-center items-center bg-[#26c6da] w-[118px] h-[40px] text-white p-2 rounded-xl font-semibold transition-all duration-300 hover:bg-[#195E8E]/90'
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProofForm
