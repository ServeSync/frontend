/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import useQueryStudentConfig from '../../hooks/useQueryStudentConfig'
import {
  DeleteStudentCommandHandler,
  EditStudentCommandHandler,
  GetAllEducationProgramsQuery,
  GetAllFacultiesQuery,
  GetAllHomeRoomsByFacultyIdQuery,
  GetAttendedEventsByStudent,
  GetStudentByIdQuery,
  GetStudentEducationProgramsQuery
} from '../../services'
import { formatVNDateTime, handleError } from 'src/modules/Share/utils'
import path from 'src/modules/Share/constants/path'
import EditStudentForm from '../../components/EditStudentForm'
import CircleChart from '../../components/CircleChart'
import EventsOfStudentTable from '../../components/EventsOfStudentTable'
import { FormStudentSchema, FormStudentType } from '../../utils'
import { StudentAttendedEvent } from 'src/modules/EventManagement/interfaces'

const EditStudentPage = () => {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  const navigate = useNavigate()

  const location = useLocation()

  const prevAccountConfig = location.state

  const queryStudentConfig = useQueryStudentConfig()

  const getStudentByIdQuery = new GetStudentByIdQuery(queryStudentConfig.id as string)
  const student = getStudentByIdQuery.fetch()

  const [facultyId, setFacultyId] = useState<string>(student && student.facultyId)

  const [page, setPage] = useState<number>(1)

  const [attendedEvents, setAttendedEvents] = useState<StudentAttendedEvent[]>([])

  const handleChangeFaculty = (id: string) => {
    setFacultyId(id)
  }

  useEffect(() => {
    student && setFacultyId(student.facultyId)
  }, [student, setFacultyId])

  const getAllEducationProgramsQuery = new GetAllEducationProgramsQuery()
  const educationPrograms = getAllEducationProgramsQuery.fetch()

  const getAllFacultiesQuery = new GetAllFacultiesQuery()
  const faculties = getAllFacultiesQuery.fetch()

  const getAllHomeRoomsByFacultyIdQuery = new GetAllHomeRoomsByFacultyIdQuery(facultyId)
  const homeRooms = getAllHomeRoomsByFacultyIdQuery.fetch()

  const { register, handleSubmit, control, setError, setValue } = useForm<FormStudentType>({
    resolver: yupResolver(FormStudentSchema)
  })

  const getStudentEducationProgramResultQuery = new GetStudentEducationProgramsQuery(student?.id)
  const educationProgramResult = getStudentEducationProgramResultQuery.fetch()

  const getAttendedEventsQuery = new GetAttendedEventsByStudent(student?.id, page)
  const attendedEventsQueryResult = getAttendedEventsQuery.fetch()

  useEffect(() => {
    getAttendedEventsQuery.fetch()
  }, [page])

  useEffect(() => {
    if (!getAttendedEventsQuery.isLoading()) {
      console.log(attendedEvents)
      setAttendedEvents([...attendedEvents, ...attendedEventsQueryResult.data])
    }
  }, [getAttendedEventsQuery.isLoading()])

  const editStudentCommandHandler = new EditStudentCommandHandler()

  const handleSubmitForm = handleSubmit(async (data) => {
    editStudentCommandHandler.handle(
      {
        id: queryStudentConfig.id as string,
        data: {
          ...data,
          birth: formatVNDateTime(data.birth)
        }
      },
      file as File,
      () => {
        toast.success('Cập nhật sinh viên thành công !')
      },
      (error: any) => {
        handleError<FormStudentType>(error, setError)
      }
    )
  })

  const deleteStudentCommandHandler = new DeleteStudentCommandHandler()

  const handleDeleteStudent = (id: string) => {
    Swal.fire({
      title: 'Xác nhận xóa?',
      text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudentCommandHandler.handle(
          id,
          () => {
            Swal.fire('Đã xóa!', 'Sinh viên đã được xóa thành công', 'success')
            navigate({
              pathname: path.student,
              search: createSearchParams(prevAccountConfig).toString()
            })
          },
          (error: any) => {
            handleError<FormStudentType>(error, setError)
          }
        )
      }
    })
  }

  const handleCancel = () => {
    navigate({
      pathname: path.student,
      search: createSearchParams(prevAccountConfig).toString()
    })
  }

  const onLoadMore = () => {
    if (page < attendedEventsQueryResult.totalPages) {
      setPage(page + 1)
    }
  }

  return (
    <Fragment>
      <Helmet>
        <title>Edit Student</title>
        <meta name='description' content='This is edit student page of the project' />
      </Helmet>
      <div>
        <form onSubmit={handleSubmitForm}>
          <EditStudentForm
            register={register}
            setValue={setValue}
            control={control}
            student={student}
            educationPrograms={educationPrograms}
            faculties={faculties}
            homeRooms={homeRooms}
            handleDeleteStudent={handleDeleteStudent}
            onCancel={handleCancel}
            onChange={handleChangeFile}
            onChangeFaculty={handleChangeFaculty}
            previewImage={previewImage}
            isLoadingEdit={editStudentCommandHandler.isLoading()}
          />
        </form>
        <div className='mt-5'>
          <div className='px-4 col-span-2'>
            <div>
              <p className='font-semibold'>Kết quả tham gia hoạt động phục vụ cộng đồng</p>
            </div>
            <div className='mt-4'>
              <CircleChart
                educationProgramResult={educationProgramResult}
                isLoading={getStudentEducationProgramResultQuery.isLoading()}
              />
            </div>
          </div>
          <div className='px-6 font-semibold col-span-4 mt-5'>
            <div className='mb-4'>
              <div className='flex justify-between items-center'>
                <p className='font-semibold'>Danh sách hoạt động phục vụ cộng đồng sinh viên đã tham gia</p>
              </div>
            </div>
            <EventsOfStudentTable events={attendedEvents} isLoading={getAttendedEventsQuery.isLoading()} />
            {attendedEventsQueryResult?.totalPages > 1 && page < attendedEventsQueryResult?.totalPages && (
              <div className='flex justify-center mt-3'>
                <button className='text-[12px] text-[#1635F4]' onClick={onLoadMore}>
                  Xem thêm
                </button>
              </div>
            )}
            {attendedEventsQueryResult?.total < 1 && (
              <div className='flex flex-col items-center mt-3 text-[#A0A2A4]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-12'
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
      </div>
    </Fragment>
  )
}

export default EditStudentPage
