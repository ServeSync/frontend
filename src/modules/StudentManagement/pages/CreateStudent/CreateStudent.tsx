import { Helmet } from 'react-helmet-async'
import CreateStudentForm from '../../components/CreateStudentForm'
import { Fragment } from 'react'
import InputFile from 'src/modules/Share/components/InputFile'
import educationProgramAPI from '../../services/education_program.api'
import { EducationProgramType } from '../../interfaces/education_program.type'
import facultyAPI from '../../services/faculty.api'
import { FacultyType } from '../../interfaces/faculty.type'
import { HomeRoomType } from '../../interfaces/home_room.type'
import homeroomAPI from '../../services/home_room.api'
import { useQuery } from '@tanstack/react-query'

const CreateStudent = () => {
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
        <title>Create Student</title>
        <meta name='description' content='This is create student page of the project' />
      </Helmet>
      <div>
        <div className='flex justify-between items-center pb-[36px]'>
          <h2 className='text-[24px] text-gray-700 font-bold'>Thêm sinh viên</h2>
        </div>
        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-1'>
            <div className='flex flex-col items-center justify-center px-10'>
              <InputFile />
              <span className='text-[14px] text-gray-500'></span>
            </div>
          </div>
          <div className='col-span-2'>
            <form>
              <CreateStudentForm educationPrograms={educationPrograms} faculties={faculties} homeRooms={homeRooms} />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CreateStudent
