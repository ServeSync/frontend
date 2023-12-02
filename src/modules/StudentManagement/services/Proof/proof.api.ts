import { ProofListConfig, ProofListType } from 'src/modules/Proof/interfaces'
import http from 'src/modules/Share/utils/http'
import { FormProofExternalType, FormProofInternalType } from 'src/modules/StudentManagement/utils'

const proofAPI = {
  getListProofs: (params: ProofListConfig) => http.get<ProofListType>('/proofs', { params }),

  makeProofInternal: (body: FormProofInternalType) => http.post('/proofs/internal', body),

  makeProofExternal: (body: FormProofExternalType) => http.post('/proofs/external', body)
}

export default proofAPI
