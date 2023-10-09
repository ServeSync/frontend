// eslint-disable-next-line import/named
import { Link, URLSearchParamsInit, createSearchParams, useNavigate } from 'react-router-dom'
import { Fragment, useState } from 'react'
import StudentTable from '../../components/StudentTable'
import { Helmet } from 'react-helmet-async'
import path from 'src/modules/Share/constants/path'
import InputSearch from 'src/modules/Share/components/InputSearch'
import Pagination from 'src/modules/Share/components/Pagination/Pagination'
import useQueryStudentConfig from '../../hooks/useQueryStudentConfig'
import studentAPI from '../../services/student.api'
import { StudentListConfig, StudentsListType } from '../../interfaces/student.type'
import { useQuery } from '@tanstack/react-query'
import useSorting from 'src/modules/Share/hooks/useSorting'
import Popover from 'src/modules/Share/components/Popover'
import Filter from 'src/modules/StudentManagement/components/Filter'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FormFilterStudentSchema, FormFilterStudentType } from '../../utils/rules'
import { isEmpty, omitBy } from 'lodash'
import educationProgramAPI from '../../services/education_program.api'
import { EducationProgramType } from '../../interfaces/education_program.type'
import facultyAPI from '../../services/faculty.api'
import { FacultyType } from '../../interfaces/faculty.type'
import homeroomAPI from '../../services/home_room.api'
import { HomeRoomType } from '../../interfaces/home_room.type'
import Button from 'src/modules/Share/components/Button'

const Student = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  const queryStudentConfig = useQueryStudentConfig()

  const navigate = useNavigate()

  const SortStudent = useSorting({ queryConfig: queryStudentConfig, pathname: path.student })

  const StudentsListQuery = useQuery({
    queryKey: ['students', queryStudentConfig],
    queryFn: () => studentAPI.getListStudents(queryStudentConfig as StudentListConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const students = StudentsListQuery.data?.data as StudentsListType

  const [facultyId, setFacultyId] = useState<string>('')

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
    queryKey: ['home_rooms', facultyId],
    queryFn: () => homeroomAPI.getListHomeRooms(facultyId),
    enabled: facultyId !== ''
  })
  const homeRooms = HomeRoomsListQuery.data?.data as HomeRoomType[]

  const onEditStudent = (id: string) => {
    navigate({
      pathname: path.edit_student,
      search: createSearchParams({
        id: id
      }).toString()
    })
  }

  const { register, handleSubmit, resetField } = useForm<FormFilterStudentType>({
    resolver: yupResolver(FormFilterStudentSchema)
  })

  const handleSubmitFormFilter = handleSubmit((data) => {
    const config = {
      ...queryStudentConfig,
      page: 1,
      facultyId: data.facultyId,
      homeRoomId: data.homeRoomId,
      educationProgramId: data.educationProgramId,
      gender: data.gender,
      search: data.search
    }
    navigate({
      pathname: path.student,
      search: createSearchParams(omitBy(config, isEmpty) as URLSearchParamsInit).toString()
    })
    setIsOpenPopover(false)
  })

  const handleChangeFaculty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFacultyId(event.target.value)
  }

  const handleResetFormFilter = () => {
    resetField('educationProgramId')
    resetField('facultyId')
    resetField('homeRoomId')
    resetField('gender')
    resetField('search')
  }

  return (
    <Fragment>
      <Helmet>
        <title>Students</title>
        <meta name='description' content='This is student management page of the project' />
      </Helmet>
      <div>
        <div className='flex justify-between items-center pt-[16px] pb-[40px] font-normal'>
          <form onSubmit={handleSubmitFormFilter}>
            <InputSearch
              classNameInput={
                'bg-white border-[1px] border-gray-200 rounded-lg h-[40px] w-[240px] outline-[#26C6DA] pl-8 pr-2 shadow-sm font-normal text-gray-600'
              }
              name='search'
              register={register}
            />
          </form>
          <div className='flex gap-4'>
            <Popover
              renderPopover={
                <form onSubmit={handleSubmitFormFilter}>
                  <Filter
                    register={register}
                    onResetForm={handleResetFormFilter}
                    onChangeFaculty={handleChangeFaculty}
                    educationPrograms={educationPrograms}
                    faculties={faculties}
                    homeRooms={homeRooms}
                  />
                </form>
              }
              isOpenPopover={isOpenPopover}
              setIsOpenPopover={setIsOpenPopover}
            >
              <div className='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg cursor-pointer'>
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
                    d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
                  />
                </svg>
                <span>Lọc</span>
              </div>
            </Popover>
            <Button
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
              <span>Nhập file</span>
            </Button>
            <Link
              to={path.create_student}
              state={queryStudentConfig}
              className='flex items-center text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
            >
              Thêm sinh viên
            </Link>
          </div>
        </div>
        <StudentTable
          students={students}
          onEditStudent={onEditStudent}
          onSort={SortStudent.handleSort}
          isLoading={StudentsListQuery.isLoading}
        />
        <div className='flex justify-end'>
          <Pagination
            queryConfig={queryStudentConfig}
            pageSize={StudentsListQuery.data?.data.totalPages as number}
            pathname={path.student}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Student
