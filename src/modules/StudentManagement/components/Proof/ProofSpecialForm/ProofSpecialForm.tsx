/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from '@mui/material'
import Button from '../../../../Share/components/Button'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import InputImage from 'src/modules/Share/components/InputImage'
import { FormProofSpecialSchema, FormProofSpecialType } from 'src/modules/StudentManagement/utils'
import { MakeProofSpecialCommandHandler } from 'src/modules/StudentManagement/services/Proof'
import { toast } from 'react-toastify'
import { handleError } from 'src/modules/Share/utils'
import { GetAllEventActivitiesQuery } from 'src/modules/EventManagement/services'

interface Props {
  handleCloseModalProofFormSpecial: () => void
  handleCloseModalProofSelect: () => void
}

const ProofSpecialForm = ({ handleCloseModalProofFormSpecial, handleCloseModalProofSelect }: Props) => {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
    setValue('imageUrl', ' ')
    setError('imageUrl', { message: '' })
  }

  const getAllEventActivitiesQuery = new GetAllEventActivitiesQuery('Individual')
  const activities = getAllEventActivitiesQuery.fetch()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<FormProofSpecialType>({
    resolver: yupResolver(FormProofSpecialSchema)
  })

  const makeProofSpecialCommandHandler = new MakeProofSpecialCommandHandler()

  const handleSubmitForm = handleSubmit((data) => {
    makeProofSpecialCommandHandler.handle(
      data,
      file as File,
      () => {
        handleCloseModalProofFormSpecial()
        handleCloseModalProofSelect()
        toast.success('Tạo minh chứng thành công !')
      },
      (error: any) => {
        handleError<FormProofSpecialType>(error, setError)
      }
    )
  })

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[620px]  max-h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#a6a6a6] scrollbar-track-[#e1e1e1]'>
      <div className='flex justify-between items-center w-full'>
        <div>
          <h2 className='text-[20px] font-semibold'>Đơn nộp minh chứng</h2>
          <h4 className='text-[12px]'>Đơn này với mục đích nhà trường sẽ xác nhận bạn đã tham gia sự kiện trước đó.</h4>
        </div>
        <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalProofFormSpecial}>
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
              name='title'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='col-span-2'>
                    <TextField
                      id='title'
                      label='Tiêu đề minh chứng'
                      placeholder='Nhập tiêu đề minh chứng'
                      className='w-full bg-white '
                      onChange={onChange}
                    />
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                  </div>
                </LocalizationProvider>
              )}
            />
            <Controller
              name='startAt'
              control={control}
              render={({ field: { onChange, value = null }, fieldState: { error } }) => (
                <div className='mt-[-8px] col-span-1'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label='Ngày bắt đầu'
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
            <Controller
              name='endAt'
              control={control}
              render={({ field: { onChange, value = null }, fieldState: { error } }) => (
                <div className='mt-[-8px] col-span-1'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label='Ngày kết thúc'
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
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <h2 className='col-span-2'>Thông tin tham gia sự kiện</h2>
            <Controller
              name='role'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='col-span-2'>
                    <TextField
                      id='role'
                      label='Vai trò'
                      placeholder='Nhập vai trò'
                      className='w-full bg-white '
                      onChange={onChange}
                    />
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                  </div>
                </LocalizationProvider>
              )}
            />
            <Controller
              name='score'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='col-span-2'>
                    <TextField
                      id='score'
                      label='Điểm'
                      placeholder='Nhập điểm'
                      className='w-full bg-white '
                      onChange={onChange}
                    />
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                  </div>
                </LocalizationProvider>
              )}
            />
            <Controller
              name='activityId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='col-span-2'>
                    <Autocomplete
                      disablePortal
                      id='activity'
                      options={activities ? activities : []}
                      value={(activities && activities.find((option) => option.id === value)) || null}
                      getOptionLabel={(option) => option.name}
                      noOptionsText='Không có lựa chọn'
                      renderInput={(params) => <TextField {...params} label='Hoạt động sự kiện' />}
                      onChange={(_, option) => onChange(option ? option.id : '')}
                      className='bg-white'
                    />
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                  </div>
                </LocalizationProvider>
              )}
            />
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
                  <div className='flex flex-col justify-center items-center h-full border-[2px] border-dashed border-[#26c6da] rounded-xl'>
                    <img
                      className='w-[100px] mb-4'
                      src='http://res.cloudinary.com/dboijruhe/image/upload/v1701487948/Assets/bda934d3-0b4c-4167-9522-2181193105c1-upload.png'
                      alt=''
                    />
                    <span>Tải ảnh minh chứng tham gia sự kiện</span>
                  </div>
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
              isLoading={makeProofSpecialCommandHandler.isLoading()}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProofSpecialForm
