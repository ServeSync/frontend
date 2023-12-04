import http from 'src/modules/Share/utils/http'
import { FormProofExternalType, FormProofInternalType, FormProofSpecialType, FormRejectProofType } from '../../utils'
import { ProofDetailType, ProofListConfig, ProofsListType } from '../../interfaces'

const proofAPI = {
  getListProofs: (params: ProofListConfig) => http.get<ProofsListType>('/proofs', { params }),

  getProofById: (id: string) => http.get<ProofDetailType>(`/proofs/${id}`),

  getListProofsByStudentId: (studentId: string) => http.get<ProofsListType>(`/proofs/${studentId}/student`),

  makeProofInternal: (body: FormProofInternalType) => http.post('/proofs/internal', body),

  makeProofExternal: (body: FormProofExternalType) => http.post('/proofs/external', body),

  makeProofSpecial: (body: FormProofSpecialType) => http.post('/proofs/special', body),

  editProofInternal: (body: { id: string; data: FormProofInternalType }) =>
    http.put(`/proofs/${body.id}/internal`, body.data),

  editProofExternal: (body: { id: string; data: FormProofExternalType }) =>
    http.put(`/proofs/${body.id}/external`, body.data),

  editProofSpecial: (body: { id: string; data: FormProofSpecialType }) =>
    http.put(`/proofs/${body.id}/special`, body.data),

  deleteProof: (id: string) => http.delete(`/proofs/${id}`),

  approveProof: (id: string) => http.put(`/proofs/${id}/approve`),

  rejectProof: (body: { id: string; data: FormRejectProofType }) => http.put(`/proofs/${body.id}/reject`, body.data)
}

export default proofAPI
