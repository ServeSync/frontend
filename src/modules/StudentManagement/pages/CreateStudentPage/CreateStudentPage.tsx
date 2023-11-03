/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from 'react-helmet-async'
import { Fragment, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {
  CreateStudentCommandHandler,
  GetAllEducationProgramsQuery,
  GetAllFacultiesQuery,
  GetAllHomeRoomsByFacultyIdQuery
} from '../../services'
import path from 'src/modules/Share/constants/path'
import { formatVNDateTime, handleError } from 'src/modules/Share/utils'
import CreateStudentForm from '../../components/CreateStudentForm'
import { FormStudentSchema, FormStudentType } from '../../utils'

const CreateStudentPage = () => {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  const [facultyId, setFacultyId] = useState<string>('')

  const handleChangeFaculty = (id: string) => {
    setFacultyId(id)
  }

  const navigate = useNavigate()

  const getAllFacultiesQuery = new GetAllFacultiesQuery()
  const faculties = getAllFacultiesQuery.fetch()

  const getAllEducationProgramsQuery = new GetAllEducationProgramsQuery()
  const educationPrograms = getAllEducationProgramsQuery.fetch()

  const getAllHomeRoomsByFacultyIdQuery = new GetAllHomeRoomsByFacultyIdQuery(facultyId)
  const homeRooms = getAllHomeRoomsByFacultyIdQuery.fetch()

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormStudentType>({
    resolver: yupResolver(FormStudentSchema)
  })

  const createStudentCommandHandler = new CreateStudentCommandHandler()

  const handleCreateStudent = handleSubmit(async (data) => {
    createStudentCommandHandler.handle(
      {
        ...data,
        birth: formatVNDateTime(data.birth)
      },
      file as File,
      () => {
        toast.success('Thêm sinh viên thành công !')
        navigate({
          pathname: path.student
        })
      },
      (error: any) => {
        handleError<FormStudentType>(error, setError)
      },
      setError
    )
  })

  const handleCancel = () => {
    navigate({
      pathname: path.student
    })
  }

  return (
    <Fragment>
      <Helmet>
        <title>Create Student</title>
        <meta name='description' content='This is create student page of the project' />
      </Helmet>
      <div>
        <form onSubmit={handleCreateStudent}>
          <CreateStudentForm
            register={register}
            control={control}
            errors={errors}
            educationPrograms={educationPrograms}
            faculties={faculties}
            homeRooms={homeRooms}
            previewImage={previewImage}
            onChange={handleChangeFile}
            onCancel={handleCancel}
            onChangeFaculty={handleChangeFaculty}
            isLoading={createStudentCommandHandler.isLoading()}
          />
        </form>
      </div>
    </Fragment>
  )
}

export default CreateStudentPage
