/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import proofAPI from './proof.api'

class DeleteProofCommandHandler {
  private _queryClient
  private _deleteProofMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._deleteProofMutation = useMutation({
      mutationFn: (id: string) => proofAPI.deleteProof(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._deleteProofMutation.mutate(id, {
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
}

export { DeleteProofCommandHandler }
