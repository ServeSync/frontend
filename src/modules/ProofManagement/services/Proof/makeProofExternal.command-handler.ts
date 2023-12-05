/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import proofAPI from './proof.api'
import { FormProofExternalType } from '../../utils'

class MakeProofExternalCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _makeProofExternalMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._makeProofExternalMutation = useMutation({
      mutationFn: (body: FormProofExternalType) => proofAPI.makeProofExternal(body)
    })
  }

  handle = async (proof: FormProofExternalType, file: File, handleSuccess: any, handleError: any) => {
    const form = new FormData()
    form.append('file', file)
    const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
    proof.imageUrl = uploadImageResponse.data.url

    return this._makeProofExternalMutation.mutate(proof, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['proofs_of_student']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._uploadImageMutation.isLoading || this._makeProofExternalMutation.isLoading
  }
}

export { MakeProofExternalCommandHandler }
