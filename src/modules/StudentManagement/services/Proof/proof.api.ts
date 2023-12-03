import http from 'src/modules/Share/utils/http'
import { FormProofExternalType, FormProofInternalType, FormProofSpecialType } from '../../utils'

const proofAPI = {
  makeProofInternal: (body: FormProofInternalType) => http.post('/proofs/internal', body),

  makeProofExternal: (body: FormProofExternalType) => http.post('/proofs/external', body),

  makeProofSpecial: (body: FormProofSpecialType) => http.post('/proofs/special', body)
}

export default proofAPI
