/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Control, useForm, UseFormSetValue, FieldErrors } from 'react-hook-form'
import { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { Autocomplete, TextField } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormEventType, FormSearchMapSchema, FormSearchMapType } from '../../utils'
import { ActivityType, EventCategoryType, LocationType, MarkerType } from '../../interfaces'
import { eventType } from '../../constants'
import AutocompleteWithDebounce from 'src/modules/Share/components/AutocompleteWithDebounce'
import Button from 'src/modules/Share/components/Button'
import Map from '../Map'
import ModalCustom from 'src/modules/Share/components/Modal'

interface Props {
  control: Control<any>
  setValue: UseFormSetValue<any>
  errors: FieldErrors<FormEventType>
  eventCategories: EventCategoryType[]
  activities: ActivityType[]
  onChangeCategory: (id: string) => void
  setEventCategoriesSearch: React.Dispatch<React.SetStateAction<string>>
  setActivitiesSearch: React.Dispatch<React.SetStateAction<string>>
}

const CreateEventForm = ({
  control,
  setValue,
  errors,
  eventCategories,
  activities,
  onChangeCategory,
  setEventCategoriesSearch,
  setActivitiesSearch
}: Props) => {
  const [description, setDescription] = useState<EditorState>(EditorState.createEmpty())

  const onEditorStateChange = (editorState: EditorState) => {
    setDescription(editorState)
    setValue('description', draftToHtml(convertToRaw(description.getCurrentContent())))
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

  return (
    <div>
      <div className='flex flex-col gap-y-2'>
        <h2 className='text-[17px] col-span-4 mb-2'>Thông tin chi tiết</h2>
        <div className='grid grid-cols-12 gap-x-6 gap-y-4'>
          <Controller
            name='startAt'
            control={control}
            render={({ field: { onChange, value = null }, fieldState: { error } }) => (
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
            render={({ field: { onChange, value = null }, fieldState: { error } }) => (
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
            name='type'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-4'>
                  <AutocompleteWithDebounce
                    id='education_program'
                    label='Danh mục sự kiện'
                    options={eventCategories}
                    value={value as string}
                    onChange={onChange}
                    onChangeId={onChangeCategory}
                    setTextSearch={setEventCategoriesSearch}
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-4'>
                  <AutocompleteWithDebounce
                    id='education_program'
                    label='Hoạt động sự kiện'
                    options={activities}
                    value={value as string}
                    onChange={onChange}
                    setTextSearch={setActivitiesSearch}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='address.fullAddress'
            control={control}
            defaultValue='Danang University of Technology, Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Da Nang, Vietnam'
            render={({ field: { onChange, value = null }, fieldState: { error } }) => (
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
            defaultValue='108.15078258893459'
            render={({ field: { value = null }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-5'>
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
            defaultValue='16.074160300547344'
            render={({ field: { value = null }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-5'>
                  <TextField
                    id='address_latitude'
                    label='Vĩ độ'
                    className='w-full bg-gray-100'
                    value={value}
                    disabled
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <div className='col-span-2 flex justify-end'>
            <Button
              type='button'
              classNameButton='border-[1px] border-[#39a4b2] w-[56px] h-[56px] rounded-lg text-[#39a4b2] flex items-center justify-center'
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
          <div className='col-span-12 '>
            <div className='border-[1px] border-[#C8C8C8] rounded-lg overflow-hidden'>
              <Editor
                editorState={description}
                wrapperClassName='demo-wrapper'
                editorClassName='demo-editor'
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

export default CreateEventForm
