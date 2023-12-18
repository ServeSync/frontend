/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Tab, Tabs } from '@mui/material'
import { FormRequestEventSchema, FormRequestEventType } from '../../../utils'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  CreateOrganizationInfoCommandHandler,
  CreateOrganizationInfoContactCommandHandler,
  RequestCreateEventCommandHandler
} from '../../../services/CollaborationRequest'
import { toast } from 'react-toastify'
import path from 'src/modules/Share/constants/path'
import { useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import Button from 'src/modules/Share/components/Button'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import RequestEventOrganization from '../RequestEventOrganization'
import { handleError } from 'src/modules/Share/utils'
import RequestEventInformation from '../RequestEventInformation/RequestEventInformation'
import { MarkerType } from 'src/modules/EventManagement/interfaces'

const RequestEventPage = () => {
  const [page, setPage] = useState<number>(0)

  const [markers, setMarkers] = useState<MarkerType[]>([])

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }

  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const [fileOrganizer, setFileOrganizer] = useState<File>()

  const previewImageOrganizer = useMemo(() => {
    return fileOrganizer ? URL.createObjectURL(fileOrganizer) : ''
  }, [fileOrganizer])

  const [fileOrganizerContact, setFileOrganizerContact] = useState<File>()

  const previewImageOrganizerContact = useMemo(() => {
    return fileOrganizerContact ? URL.createObjectURL(fileOrganizerContact) : ''
  }, [fileOrganizerContact])

  const [description, setDescription] = useState<EditorState>(EditorState.createEmpty())

  const onEditorStateChange = (editorState: EditorState) => {
    setDescription(editorState)
    setValue('description', draftToHtml(convertToRaw(description.getCurrentContent())))
  }

  const isSuccess = useRef(false)

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
    setDescription(EditorState.createEmpty())
  }

  const navigate = useNavigate()

  const requestCreateEventCommandHandler = new RequestCreateEventCommandHandler()

  const requestCreateOrganizationInfo = new CreateOrganizationInfoCommandHandler()

  const requestCreateOrganizationContactInfo = new CreateOrganizationInfoContactCommandHandler()

  const handleSubmitForm = handleSubmit(async (data) => {
    try {
      let organizationDataPromise
      let organizationContactDataPromise
      if (getValues('EventOrganizationInfo').imageUrl === ' ') {
        organizationDataPromise = await requestCreateOrganizationInfo.handle(
          { ...getValues('EventOrganizationInfo') },
          fileOrganizer as File
        )
        setValue('EventOrganizationInfo.imageUrl', organizationDataPromise.imageUrl)
      } else {
        organizationDataPromise = getValues('EventOrganizationInfo')
      }
      if (getValues('EventOrganizationContactInfo').imageUrl === ' ') {
        organizationContactDataPromise = await requestCreateOrganizationContactInfo.handle(
          { ...getValues('EventOrganizationContactInfo') },
          fileOrganizerContact as File
        )
        setValue('EventOrganizationContactInfo.imageUrl', organizationContactDataPromise.imageUrl)
      } else {
        organizationContactDataPromise = getValues('EventOrganizationContactInfo')
      }

      const [organizationData, organizationContactData] = await Promise.all([
        organizationDataPromise,
        organizationContactDataPromise
      ])
      if (organizationData && organizationContactData) {
        if (organizationData.email === organizationContactData.email) {
          setError('EventOrganizationInfo.email', {
            type: 'manual',
            message: 'Email nhà tổ chức không được trùng với email thành viên'
          })
          setError('EventOrganizationContactInfo.email', {
            type: 'manual',
            message: 'Email nhà tổ chức không được trùng với email thành viên'
          })
        }
        const newData = omit(data, 'categoryId')
        const body = {
          ...newData,
          EventOrganizationInfo: organizationDataPromise,
          EventOrganizationContactInfo: organizationContactDataPromise
        }
        await requestCreateEventCommandHandler.handle(
          { ...body },
          file as File,
          () => {
            isSuccess.current = true
            navigate(path.home_page)
            toast.success('Yêu cầu thêm sự kiện thành công !')
          },
          (error: any) => {
            handleError(error)
          }
        )
      }
    } catch (error) {
      console.log(error)
    }
  })

  const handleRequestEvent = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      await handleSubmitForm()
      if (!isSuccess.current) {
        toast.error('Vui lòng kiểm tra lại thông tin !')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeFile = (file?: File) => {
    setFile(file)
    setValue('imageUrl', ' ')
    setError('imageUrl', { message: '' })
  }

  const handleChangeFileOrganizer = (file?: File) => {
    setFileOrganizer(file)
    setValue('EventOrganizationInfo.imageUrl', ' ')
    setError('EventOrganizationInfo.imageUrl', { message: '' })
  }

  const handleChangeFileOrganizerContact = (file?: File) => {
    setFileOrganizerContact(file)
    setValue('EventOrganizationContactInfo.imageUrl', ' ')
    setError('EventOrganizationContactInfo.imageUrl', { message: '' })
  }

  return (
    <Fragment>
      <Helmet>
        <title>Request Event</title>
        <meta name='description' content='This is request event page of the project' />
      </Helmet>
      <div>
        <div className='w-[20%] h-[20%] bg-[#26C6DA]/80 shadow-xl blur-[200px] absolute top-[20px] left-[-100px]'></div>
        <div className='w-[80%] mx-auto pb-4 mt-10 mb-10'>
          <form onSubmit={handleSubmitForm}>
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
                  <Tab label='Thông tin sự kiện' id='tab-1' aria-controls='simple-tabpanel-1' className='capitalize' />
                  <Tab label='Ban tổ chức sự kiện' id='tab-2' aria-controls='simple-tabpanel-3' />
                </Tabs>
              </Box>
              <Box className='mt-6'>
                <RequestEventInformation
                  page={page}
                  index={0}
                  register={register}
                  setValue={setValue}
                  control={control}
                  errors={errors}
                  previewImage={previewImage}
                  handleChangeFile={handleChangeFile}
                  markers={markers}
                  setMarkers={setMarkers}
                  description={description}
                  onEditorStateChange={onEditorStateChange}
                />
                <RequestEventOrganization
                  page={page}
                  index={1}
                  register={register}
                  control={control}
                  errors={errors}
                  previewImageOrganizer={previewImageOrganizer}
                  handleChangeFileOrganizer={handleChangeFileOrganizer}
                  previewImageOrganizerContact={previewImageOrganizerContact}
                  handleChangeFileOrganizerContact={handleChangeFileOrganizerContact}
                />
              </Box>
            </Box>
          </form>
          <div className='col-span-12 flex justify-end gap-x-6'>
            <Button
              type='button'
              classNameButton='bg-gray-300 py-2 px-4 rounded-lg text-[14px] text-gray-800 font-semibold'
              onClick={handleReset}
            >
              Làm mới
            </Button>
            <Button
              type='button'
              isLoading={
                requestCreateEventCommandHandler.isLoading() ||
                requestCreateOrganizationInfo.isLoading() ||
                requestCreateOrganizationContactInfo.isLoading()
              }
              classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold w-[90px]'
              onClick={handleRequestEvent}
            >
              Tạo
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default RequestEventPage
