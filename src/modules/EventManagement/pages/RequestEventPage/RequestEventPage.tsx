import { Fragment, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Tab, Tabs } from '@mui/material'
import RequestCreteEvent from 'src/modules/EventManagement/pages/RequestCreateEvent'
import RequestEventOrganizer from 'src/modules/EventManagement/pages/RequestEventOrganizer'
import Input from 'src/modules/Share/components/Input'
import { FormRequestEventSchema, FormRequestEventType } from '../../utils'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputImage from 'src/modules/Share/components/InputImage'
import {
  CreateOrganizationInfoCommandHandler,
  CreateOrganizationInfoContactCommandHandler,
  RequestCreateEventCommandHandler
} from '../../services/RequestEvent'
import { toast } from 'react-toastify'
import path from 'src/modules/Share/constants/path'
import { useNavigate } from 'react-router-dom'
import { eventOrganizationInfo } from '../../interfaces/RequestEventForm/request_event_organization.type'
import { MarkerType, eventOrganizationContactInfo } from '../../interfaces'
import { omit } from 'lodash'
import Button from 'src/modules/Share/components/Button'

const RequestEventPage = () => {
  const [page, setPage] = useState<number>(0)

  const [markers, setMarkers] = useState<MarkerType[]>([])

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }

  const [file, setFile] = useState<File>()
  const [fileOrganizer, setFileOrganizer] = useState<File>()

  const [fileOrganizerContact, setFileOrganizerContact] = useState<File>()

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  const handleChangeFileOrganizer = (file?: File) => {
    setFileOrganizer(file)
  }

  const handleChangeFileOrganizerContact = (file?: File) => {
    setFileOrganizerContact(file)
  }

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const previewImageOrganizer = useMemo(() => {
    return fileOrganizer ? URL.createObjectURL(fileOrganizer) : ''
  }, [fileOrganizer])

  const previewImageOrganizerContact = useMemo(() => {
    return fileOrganizerContact ? URL.createObjectURL(fileOrganizerContact) : ''
  }, [fileOrganizerContact])

  const [dataEventOrganizationInfo, setDataEventOrganizationInfo] = useState<eventOrganizationInfo>()

  const [dataEventOrganizationContactInfo, setDataEventOrganizationContactInfo] =
    useState<eventOrganizationContactInfo>()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    setError,
    formState: { errors }
  } = useForm<FormRequestEventType>({
    resolver: yupResolver(FormRequestEventSchema)
  })

  const handleReset = () => {
    reset()
    setFile(undefined)
    setFileOrganizerContact(undefined)
    setFileOrganizer(undefined)
    setMarkers([])
  }
  const navigate = useNavigate()

  const requestCreateEventCommandHandler = new RequestCreateEventCommandHandler()

  const requestCreateOrganizationInfo = new CreateOrganizationInfoCommandHandler()

  const requestCreateOrganizationContactInfo = new CreateOrganizationInfoContactCommandHandler()

  const handleSubmitForm = handleSubmit(async (data) => {
    try {
      const organizationDataPromise = requestCreateOrganizationInfo.handle(
        { ...getValues('eventOrganizationInfo') },
        fileOrganizer as File
      )

      const organizationContactDataPromise = requestCreateOrganizationContactInfo.handle(
        { ...getValues('eventOrganizationContactInfo') },
        fileOrganizerContact as File
      )

      const [organizationData, organizationContactData] = await Promise.all([
        organizationDataPromise,
        organizationContactDataPromise
      ])

      if (organizationData) {
        setDataEventOrganizationInfo(organizationData)
      }

      if (organizationContactData) {
        setDataEventOrganizationContactInfo(organizationContactData)
      }

      const newData = omit(data, 'categoryId')

      const body = {
        ...newData,
        eventOrganizationInfo: dataEventOrganizationInfo,
        eventOrganizationContactInfo: dataEventOrganizationContactInfo
      }

      await requestCreateEventCommandHandler.handle(
        {
          ...body
        },
        file as File,
        () => {
          toast.success('Yêu cầu thêm sự kiện thành công !')
          navigate({
            pathname: path.landingpage
          })
        },
        setError
      )
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <Fragment>
      <Helmet>
        <title>Request Event</title>
        <meta name='description' content='This is create event page of the project' />
      </Helmet>
      <form onSubmit={handleSubmitForm}>
        <div className='bg-[#1C2A3A] h-[200px] max-w-[80%] m-auto rounded-xl'>
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
            <div className='flex items-center mt-10'>
              <div className='mx-6 h-[80px] w-[80px]'>
                <InputImage register={register} onChange={handleChangeFile} previewImage={previewImage} />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                  {errors.imageUrl?.message}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='max-w-[800px] mx-auto pb-4 '>
          <Box>
            <Box>
              <Tabs
                value={page}
                onChange={handleChange}
                aria-label='basic tabs example'
                sx={{
                  '& div': { width: '100%', margin: '0 -5px' },
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
                <Tab label='Ban tổ chức sự kiện' id='tab-2' aria-controls='simple-tabpanel-3' />
              </Tabs>
            </Box>
            <Box className='mt-6'>
              <RequestCreteEvent
                page={page}
                index={0}
                setValue={setValue}
                register={register}
                control={control}
                errors={errors}
                markers={markers}
                setMarkers={setMarkers}
              />
              <RequestEventOrganizer
                page={page}
                index={1}
                register={register}
                control={control}
                errors={errors}
                handleChangeFileOrganizer={handleChangeFileOrganizer}
                handleChangeFileOrganizerContact={handleChangeFileOrganizerContact}
                previewImageOrganizer={previewImageOrganizer}
                previewImageOrganizerContact={previewImageOrganizerContact}
              />
            </Box>
          </Box>
          <div className='col-span-12 flex justify-end gap-x-6'>
            <Button
              type='button'
              classNameButton='bg-gray-300 py-2 px-4 rounded-lg text-[14px] text-gray-800 font-semibold'
              onClick={handleReset}
            >
              Làm mới
            </Button>
            <Button
              type='submit'
              classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold w-[90px]'
            >
              Tạo
            </Button>
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default RequestEventPage
