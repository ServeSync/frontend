/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import proofAPI from './proof.api'

class ApproveProof {
  private _queryClient
  private _approveProofMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._approveProofMutation = useMutation({
      mutationFn: (id: string) => proofAPI.approveProof(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._approveProofMutation.mutate(id, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['proofs']
        })
        this._queryClient.invalidateQueries({
          queryKey: ['proof', id]
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
}

export { ApproveProof }
