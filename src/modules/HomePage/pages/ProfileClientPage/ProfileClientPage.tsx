/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useContext, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import EditProfileForm from '../../components/EditProfileForm'
import { EditProfileStudentCommandHandler, GetProfileStudentQuery } from 'src/modules/Share/services'
import { AppContext } from 'src/modules/Share/contexts'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormStudentSchema, FormStudentType } from 'src/modules/StudentManagement/utils'
import { toast } from 'react-toastify'
import { handleError } from 'src/modules/Share/utils'
import { Box, Tab, Tabs } from '@mui/material'
import ListEventsAttended from '../../components/ListAttendedEvents'
import ListProofsCreated from '../../components/ListCreatedProof'

const ProfileClientPage = () => {
  const { isAuthenticated } = useContext(AppContext)

  const [tab, setTab] = useState<number>(0)

  const handleChangePage = (event: React.SyntheticEvent, newTab: number) => {
    event.preventDefault()
    setTab(newTab)
  }

  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  const getProfileQuery = new GetProfileStudentQuery(isAuthenticated)
  const profile = getProfileQuery.fetch()

  const { register, handleSubmit, control, setError, setValue } = useForm<FormStudentType>({
    resolver: yupResolver(FormStudentSchema)
  })

  const editProfileStudentCommandHandler = new EditProfileStudentCommandHandler()

  const handleSubmitForm = handleSubmit(async (data) => {
    editProfileStudentCommandHandler.handle(
      {
        address: data.address,
        email: data.email,
        homeTown: data.homeTown,
        phone: data.phone,
        imageUrl: data.imageUrl
      },
      file as File,
      () => {
        toast.success('Cập nhật thông tin thành công !')
      },
      (error: any) => {
        handleError<FormStudentType>(error, setError)
      }
    )
  })

  return (
    <Fragment>
      <Helmet>
        <title>Profile Client</title>
        <meta name='description' content='This is profile client page of the project' />
      </Helmet>
      {profile && (
        <div className='w-[80%] mx-auto pt-10 '>
          <form onSubmit={handleSubmitForm}>
            <EditProfileForm
              register={register}
              setValue={setValue}
              control={control}
              profile={profile}
              onChange={handleChangeFile}
              previewImage={previewImage}
              isLoadingEdit={editProfileStudentCommandHandler.isLoading()}
            />
          </form>
          <Box>
            <Box>
              <Tabs
                value={tab}
                onChange={handleChangePage}
                aria-label='basic tabs example'
                sx={{
                  '& div': { width: '100%', margin: '0 -5px 0', paddingTop: '6px' },
                  '& button': {
                    color: '#2f2f2f',
                    textTransform: 'none',
                    fontSize: '16px',
                    margin: '0 10px',
                    fontFamily: 'Open Sans',
                    letterSpacing: '0',
                    fontWeight: '600'
                  },
                  '& button:active, button.Mui-selected,': {
                    color: '#26c6da'
                  },
                  '.MuiTabs-indicator': { backgroundColor: '#26c6da' }
                }}
              >
                <Tab label='Danh sách hoạt động' id='tab-1' aria-controls='simple-tabpanel-1' />
                <Tab label='Danh sách minh chứng' id='tab-2' aria-controls='simple-tabpanel-2' />
              </Tabs>
            </Box>
            <Box className='mt-6'>
              <ListEventsAttended tab={tab} index={0} profile={profile} isLoading={getProfileQuery.isLoading()} />
              <ListProofsCreated tab={tab} index={1} profile={profile} />
            </Box>
          </Box>
        </div>
      )}
    </Fragment>
  )
}

export default ProfileClientPage
