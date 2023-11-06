import { Fragment, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Tab, Tabs } from '@mui/material'
import { FormRequestEventSchema, FormRequestEventType } from '../../../utils'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  CreateOrganizationInfoCommandHandler,
  CreateOrganizationInfoContactCommandHandler,
  RequestCreateEventCommandHandler
} from '../../../services/RequestEvent'
import { toast } from 'react-toastify'
import path from 'src/modules/Share/constants/path'
import { useNavigate } from 'react-router-dom'
import { MarkerType } from '../../../interfaces'
import { omit } from 'lodash'
import Button from 'src/modules/Share/components/Button'
import LandingPageHeader from 'src/modules/HomePage/components/HeaderHomePage/HeaderHomePage'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import RequestEvent from '../RequestEvent'
import RequestEventOrganization from '../RequestEventOrganization'
import FooterHomePage from 'src/modules/HomePage/components/FooterHomePage'

const RequestEventPage = () => {
  const [page, setPage] = useState<number>(0)

  const [markers, setMarkers] = useState<MarkerType[]>([])

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }

  const [file, setFile] = useState<File>()

  const [fileOrganizer, setFileOrganizer] = useState<File>()

  const handleChangeFileOrganizer = (file?: File) => {
    setFileOrganizer(file)
  }

  const previewImageOrganizer = useMemo(() => {
    return fileOrganizer ? URL.createObjectURL(fileOrganizer) : ''
  }, [fileOrganizer])

  const [fileOrganizerContact, setFileOrganizerContact] = useState<File>()

  const handleChangeFileOrganizerContact = (file?: File) => {
    setFileOrganizerContact(file)
  }

  const previewImageOrganizerContact = useMemo(() => {
    return fileOrganizerContact ? URL.createObjectURL(fileOrganizerContact) : ''
  }, [fileOrganizerContact])

  const [description, setDescription] = useState<EditorState>(EditorState.createEmpty())

  const onEditorStateChange = (editorState: EditorState) => {
    setDescription(editorState)
    setValue('description', draftToHtml(convertToRaw(description.getCurrentContent())))
  }

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
      const organizationDataPromise = await requestCreateOrganizationInfo.handle(
        { ...getValues('EventOrganizationInfo') },
        fileOrganizer as File
      )

      const organizationContactDataPromise = await requestCreateOrganizationContactInfo.handle(
        { ...getValues('EventOrganizationContactInfo') },
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
          EventOrganizationInfo: organizationDataPromise,
          EventOrganizationContactInfo: organizationContactDataPromise
        }
        await requestCreateEventCommandHandler.handle(
          { ...body },
          file as File,
          () => {
            toast.success('Yêu cầu thêm sự kiện thành công !')
            navigate({
              pathname: path.home_page
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
      <div>
        <div className='w-[20%] h-[20%] bg-[#26C6DA]/80 shadow-xl blur-[200px] absolute top-[20px] left-[-100px]'></div>
        <LandingPageHeader />
        <form onSubmit={handleSubmitForm}>
          <div className='max-w-[1280px] mx-auto pb-4 mt-10 mb-10'>
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
                <RequestEvent
                  page={page}
                  index={0}
                  register={register}
                  setValue={setValue}
                  control={control}
                  errors={errors}
                  file={file}
                  setFile={setFile}
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
                isLoading={requestCreateEventCommandHandler.isLoading()}
                classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold w-[90px]'
              >
                Tạo
              </Button>
            </div>
          </div>
        </form>
        <FooterHomePage />
      </div>
    </Fragment>
  )
}

export default RequestEventPage
