/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Tab, Tabs } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import _ from 'lodash'
import { EventOrganizationFormType, EventRole, FormEvent } from '../../../interfaces'
import { FormEventSchema, FormEventType } from '../../../utils'
import { GetAttendanceStudentsQuery, GetEventByIdQuery, GetRegisteredStudentsQuery } from '../../../services'
import useQueryEventConfig from 'src/modules/EventManagement/hooks/useQueryEventConfig'
import EditEvent from '../EditEvent/EditEvent'
import EditEventRegistration from '../EditEventRegistration'
import EditEventOrganization from '../EditEventOrganization'
import { Link } from 'react-router-dom'
import Button from 'src/modules/Share/components/Button'
import path from 'src/modules/Share/constants/path'
import AttendanceStudentsList from '../AttendanceStudentsList'
import RegisteredStudentsList from '../RegisteredStudentsList'

const EditEventPage = () => {
  const [file, setFile] = useState<File>()

  const [page, setPage] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }

  const [dataEventRole, setDataEventRole] = useState<EventRole[]>([])
  const [dataEventOrganization, setDataEventOrganization] = useState<EventOrganizationFormType[]>([])

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
                    fontSize: '18px',
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
                {event && event.status !== 'Pending' && (
                  <Fragment>
                    <Tab label='Danh sách đăng ký' id='tab-4' aria-controls='simple-tabpanel-4' />
                    <Tab label='Danh sách điểm danh' id='tab-5' aria-controls='simple-tabpanel-5' />
                  </Fragment>
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
              {event && event.status === 'Pending' && (
                <Fragment>
                  <AttendanceStudentsList page={page} index={3} attendanceStudents={attendanceStudents} />
                  <RegisteredStudentsList page={page} index={4} registeredStudents={registeredStudents} />
                </Fragment>
              )}
            </Box>
          </Box>
        </div>
        <div className='flex justify-end gap-x-6 mt-[160px] fixed bottom-0 right-0 px-4 py-2 bg-slate-100 w-full z-20'>
          {event && event.status === 'Pending' ? (
            <Fragment>
              <Button
                type='submit'
                classNameButton='bg-[#dd5353] py-2 px-4 rounded-xl text-[14px] text-white font-semibold h-[44px] w-[140px]'
              >
                Từ chối
              </Button>
              <Button
                type='submit'
                classNameButton='bg-[#26C6DA] py-2 px-4 rounded-xl text-[14px] text-white font-semibold h-[44px] w-[140px]'
              >
                Chấp nhật
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Link
                to={path.event}
                className='flex justify-center items-center bg-[#989899] w-[80px] h-[44px] text-white p-2 rounded-xl font-semibold hover:bg-[#dd5353] transition-all'
              >
                Hủy
              </Link>
              <Button
                type='submit'
                classNameButton='bg-[#26C6DA] py-2 px-4 rounded-xl text-[14px] text-white font-semibold h-[44px] w-[140px]'
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
