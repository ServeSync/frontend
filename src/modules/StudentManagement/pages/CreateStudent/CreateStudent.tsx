import { Helmet } from 'react-helmet-async'
import CreateStudentForm from '../../components/CreateStudentForm'
import { Fragment, useState, useMemo } from 'react'
import educationProgramAPI from '../../services/education_program.api'
import { EducationProgramType } from '../../interfaces/education_program.type'
import facultyAPI from '../../services/faculty.api'
import { FacultyType } from '../../interfaces/faculty.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { FormStudentSchema, FormStudentType } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import studentAPI from '../../services/student.api'
import { StudentForm } from '../../interfaces/student.type'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import imageAPI from '../../services/image.api'
import {
  isCitizenIdStudentAlreadyExistsError,
  isCodeStudentAlreadyExistsError,
  isEmailStudentAlreadyExistsExistsError
} from 'src/modules/Share/utils/utils'

const CreateStudent = () => {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const EducationProgramsListQuery = useQuery({
    queryKey: ['education_programs'],
    queryFn: () => educationProgramAPI.getListEducationPrograms(),
    staleTime: 5 * 60 * 1000
  })
  const educationPrograms = EducationProgramsListQuery.data?.data as EducationProgramType[]

  const FacultiesListQuery = useQuery({
    queryKey: ['faculties'],
    queryFn: () => facultyAPI.getListFaculties(),
    staleTime: 5 * 60 * 1000
  })
  const faculties = FacultiesListQuery.data?.data as FacultyType[]

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm<FormStudentType>({
    resolver: yupResolver(FormStudentSchema)
  })

  const CreateStudentMutation = useMutation({
    mutationFn: (body: StudentForm) => studentAPI.createStudent(body)
  })

  const UploadImageMutation = useMutation(imageAPI.uploadImage)

  const handleCreateStudent = handleSubmit(async (data) => {
    const form = new FormData()
    form.append('file', file as File)

    try {
      const uploadImageResponse = await UploadImageMutation.mutateAsync(form, {
        onError: () => {
          setError('imageUrl', {
            message: 'Vui lòng chọn ảnh !'
          })
        }
      })
      const body = { ...data, imageUrl: uploadImageResponse.data.url as string }
      CreateStudentMutation.mutate(body, {
        onSuccess: () => {
          toast.success('Thêm sinh viên thành công !')
          queryClient.invalidateQueries({
            queryKey: ['students']
          })
          navigate({
            pathname: path.student
          })
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
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
        }
      })
    } catch (error) {
      console.error('Error uploading image:', error)
    }
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
            isLoading={CreateStudentMutation.isLoading || UploadImageMutation.isLoading}
          />
        </form>
      </div>
    </Fragment>
  )
}

export default CreateStudent
