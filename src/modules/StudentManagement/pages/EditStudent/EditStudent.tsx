import { Fragment, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import EditStudentForm from '../../components/EditStudentForm'
import EventsOfStudentTable from '../../components/EventsOfStudentTable'
import useQueryStudentConfig from '../../hooks/useQueryStudentConfig'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import CircleChart from '../../components/CircleChart'
import educationProgramAPI from '../../services/education_program.api'
import { EducationProgramType } from '../../interfaces/education_program.type'
import facultyAPI from '../../services/faculty.api'
import { FacultyType } from '../../interfaces/faculty.type'
import studentAPI from '../../services/student.api'
import { StudentForm, StudentType } from '../../interfaces/student.type'
import { FormStudentSchema, FormStudentType } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import imageAPI from '../../services/image.api'
import _ from 'lodash'
import {
  isCitizenIdStudentAlreadyExistsError,
  isCodeStudentAlreadyExistsError,
  isEmailStudentAlreadyExistsExistsError,
  isStudentNotFound
} from 'src/modules/Share/utils/utils'

const EditStudent = () => {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const queryStudentConfig = useQueryStudentConfig()

  const StudentQuery = useQuery({
    queryKey: ['student', queryStudentConfig],
    queryFn: async () => studentAPI.getStudent(queryStudentConfig.id as string),
    enabled: queryStudentConfig.id !== undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (isStudentNotFound(error.response?.data.code)) {
        toast.error('Sinh viên không tồn tại !')
        navigate(path.student)
      }
    }
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

  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors }
  } = useForm<FormStudentType>({
    resolver: yupResolver(FormStudentSchema)
  })

  const educationIdOfStudent = StudentQuery.data?.data.educationProgramId
  const programOfStudent = educationPrograms?.find((program) => program.id === educationIdOfStudent)
  const programScoreOfStudent = programOfStudent?.requiredActivityScore || 0
  const programNameOfStudent = programOfStudent?.name || ''

  const EditStudentMutation = useMutation({
    mutationFn: (body: { id: string; data: Omit<StudentForm, 'facultyId'> }) => studentAPI.editStudent(body)
  })

  const UploadImageMutation = useMutation(imageAPI.uploadImage)

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditStudent = (data: any) => {
    EditStudentMutation.mutate(
      {
        id: queryStudentConfig.id as string,
        data: data
      },
      {
        onSuccess: () => {
          toast.success('Cập nhật sinh viên thành công !')
          navigate(`${path.edit_student}?id=${queryStudentConfig.id}`)
          queryClient.invalidateQueries({
            queryKey: ['students']
          })
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          if (isCodeStudentAlreadyExistsError(error.response?.data.code)) {
            setError('code', {
              message: 'Mã số sinh viên đã tồn tại !',
              type: 'Server'
            })
          }
          if (isCitizenIdStudentAlreadyExistsError(error.response?.data.code)) {
            setError('citizenId', {
              message: 'Căn cước công dân đã tồn tại !',
              type: 'Server'
            })
          }
          if (isEmailStudentAlreadyExistsExistsError(error.response?.data.code)) {
            setError('email', {
              message: 'Email đã tồn tại !',
              type: 'Server'
            })
          }
        }
      }
    )
  }

  const handleEditStudent = handleSubmit(async (data) => {
    if (file) {
      const form = new FormData()
      form.append('file', file)
      try {
        const uploadedImageData = await UploadImageMutation.mutateAsync(form)
        const body = {
          ..._.omit(data, 'facultyId'),
          imageUrl: uploadedImageData.data.url as string
        }
        onEditStudent(body)
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    } else {
      const body = {
        ..._.omit(data, 'facultyId')
      }
      onEditStudent(body)
    }
  })

  useEffect(() => {
    if (EditStudentMutation.isSuccess) {
      queryClient.invalidateQueries(['student', queryStudentConfig])
    }
  }, [EditStudentMutation.isSuccess, queryClient, queryStudentConfig])

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  const DeleteStudentMutation = useMutation({
    mutationFn: (id: string) => studentAPI.deleteStudent(id)
  })

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
        DeleteStudentMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire('Đã xóa!', 'Sinh viên đã được xóa thành công', 'success')
            navigate(path.student)
            queryClient.invalidateQueries({
              queryKey: ['students']
            })
          }
        })
      }
    })
  }

  return (
    <Fragment>
      <Helmet>
        <title>Edit Student</title>
        <meta name='description' content='This is edit student page of the project' />
      </Helmet>
      <div>
        <form onSubmit={handleEditStudent}>
          <EditStudentForm
            register={register}
            errors={errors}
            setValue={setValue}
            student={student}
            educationPrograms={educationPrograms}
            faculties={faculties}
            handleDeleteStudent={handleDeleteStudent}
            onChange={handleChangeFile}
            previewImage={previewImage}
            isLoading={StudentQuery.isLoading}
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
                isLoading={StudentQuery.isLoading}
              />
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
