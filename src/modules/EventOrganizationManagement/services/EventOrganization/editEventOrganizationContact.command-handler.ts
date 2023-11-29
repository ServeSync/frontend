/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import eventOrganizationAPI from './event_organization.api'
import { FormEventOrganizationContactType } from '../../utils'

class EditEventOrganizationContactCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _editEventOrganizationContactMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._editEventOrganizationContactMutation = useMutation({
      mutationFn: (body: { id: string; idContact: string; data: any }) =>
        eventOrganizationAPI.editEventOrganizationContact(body)
    })
  }

  handle = async (
    body: { id: string; idContact: string; data: FormEventOrganizationContactType },
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

    return this._editEventOrganizationContactMutation.mutate(body, {
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
    return this._uploadImageMutation.isLoading || this._editEventOrganizationContactMutation.isLoading
  }
}

export { EditEventOrganizationContactCommandHandler }
