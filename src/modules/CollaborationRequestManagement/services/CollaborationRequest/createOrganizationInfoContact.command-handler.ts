/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import { EventOrganizationContactInformation } from '../../interfaces'

class CreateOrganizationInfoContactCommandHandler {
  private _uploadImageMutation

  constructor() {
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
  }

  handle = async (organizationContactInfo: EventOrganizationContactInformation, file: File) => {
    const form = new FormData()
    form.append('file', file)
    const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
    organizationContactInfo.imageUrl = uploadImageResponse.data.url

    return organizationContactInfo
  }

  isLoading() {
    return this._uploadImageMutation.isLoading
  }
}

export { CreateOrganizationInfoContactCommandHandler }
