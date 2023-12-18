/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { Box, Tab, Tabs } from '@mui/material'
import useQueryEventConfig from '../../../hooks/useQueryEventConfig'
import { GetEventByIdQuery } from '../../../services'
import { formatDateTime } from 'src/modules/Share/utils'
import { LocationType } from 'src/modules/EventManagement/interfaces'
import EventDetailRegisterListPage from '../EventDetailRegisterListPage'
import EventDetailAttendanceListPage from '../EventDetailAttendanceListPage'
import EventDetailInformationPage from '../EventDetailInformationPage'
import EventDetailOrganizationPage from '../EventDetailOrganizationPage'
import Button from 'src/modules/Share/components/Button'
import { AppContext } from 'src/modules/Share/contexts'
import { StatusToMessage, TypeToMessage } from 'src/modules/Share/constants'
import MapImageModal from 'src/modules/EventManagement/components/EventDetail/EventDetailModal/MapImageModal'
import RegistrationInformationModal from 'src/modules/EventManagement/components/EventDetail/EventDetailModal/RegistrationInformationModal'
import AttendanceInformationModal from 'src/modules/EventManagement/components/EventDetail/EventDetailModal/AttendanceInformationModal'
import RegisterEventModal from 'src/modules/EventManagement/components/EventDetail/EventDetailModal/RegisterEventModal'

const EventDetailPage = () => {
  const { isAuthenticated } = useContext(AppContext)

  const [isOpenModalTableRegisterEvent, setIsOpenModalTableRegisterEvent] = useState(false)

  const handleCloseModalTableRegisterEvent = () => {
    setIsOpenModalTableRegisterEvent(false)
  }

  const handleRegisterEvent = () => {
    if (isAuthenticated) {
      setIsOpenModalTableRegisterEvent(true)
    } else {
      navigate({
        pathname: path.login
      })
    }
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

  const [isOpenModalMapImage, setIsOpenModalMapImage] = useState(false)

  const handleCloseModalMapImage = () => {
    setIsOpenModalMapImage(false)
  }

  const handleOpenModalMapImage = () => {
    setIsOpenModalMapImage(true)
  }

  const [page, setPage] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    event.preventDefault()
    setPage(newPage)
  }

  const navigate = useNavigate()

  const queryEventConfig = useQueryEventConfig()

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!scrolled) {
      window.scrollTo(0, 0)
      setScrolled(true)
    }
  }, [scrolled])

  const getEventQuery = new GetEventByIdQuery(queryEventConfig.id as string)
  const event = getEventQuery.fetch()

  const [mapImageURL, setMapImageURL] = useState<string | null>(null)

  const center: LocationType = {
    latitude: event?.address?.latitude,
    longitude: event?.address?.longitude
  }

  useEffect(() => {
    const googleMapsApiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
    const imageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${center.latitude},${center.longitude}&markers=color:red%7C%7C${center.latitude},${center.longitude}&zoom=15&size=900x300&key=${googleMapsApiKey}`
    setMapImageURL(imageURL)
  }, [center])

  return (
    <Fragment>
      <Helmet>
        <title>Event Detail</title>
        <meta name='description' content='This is event detail page of the project' />
      </Helmet>
      <div>
        {event && (
          <div className='relative bg-white h-full pb-[100px] mx-auto'>
            <div className='flex mb-10 px-[10%] justify-between'>
              <div className='flex flex-col'>
                <h1 className='text-[54px] font-semibold break-words text-[#195E8E]'>{event.name}</h1>
                <h2 className='text-black text-[25px] font-medium break-words'>{event.introduction}</h2>
                <span className='text-[#A0A2A4] text-[15px] font-normal break-words'>{TypeToMessage(event.type)}</span>
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
                {event.isRegistered ? (
                  event.isAttendance ? (
                    <span className='inline-flex items-center bg-green-50 text-[16px] font-medium text-green-700 ring-1 ring-inset ring-green-600/20 px-4 py-2 rounded-full'>
                      Đã điểm danh
                    </span>
                  ) : (
                    <span className='inline-flex items-center bg-green-50 text-[16px] font-medium text-green-700 ring-1 ring-inset ring-green-600/20 px-4 py-2 rounded-full'>
                      Đã đăng ký
                    </span>
                  )
                ) : (
                  event.calculatedStatus == 'Registration' && (
                    <Button
                      onClick={handleRegisterEvent}
                      classNameButton='bg-[#0E91EF] text-white px-8 py-3 rounded-3xl shadow-md transition-all duration-300 hover:shadow-md text-center  no-underline flex-shrink-0'
                    >
                      Đăng ký ngay
                    </Button>
                  )
                )}
              </div>
              <RegisterEventModal
                event={event}
                isOpenModalTableRegisterEvent={isOpenModalTableRegisterEvent}
                handleCloseModalTableRegisterEvent={handleCloseModalTableRegisterEvent}
              />
            </div>
            <div className='relative mb-[200px] px-[10%]'>
              <img
                src={event?.imageUrl}
                alt=''
                className='w-full min-h-[500px] max-h-[600px] rounded-3xl max-w-full object-cover'
              />
              <div className='bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[70%] absolute right-0 left-0 mx-auto bottom-[-160px] grid grid-cols-3 px-10 py-8 rounded-2xl gap-4'>
                <div className='col-span-1 flex flex-col gap-4 justify-end'>
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
                      className='w-6 h-6 max-sm:w-4 max-sm:h-4 text-[#26C6DA] flex-shrink-0'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
                      />
                    </svg>

                    <span className='text-[#A0A2A4] text-[15px] font-normal break-words text-center truncate'>
                      {event.activity.name}
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
                <Button classNameButton='col-span-1 flex justify-end outline-none' onClick={handleOpenModalMapImage}>
                  {mapImageURL && (
                    <img src={mapImageURL} alt='Static Map' className='object-cover h-[160px] rounded-lg' />
                  )}
                </Button>
                <MapImageModal
                  mapImageURL={mapImageURL}
                  isOpenModalMapImage={isOpenModalMapImage}
                  handleCloseModalMapImage={handleCloseModalMapImage}
                />
                <div className='col-span-1 flex flex-col gap-10 justify-end'>
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
                  <RegistrationInformationModal
                    event={event}
                    isOpenModalRegistrationInfos={isOpenModalRegistrationInfos}
                    handleCloseModalRegistrationInfos={handleCloseModalRegistrationInfos}
                  />
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
                  <AttendanceInformationModal
                    event={event}
                    isOpenModalAttendanceInfos={isOpenModalAttendanceInfos}
                    handleCloseModalAttendanceInfos={handleCloseModalAttendanceInfos}
                  />
                </div>
              </div>
            </div>
            <div className='w-full h-full bg-[#F4F4F4] grid px-[10%] py-6 grid-cols-4 mb-[50px]'>
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
            <div className='w-full h-full overflow-hidden'>
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
                  <EventDetailRegisterListPage page={page} index={2} />
                  <EventDetailAttendanceListPage page={page} index={3} />
                </Box>
              </Box>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default EventDetailPage
