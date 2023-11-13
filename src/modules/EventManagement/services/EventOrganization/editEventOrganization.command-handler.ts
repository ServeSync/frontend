/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormEventOrganizationType } from 'src/modules/EventOrganizationManagement/utils'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import eventOrganizationAPI from './event_organization.api'

class EditEventOrganizationCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _editEventOrganizationMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._editEventOrganizationMutation = useMutation({
      mutationFn: (body: { id: string; data: FormEventOrganizationType }) =>
        eventOrganizationAPI.editEventOrganization(body)
    })
  }

  handle = async (
    body: { id: string; data: FormEventOrganizationType },
    file: File,
    handleSuccess: any,
    handleError: any
  ) => {
    if (file !== undefined) {
      const form = new FormData()
      form.append('file', file)
      const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
      body.data.imageUrl = uploadImageResponse.data.url
    }
    return this._editEventOrganizationMutation.mutate(body, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['event_organization']
        })
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
    return this._uploadImageMutation.isLoading || this._editEventOrganizationMutation.isLoading
  }
}
export { EditEventOrganizationCommandHandler }
