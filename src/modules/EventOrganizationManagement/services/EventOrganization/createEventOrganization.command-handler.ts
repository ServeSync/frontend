/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import eventOrganizationAPI from './event_organization.api'
import { FormEventOrganizationType } from 'src/modules/EventOrganizationManagement/utils'

class CreateEventOrganizationCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _createEventOrganizationMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._createEventOrganizationMutation = useMutation({
      mutationFn: (body: FormEventOrganizationType) => eventOrganizationAPI.createEventOrganization(body)
    })
  }

  handle = async (body: FormEventOrganizationType, file: File, handleSuccess: any, handleError: any) => {
    const form = new FormData()
    form.append('file', file)
    const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
    body.imageUrl = uploadImageResponse.data.url

    return this._createEventOrganizationMutation.mutate(body, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['event_organizations']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._uploadImageMutation.isLoading || this._createEventOrganizationMutation.isLoading
  }
}

export { CreateEventOrganizationCommandHandler }
