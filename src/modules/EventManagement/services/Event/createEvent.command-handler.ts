/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import eventAPI from './event.api'
import { FormEvent } from '../../interfaces'

class CreateEventCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _createEventMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._createEventMutation = useMutation({
      mutationFn: (body: FormEvent) => eventAPI.createEvent(body)
    })
  }

  handle = async (event: FormEvent, file: File, handleSuccess: any, handleError: any) => {
    const form = new FormData()
    form.append('file', file)
    const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
    event.imageUrl = uploadImageResponse.data.url

    return this._createEventMutation.mutate(event, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['events']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._uploadImageMutation.isLoading || this._createEventMutation.isLoading
  }
}

export { CreateEventCommandHandler }
