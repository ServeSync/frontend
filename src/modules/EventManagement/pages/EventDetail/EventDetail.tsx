import { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { Box, Tab, Tabs } from '@mui/material'
import EventDetailRegisterPage from '../EventDetailRegisterPage'
import EventDetailOrganizerPage from '../EventDetailOrganizerPage'
import useQueryEventConfig from '../../hooks/useQueryEventConfig'
import { GetAttendanceStudentsQuery, GetEventByIdQuery, GetRegisteredStudentsQuery } from '../../services'
import EventRating from '../../components/EventRating'
import EventDetailInformationPage from '../EventDetailInformationPage'
import { formatDateTime, formatTime } from 'src/modules/Share/utils'
import classNames from 'classnames'
import LandingPageHeader from 'src/modules/HomePage/components/HeaderHomePage/HeaderHomePage'

const EventDetail = () => {
  const [page, setPage] = useState<number>(0)

  const [scrolled, setScrolled] = useState(false)

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }

  useEffect(() => {
    if (!scrolled) {
      window.scrollTo(0, 0)
      setScrolled(true)
    }
  }, [scrolled])

  const queryEventConfig = useQueryEventConfig()

  const getEventQuery = new GetEventByIdQuery(queryEventConfig.id as string)
  const event = getEventQuery.fetch()

  const getRegisteredStudentsQuery = new GetRegisteredStudentsQuery(queryEventConfig.id as string)
  const registeredStudents = getRegisteredStudentsQuery.fetch()

  const getAttendanceStudentsQuery = new GetAttendanceStudentsQuery(queryEventConfig.id as string)
  const attendanceStudents = getAttendanceStudentsQuery.fetch()

  return (
    <Fragment>
      <Helmet>
        <title>Event Detail</title>
        <meta name='description' content='This is event detail page of the project' />
      </Helmet>
      <div className=''>
        <LandingPageHeader />
        {event && (
          <div className='relative bg-white w-full h-full pb-[100px] '>
            <div className='flex flex-col gap-6 mb-10 px-[220px]'>
              <div className='flex flex-col'>
                <h1 className='text-black text-[80px] font-semibold break-words'>{event.name}</h1>
                <h4 className='text-black text-[25px] font-light break-words'>{event.introduction}</h4>
                <h6 className='text-[#A0A2A4] text-[20px] font-light break-words'>{event.type}</h6>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-4'>
                  <div className='flex gap-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6 max-sm:w-4 max-sm:h-4 text-[#E80505] flex-shrink-0'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                      />
                    </svg>
                    <span className='text-[#A0A2A4] text-[15px] font-normal break-words'>
                      {event.address.fullAddress}
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6 max-sm:w-4 max-sm:h-4 text-[#FACD49] flex-shrink-0'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z'
                      />
                    </svg>
                    <span className='text-[#A0A2A4] text-[15px] font-normal break-words'>
                      {formatDateTime(event.startAt) + ' - ' + formatDateTime(event.endAt)}
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6 max-sm:w-4 max-sm:h-4 text-[#00BA21] flex-shrink-0'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='text-[#A0A2A4] text-[15px] font-normal break-words'>
                      {formatTime(event.startAt) + ' - ' + formatTime(event.endAt)}
                    </span>
                  </div>
                  <div className='flex justify-between '>
                    <EventRating rating={event.rating} />
                    <div
                      className={classNames('px-6 rounded-xl  flex justify-center items-center', {
                        'bg-[#00F335]/50': event.status === 'Done',
                        'bg-[#58CCFE]': event.status === 'Happening',
                        'bg-[#FFE55A]/50': event.status === 'Upcoming'
                      })}
                    >
                      <span className='font-normal leading-5 max-sm:leading-3 break-words max-sm:text-[6px] text-[12px]'>
                        {event.status === 'Done'
                          ? 'Đã diễn ra'
                          : event.status === 'Happening'
                          ? 'Đang diễn ra'
                          : event.status === 'Upcoming'
                          ? 'Sắp diễn ra'
                          : ''}
                      </span>
                    </div>
                  </div>
                </div>
                <div className=''>
                  {event.isRegistered ? (
                    <Link
                      className='bg-[#0E91EF] text-white px-10 py-4 rounded-3xl shadow-md transition-all duration-300 hover:shadow-md  no-underline flex-shrink-0'
                      to={path.login}
                    >
                      Đăng ký ngay
                    </Link>
                  ) : (
                    <div className='bg-red-500 px-10 py-4 rounded-3xl shadow-md transition-all duration-300 hover:shadow-md  no-underline flex-shrink-0 cursor-not-allowed'>
                      Hết hạn đăng ký
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='relative mb-[55px] px-[220px]'>
              <img src={event?.imageUrl} alt='' className='w-full max-h-[500px] rounded-3xl max-w-full object-cover' />
            </div>
            <div className='w-full h-full bg-[#F4F4F4] grid px-[220px] grid-cols-4 mb-[90px]'>
              <div className='flex flex-col justify-center items-center col-span-1'>
                <div className='font-semibold text-[30px] break-words'>{event.roles.length}</div>
                <div className='text-[20px] font-normal'>Vai trò khác nhau</div>
              </div>
              <div className='flex flex-col justify-center items-center col-span-1'>
                <div className='font-semibold text-[30px] break-words'>{event.organizations.length}</div>
                <div className='text-[20px] font-normal'>Ban tổ chức</div>
              </div>
              <div className='flex flex-col justify-center items-center col-span-1'>
                <div className='font-semibold text-[30px] break-words'>{registeredStudents?.data.length}</div>
                <div className='text-[20px] font-normal'>Sinh viên đăng ký</div>
              </div>
              <div className='flex flex-col justify-center items-center col-span-1'>
                <div className='font-semibold text-[30px] break-words'>{attendanceStudents?.data.length}</div>
                <div className='text-[20px] font-normal'>Sinh viên tham dự</div>
              </div>
            </div>
            <div className='w-full h-full px-[220px] overflow-hidden'>
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
                    <Tab
                      label='Thông tin chung'
                      id='tab-1'
                      aria-controls='simple-tabpanel-1'
                      className='capitalize'
                    ></Tab>
                    <Tab label='Thông tin đăng ký' id='tab-2' aria-controls='simple-tabpanel-2'></Tab>
                    <Tab label='Ban tổ chức sự kiện' id='tab-3' aria-controls='simple-tabpanel-3'></Tab>
                  </Tabs>
                </Box>
                <Box className='mt-6'>
                  <EventDetailInformationPage event={event} page={page} index={0} />
                  <EventDetailRegisterPage
                    event={event}
                    registeredStudents={registeredStudents}
                    attendanceStudents={attendanceStudents}
                    page={page}
                    index={1}
                  />
                  <EventDetailOrganizerPage event={event} page={page} index={2} />
                </Box>
              </Box>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default EventDetail
