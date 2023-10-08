import { Helmet } from 'react-helmet-async'
import CreateStudentForm from '../../components/CreateStudentForm'
import { Fragment, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { FormStudentSchema, FormStudentType } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { CreateStudentCommandHandler } from '../../services/students/createStudent.commandHandler'
import { GetAllEducationProgramQuery } from '../../services/educationPrograms/educationProgram.query'
import { GetAllFacultyQuery } from '../../services/faculties/faculty.query'
import { isCitizenIdStudentAlreadyExistsError, isCodeStudentAlreadyExistsError, isEmailStudentAlreadyExistsExistsError } from 'src/modules/Share/utils/utils'
const CreateStudent = () => {
  const [file, setFile] = useState<File>()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const navigate = useNavigate()

  const getAllFacultyQuery = new GetAllFacultyQuery();
  const getAllEducationProgramQuery = new GetAllEducationProgramQuery();
  const createStudentCommandHandler = new CreateStudentCommandHandler();

  const educationPrograms = getAllEducationProgramQuery.fetch();
  const faculties = getAllFacultyQuery.fetch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm<FormStudentType>({
    resolver: yupResolver(FormStudentSchema)
  })

  const handleCreateStudent = handleSubmit(async (data) => {
    createStudentCommandHandler.handle(
      data, 
      file as File, 
      () => {
        toast.success('Thêm sinh viên thành công !')
        navigate({
          pathname: path.student
        })
      },
      (error: any) => {
        if (isCodeStudentAlreadyExistsError(error.response?.data.code)) {
          setError('code', {
              message: 'Mã số sinh viên đã tồn tại!',
              type: 'Server'
          })
        }
      
        if (isEmailStudentAlreadyExistsExistsError(error.response?.data.code)) {
          setError('email', {
              message: 'Email đã tồn tại!',
              type: 'Server'
          })
        }

        if (isCitizenIdStudentAlreadyExistsError(error.response?.data.code)) {
          setError('citizenId', {
              message: 'Căn cước công dân đã tồn tại!',
              type: 'Server'
          })
        }

        if (error.response?.data.code === 'InvalidImage') {
          setError('imageUrl', {
              message: 'Vui lòng điền ảnh!',
              type: 'Server'
          })
        }
      },
      setIsLoading
    );
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  const handlePreviousPage = () => {
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
            errors={errors}
            setError={setError}
            educationPrograms={educationPrograms}
            faculties={faculties}
            onChange={handleChangeFile}
            previewImage={previewImage}
            onPreviousPage={handlePreviousPage}
            isLoading={isLoading}
          />
        </form>
      </div>
    </Fragment>
  )
}

export default CreateStudent
