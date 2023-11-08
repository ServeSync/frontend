/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  Control,
  useForm,
  UseFormSetValue,
  FieldErrors,
  UseFormRegister,
  UseFormSetError
} from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { Autocomplete, TextField } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormEventType, FormSearchMapSchema, FormSearchMapType } from '../../../utils'
import { ActivityType, EventCategoryType, EventDetailType, LocationType, MarkerType } from '../../../interfaces'
import { eventType } from '../../../constants'
import Button from 'src/modules/Share/components/Button'
import Map from '../../Map'
import ModalCustom from 'src/modules/Share/components/Modal'
import InputImage from 'src/modules/Share/components/InputImage'
import Input from 'src/modules/Share/components/Input'
import dayjs from 'dayjs'
import draftToHtml from 'draftjs-to-html'

interface Props {
  control: Control<FormEventType>
  register: UseFormRegister<FormEventType>
  setValue: UseFormSetValue<FormEventType>
  setError?: UseFormSetError<FormEventType>
  errors: FieldErrors<FormEventType>
  eventCategories: EventCategoryType[]
  activities: ActivityType[]
  file: File | undefined
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  onChangeCategory: (id: string) => void
  event?: EventDetailType
  description: EditorState
  setDescription: React.Dispatch<React.SetStateAction<EditorState>>
}

