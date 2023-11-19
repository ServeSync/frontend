/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import eventAPI from './event.api'
import { FormEditEvent } from '../../interfaces'
class EditEventCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _editEventMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._editEventMutation = useMutation({
      mutationFn: (body: { id: string; data: FormEditEvent }) => eventAPI.editEvent(body)
    })
  }

  handle = async (body: { id: string; data: FormEditEvent }, file: File, handleSuccess: any, handleError: any) => {
    if (file !== undefined) {
      const form = new FormData()
      form.append('file', file)
      const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
      body.data.imageUrl = uploadImageResponse.data.url
    }

    return this._editEventMutation.mutate(body, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['events']
        })
        this._queryClient.invalidateQueries({
          queryKey: ['event']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._uploadImageMutation.isLoading || this._editEventMutation.isLoading
  }
}

export { EditEventCommandHandler }
