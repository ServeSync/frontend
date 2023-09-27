import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import EditStudentForm from '../../components/EditStudentForm'
import InputFile from 'src/modules/Share/components/InputFile'
import EventsOfStudentTable from '../../components/EventsOfStudentTable'
import CircleChart from '../../components/CircleChart'
import { useQuery } from '@tanstack/react-query'
import educationProgramAPI from '../../services/education_program.api'
import { EducationProgramType } from '../../interfaces/education_program.type'
import facultyAPI from '../../services/faculty.api'
import { FacultyType } from '../../interfaces/faculty.type'
import homeroomAPI from '../../services/home_room.api'
import { HomeRoomType } from '../../interfaces/home_room.type'
import useQueryStudentConfig from '../../hooks/useQueryStudentConfig'
import studentAPI from '../../services/student.api'
import { StudentType } from '../../interfaces/student.type'

const EditStudent = () => {
  const queryStudentConfig = useQueryStudentConfig()

  const StudentQuery = useQuery({
    queryKey: ['student', queryStudentConfig],
    queryFn: () => studentAPI.getStudent(queryStudentConfig.id as string),
    enabled: queryStudentConfig.id !== undefined
  })
  const student = StudentQuery.data?.data as StudentType

  const EducationProgramsListQuery = useQuery({
    queryKey: ['education_programs'],
    queryFn: () => educationProgramAPI.getListEducationPrograms()
  })
  const educationPrograms = EducationProgramsListQuery.data?.data as EducationProgramType[]

  const FacultiesListQuery = useQuery({
    queryKey: ['faculties'],
    queryFn: () => facultyAPI.getListFaculties()
  })
  const faculties = FacultiesListQuery.data?.data as FacultyType[]

  const HomeRoomsListQuery = useQuery({
    queryKey: ['home_rooms'],
    queryFn: () => homeroomAPI.getListHomeRooms()
  })
  const homeRooms = HomeRoomsListQuery.data?.data as HomeRoomType[]

  return (
    <Fragment>
      <Helmet>
        <title>Edit Student</title>
        <meta name='description' content='This is edit student page of the project' />
      </Helmet>
      <div>
        <div className='grid grid-cols-6 gap-6 pb-4 border-b-2'>
          <div className='col-span-1'>
            <div className='flex flex-col items-center justify-center '>
              <InputFile />
            </div>
          </div>
          <div className='col-span-5'>
            <form>
              <EditStudentForm
                student={student}
                educationPrograms={educationPrograms}
                faculties={faculties}
                homeRooms={homeRooms}
              />
            </form>
          </div>
        </div>
        <div className='grid grid-cols-6 pt-6'>
          <div className='border-r-2 px-4 col-span-2'>
            <div className=''>
              <p className='font-semibold'>Kết quả tham gia hoạt động phục vụ cộng đồng</p>
            </div>
            <div className='grid grid-cols-4 mt-4'>
              <CircleChart></CircleChart>
            </div>
          </div>
          <div className='px-6 font-semibold col-span-4'>
            <div className='mb-4'>
              <div className='flex justify-between items-center'>
                <p className='font-semibold'> Danh sách hoạt động phục vụ cộng đồng sinh viên đã tham gia gần đây.</p>
                <button>Xem tất cả</button>
              </div>
            </div>
            <EventsOfStudentTable />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditStudent
