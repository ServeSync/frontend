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
import _ from 'lodash'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import imageAPI from '../../services/image.api'

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
    handleSubmit
  } = useForm<FormStudentType>({
    resolver: yupResolver(FormStudentSchema)
  })

  const CreateStudentMutation = useMutation({
    mutationFn: (body: Omit<StudentForm, 'facultyId'>) => studentAPI.createStudent(body)
  })

  const UploadImageMutation = useMutation(imageAPI.uploadImage)

  const handleCreateStudent = handleSubmit(async (data) => {
    const form = new FormData()
    form.append('file', file as File)

    try {
      const uploadImageResponse = await UploadImageMutation.mutateAsync(form)
      const body = { ..._.omit(data, 'facultyId'), imageUrl: uploadImageResponse.data.url as string }
      CreateStudentMutation.mutate(body, {
        onSuccess: () => {
          toast.success('Thêm sinh viên thành công !')
          queryClient.invalidateQueries({
            queryKey: ['students']
          })
          navigate({
            pathname: path.student
          })
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
        <div className='flex justify-between items-center pb-[36px]'>
          <h2 className='text-[24px] text-gray-700 font-bold'>Thêm sinh viên</h2>
        </div>
        <form onSubmit={handleCreateStudent}>
          <CreateStudentForm
            register={register}
            errors={errors}
            educationPrograms={educationPrograms}
            faculties={faculties}
            onChange={handleChangeFile}
            previewImage={previewImage}
            onPreviousPage={handlePreviousPage}
          />
        </form>
      </div>
    </Fragment>
  )
}

export default CreateStudent
