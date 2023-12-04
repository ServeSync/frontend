/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import proofAPI from './proof.api'
import { FormRejectProofType } from '../../utils'

class RejectProofCommandHandler {
  private _queryClient
  private _rejectProofMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._rejectProofMutation = useMutation({
      mutationFn: (body: { id: string; data: FormRejectProofType }) => proofAPI.rejectProof(body)
    })
  }

  handle = (body: { id: string; data: FormRejectProofType }, handleSuccess: any, handleError: any) => {
    return this._rejectProofMutation.mutate(body, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['proofs']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._rejectProofMutation.isLoading
  }
}

export { RejectProofCommandHandler }
