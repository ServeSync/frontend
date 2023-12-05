/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetProofByIdQuery } from 'src/modules/ProofManagement/services'
import EditProofInternal from '../EditProofInternal'
import EditProofExternal from '../EditProofExternal'
import EditProofSpecial from '../EditProofSpecial'
import Button from 'src/modules/Share/components/Button'
import { DeleteProofCommandHandler } from 'src/modules/ProofManagement/services/Proof/deleteProof.command-handler'
import { toast } from 'react-toastify'
import { handleError } from 'src/modules/Share/utils'
import { FormProofInternalType } from 'src/modules/ProofManagement/utils'

interface Props {
  proofId: string | undefined
  studentId: string
  handleCloseModalChange: () => void
}

const EditProofPage = ({ proofId, studentId, handleCloseModalChange }: Props) => {
  const getProofByIdQuery = new GetProofByIdQuery(proofId as string)
  const proof = getProofByIdQuery.fetch()

  const deleteProofCommandHandler = new DeleteProofCommandHandler()

  const handleDeleteProof = (id: string) => {
    deleteProofCommandHandler.handle(
      id,
      () => {
        handleCloseModalChange()
        toast.success('Xóa minh chứng thành công !')
      },
      (error: any) => {
        handleError<FormProofInternalType>(error)
      }
    )
  }

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[620px]  max-h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#a6a6a6] scrollbar-track-[#e1e1e1]'>
      <div className='flex justify-between items-center w-full'>
        <div>
          <h2 className='text-[20px] font-semibold'>Đơn nộp minh chứng</h2>
          <h4 className='text-[12px]'>Đơn này với mục đích nhà trường sẽ xác nhận bạn đã tham gia sự kiện trước đó.</h4>
        </div>
        <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalChange}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 '
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </Button>
      </div>
      <div>
        <div>
          {proof && proof.proofType === 'Internal' && (
            <EditProofInternal
              proof={proof}
              studentId={studentId}
              handleDeleteProof={handleDeleteProof}
              isLoadingDelete={deleteProofCommandHandler.isLoading()}
            />
          )}
        </div>
        <div>
          {proof && proof.proofType === 'External' && (
            <EditProofExternal
              proof={proof}
              handleDeleteProof={handleDeleteProof}
              isLoadingDelete={deleteProofCommandHandler.isLoading()}
            />
          )}
        </div>
        <div>
          {proof && proof.proofType === 'Special' && (
            <EditProofSpecial
              proof={proof}
              handleDeleteProof={handleDeleteProof}
              isLoadingDelete={deleteProofCommandHandler.isLoading()}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default EditProofPage
