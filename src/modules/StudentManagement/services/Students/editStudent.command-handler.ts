/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import studentAPI from './student.api'
import { StudentForm } from '../../interfaces'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import { FormStudentType } from '../../utils'

class EditStudentCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _editStudentMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._editStudentMutation = useMutation({
      mutationFn: (body: { id: string; data: StudentForm }) => studentAPI.editStudent(body)
    })
  }

  handle = async (body: { id: string; data: FormStudentType }, file: File, handleSuccess: any, handleError: any) => {
    if (file !== undefined) {
      const form = new FormData()
      form.append('file', file)
      const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
      body.data.imageUrl = uploadImageResponse.data.url
    }

    return this._editStudentMutation.mutate(body, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['students']
        })
        this._queryClient.invalidateQueries({
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
    return this._uploadImageMutation.isLoading || this._editStudentMutation.isLoading
  }
}

export { EditStudentCommandHandler }
