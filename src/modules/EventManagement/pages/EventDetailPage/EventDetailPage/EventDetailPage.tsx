/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { Box, Tab, Tabs, TextField } from '@mui/material'
import useQueryEventConfig from '../../../hooks/useQueryEventConfig'
import { GetAttendanceStudentsQuery, GetEventByIdQuery, GetRegisteredStudentsQuery } from '../../../services'
import { formatDateTime } from 'src/modules/Share/utils'
import LandingPageHeader from 'src/modules/HomePage/components/HeaderHomePage/HeaderHomePage'
import { LocationType } from 'src/modules/EventManagement/interfaces'
import EventDetailRegisterListPage from '../EventDetailRegisterListPage'
import EventDetailAttendanceListPage from '../EventDetailAttendanceListPage'
import EventDetailInformationPage from '../EventDetailInformationPage'
import EventDetailOrganizationPage from '../EventDetailOrganizationPage'
import FooterHomePage from 'src/modules/HomePage/components/FooterHomePage'
import Button from 'src/modules/Share/components/Button'
import { AppContext } from 'src/modules/Share/contexts'
import ModalCustom from 'src/modules/Share/components/Modal'
import { RegistrationInfoTableHeader, StatusToMessage, TypeToMessage } from 'src/modules/EventManagement/constants'

