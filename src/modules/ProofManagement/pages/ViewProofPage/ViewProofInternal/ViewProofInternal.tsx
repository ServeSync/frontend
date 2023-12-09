/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames'
import { Control } from 'react-hook-form'
import { StatusEventToMessage } from 'src/modules/EventManagement/constants'
import ViewProofInternalForm from 'src/modules/ProofManagement/components/ViewProofForm/ViewProofInternalForm'
import { ProofDetailType } from 'src/modules/ProofManagement/interfaces'
import { FormRejectProofType } from 'src/modules/ProofManagement/utils'
import { formatDateTime } from 'src/modules/Share/utils'

interface Props {
  proof: ProofDetailType
  control: Control<FormRejectProofType>
  handleApproveProof: () => void
  handleRejectProof: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
  isLoadingReject: boolean
  isLoadingApprove: boolean
}
const ViewProofInternal = ({
  proof,
  control,
  handleApproveProof,
  handleRejectProof,
  isLoadingApprove,
  isLoadingReject
}: Props) => {
  return (
    <div className='w-full'>
      <h2 className='font-semibold'>Thông tin chung</h2>
      <div className='flex justify-between'>
        <div className='px-2 py-4 font-medium flex items-center gap-x-3'>
          <img src={proof.student.imageUrl} alt='' className='rounded-full object-cover w-[50px] h-[50px]' />
          <div className='flex flex-col'>
            <span className='font-semibold'>{proof.student.fullName}</span>
            <span className='text-gray-400 text-[12px]'>{proof.student.email}</span>
          </div>
        </div>
        <div className='self-center'>
          <div
            className={classNames('rounded-full text-white text-[12px] text-center mb-2', {
              'bg-[#195E8E]/50': proof.proofStatus === 'Pending',
              'bg-[#00BA21]/50': proof.proofStatus === 'Approved',
              'bg-[#FF0000]/50': proof.proofStatus === 'Rejected'
            })}
          >
            {StatusEventToMessage(proof.proofStatus)}
          </div>
          <div className='flex gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 max-sm:w-4 max-sm:h-4 text-[#00BA21] flex-shrink-0'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            <span className='text-[#A0A2A4] text-[15px] font-normal break-words text-center flex gap-2'>
              {formatDateTime(proof.created)}
            </span>
          </div>
        </div>
      </div>
      <ViewProofInternalForm
        proof={proof}
        control={control}
        handleApproveProof={handleApproveProof}
        handleRejectProof={handleRejectProof}
        isLoadingReject={isLoadingReject}
        isLoadingApprove={isLoadingApprove}
      />
    </div>
  )
}

export default ViewProofInternal
