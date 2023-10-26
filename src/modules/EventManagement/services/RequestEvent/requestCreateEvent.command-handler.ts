/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import requestEventAPI from './requestEvent.api'
import { requestEventForm } from '../../interfaces/RequestEventForm/requestEventForm.type'
import { toast } from 'react-toastify'

class RequestCreateEventCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _requestCreateEventMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._requestCreateEventMutation = useMutation({
      mutationFn: (body: requestEventForm) => requestEventAPI.requestCreateEvent(body)
    })
  }

  handle = async (event: requestEventForm, file: File, handleSuccess: any, setError: any) => {
    const form = new FormData()
    form.append('file', file)

    const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form, {
      onError: () => {
        setError('imageUrl', {
          message: 'Vui lòng chọn ảnh !'
        })
      }
    })
 
    event.imageUrl = uploadImageResponse?.data.url

    return this._requestCreateEventMutation.mutate(event, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['requestEvent']
        })
        handleSuccess()
      },
      onError: () => {
        toast.error('Chưa có dữ liệu ban tổ chức!')
      }
    })
  }
}

export { RequestCreateEventCommandHandler }
