/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Tab, Tabs } from '@mui/material'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import _ from 'lodash'
import { EventOrganizationFormType, EventRole, FormEvent } from '../../../interfaces'
import { FormEventSchema, FormEventType } from '../../../utils'
import { CreateEventCommandHandler } from '../../../services'
import path from 'src/modules/Share/constants/path'
import { handleError } from 'src/modules/Share/utils'
import CreateEvent from '../CreateEvent'
import CreateEventRegistration from '../CreateEventRegistration'
import CreateEventOrganization from '../CreateEventOrganization'
import Button from 'src/modules/Share/components/Button'
import { EditorState } from 'draft-js'

const CreateEventPage = () => {
  const [file, setFile] = useState<File>()

  const [page, setPage] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }

  const navigate = useNavigate()

  const [dataEventRole, setDataEventRole] = useState<EventRole[]>([])
  const [dataEventOrganization, setDataEventOrganization] = useState<EventOrganizationFormType[]>([])
  const [description, setDescription] = useState<EditorState>(EditorState.createEmpty())

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
      }
    )
  })

  const onIsSuccess = () => {
    if (createEventCommandHandler && createEventCommandHandler.isLoading() === false) {
      toast.error('Vui lòng kiểm tra lại dữ liệu!')
    }
  }

  return (
    <Fragment>
      <Helmet>
        <title>Create Event</title>
        <meta name='description' content='This is create event page of the project' />
      </Helmet>
      <form onSubmit={handleSubmitForm}>
        <div className='w-full'>
          <Box>
            <Box>
              <Tabs
                value={page}
                onChange={handleChange}
                aria-label='basic tabs example'
                sx={{
                  '& div': { width: '100%', margin: '0 -5px 0' },
                  '& button': {
                    color: '#2f2f2f',
                    textTransform: 'capitalize',
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
                <Tab label='Tạo sự kiện' id='tab-1' aria-controls='simple-tabpanel-1' className='capitalize' />
                <Tab label='Thông tin đăng ký' id='tab-2' aria-controls='simple-tabpanel-2' />
                <Tab label='Ban tổ chức sự kiện' id='tab-3' aria-controls='simple-tabpanel-3' />
              </Tabs>
            </Box>
            <Box className='mt-6'>
              <CreateEvent
                page={page}
                index={0}
                register={register}
                control={control}
                setValue={setValue}
                setError={setError}
                errors={errors}
                file={file}
                setFile={setFile}
                description={description}
                setDescription={setDescription}
              />
              <CreateEventRegistration
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
              <CreateEventOrganization
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
        <div className='flex justify-end gap-x-6 mt-[160px] fixed bottom-0 right-0 px-4 py-2 bg-slate-100 w-full z-20'>
          <Link
            to={path.event}
            className='flex justify-center items-center bg-[#989899] w-[60px] h-[44px] text-white p-2 rounded-xl font-semibold hover:bg-[#dd5353] transition-all'
          >
            Hủy
          </Link>
          <Button
            type='submit'
            isLoading={createEventCommandHandler.isLoading()}
            classNameButton='bg-[#26C6DA] py-2 px-4 rounded-xl text-[14px] text-white font-semibold h-[44px] w-[140px]'
            onClick={onIsSuccess}
          >
            Tạo sự kiện
          </Button>
        </div>
      </form>
    </Fragment>
  )
}

export default CreateEventPage
