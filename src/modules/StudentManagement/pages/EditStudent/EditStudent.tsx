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
  GetStudentQuery
} from '../../services'
import { handleError } from 'src/modules/Share/utils'
import path from 'src/modules/Share/constants/path'
import EditStudentForm from '../../components/EditStudentForm'
import CircleChart from '../../components/CircleChart'
import EventsOfStudentTable from '../../components/EventsOfStudentTable'
import { FormStudentSchema, FormStudentType } from '../../utils'

const EditStudent = () => {
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

  const getStudentQuery = new GetStudentQuery(queryStudentConfig.id as string)
  const student = getStudentQuery.fetch()

  const [facultyId, setFacultyId] = useState<string>(student && student.facultyId)

  useEffect(() => {
    if (student) {
      setFacultyId(student.facultyId)
    }
  }, [student, setFacultyId])

  const getAllEducationProgramsQuery = new GetAllEducationProgramsQuery()
  const educationPrograms = getAllEducationProgramsQuery.fetch()

  const getAllFacultiesQuery = new GetAllFacultiesQuery()
  const faculties = getAllFacultiesQuery.fetch()

  const getAllHomeRoomsByFacultyIdQuery = new GetAllHomeRoomsByFacultyIdQuery(facultyId)
  const homeRooms = getAllHomeRoomsByFacultyIdQuery.fetch()

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<FormStudentType>({
    resolver: yupResolver(FormStudentSchema)
  })

  const educationIdOfStudent = getStudentQuery.getEducationIdByStudentId()
  const programOfStudent = educationPrograms?.find((program) => program.id === educationIdOfStudent)
  const programScoreOfStudent = programOfStudent?.requiredActivityScore || 0
  const programNameOfStudent = programOfStudent?.name || ''

  const editStudentCommandHandler = new EditStudentCommandHandler()

  const handleSubmitForm = handleSubmit(async (data) => {
    editStudentCommandHandler.handle(
      {
        id: queryStudentConfig.id as string,
        data: data
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

  const handlePreviousPage = () => {
    navigate({
      pathname: path.student,
      search: createSearchParams(prevAccountConfig).toString()
    })
  }

  const handleChangeSelection = (event: React.ChangeEvent<HTMLSelectElement>, name: any) => {
    if (name == 'facultyId') {
      setFacultyId(event.target.value)
      event.target.value && setError(name, { message: '' })
    } else {
      event.target.value && setError(name, { message: '' })
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
            errors={errors}
            setValue={setValue}
            student={student}
            educationPrograms={educationPrograms}
            faculties={faculties}
            homeRooms={homeRooms}
            handleDeleteStudent={handleDeleteStudent}
            onPreviousPage={handlePreviousPage}
            onChange={handleChangeFile}
            onChangeSelection={handleChangeSelection}
            previewImage={previewImage}
            isLoading={getStudentQuery.isLoading()}
            isLoadingEdit={editStudentCommandHandler.isLoading()}
          />
        </form>
        <div className='grid grid-cols-6 pt-6'>
          <div className='border-r-2 px-4 col-span-2'>
            <div className=''>
              <p className='font-semibold'>Kết quả tham gia hoạt động phục vụ cộng đồng</p>
            </div>
            <div className='grid grid-cols-4 mt-4'>
              <CircleChart
                programScoreOfStudent={Number(programScoreOfStudent)}
                programNameOfStudent={programNameOfStudent}
                isLoading={getStudentQuery.isLoading()}
              />
            </div>
          </div>
          <div className='px-6 font-semibold col-span-4'>
            <div className='mb-4'>
              <div className='flex justify-between items-center'>
                <p className='font-semibold'>Danh sách hoạt động phục vụ cộng đồng sinh viên đã tham gia gần đây.</p>
                <div>Xem tất cả</div>
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
