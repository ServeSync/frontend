/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useRef, useState } from 'react'
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
  EditEventCommandHandler,
  GetEventByIdQuery
} from '../../../services'
import useQueryEventConfig from 'src/modules/EventManagement/hooks/useQueryEventConfig'
import EditEventRegistration from '../EditEventRegistration'
import EditEventOrganization from '../EditEventOrganization'
import { useNavigate } from 'react-router-dom'
import Button from 'src/modules/Share/components/Button'
import path from 'src/modules/Share/constants/path'
import AttendanceStudentsList from '../AttendanceStudentsList'
import RegisteredStudentsList from '../RegisteredStudentsList'
import Swal from 'sweetalert2'
import { handleError } from 'src/modules/Share/utils'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import Restricted from 'src/modules/Share/components/Restricted'
import { RejectEventCommandHandler } from 'src/modules/EventManagement/services/Event/rejectEvent.command-handler'
import { StatusIsShowButton } from 'src/modules/EventManagement/constants'
import EditEventInformation from '../EditEventInformation/EditEventInformation'
import draftToHtml from 'draftjs-to-html'
import { toast } from 'react-toastify'

const EditEventPage = () => {
  const [file, setFile] = useState<File>()

  const [page, setPage] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }

  const navigate = useNavigate()

  const isErrorLocal = useRef(false)

  const queryEventConfig = useQueryEventConfig()

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

  const editEventCommandHandler = new EditEventCommandHandler()

  const handleSubmitForm = handleSubmit(async (data) => {
    if (dataEventRole.length === 0) {
      setError('roles', { message: 'Sự kiện có ít nhất 1 vai trò !' })
    } else if (dataEventOrganization.some((item) => item.organizationReps.length === 0)) {
      setError('organizations.organizationReps', { message: 'Ban tổ chức có ít nhất 1 nhà đại diện !' })
    } else {
      const body = {
        ...data,
        ..._.omit(data, 'categoryId'),
        roles: dataEventRole,
        organizations: dataEventOrganization
      } as FormEvent
      await editEventCommandHandler.handle(
        {
          id: queryEventConfig.id as string,
          data: body
        },
        file as File,
        () => {
          isErrorLocal.current = false
          toast.success('Cập nhật sự kiện thành công !')
          navigate(path.event)
        },
        (error: any) => {
          isErrorLocal.current = false
          handleError<FormEventType>(error, setError)
        }
      )
    }
  })

  const handleEditEvent = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      await handleSubmitForm()
      if (isErrorLocal.current) {
        toast.error('Vui lòng kiểm tra lại thông tin !')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getEventByIdQuery = new GetEventByIdQuery(queryEventConfig.id as string)
  const event = getEventByIdQuery.fetch()

  useEffect(() => {
    if (event) {
      setValue('name', event.name)
      setValue('introduction', event.introduction)
      setValue('imageUrl', event.imageUrl)
      setValue('startAt', event.startAt)
      setValue('endAt', event.endAt)
      setValue('address.fullAddress', event.address.fullAddress)
      setValue('address.latitude', event.address.latitude.toString())
      setValue('address.longitude', event.address.longitude.toString())
      setValue('type', event.type)
      setValue('categoryId', event.activity.eventCategoryId)
      setValue('activityId', event.activity.id)
      const blocksFromHTML = convertFromHTML(event.description as string)
      const content = EditorState.createWithContent(
        ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
      )
      setDescription(content)
      setValue('description', draftToHtml(convertToRaw(content.getCurrentContent())))
      setValue('registrationInfos', event.registrationInfos)
      setValue('attendanceInfos', event.attendanceInfos)
      setDataEventRole(event.roles)
      setValue('representativeOrganizationId', event.representativeOrganization.id)
    }
  }, [event, setValue])

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

  const rejectEventCommandHandler = new RejectEventCommandHandler()

  const handleRejectEvent = (id: string) => {
    Swal.fire({
      title: 'Xác nhận từ chối ?',
      text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        rejectEventCommandHandler.handle(
          id,
          () => {
            Swal.fire('Đã từ chối!', 'Từ chối sự kiện thành công', 'success')
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
              <EditEventInformation
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
                errors={errors}
                setValue={setValue}
                setDataEventOrganization={setDataEventOrganization}
                event={event}
              />
              {event && event.status !== 'Pending' && (
                <Fragment>
                  <RegisteredStudentsList page={page} index={3} />
                  <AttendanceStudentsList page={page} index={4} />
                </Fragment>
              )}
            </Box>
          </Box>
        </div>
      </form>
      {event && StatusIsShowButton(event.status) && (
        <div className='flex justify-end gap-x-6 mt-[160px] fixed bottom-0 right-0 px-4 py-2 bg-slate-100 w-full z-20'>
          {event.status === 'Pending' ? (
            <div className='flex items-center gap-6'>
              <Restricted to={'ServeSync.Permissions.Events.Reject'}>
                <Button
                  type='button'
                  classNameButton='bg-[#dd5353] p-2 rounded-xl text-[14px] text-white font-semibold h-[44px] w-[100px]'
                  onClick={() => handleRejectEvent(event.id)}
                >
                  Từ chối
                </Button>
              </Restricted>
              <Restricted to={'ServeSync.Permissions.Events.Approve'}>
                <Button
                  type='button'
                  classNameButton='bg-[#26C6DA] p-2 rounded-xl text-[14px] text-white font-semibold h-[44px] w-[128px]'
                  onClick={() => handleApproveEvent(event.id)}
                >
                  Chấp thuận
                </Button>
              </Restricted>
            </div>
          ) : (
            <div className='flex items-center gap-6'>
              <Restricted to={'ServeSync.Permissions.Events.Cancel'}>
                <Button
                  type='button'
                  classNameButton='flex justify-center items-center bg-[#989899] w-[150px] h-[44px] text-white p-2 rounded-xl font-semibold hover:bg-[#dd5353] transition-all'
                  onClick={() => handleCancelEvent(event.id)}
                >
                  Hủy sự kiện
                </Button>
              </Restricted>
              <Restricted to={'ServeSync.Permissions.Events.Edit'}>
                <Button
                  type='button'
                  classNameButton='bg-[#26C6DA] p-2 rounded-xl text-[14px] text-white font-semibold h-[44px] w-[120px]'
                  onClick={handleEditEvent}
                >
                  Cập nhật
                </Button>
              </Restricted>
            </div>
          )}
        </div>
      )}
    </Fragment>
  )
}

export default EditEventPage
