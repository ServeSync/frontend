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
import { MarkerType } from '../../interfaces'
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
      const organizationDataPromise = await requestCreateOrganizationInfo.handle(
        { ...getValues('eventOrganizationInfo') },
        fileOrganizer as File
      )

      const organizationContactDataPromise = await requestCreateOrganizationContactInfo.handle(
        { ...getValues('eventOrganizationContactInfo') },
        fileOrganizerContact as File
      )

      const [organizationData, organizationContactData] = await Promise.all([
        organizationDataPromise,
        organizationContactDataPromise
      ])

      if (organizationData && organizationContactData) {
        const newData = omit(data, 'categoryId')

        const body = {
          ...newData,
          eventOrganizationInfo: organizationDataPromise,
          eventOrganizationContactInfo: organizationContactDataPromise
        }
        console.log(body)
        await requestCreateEventCommandHandler.handle(
          { ...body },
          file as File,
          () => {
            toast.success('Yêu cầu thêm sự kiện thành công !')
            navigate({
              pathname: path.landingpage
            })
          },
          setError
        )
      }
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
        <div className='max-w-[840px] mx-auto pb-4 mt-40'>
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
