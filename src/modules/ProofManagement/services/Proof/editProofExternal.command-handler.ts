/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import proofAPI from './proof.api'
import { FormProofExternalType } from '../../utils'

class EditProofExternalCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _editProofExternalMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._editProofExternalMutation = useMutation({
      mutationFn: (body: { id: string; data: FormProofExternalType }) => proofAPI.editProofExternal(body)
    })
  }

  handle = async (
    body: { id: string; data: FormProofExternalType },
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

    return this._editProofExternalMutation.mutate(body, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['proofs_of_student']
        })
        this._queryClient.invalidateQueries({
          queryKey: ['proof', body.id]
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._uploadImageMutation.isLoading || this._editProofExternalMutation.isLoading
  }
}

export { EditProofExternalCommandHandler }
