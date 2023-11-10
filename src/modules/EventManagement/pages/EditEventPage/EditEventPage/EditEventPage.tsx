/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Tab, Tabs } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import _ from 'lodash'
import { EventOrganizationFormType, EventRole, FormEvent } from '../../../interfaces'
import { FormEventSchema, FormEventType } from '../../../utils'
import {
  ApproveEventCommandHandler,
  CancelEventCommandHandler,
  GetAttendanceStudentsQuery,
  GetEventByIdQuery,
  GetRegisteredStudentsQuery
} from '../../../services'
import useQueryEventConfig from 'src/modules/EventManagement/hooks/useQueryEventConfig'
import EditEvent from '../EditEvent/EditEvent'
import EditEventRegistration from '../EditEventRegistration'
import EditEventOrganization from '../EditEventOrganization'
import { useNavigate } from 'react-router-dom'
import Button from 'src/modules/Share/components/Button'
import path from 'src/modules/Share/constants/path'
import AttendanceStudentsList from '../AttendanceStudentsList'
import RegisteredStudentsList from '../RegisteredStudentsList'
import Swal from 'sweetalert2'
import { handleError } from 'src/modules/Share/utils'
import { EditorState } from 'draft-js'

const EditEventPage = () => {
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
    setError,
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
      ..._.omit(data, 'categoryId'),
      roles: dataEventRole,
      organizations: dataEventOrganization
    } as FormEvent
    console.log(body)
  })

  const queryEventConfig = useQueryEventConfig()

  const getEventByIdQuery = new GetEventByIdQuery(queryEventConfig.id as string)
  const event = getEventByIdQuery.fetch()

  const getAttendanceStudentsQuery = new GetAttendanceStudentsQuery(queryEventConfig.id as string)
  const attendanceStudents = getAttendanceStudentsQuery.fetch()

  const getRegisteredStudentsQuery = new GetRegisteredStudentsQuery(queryEventConfig.id as string)
  const registeredStudents = getRegisteredStudentsQuery.fetch()

  const cancelEventCommandHandler = new CancelEventCommandHandler()

  const handleCancelEvent = (id: string) => {
    Swal.fire({
      title: 'Xác nhận hủy?',
      text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelEventCommandHandler.handle(
          id,
          () => {
            Swal.fire('Đã hủy!', 'Hủy sự kiện thành công', 'success')
            navigate({
              pathname: path.event
            })
          },
          (error: any) => {
            handleError<FormEventType>(error, setError)
          }
        )
      }
    })
  }

  const approveEventCommandHandler = new ApproveEventCommandHandler()

  const handleApproveEvent = (id: string) => {
    Swal.fire({
      title: 'Xác nhận chấp thuận?',
      text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        approveEventCommandHandler.handle(
          id,
          () => {
            Swal.fire('Đã chấp thuận!', 'Chấp thuận sự kiện thành công', 'success')
            navigate({
              pathname: path.event
            })
          },
          (error: any) => {
            handleError<FormEventType>(error, setError)
          }
        )
      }
    })
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
                <Tab label='Thông tin chung' id='tab-1' aria-controls='simple-tabpanel-1' className='capitalize' />
                <Tab label='Thông tin đăng ký' id='tab-2' aria-controls='simple-tabpanel-2' />
                <Tab label='Ban tổ chức sự kiện' id='tab-3' aria-controls='simple-tabpanel-3' />
                {event && event.status !== 'Pending' && (
                  <Tab label='Danh sách đăng ký' id='tab-4' aria-controls='simple-tabpanel-4' />
                )}
                {event && event.status !== 'Pending' && (
                  <Tab label='Danh sách điểm danh' id='tab-5' aria-controls='simple-tabpanel-5' />
                )}
              </Tabs>
            </Box>
            <Box className='mt-6'>
              <EditEvent
                page={page}
                index={0}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
                file={file}
                setFile={setFile}
                event={event}
                description={description}
                setDescription={setDescription}
              />
              <EditEventRegistration
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
                event={event}
              />
              <EditEventOrganization
                page={page}
                index={2}
                control={control}
                getValues={getValues}
                setValue={setValue}
                setDataEventOrganization={setDataEventOrganization}
                event={event}
              />
              {event && event.status !== 'Pending' && (
                <Fragment>
                  <RegisteredStudentsList page={page} index={3} registeredStudents={registeredStudents} />
                  <AttendanceStudentsList page={page} index={4} attendanceStudents={attendanceStudents} />
                </Fragment>
              )}
            </Box>
          </Box>
        </div>
        <div className='flex justify-end gap-x-6 mt-[160px] fixed bottom-0 right-0 px-4 py-2 bg-slate-100 w-full z-20'>
          {event && event.status === 'Pending' ? (
            <Fragment>
              <Button
                type='button'
                classNameButton='bg-[#dd5353] p-2 rounded-xl text-[14px] text-white font-semibold h-[44px] w-[100px]'
              >
                Từ chối
              </Button>
              <Button
                classNameButton='bg-[#26C6DA] p-2 rounded-xl text-[14px] text-white font-semibold h-[44px] w-[128px]'
                onClick={() => handleApproveEvent(event.id)}
              >
                Chấp thuận
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                type='button'
                classNameButton='flex justify-center items-center bg-[#989899] w-[60px] h-[44px] text-white p-2 rounded-xl font-semibold hover:bg-[#dd5353] transition-all'
                onClick={() => handleCancelEvent(event.id)}
              >
                Hủy
              </Button>
              <Button
                type='submit'
                classNameButton='bg-[#26C6DA] p-2 rounded-xl text-[14px] text-white font-semibold h-[44px] w-[120px]'
              >
                Cập nhật
              </Button>
            </Fragment>
          )}
        </div>
      </form>
    </Fragment>
  )
}

export default EditEventPage
