/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageAPI from 'src/modules/Share/services/Image/image.api'
import proofAPI from './proof.api'
import { FormProofSpecialType } from '../../utils'

class MakeProofSpecialCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _makeProofSpecialMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(imageAPI.uploadImage)
    this._makeProofSpecialMutation = useMutation({
      mutationFn: (body: FormProofSpecialType) => proofAPI.makeProofSpecial(body)
    })
  }

  handle = async (proof: FormProofSpecialType, file: File, handleSuccess: any, handleError: any) => {
    const form = new FormData()
    form.append('file', file)
    const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
    proof.imageUrl = uploadImageResponse.data.url

    return this._makeProofSpecialMutation.mutate(proof, {
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
    return this._uploadImageMutation.isLoading || this._makeProofSpecialMutation.isLoading
  }
}

export { MakeProofSpecialCommandHandler }
