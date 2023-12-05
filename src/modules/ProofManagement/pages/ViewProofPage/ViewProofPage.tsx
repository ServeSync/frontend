/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames'
import { StatusEventToMessage } from 'src/modules/EventManagement/constants'
import Button from 'src/modules/Share/components/Button'
import { formatDateTime, handleError } from 'src/modules/Share/utils'
import { ApproveProofCommandHandler, GetProofByIdQuery, RejectProofCommandHandler } from '../../services'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormRejectProofSchema, FormRejectProofType } from '../../utils'
import path from 'src/modules/Share/constants/path'
import { useForm } from 'react-hook-form'
import ViewProofForm from '../../components/ViewProofForm'
import Swal from 'sweetalert2'

interface Props {
  proofId: string | undefined
  handleCloseModalChange: () => void
}

const ViewProofPage = ({ proofId, handleCloseModalChange }: Props) => {
  const navigate = useNavigate()

  const { handleSubmit, control } = useForm<FormRejectProofType>({
    resolver: yupResolver(FormRejectProofSchema)
  })

  const approveProofCommandHandler = new ApproveProofCommandHandler()

  const handleApproveProof = () => {
    Swal.fire({
      title: 'Xác nhận duyệt ?',
      text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        approveProofCommandHandler.handle(
          proof.id,
          () => {
            Swal.fire('Đã duyệt!', 'Chấp nhận thành công', 'success')
            handleCloseModalChange()
            navigate(path.proof)
          },
          (error: any) => {
            handleError(error)
          }
        )
      }
    })
  }

  const rejectProofCommandHandler = new RejectProofCommandHandler()

  const handleRejectProof = handleSubmit((data) => {
    Swal.fire({
      title: 'Xác nhận từ chối ?',
      text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          id: proof.id,
          data
        }
        rejectProofCommandHandler.handle(
          body,
          () => {
            handleCloseModalChange()
            navigate(path.proof)
            toast.success('Từ chối thành công !')
          },
          (error: any) => {
            handleError(error)
          }
        )
      }
    })
  })

  const getProofByIdQuery = new GetProofByIdQuery(proofId as string)
  const proof = getProofByIdQuery.fetch()

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[700px]  max-h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#a6a6a6] scrollbar-track-[#e1e1e1]'>
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
      {proof && (
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
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span className='text-[#A0A2A4] text-[15px] font-normal break-words text-center flex gap-2'>
                  {formatDateTime(proof.created)}
                </span>
              </div>
            </div>
          </div>
          <ViewProofForm
            proof={proof}
            control={control}
            handleApproveProof={handleApproveProof}
            handleRejectProof={handleRejectProof}
            isLoadingReject={rejectProofCommandHandler.isLoading()}
            isLoadingApprove={approveProofCommandHandler.isLoading()}
          />
        </div>
      )}
    </div>
  )
}

export default ViewProofPage
