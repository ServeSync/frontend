/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import { EventOrganizationContactInfo } from '../../interfaces'
import { toast } from 'react-toastify'

class CreateOrganizationInfoContactCommandHandler {
  private _uploadImageMutation

  constructor() {
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
  }

  handle = async (organizationContactInfo: EventOrganizationContactInfo, file: File) => {
    const form = new FormData()
    form.append('file', file)

    const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form, {
      onError: () => {
        toast.error('Vui lòng chọn ảnh đại diện!')
      }
    })
    organizationContactInfo.imageUrl = uploadImageResponse.data.url

    return organizationContactInfo
  }
}

export { CreateOrganizationInfoContactCommandHandler }
