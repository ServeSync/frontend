import { ProofDetailType, ProofListConfig, ProofListType } from 'src/modules/Proof/interfaces'
import http from 'src/modules/Share/utils/http'
import { FormProofExternalType, FormProofInternalType, FormProofSpecialType, FormRejectProofType } from '../../utils'

const proofAPI = {
  getListProofs: (params: ProofListConfig) => http.get<ProofListType>('/proofs', { params }),

  getProofDetail: (id: string) => http.get<ProofDetailType>(`/proofs/${id}`),

  makeProofInternal: (body: FormProofInternalType) => http.post('/proofs/internal', body),

  makeProofExternal: (body: FormProofExternalType) => http.post('/proofs/external', body),

  makeProofSpecial: (body: FormProofSpecialType) => http.post('/proofs/special', body),

  approveProof: (id: string) => http.put(`/proofs/${id}/approve`),

  rejectProof: (body: { id: string; data: FormRejectProofType }) => http.put(`/proofs/${body.id}/reject`, body.data)
}

export default proofAPI
