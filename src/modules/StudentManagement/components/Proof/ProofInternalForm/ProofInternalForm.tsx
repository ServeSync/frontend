/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Autocomplete, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { GetEventByIdQuery } from 'src/modules/EventManagement/services'
import Button from 'src/modules/Share/components/Button'
import InputImage from 'src/modules/Share/components/InputImage'
import { handleError } from 'src/modules/Share/utils'
import { MakeProofInternalCommandHandler } from 'src/modules/StudentManagement/services/Proof'
import { GetRegisteredEventsByStudent } from 'src/modules/StudentManagement/services/Students/getRegisteredEventsByStudent.query'
import { FormProofInternalSchema, FormProofInternalType } from 'src/modules/StudentManagement/utils'

interface Props {
  handleCloseModalProofFormInternal: () => void
  studentId: string
}

const ProofInternalForm = ({ handleCloseModalProofFormInternal, studentId }: Props) => {
  const [eventId, setEventId] = useState<string>()

  const getRegisteredEventsByStudent = new GetRegisteredEventsByStudent(studentId)
  const eventsList = getRegisteredEventsByStudent.fetch()
  const events = eventsList && eventsList.data

  const getEventByIdQuery = new GetEventByIdQuery(eventId as string)
  const event = getEventByIdQuery.fetch()

  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
    setValue('imageUrl', ' ')
    setError('imageUrl', { message: '' })
  }

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<FormProofInternalType>({
    resolver: yupResolver(FormProofInternalSchema)
  })

  const makeProofInternalCommandHandler = new MakeProofInternalCommandHandler()

  const handleSubmitForm = handleSubmit((data) => {
    makeProofInternalCommandHandler.handle(
      data,
      file as File,
      () => {
        handleCloseModalProofFormInternal()
        toast.success('Tạo minh chứng thành công !')
      },
      (error: any) => {
        handleError<FormProofInternalType>(error, setError)
      }
    )
  })

  useEffect(() => {
    if (events && eventId !== undefined) {
      setValue('eventRoleId', events.find((option) => option.id === eventId)?.roleId as string)
    }
  }, [events, eventId, setValue])

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[620px]  max-h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#a6a6a6] scrollbar-track-[#e1e1e1]'>
      <div className='flex justify-between items-center w-full'>
        <div>
          <h2 className='text-[20px] font-semibold'>Đơn nộp minh chứng</h2>
          <h4 className='text-[12px]'>Đơn này với mục đích nhà trường sẽ xác nhận bạn đã tham gia sự kiện trước đó.</h4>
        </div>
        <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalProofFormInternal}>
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
      <form className='w-full' onSubmit={handleSubmitForm}>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-2 gap-3'>
            <h2 className='col-span-2'>Thông tin sự kiện</h2>
            <Controller
              name='eventId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='flex flex-col bg-white col-span-2'>
                    <Autocomplete
                      disablePortal
                      id='event_id'
                      options={events ? events : []}
                      value={(events && events.find((option) => option.id === value)) || null}
                      getOptionLabel={(option) => option.name}
                      noOptionsText='Không có lựa chọn'
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(_, option) => {
                        onChange(option ? option.id : '')
                        setEventId(option ? option.id : '')
                      }}
                    />
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                  </div>
                </LocalizationProvider>
              )}
            />
            <div className='col-span-2 mb-[18px]'>
              <TextField
                id='address'
                label='Địa chỉ sự kiện'
                value={event ? event.address.fullAddress : ''}
                className='w-full bg-white'
                InputProps={{
                  disabled: true
                }}
              />
            </div>
            <div className='col-span-2 mb-[18px]'>
              <TextField
                id='organization'
                label='Nhà tổ chức'
                value={event ? event.name : ''}
                className='w-full bg-white col-span-2'
                InputProps={{
                  disabled: true
                }}
              />
            </div>
            <div className='col-span-1 mt-[-8px] mb-[18px]'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimeField']}>
                  <DatePicker
                    label='Ngày bắt đầu'
                    format='DD/MM/YYYY'
                    value={event ? dayjs(event.startAt) : null}
                    className='bg-white'
                    disabled
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className='col-span-1 mt-[-8px] mb-[18px]'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimeField']}>
                  <DatePicker
                    label='Ngày kết thúc'
                    format='DD/MM/YYYY'
                    value={event ? dayjs(event.endAt) : null}
                    className='bg-white'
                    disabled
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className='col-span-2'>
              <TextField
                id='introduce'
                value={event ? event.introduction : ''}
                className='w-full bg-white'
                label='Giới thiệu'
                InputProps={{
                  disabled: true
                }}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <h2 className='col-span-2'>Thông tin tham gia sự kiện</h2>
            <Controller
              name='attendanceAt'
              control={control}
              render={({ field: { onChange, value = null }, fieldState: { error } }) => (
                <div className='mt-[-8px] col-span-2'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label='Ngày điểm danh'
                        format='DD/MM/YYYY'
                        onChange={onChange}
                        value={value}
                        className='bg-white w-full'
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              )}
            />
            <div className='col-span-1 mb-[18px]'>
              <TextField
                id='role'
                label='Vai trò'
                className='w-full bg-white'
                value={(events && events.find((option) => option.id === eventId)?.role) || ''}
                InputProps={{
                  disabled: true
                }}
              />
            </div>
            <div className='col-span-1 mb-[18px]'>
              <TextField
                id='score'
                label='Điểm'
                className='w-full bg-white'
                value={events ? events.find((option) => option.id === eventId)?.score : ''}
                InputProps={{
                  disabled: true
                }}
              />
            </div>
            <Controller
              name='description'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='col-span-2'>
                    <TextField
                      id='description'
                      label='Mô tả'
                      placeholder='Nhập mô tả'
                      className='w-full bg-white '
                      onChange={onChange}
                      multiline
                      rows={3}
                    />
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                  </div>
                </LocalizationProvider>
              )}
            />
            <div className='col-span-2'>
              <div className='w-full h-[240px] rounded-lg'>
                <InputImage
                  register={register}
                  onChange={handleChangeFile}
                  previewImage={previewImage}
                  classNameButton='absolute bg-slate-200 outline-none w-full h-full top-0 left-0'
                  isHiddenButton={true}
                >
                  <div className='flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-8 h-8'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15'
                      />
                    </svg>
                  </div>
                  <span>Tải ảnh minh chứng tham gia sự kiện</span>
                </InputImage>
              </div>
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.imageUrl?.message}
              </span>
            </div>
          </div>
          <div className='flex justify-end items-center'>
            <Button
              type='submit'
              classNameButton='flex justify-center items-center bg-[#26c6da] w-[118px] h-[40px] text-white p-2 rounded-xl font-semibold transition-all duration-300 hover:bg-[#195E8E]/90'
              isLoading={makeProofInternalCommandHandler.isLoading()}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProofInternalForm
