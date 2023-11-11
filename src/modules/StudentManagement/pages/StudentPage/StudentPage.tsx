// eslint-disable-next-line import/named
import { Link, URLSearchParamsInit, createSearchParams, useNavigate } from 'react-router-dom'
import { Fragment, useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { isEmpty, omitBy } from 'lodash'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import {
  GetAllEducationProgramsQuery,
  GetAllFacultiesQuery,
  GetAllHomeRoomsByFacultyIdQuery,
  GetAllStudentsQuery,
  ImportFileCommandHandler
} from '../../services'
import useQueryStudentConfig from '../../hooks/useQueryStudentConfig'
import useSorting from 'src/modules/Share/hooks/useSorting'
import path from 'src/modules/Share/constants/path'
import { FormFilterStudentSchema, FormFilterStudentType } from '../../utils'
import InputSearch from 'src/modules/Share/components/InputSearch'
import Filter from '../../components/Filter'
import Button from 'src/modules/Share/components/Button'
import ModalCustom from 'src/modules/Share/components/Modal'
import StudentTable from '../../components/StudentTable'
import Pagination from 'src/modules/Share/components/Pagination'
import PopoverCustom from 'src/modules/Share/components/Popover'
import ImportFile from '../../components/ImportFile'
import Restricted from 'src/modules/Share/components/Restricted'

const StudentPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const [file, setFile] = useState<File>()

  const previewNameFile = useMemo(() => {
    return file ? file.name : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  const [facultyId, setFacultyId] = useState<string>('')

  const handleChangeFaculty = (id: string) => {
    setFacultyId(id)
  }

  const navigate = useNavigate()

  const queryStudentConfig = useQueryStudentConfig()

  const SortStudent = useSorting({ queryConfig: queryStudentConfig, pathname: path.student })

  const getAllStudentsQuery = new GetAllStudentsQuery()
  const students = getAllStudentsQuery.fetch()

  const getAllEducationProgramsQuery = new GetAllEducationProgramsQuery()
  const educationPrograms = getAllEducationProgramsQuery.fetch()

  const getAllFacultiesQuery = new GetAllFacultiesQuery()
  const faculties = getAllFacultiesQuery.fetch()

  const getAllHomeRoomsByFacultyIdQuery = new GetAllHomeRoomsByFacultyIdQuery(facultyId)
  const homeRooms = getAllHomeRoomsByFacultyIdQuery.fetch()

  const onEditStudent = (id: string) => {
    navigate(
      {
        pathname: path.edit_student,
        search: createSearchParams({
          id: id
        }).toString()
      },
      {
        state: queryStudentConfig
      }
    )
  }

  const FilterStudentForm = useForm<FormFilterStudentType>({
    resolver: yupResolver(FormFilterStudentSchema)
  })

  const handleSubmitFormFilter = FilterStudentForm.handleSubmit((data) => {
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
  })

  const handleResetFormFilter = () => {
    FilterStudentForm.setValue('search', '')
    FilterStudentForm.setValue('facultyId', '')
    FilterStudentForm.setValue('homeRoomId', '')
    FilterStudentForm.setValue('educationProgramId', '')
    FilterStudentForm.setValue('gender', '')
  }

  const ImportStudentForm = useForm()

  const importFileCommandHandler = new ImportFileCommandHandler()

  const handleSubmitImport = ImportStudentForm.handleSubmit(() => {
    if (file) {
      importFileCommandHandler.handle(
        file as File,
        () => {
          setIsOpenModal(false)
          Swal.fire('Nhập file Thành công !', 'Vui lòng đợi xử lý !', 'success')
        },
        () => {
          toast.error('File không đúng định dạng')
        }
      )
    }
  })

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
              classNameInput='bg-white border-[1px] border-gray-200 rounded-md h-[44px] w-[240px] outline-[#26C6DA] pl-8 pr-2 shadow-sm font-normal text-gray-600 placeholder:font-normal placeholder:text-[14px]'
              placeholder='Tìm kiếm sinh viên'
              name='search'
              register={FilterStudentForm.register}
            />
          </form>
          <div className='flex gap-4'>
            <PopoverCustom
              renderPopover={
                <form onSubmit={handleSubmitFormFilter}>
                  <Filter
                    control={FilterStudentForm.control}
                    onResetForm={handleResetFormFilter}
                    onChangeFaculty={handleChangeFaculty}
                    educationPrograms={educationPrograms}
                    faculties={faculties}
                    homeRooms={homeRooms}
                  />
                </form>
              }
            >
              <Button classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg cursor-pointer'>
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
              </Button>
            </PopoverCustom>
            <Button
              type='button'
              classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
              onClick={handleOpenModal}
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
            <ModalCustom isOpenModal={isOpenModal} handleClose={handleCloseModal}>
              <ImportFile
                onChangeFile={handleChangeFile}
                onSubmitFile={handleSubmitImport}
                previewNameFile={previewNameFile}
              />
            </ModalCustom>
            <Restricted to='ServeSync.Permissions.Students.Create'>
              <Link
                to={path.create_student}
                state={queryStudentConfig}
                className='flex items-center text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
              >
                Thêm sinh viên
              </Link>
            </Restricted>
          </div>
        </div>
        <StudentTable
          students={students}
          onEditStudent={onEditStudent}
          onSort={SortStudent.handleSort}
          isLoading={getAllStudentsQuery.isLoading()}
        />
        <Pagination
          queryConfig={queryStudentConfig}
          pageSize={getAllStudentsQuery.getTotalPages()}
          pathname={path.student}
          className='flex justify-end'
        />
      </div>
    </Fragment>
  )
}

export default StudentPage
