/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { StudentForm } from '../../interfaces/student.type'
import studentAPI from './student.api'
import imageAPI from './image.api'

class CreateStudentCommandHandler {
  private queryClient
  private UploadImageMutation
  private CreateStudentMutation

  constructor() {
    this.queryClient = useQueryClient()
    this.UploadImageMutation = useMutation(imageAPI.uploadImage)
    this.CreateStudentMutation = useMutation({
      mutationFn: (body: StudentForm) => studentAPI.createStudent(body)
    })
  }

  handle = async (student: StudentForm, file: File, handleSuccess: any, handleError: any, setError: any) => {
    const form = new FormData()
    form.append('file', file)

    const uploadImageResponse = await this.UploadImageMutation.mutateAsync(form, {
      onError: () => {
        setError('imageUrl', {
          message: 'Vui lòng chọn ảnh !'
        })
      }
    })

    student.imageUrl = uploadImageResponse.data.url

    return this.CreateStudentMutation.mutate(student, {
      onSuccess: () => {
        this.queryClient.invalidateQueries({
          queryKey: ['students']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this.UploadImageMutation.isLoading || this.CreateStudentMutation.isLoading
  }
}

export { CreateStudentCommandHandler }
