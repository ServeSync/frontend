/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { StudentForm } from '../../interfaces/student.type'
import studentAPI from './student.api'
import imageAPI from './image.api'
import { FormStudentType } from '../../utils/rules'

class EditStudentCommandHandler {
  private queryClient
  private UploadImageMutation
  private EditStudentMutation

  constructor() {
    this.queryClient = useQueryClient()
    this.UploadImageMutation = useMutation(imageAPI.uploadImage)
    this.EditStudentMutation = useMutation({
      mutationFn: (body: { id: string; data: StudentForm }) => studentAPI.editStudent(body)
    })
  }

  handle = async (body: { id: string; data: FormStudentType }, file: File, handleSuccess: any, handleError: any) => {
    if (file != undefined) {
      const form = new FormData()
      form.append('file', file)
      const uploadImageResponse = await this.UploadImageMutation.mutateAsync(form)
      body.data.imageUrl = uploadImageResponse.data.url
    }

    return this.EditStudentMutation.mutate(body, {
      onSuccess: () => {
        this.queryClient.invalidateQueries({
          queryKey: ['students']
        })
        this.queryClient.invalidateQueries({
          queryKey: ['student']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this.UploadImageMutation.isLoading || this.EditStudentMutation.isLoading
  }
}

export { EditStudentCommandHandler }
