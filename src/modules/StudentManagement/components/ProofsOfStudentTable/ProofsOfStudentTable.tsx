import Skeleton from 'react-loading-skeleton'
import { ProofType } from 'src/modules/ProofManagement/interfaces'
import { ProofsOfStudentTableHeader } from '../../constants'
import { StatusEventToMessage, TypeEventToMessage } from 'src/modules/EventManagement/constants'
import { formatDateTime } from 'src/modules/Share/utils'
import { Fragment, useState } from 'react'
import ModalCustom from 'src/modules/Share/components/Modal'
import EditProofPage from 'src/modules/ProofManagement/pages/EditProofPage/EditProofPage'

interface Props {
  proofs: ProofType[]
  isLoading: boolean
  studentId: string
}

const ProofsOfStudentTable = ({ proofs, isLoading, studentId }: Props) => {
  const [proofId, setProofId] = useState<string>()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleOpenModalChange = (id: string) => {
    setIsOpenModal(true)
    setProofId(id)
  }

  const handleCloseModalChange = () => {
    setIsOpenModal(false)
  }

  return (
    <Fragment>
      <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2'>
        <thead className='bg-[#f7f8f9] border-[1px] border-gray-200'>
          <tr className='text-[14px] text-gray-600'>
            {ProofsOfStudentTableHeader.map((item) => (
              <th className='px-2 py-2 font-medium cursor-pointer' key={item.id}>
                <span>{item.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, index) => (
                  <tr
                    key={index}
                    className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                  >
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton />
                    </th>
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton />
                    </th>
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton />
                    </th>
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton />
                    </th>
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton />
                    </th>
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton />
                    </th>
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton />
                    </th>
                  </tr>
                ))
            : proofs?.map((proof, index) => (
                <tr
                  key={index}
                  onClick={() => handleOpenModalChange(proof.id)}
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                >
                  <th className='px-2 py-4 font-medium'>{index + 1}</th>
                  <th className='px-2 py-4 font-medium'>{proof.eventName}</th>
                  <th className='px-2 py-4 font-medium'>{proof.student.fullName}</th>
                  <th className='px-2 py-4 font-medium'>{formatDateTime(proof.created)}</th>
                  <th className='px-2 py-4 font-medium'>{TypeEventToMessage(proof.proofType)}</th>
                  <th className='px-2 py-4 font-medium'>{StatusEventToMessage(proof.proofStatus)}</th>
                </tr>
              ))}
        </tbody>
      </table>
      <ModalCustom isOpenModal={isOpenModal} handleClose={handleCloseModalChange}>
        <EditProofPage proofId={proofId} studentId={studentId} handleCloseModalChange={handleCloseModalChange} />
      </ModalCustom>
    </Fragment>
  )
}

export default ProofsOfStudentTable