const EventForm = ({
  control,
  register,
  setValue,
  setError,
  errors,
  eventCategories,
  activities,
  file,
  setFile,
  onChangeCategory,
  event,
  description,
  setDescription
}: Props) => {
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const onEditorStateChange = (editorState: EditorState) => {
    setDescription(editorState)
    setValue('description', draftToHtml(convertToRaw(description.getCurrentContent())))
  }

  const handleChangeFile = (file?: File) => {
    setFile(file)
    setValue('imageUrl', ' ')
    setError && setError('imageUrl', { message: '' })
  }

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const [center, setCenter] = useState<LocationType>({
    latitude: 16.074160300547344,
    longitude: 108.15078258893459
  })

  const [markers, setMarkers] = useState<MarkerType[]>([])

  const FormSearchMap = useForm<FormSearchMapType>({
    resolver: yupResolver(FormSearchMapSchema)
  })

  useEffect(() => {
    if (event && activities) {
      setValue('activityId', event?.activity.id)
    }
  }, [event, activities, setValue])

  useEffect(() => {
    if (event) {
      setValue('name', event.name)
      setValue('introduction', event.introduction)
      setValue('imageUrl', event.imageUrl)
      setValue('type', event.type)
      setValue('categoryId', event.activity.eventCategoryId)
      setValue('activityId', event.activity.id)
      setValue('address.fullAddress', event.address.fullAddress)
      setValue('address.latitude', event.address.latitude.toString())
      setValue('address.longitude', event.address.longitude.toString())
      const blocksFromHTML = convertFromHTML(event.description as string)
      const content = EditorState.createWithContent(
        ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
      )
      setDescription(content)
    }
  }, [event, setValue, setDescription])

  return (
    <div>
      <div className='flex flex-col gap-y-2'>
        <div className='grid grid-cols-12 gap-x-6 gap-y-4'>
          <Input
            register={register}
            id='name'
            name='name'
            placeholder='Tên sự kiện'
            className='col-span-12'
            classNameInput='w-full text-[#195E8E] text-[42px] font-bold placeholder:text-[42px] placeholder:text-[#195E8E] placeholder-bold bg-transparent pr-4 outline-none  h-[50px]'
            error={errors.name?.message}
          />
          <Input
            register={register}
            id='introduction'
            name='introduction'
            placeholder='Giới thiệu sự kiện'
            className='col-span-12 relative'
            classNameInput='w-full text-black/90 text-[16px] placeholder:text-black/90 bg-transparent pl-7 pr-4 outline-none h-[28px]'
            error={errors.introduction?.message}
          >
            <div className='absolute left-0 top-[0px] cursor-pointer text-black'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                />
              </svg>
            </div>
          </Input>
          <div className='col-span-4'>
            <div className='w-full h-[calc(100%-40px)] rounded-xl'>
              <InputImage
                register={register}
                onChange={handleChangeFile}
                previewImage={previewImage}
                avatar={event?.imageUrl}
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.imageUrl?.message}
              </span>
            </div>
          </div>
          <div className='col-span-8 grid grid-cols-12 gap-x-6 gap-y-4'>
            <Controller
              name='startAt'
              control={control}
              render={({ field: { onChange, value = event ? dayjs(event.startAt) : null }, fieldState: { error } }) => (
                <div className='col-span-6 mt-[-8px]'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimeField']}>
                      <DateTimePicker
                        label='Thời gian bắt đầu'
                        format='DD/MM/YYYY HH:mm'
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
              name='endAt'
              control={control}
              render={({
                field: { onChange, value = (event && dayjs(event.endAt)) || null },
                fieldState: { error }
              }) => (
                <div className='col-span-6 mt-[-8px]'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimeField']}>
                      <DateTimePicker
                        label='Thời gian kết thúc'
                        format='DD/MM/YYYY HH:mm'
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
              name='address.fullAddress'
              control={control}
              defaultValue={
                (event && event.address.fullAddress) ||
                'Danang University of Technology, Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Da Nang, Vietnam'
              }
              render={({
                field: {
                  onChange,
                  value = event
                    ? event.address.fullAddress
                    : 'Danang University of Technology, Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Da Nang, Vietnam'
                },
                fieldState: { error }
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='col-span-12'>
                    <TextField
                      id='address'
                      label='Địa điểm'
                      placeholder='Nhập địa điểm'
                      className='w-full bg-white'
                      value={value}
                      onChange={onChange}
                    />
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                  </div>
                </LocalizationProvider>
              )}
            />
            <Controller
              name='address.longitude'
              control={control}
              defaultValue={event ? event.address.longitude.toString() : '108.15078258893459'}
              render={({
                field: { value = event ? event.address.longitude : '108.15078258893459' },
                fieldState: { error }
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='col-span-6'>
                    <TextField
                      id='address_longitude'
                      label='Kinh độ'
                      className='w-full bg-gray-100'
                      value={value}
                      disabled
                    />
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                  </div>
                </LocalizationProvider>
              )}
            />
            <Controller
              name='address.latitude'
              control={control}
              defaultValue={event ? event.address.latitude.toString() : '16.074160300547344'}
              render={({
                field: { onChange, value = event ? event.address.latitude : '16.074160300547344' },
                fieldState: { error }
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='col-span-5'>
                    <TextField
                      id='address_latitude'
                      label='Vĩ độ'
                      className='w-full bg-gray-100'
                      value={value}
                      disabled
                      onChange={onChange}
                    />
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                  </div>
                </LocalizationProvider>
              )}
            />
            <div className='col-span-1 flex justify-end'>
              <Button
                type='button'
                classNameButton='border-[1px] border-[#39a4b2] w-[48px] h-[48px] rounded-lg text-[#39a4b2] flex items-center justify-center'
                onClick={handleOpenModal}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525'
                  />
                </svg>
              </Button>
              <ModalCustom isOpenModal={isOpenModal} handleClose={handleCloseModal}>
                <Map
                  register={FormSearchMap.register}
                  handleSubmit={FormSearchMap.handleSubmit}
                  setValue={setValue}
                  reset={FormSearchMap.reset}
                  center={center}
                  setCenter={setCenter}
                  markers={markers}
                  setMarkers={setMarkers}
                  setIsOpenModal={setIsOpenModal}
                />
              </ModalCustom>
            </div>
            <Controller
              name='type'
              control={control}
              render={({ field: { onChange, value = event ? event.type : '' }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='col-span-4'>
                    <Autocomplete
                      disablePortal
                      id='eventType'
                      options={eventType}
                      value={eventType.find((option) => option.id === value) || null}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} label='Chọn loại sự kiện' />}
                      onChange={(_, option) => onChange(option ? option.id : '')}
                      className='bg-white'
                    />
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                  </div>
                </LocalizationProvider>
              )}
            />
            <Controller
              name='categoryId'
              control={control}
              render={({
                field: { onChange, value = event ? event.activity.eventCategoryId : '' },
                fieldState: { error }
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='col-span-4'>
                    <Autocomplete
                      disablePortal
                      id='event_category'
                      options={eventCategories ? eventCategories : []}
                      value={(eventCategories && eventCategories.find((option) => option.id === value)) || null}
                      getOptionLabel={(option) => option.name}
                      noOptionsText='Không có lựa chọn'
                      renderInput={(params) => <TextField {...params} label='Danh mục sự kiện' />}
                      onChange={(_, option) => {
                        onChange(option ? option.id : '')
                        onChangeCategory && onChangeCategory(option?.id as string)
                      }}
                      className='bg-white'
                    />
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                  </div>
                </LocalizationProvider>
              )}
            />
            <Controller
              name='activityId'
              control={control}
              defaultValue=''
              render={({ field: { onChange, value = event ? event.activity.id : '' }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className='col-span-4'>
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
          </div>
          <div className='col-span-12'>
            <div className='border-[1px] border-[#C8C8C8] rounded-lg overflow-hidden'>
              <Editor
                placeholder='Nhập mô tả sự kiện'
                editorState={description}
                onEditorStateChange={onEditorStateChange}
              />
            </div>
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.description?.message}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventForm
