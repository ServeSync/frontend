/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import studentAPI from './student.api'
import imageAPI from './image.api'
import { StudentForm } from '../../interfaces'

class CreateStudentCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _createStudentMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._createStudentMutation = useMutation({
      mutationFn: (body: StudentForm) => studentAPI.createStudent(body)
    })
  }

  handle = async (student: StudentForm, file: File, handleSuccess: any, handleError: any, setError: any) => {
    const form = new FormData()
    form.append('file', file)

    const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form, {
      onError: () => {
        setError('imageUrl', {
          message: 'Vui lòng chọn ảnh !'
        })
      }
    })

    student.imageUrl = uploadImageResponse.data.url

    return this._createStudentMutation.mutate(student, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
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
    return this._uploadImageMutation.isLoading || this._createStudentMutation.isLoading
  }
}

export { CreateStudentCommandHandler }
