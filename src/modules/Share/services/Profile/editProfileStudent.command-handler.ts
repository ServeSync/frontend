/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import profileAPI from 'src/modules/Share/services/Profile/profile.api'
import { FormProfileStudentType } from '../../utils'

/* eslint-disable react-hooks/rules-of-hooks */
class EditProfileStudentCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _editProfileMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._editProfileMutation = useMutation({
      mutationFn: (body: any) => profileAPI.editProfileStudent(body)
    })
  }

  handle = async (data: FormProfileStudentType, file: File, handleSuccess: any, handleError: any) => {
    if (file !== undefined) {
      const form = new FormData()
      form.append('file', file)
      const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
      data.imageUrl = uploadImageResponse.data.url
    }

    return this._editProfileMutation.mutate(data, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['profile']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._uploadImageMutation.isLoading || this._editProfileMutation.isLoading
  }
}
export { EditProfileStudentCommandHandler }
