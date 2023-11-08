/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import requestEventAPI from './request_event.api'
import { RequestEventForm } from '../../interfaces/RequestEventForm/request_event-form.type'
import { toast } from 'react-toastify'

class RequestCreateEventCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _requestCreateEventMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._requestCreateEventMutation = useMutation({
      mutationFn: (body: RequestEventForm) => requestEventAPI.requestCreateEvent(body)
    })
  }

  handle = async (event: RequestEventForm, file: File, handleSuccess: any) => {
    const form = new FormData()
    form.append('file', file)
    const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
    event.imageUrl = uploadImageResponse?.data.url

    return this._requestCreateEventMutation.mutate(event, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['pending_events']
        })
        handleSuccess()
      },
      onError: () => {
        toast.error('Chưa có dữ liệu ban tổ chức!')
      }
    })
  }

  isLoading() {
    return this._uploadImageMutation.isLoading || this._requestCreateEventMutation.isLoading
  }
}

export { RequestCreateEventCommandHandler }
