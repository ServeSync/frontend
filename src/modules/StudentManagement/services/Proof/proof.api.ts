import http from 'src/modules/Share/utils/http'
import { FormProofExternalType, FormProofInternalType } from '../../utils'

const proofAPI = {
  makeProofInternal: (body: FormProofInternalType) => http.post('/proofs/internal', body),

  makeProofExternal: (body: FormProofExternalType) => http.post('/proofs/external', body)
}

export default proofAPI
