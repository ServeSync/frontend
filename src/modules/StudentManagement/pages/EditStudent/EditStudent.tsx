import { Fragment, useMemo, useState } from 'react'
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
import homeroomAPI from '../../services/home_room.api'
import { HomeRoomType } from '../../interfaces/home_room.type'
import studentAPI from '../../services/student.api'
import { StudentForm, StudentType } from '../../interfaces/student.type'
import { FormStudentSchema, FormStudentType } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { isAxiosError } from 'src/modules/Share/utils/utils'

const EditStudent = () => {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const queryStudentConfig = useQueryStudentConfig()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

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

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<FormStudentType>({
    resolver: yupResolver(FormStudentSchema)
  })

  const DeleteStudentMutation = useMutation({
    mutationFn: (id: string) => studentAPI.deleteStudent(id)
  })

  const handleDeleteStudent = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        DeleteStudentMutation.mutate(id, {
          onSuccess: () => {
            toast.success('Xóa sinh viên thành công')
            navigate(path.student)
            queryClient.invalidateQueries({
              queryKey: ['students']
            })
          }
        })
      }
    })
  }

  const EditStudentMutation = useMutation({
    mutationFn: (body: { id: string; data: StudentForm }) => {
      return studentAPI.editStudent(body)
    }
  })

  const handleEditStudent = handleSubmit((data) => {
    const newData = { ...data, imageUrl: student.imageUrl }
    console.log(newData)

    EditStudentMutation.mutate(
      {
        id: queryStudentConfig.id as string,
        data: newData
      },
      {
        onSuccess: () => {
          toast.success('Cập nhật sinh viên thành công !')
          queryClient.invalidateQueries({
            queryKey: ['students']
          })
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          if (isAxiosError(error)) {
            toast.error('Sửa viên thất bại')
          }
        }
      }
    )
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
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
            homeRooms={homeRooms}
            handleDeleteStudent={handleDeleteStudent}
            isLoading={StudentQuery.isLoading}
            onChange={handleChangeFile}
            previewImage={previewImage}
          />
        </form>
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
