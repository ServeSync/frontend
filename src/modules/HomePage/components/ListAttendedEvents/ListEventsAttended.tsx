/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { StudentAttendedEvent, StudentAttendedEventsListType } from 'src/modules/EventManagement/interfaces'
import Button from 'src/modules/Share/components/Button'
import ModalCustom from 'src/modules/Share/components/Modal'
import { ProfileStudent } from 'src/modules/Share/interfaces'
import CircleChart from 'src/modules/StudentManagement/components/CircleChart'
import EventsOfStudentTable from 'src/modules/StudentManagement/components/EventsOfStudentTable'
import ExportFile from 'src/modules/StudentManagement/components/ExportFile'
import { GetAttendedEventsByStudent, GetStudentEducationProgramsQuery } from 'src/modules/StudentManagement/services'

interface Props {
  tab: number
  index: number
  profile: ProfileStudent
  isLoading: boolean
}

const ListEventsAttended = ({ tab, index, profile, isLoading }: Props) => {
  const [isOpenModalExportFile, setIsOpenModalExportFile] = useState<boolean>(false)

  const handleOpenModalExportFile = () => {
    setIsOpenModalExportFile(true)
  }

  const handleCloseModalExportFile = () => {
    setIsOpenModalExportFile(false)
  }

  const [attendedEvents, setAttendedEvents] = useState<StudentAttendedEvent[]>([])

  const [page, setPage] = useState<number>(1)

  const getStudentEducationProgramResultQuery = new GetStudentEducationProgramsQuery(profile?.id)
  const educationProgramResult = getStudentEducationProgramResultQuery.fetch()

  const getAttendedEventsQuery = new GetAttendedEventsByStudent(profile?.id, page)
  const attendedEventsQueryResult = getAttendedEventsQuery.fetch() as StudentAttendedEventsListType

  const onLoadMore = () => {
    if (page < attendedEventsQueryResult.totalPages) {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    attendedEventsQueryResult && setAttendedEvents([...attendedEvents, ...attendedEventsQueryResult.data])
  }, [getAttendedEventsQuery.isLoading()])

  return (
    <div role='tabpanel' hidden={tab !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {tab === index && (
        <div className='py-5 px-4'>
          <div className='col-span-2'>
            <p className='font-semibold'>Kết quả tham gia hoạt động phục vụ cộng đồng</p>
            {educationProgramResult && (
              <div className='mt-4'>
                <CircleChart educationProgramResult={educationProgramResult} isLoading={isLoading} />
              </div>
            )}
          </div>
          <div className='font-semibold col-span-4 mt-5'>
            <div className='mb-4'>
              <div className='flex justify-between items-center'>
                <p className='font-semibold'>Danh sách hoạt động phục vụ cộng đồng sinh viên đã tham gia</p>
                <div className='flex items-center'>
                  <Button
                    onClick={handleOpenModalExportFile}
                    type='button'
                    classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                      />
                    </svg>
                    <span>Xuất file</span>
                  </Button>
                  <ModalCustom isOpenModal={isOpenModalExportFile} handleClose={handleCloseModalExportFile}>
                    <ExportFile handleCloseModalExportFile={handleCloseModalExportFile} id={profile.id as string} />
                  </ModalCustom>
                </div>
              </div>
            </div>
            <EventsOfStudentTable events={attendedEvents} isLoading={getAttendedEventsQuery.isLoading()} />
            {attendedEventsQueryResult?.totalPages > 1 && page < attendedEventsQueryResult?.totalPages && (
              <div className='flex justify-center mt-3'>
                <Button classNameButton='text-[12px] text-[#1635F4]' onClick={onLoadMore}>
                  Xem thêm
                </Button>
              </div>
            )}
            {attendedEventsQueryResult?.total < 1 && (
              <div className='flex flex-col items-center mt-3 text-[#A0A2A4]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-8 h-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
                  />
                </svg>
                <span className='text-[14px] font-normal'>Hiện sinh viên chưa tham gia hoạt động nào.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ListEventsAttended
