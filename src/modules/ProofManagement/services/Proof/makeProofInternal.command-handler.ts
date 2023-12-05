/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import proofAPI from './proof.api'
import { FormProofInternalType } from '../../utils'

class MakeProofInternalCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _makeProofInternalMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._makeProofInternalMutation = useMutation({
      mutationFn: (body: FormProofInternalType) => proofAPI.makeProofInternal(body)
    })
  }

  handle = async (proof: FormProofInternalType, file: File, handleSuccess: any, handleError: any) => {
    const form = new FormData()
    form.append('file', file)
    const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
    proof.imageUrl = uploadImageResponse.data.url

    return this._makeProofInternalMutation.mutate(proof, {
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
    return this._uploadImageMutation.isLoading || this._makeProofInternalMutation.isLoading
  }
}

export { MakeProofInternalCommandHandler }
