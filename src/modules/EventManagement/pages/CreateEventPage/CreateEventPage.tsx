/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Tab, Tabs } from '@mui/material'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import CreateEvent from '../CreateEvent'
import RegisterEvent from '../RegisterEvent'
import { FormEventSchema, FormEventType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import Input from 'src/modules/Share/components/Input'
import { EventRole, FormEvent } from '../../interfaces'
import { EventOrganizationFormType } from '../../interfaces/EventForm'
import EventOrganization from '../EventOrganization'
import { CreateEventCommandHandler } from '../../services'
import { handleError } from 'src/modules/Share/utils'
import path from 'src/modules/Share/constants/path'
import _ from 'lodash'
import InputImage from 'src/modules/Share/components/InputImage'

const CreateEventPage = () => {
  const [page, setPage] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }

  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  const navigate = useNavigate()

  const [dataEventRole, setDataEventRole] = useState<EventRole[]>([])
  const [dataEventOrganization, setDataEventOrganization] = useState<EventOrganizationFormType[]>([])

  const {
    register,
    handleSubmit,
    control,
    getValues,
    resetField,
    setValue,
    setError,
    formState: { errors }
  } = useForm<FormEventType>({
    resolver: yupResolver(FormEventSchema),
    defaultValues: {
      registrationInfos: [{}],
      attendanceInfos: [{}]
    }
  })

  const FieldRegistration = useFieldArray({
    control,
    name: 'registrationInfos'
  })

  const FieldAttendance = useFieldArray({
    control,
    name: 'attendanceInfos'
  })

  const createEventCommandHandler = new CreateEventCommandHandler()

  const handleSubmitForm = handleSubmit((data) => {
    const body = {
      ...data,
      ..._.omit(data, 'categoryId'),
      roles: dataEventRole,
      organizations: dataEventOrganization
    } as FormEvent
    createEventCommandHandler.handle(
      body,
      file as File,
      () => {
        toast.success('Thêm sự kiện thành công !')
        navigate({
          pathname: path.event
        })
      },
      (error: any) => {
        handleError<FormEventType>(error, setError)
        toast.error('Thông tin không hợp lệ vui lòng kiểm tra lại !')
      },
      setError
    )
  })

  return (
    <Fragment>
      <Helmet>
        <title>Create Event</title>
        <meta name='description' content='This is create event page of the project' />
      </Helmet>
      <form onSubmit={handleSubmitForm}>
        <div className='rounded-xl h-[300px]'>
          <div className='w-full h-full relative rounded-xl'>
            <InputImage register={register} onChange={handleChangeFile} previewImage={previewImage} />
            <div className='absolute bottom-[4px] right-[26px]'>
              <span className='block min-h-[16px] text-red-600 text-[14px] mt-1 font-medium'>
                {errors.imageUrl?.message}
              </span>
            </div>
          </div>
          <div className='flex flex-col max-w-[840px] mx-auto top-0 '>
            <Input
              register={register}
              id='name'
              name='name'
              placeholder='Tên sự kiện'
              className='col-span-1 flex flex-col relative mb-3'
              classNameInput='text-[#000] text-[46px] font-bold placeholder:text-[46px] placeholder-black placeholder-bold bg-transparent pr-4 outline-none h-[54px] mt-4'
              error={errors.name?.message}
            />
            <Input
              register={register}
              id='introduction'
              name='introduction'
              placeholder='Giới thiệu sự kiện'
              className='col-span-1 flex flex-col relative z-10'
              classNameInput='text-black/90 text-[18px] placeholder:text-black/90 bg-transparent pl-7 pr-4 outline-none h-[28px]'
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
          </div>
        </div>
        <div className='max-w-[840px] mx-auto'>
          <Box>
            <Box>
              <Tabs
                value={page}
                onChange={handleChange}
                aria-label='basic tabs example'
                sx={{
                  '& div': { width: '100%', margin: '80px -5px 0' },
                  '& button': {
                    color: '#2f2f2f',
                    textTransform: 'capitalize',
                    fontSize: '17px',
                    margin: '0 10px',
                    fontFamily: 'Open Sans',
                    letterSpacing: '0'
                  },
                  '& button:active, button.Mui-selected,': {
                    color: '#26c6da'
                  },
                  '.MuiTabs-indicator': { backgroundColor: '#26c6da' }
                }}
              >
                <Tab label='Tạo sự kiện' id='tab-1' aria-controls='simple-tabpanel-1' className='capitalize' />
                <Tab label='Thông tin đăng ký' id='tab-2' aria-controls='simple-tabpanel-2' />
                <Tab label='Ban tổ chức sự kiện' id='tab-3' aria-controls='simple-tabpanel-3' />
              </Tabs>
            </Box>
            <Box className='mt-6'>
              <CreateEvent page={page} index={0} control={control} setValue={setValue} />
              <RegisterEvent
                page={page}
                index={1}
                control={control}
                getValues={getValues}
                setValue={setValue}
                errors={errors}
                resetField={resetField}
                FieldRegistration={FieldRegistration}
                FieldAttendance={FieldAttendance}
                dataEventRole={dataEventRole}
                setDataEventRole={setDataEventRole}
              />
              <EventOrganization
                page={page}
                index={2}
                control={control}
                getValues={getValues}
                setValue={setValue}
                setDataEventOrganization={setDataEventOrganization}
              />
            </Box>
          </Box>
        </div>
      </form>
    </Fragment>
  )
}

export default CreateEventPage
