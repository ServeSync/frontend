/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import { EventOrganizationInformation } from '../../interfaces'

class CreateOrganizationInfoCommandHandler {
  private _uploadImageMutation

  constructor() {
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
  }

  handle = async (organizationInfo: EventOrganizationInformation, file: File) => {
    const form = new FormData()
    form.append('file', file)
    const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
    organizationInfo.imageUrl = uploadImageResponse.data.url
    return organizationInfo
  }

  isLoading() {
    return this._uploadImageMutation.isLoading
  }
}

export { CreateOrganizationInfoCommandHandler }
