import { Fragment, useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Tab, Tabs } from '@mui/material'
import CreateEvent from '../CreateEvent'
import RegisterEvent from '../RegisterEvent'
import EventOrganizer from '../EventOrganizer'
import InputImage from 'src/modules/Share/components/InputImage'
import { FormEventSchema, FormEventType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import Input from 'src/modules/Share/components/Input'
import { EventRole } from '../../interfaces'
import { EventOrganization, EventOrganizationRep } from '../../interfaces/EventForm'

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

  const [dataEventRole, setDataEventRole] = useState<EventRole[]>([])
  const [dataEventOrganization, setDataEventOrganization] = useState<EventOrganization[]>([])
  const [dataEventOrganizationRep, setDataEventOrganizationRep] = useState<EventOrganizationRep[]>([])

  const {
    register,
    handleSubmit,
    control,
    getValues,
    resetField,
    setValue,
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

  const handleSubmitForm = handleSubmit((data) => {
    const body = {
      ...data,
      roles: dataEventRole,
      organizations: dataEventOrganization
    }
    console.log(body)
  })

  return (
    <Fragment>
      <Helmet>
        <title>Create Event</title>
        <meta name='description' content='This is create event page of the project' />
      </Helmet>
      <form onSubmit={handleSubmitForm}>
        <div className='rounded-xl bg-[#1C2A3A] h-[240px]'>
          <div className='flex justify-between items-center max-w-[800px] mx-auto h-full'>
            <div className='flex flex-col mt-20 mx-6'>
              <Input
                register={register}
                id='name'
                name='name'
                placeholder='Tên sự kiện'
                className='col-span-1 flex flex-col'
                classNameInput='text-white text-[24px] placeholder:text-white bg-[#1C2A3A] outline-none'
                error={errors.name?.message}
              />
              <Input
                register={register}
                id='introduction'
                name='introduction'
                placeholder='Giới thiệu sự kiện'
                className='col-span-1 flex flex-col'
                classNameInput='text-white/70 text-[13px] placeholder:text-white/70 bg-[#1C2A3A] outline-none'
                error={errors.introduction?.message}
              />
            </div>
            <div className='mx-6 h-[80px] w-[80px] mt-20'>
              <InputImage register={register} onChange={handleChangeFile} previewImage={previewImage} />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.imageUrl?.message}
              </span>
            </div>
          </div>
        </div>
        <div className='max-w-[800px] mx-auto'>
          <Box>
            <Box>
              <Tabs
                value={page}
                onChange={handleChange}
                aria-label='basic tabs example'
                sx={{
                  '& div': { width: '100%', margin: '10px -5px 0' },
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
              <CreateEvent page={page} index={0} register={register} control={control} errors={errors} />
              <RegisterEvent
                page={page}
                index={1}
                register={register}
                control={control}
                errors={errors}
                getValues={getValues}
                resetField={resetField}
                FieldRegistration={FieldRegistration}
                FieldAttendance={FieldAttendance}
                dataEventRole={dataEventRole}
                setDataEventRole={setDataEventRole}
              />
              <EventOrganizer
                page={page}
                index={2}
                control={control}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
                dataEventOrganization={dataEventOrganization}
                setDataEventOrganization={setDataEventOrganization}
                dataEventOrganizationRep={dataEventOrganizationRep}
                setDataEventOrganizationRep={setDataEventOrganizationRep}
              />
            </Box>
          </Box>
        </div>
      </form>
    </Fragment>
  )
}

export default CreateEventPage
