import HeaderTable from 'src/modules/Share/components/HeaderTable'
import { ProofsListType } from '../../interfaces'
import { ProofTableHeader } from '../../constants'
import Skeleton from 'react-loading-skeleton'
import { formatDateTimeVN } from 'src/modules/Share/utils'
import { Fragment, useState } from 'react'
import ModalCustom from 'src/modules/Share/components/Modal'
import { StatusEventToMessage, TypeEventToMessage } from 'src/modules/EventManagement/constants'
import ViewProofPage from '../../pages/ViewProofPage'

interface Props {
  proofs: ProofsListType
  isLoading: boolean
  onSort: (column: string) => void
}

const ProofTable = ({ proofs, isLoading, onSort }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>('')

  const handleOpenModalChange = (id: string) => {
    setIsOpenModal(true)
    setSelectedItem(id)
  }

  const handleCloseModalChange = () => {
    setIsOpenModal(false)
  }

  return (
    <Fragment>
      <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2'>
        <HeaderTable header={ProofTableHeader} onSort={onSort} />
        <tbody>
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, index) => (
                  <tr
                    className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                    key={index}
                  >
                    <th className='px-2 py-4 font-medium w-[20%]'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                    <th className='px-2 py-4 font-medium w-[18%]'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                    <th className='px-2 py-4 font-medium w-[18%]]'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                    <th className='px-2 py-4 font-medium w-[12%]'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                    <th className='px-2 py-4 font-medium w-[12%]'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                  </tr>
                ))
            : proofs &&
              proofs.data.map((proof, id: number) => (
                <tr
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                  key={`${id}${proof.id}`}
                  onClick={() => handleOpenModalChange(proof.id)}
                >
                  <th className='px-2 py-4 font-medium w-[20%]'>
                    <span className='line-clamp-1'>{proof.eventName}</span>
                  </th>
                  <th className='px-2 py-4 font-medium overflow-hidden'>
                    <span className='line-clamp-1'>{proof.student.fullName}</span>
                  </th>
                  <th className='px-2 py-4 font-medium w-[18%]'>{formatDateTimeVN(proof.created)}</th>
                  <th className='px-2 py-4 font-medium w-[18%]'>{formatDateTimeVN(proof.lastModified)}</th>
                  <th className='px-2 py-4 font-medium w-[12%]'>{TypeEventToMessage(proof.proofType)}</th>
                  <th className='px-2 py-4 font-medium w-[12%]'>{StatusEventToMessage(proof.proofStatus)}</th>
                </tr>
              ))}
        </tbody>
      </table>
      <ModalCustom isOpenModal={isOpenModal} handleClose={handleCloseModalChange}>
        <ViewProofPage proofId={selectedItem} handleCloseModalChange={handleCloseModalChange} />
      </ModalCustom>
    </Fragment>
  )
}

export default ProofTable
