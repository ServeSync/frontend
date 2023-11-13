/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import { EventOrganizationForm } from '../../interfaces'
import eventOrganizationAPI from './event_organization.api'

class CreateEventOrganizationCommandHandler {
  private _queryClient
  private _uploadImageMution
  private _createEventOrganizationMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMution = useMutation(imageAPI.uploadImage)
    this._createEventOrganizationMutation = useMutation({
      mutationFn: (body: EventOrganizationForm) => eventOrganizationAPI.createEventOrganization(body)
    })
  }

  handle = async (eventOrganization: EventOrganizationForm, file: File, handleSuccess: any, handleError: any) => {
    const form = new FormData()
    form.append('file', file)
    const uploadImageResponse = await this._uploadImageMution.mutateAsync(form)
    eventOrganization.imageUrl = uploadImageResponse.data.url

    return this._createEventOrganizationMutation.mutate(eventOrganization, {
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
    return this._uploadImageMution.isLoading || this._createEventOrganizationMutation.isLoading
  }
}

export { CreateEventOrganizationCommandHandler }
