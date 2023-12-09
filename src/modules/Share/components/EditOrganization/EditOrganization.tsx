/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EditEventOrganizationCommandHandler,
  GetEventOrganizationByIdQuery
} from 'src/modules/EventOrganizationManagement/services'
import Button from '../Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormEventOrganizationSchema, FormEventOrganizationType } from 'src/modules/EventOrganizationManagement/utils'
import { useMemo, useState } from 'react'
import { handleError } from '../../utils'
import { toast } from 'react-toastify'
import { Box, Tab, Tabs } from '@mui/material'
import OrganizationInfo from '../OrganizationInfo'
import OrganizationContactInfo from '../OrganizationContactInfo'
interface Props {
  organizationId: string
  handleCloseModal: () => void
}
const EditOrganization = ({ organizationId, handleCloseModal }: Props) => {
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

  const { register, control, setValue, handleSubmit, setError } = useForm<FormEventOrganizationType>({
    resolver: yupResolver(FormEventOrganizationSchema)
  })
  const getOrganizationByIdQuery = new GetEventOrganizationByIdQuery(organizationId)
  const organization = getOrganizationByIdQuery.fetch()
  const editEventOrganizationCommandHandler = new EditEventOrganizationCommandHandler()
  const handleSubmitForm = handleSubmit(async (data) => {
    editEventOrganizationCommandHandler.handle(
      {
        id: organizationId,
        data: data
      },
      file as File,
      () => {
        handleCloseModal()
        toast.success('Cập nhật thông tin nhà tổ chức thành công!')
      },
      (error: any) => {
        handleError<FormEventOrganizationType>(error, setError)
      }
    )
  })
  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[1000px] '>
      <div className='flex justify-between items-center w-full'>
        <h2 className='text-[20px] font-semibold'>Quản lý tổ chức</h2>
        <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModal}>
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
      <div className='w-full'>
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
              <Tab label='Thông tin tổ chức' id='tab-1' aria-controls='simple-tabpanel-1' className='capitalize' />
              <Tab label='Danh sách thành viên' id='tab-2' aria-controls='simple-tabpanel-3' />
            </Tabs>
          </Box>
          <Box className='mt-6' width='100%'>
            <form onSubmit={handleSubmitForm} className='w-full'>
              <OrganizationInfo
                page={page}
                index={0}
                register={register}
                setValue={setValue}
                control={control}
                organization={organization}
                isLoadingEdit={editEventOrganizationCommandHandler.isLoading()}
                onChange={handleChangeFile}
                previewImage={previewImage}
              />
            </form>
            <OrganizationContactInfo page={page} index={1} organization={organization} />
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default EditOrganization
