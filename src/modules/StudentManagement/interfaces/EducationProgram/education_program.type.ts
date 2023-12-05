export interface EducationProgramType {
  id: string
  name: string
  requiredActivityScore: number
  requiredCredit: number
}

export interface StudentEducationProgramResultType {
  id: string
  name: string
  requiredActivityScore: number
  requiredCredit: number
  numberOfEvents: number
  gainScore: number
  eventScore: number
  proofScore: number
  numberOfProofs: number
  numberOfApprovedProofs: number
}