const EventDetailPage = () => {
  const { isAuthenticated } = useContext(AppContext)

  const [isOpenModalRegisterEvent, setIsOpenModalRegisterEvent] = useState(false)

  const handleCloseModalRegisterEvent = () => {
    setIsOpenModalRegisterEvent(false)
  }

  const [isOpenModalRegistrationInfos, setIsOpenModalRegistrationInfos] = useState(false)

  const handleOpenModalRegistrationInfos = () => {
    setIsOpenModalRegistrationInfos(true)
  }

  const handleCloseModalRegistrationInfos = () => {
    setIsOpenModalRegistrationInfos(false)
  }

  const [isOpenModalAttendanceInfos, setIsOpenModalAttendanceInfos] = useState(false)

  const handleCloseModalAttendanceInfos = () => {
    setIsOpenModalAttendanceInfos(false)
  }

  const handleOpenModalAttendanceInfos = () => {
    setIsOpenModalAttendanceInfos(true)
  }
  const [page, setPage] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }

  const [scrolled, setScrolled] = useState(false)

  const navigate = useNavigate()

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

  const [mapImageURL, setMapImageURL] = useState<string | null>(null)

  const center: LocationType = {
    latitude: event?.address?.latitude,
    longitude: event?.address?.longitude
  }

  useEffect(() => {
    const googleMapsApiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
    const imageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${center.latitude},${center.longitude}&markers=color:red%7C%7C${center.latitude},${center.longitude}&zoom=15&size=300x150&key=${googleMapsApiKey}`
    setMapImageURL(imageURL)
  }, [center])

  const handleRegisterEvent = () => {
    if (isAuthenticated) {
      setIsOpenModalRegisterEvent(true)
    } else {
      navigate({
        pathname: path.login
      })
    }
  }

  return (
    <Fragment>
      <Helmet>
        <title>Event Detail</title>
        <meta name='description' content='This is event detail page of the project' />
      </Helmet>
      <div>
        <LandingPageHeader />
        {event && (
          <div className='relative bg-white h-full pb-[100px] mx-auto'>
            <div className='flex mb-10 px-[120px] justify-between'>
              <div className='flex flex-col'>
                <h1 className='text-[54px] font-semibold break-words text-[#195E8E]'>{event.name}</h1>
                <h2 className='text-black text-[25px] font-medium break-words'>{event.introduction}</h2>
                <h3 className='text-[#A0A2A4] text-[20px] font-light break-words'>{TypeToMessage(event.type)}</h3>
                <div className='text-center font-medium flex items-center gap-3 mt-2'>
                  <img
                    src={event.representativeOrganization.imageUrl}
                    alt=''
                    className='rounded-full object-cover w-[50px] h-[50px]'
                  />
                  <div className='flex flex-col text-start'>
                    <div className='font-normal flex items-end mb-1'>
                      <span className='font-semibold text-black'> {event.representativeOrganization.name}</span>
                      <span className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-[#A0A2A4] text-[12px] ring-1 ring-inset ring-gray-500/10 ms-3'>
                        {StatusToMessage(event.calculatedStatus)}
                      </span>
                    </div>
                    <span className='text-[#A0A2A4] text-[16px] font-light'>
                      {event.representativeOrganization.email}
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-end'>
                {!event.isRegistered ? (
                  event.calculatedStatus == 'Registration' ? (
                    <Button
                      onClick={handleRegisterEvent}
                      classNameButton='bg-[#0E91EF] text-white px-8 py-3 rounded-3xl shadow-md transition-all duration-300 hover:shadow-md text-center  no-underline flex-shrink-0'
                    >
                      Đăng ký ngay
                    </Button>
                  ) : (
                    <span></span>
                  )
                ) : (
                  <span className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-[16px] font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                    Đã đăng ký.
                  </span>
                )}
              </div>
            </div>
            <ModalCustom isOpenModal={isOpenModalRegisterEvent} handleClose={handleCloseModalRegisterEvent}>
              <div className='bg-white p-10 rounded-xl w-[480px]'>
                <form>
                  <div className='flex justify-between mb-8'>
                    <h2 className='font-semibold text-[18px]'>Đăng kí tham gia hoạt động</h2>
                    <Button classNameButton='' onClick={handleCloseModalRegisterEvent}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </Button>
                  </div>
                  <div>
                    <TextField
                      id='introduce'
                      label='Tự giới thiệu'
                      placeholder='Kinh nghiệm...'
                      className='w-full bg-white'
                      multiline
                      rows={3}
                      // onChange={onChange}
                      // value={value}
                    />
                  </div>
                  <div className='flex mt-4 justify-end gap-4'>
                    <Button
                      type='button'
                      classNameButton='bg-[#ff3d3d] py-3 px-4 rounded-lg text-[14px] text-white font-semibold'
                    >
                      Hủy
                    </Button>
                    <Button
                      type='button'
                      classNameButton='bg-[#26C6DA] py-3 px-4 rounded-lg text-[14px] text-white font-semibold'
                    >
                      Đăng kí
                    </Button>
                  </div>
                </form>
              </div>
            </ModalCustom>
            <ModalCustom isOpenModal={isOpenModalRegistrationInfos} handleClose={handleCloseModalRegistrationInfos}>
              <div className='bg-white p-10 rounded-xl w-[800px]'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-[24px] font-semibold'>Khung giờ đăng ký</h2>
                  <Button
                    classNameButton='p-2 hover:bg-slate-100 rounded-lg'
                    onClick={handleCloseModalRegistrationInfos}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </Button>
                </div>
                {event.registrationInfos.map((registrationInfo) => (
                  <table
                    key={registrationInfo.id}
                    className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'
                  >
                    <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
                      <tr className='text-[14px] text-gray-600'>
                        {RegistrationInfoTableHeader.map((item) => (
                          <th key={item.id} className='px-2 py-2 font-semibold'>
                            {item.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {event.registrationInfos.map((registrationInfo) => (
                        <tr
                          key={registrationInfo.id}
                          className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                        >
                          <th className='px-2 py-4 font-medium'>{formatDateTime(registrationInfo.startAt)}</th>
                          <th className='px-2 py-4 font-medium'>{formatDateTime(registrationInfo.endAt)}</th>
                          <th className='px-2 py-4 font-medium'>{StatusToMessage(registrationInfo.status)}</th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ))}
              </div>
            </ModalCustom>
            <ModalCustom isOpenModal={isOpenModalAttendanceInfos} handleClose={handleCloseModalAttendanceInfos}>
              <div className='bg-white p-10 rounded-xl w-[800px]'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-[24px] font-semibold'>Khung giờ điểm danh</h2>
                  <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalAttendanceInfos}>
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
                {event.registrationInfos.map((registrationInfo) => (
                  <table
                    key={registrationInfo.id}
                    className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'
                  >
                    <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
                      <tr className='text-[14px] text-gray-600'>
                        {RegistrationInfoTableHeader.map((item) => (
                          <th key={item.id} className='px-2 py-2 font-semibold'>
                            {item.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {event.attendanceInfos.map((attendanceInfo) => (
                        <tr
                          key={registrationInfo.id}
                          className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                        >
                          <th className='px-2 py-4 font-medium'>{formatDateTime(attendanceInfo.startAt)}</th>
                          <th className='px-2 py-4 font-medium'>{formatDateTime(attendanceInfo.endAt)}</th>
                          <th className='px-2 py-4 font-medium'>{StatusToMessage(attendanceInfo.status)}</th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ))}
              </div>
            </ModalCustom>
            <div className='relative mb-[200px] px-[120px]'>
              <img
                src={event?.imageUrl}
                alt=''
                className='w-full min-h-[500px] max-h-[600px] rounded-3xl max-w-full object-cover'
              />
              <div className='bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[80%] absolute right-0 left-0 mx-auto bottom-[-160px] grid grid-cols-3 px-10 py-8 rounded-2xl gap-4'>
                <div className='col-span-1 flex flex-col gap-4'>
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
                    <span className='text-[#A0A2A4] text-[16px] font-normal break-words truncate text-center'>
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
                    <span className='text-[#A0A2A4] text-[15px] font-normal break-words text-center'>
                      {TypeToMessage(event.type)}
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
                    <div className='text-[#A0A2A4] text-[15px] font-normal break-words text-center flex gap-2'>
                      <span>{formatDateTime(event.startAt)}</span>
                      <span>-</span>
                      <span>{formatDateTime(event.endAt)}</span>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6 max-sm:w-4 max-sm:h-4 text-[#195E8E] flex-shrink-0'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
                      />
                    </svg>
                    <span className='text-[#A0A2A4] text-[15px] font-normal break-words text-center'>
                      {event.activity.minScore.toFixed(2)} - {event.activity.maxScore.toFixed(2)} điểm
                    </span>
                  </div>
                </div>
                <div className='col-span-1 flex  justify-center'>
                  {mapImageURL && <img src={mapImageURL} alt='Static Map' className='object-cover rounded-2xl' />}
                </div>
                <div className='col-span-1 flex flex-col justify-between gap-5'>
                  <div className='gap-2 flex flex-col'>
                    <div className='flex justify-between'>
                      <p className='font-semibold text-[16px] text-[#1F2933] break-words'>Khung giờ đăng ký</p>
                      <Button
                        classNameButton='font-light text-[14px] text-[#146BCD]'
                        onClick={handleOpenModalRegistrationInfos}
                      >
                        Xem tất cả
                      </Button>
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
                      <div className='flex gap-2 text-[#A0A2A4] text-[15px] font-normal break-words'>
                        <span>
                          {formatDateTime(
                            event.registrationInfos.find((e) => e.id == event.nearestRegistrationInfoId)!.startAt
                          )}
                        </span>
                        <span>-</span>
                        <span>
                          {formatDateTime(
                            event.registrationInfos.find((e) => e.id == event.nearestRegistrationInfoId)!.endAt
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='gap-2 flex flex-col'>
                    <div className='flex justify-between'>
                      <p className='font-semibold text-[16px] text-[#1F2933] break-words'>Khung giờ điểm danh</p>
                      <button
                        className='font-light text-[14px] text-[#146BCD]'
                        onClick={handleOpenModalAttendanceInfos}
                      >
                        Xem tất cả
                      </button>
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
                      <div className='text-[#A0A2A4] text-[15px] font-normal break-words flex gap-2'>
                        <span>
                          {formatDateTime(
                            event.attendanceInfos.find((e) => e.id == event.nearestAttendanceInfoId)!.startAt
                          )}
                        </span>
                        <span>-</span>
                        <span>
                          {formatDateTime(
                            event.attendanceInfos.find((e) => e.id == event.nearestAttendanceInfoId)!.endAt
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full h-full bg-[#F4F4F4] grid px-[120px] py-6 grid-cols-4 mb-[50px]'>
              <div className='flex flex-col justify-center items-center col-span-1'>
                <div className='font-semibold text-[30px] break-words'>{event.roles.length}</div>
                <div className='text-[20px] font-normal'>Vai trò khác nhau</div>
              </div>
              <div className='flex flex-col justify-center items-center col-span-1'>
                <div className='font-semibold text-[30px] break-words'>{event.organizations.length}</div>
                <div className='text-[20px] font-normal'>Ban tổ chức</div>
              </div>
              <div className='flex flex-col justify-center items-center col-span-1'>
                <div className='font-semibold text-[30px] break-words'>{event.registered}</div>
                <div className='text-[20px] font-normal'>Sinh viên đăng ký</div>
              </div>
              <div className='flex flex-col justify-center items-center col-span-1'>
                <div className='font-semibold text-[30px] break-words'>{event.attended}</div>
                <div className='text-[20px] font-normal'>Sinh viên tham dự</div>
              </div>
            </div>
            <div className='w-full h-full px-[120px] overflow-hidden'>
              <Box>
                <Box>
                  <Tabs
                    value={page}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                    sx={{
                      '& div': { width: '100%', margin: '0 -5px', display: 'flex', justifyContent: 'center' },
                      '& button': {
                        color: '#2f2f2f',
                        textTransform: 'capitalize',
                        fontSize: '16px',
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
                    <Tab label='Thông tin chung' id='tab-1' aria-controls='simple-tabpanel-1'></Tab>
                    <Tab label='Ban tổ chức sự kiện' id='tab-2' aria-controls='simple-tabpanel-2'></Tab>
                    <Tab label='Danh sách đăng ký' id='tab-3' aria-controls='simple-tabpanel-3'></Tab>
                    <Tab label='Danh sách điểm danh' id='tab-4' aria-controls='simple-tabpanel-4'></Tab>
                  </Tabs>
                </Box>
                <Box className='mt-6'>
                  <EventDetailInformationPage event={event} page={page} index={0} />
                  <EventDetailOrganizationPage event={event} page={page} index={1} />
                  <EventDetailRegisterListPage page={page} index={2} registeredStudents={registeredStudents} />
                  <EventDetailAttendanceListPage page={page} index={3} attendanceStudents={attendanceStudents} />
                </Box>
              </Box>
            </div>
          </div>
        )}
        <FooterHomePage />
      </div>
    </Fragment>
  )
}

export default EventDetailPage