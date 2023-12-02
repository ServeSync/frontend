import HeaderTable from 'src/modules/Share/components/HeaderTable'
import { ProofListType } from '../../interfaces'
import { ProofTableHeader } from '../../constants'
import Skeleton from 'react-loading-skeleton'
import { formatDateTimeVN } from 'src/modules/Share/utils'
import { StatusToMessage, TypeToMessage } from 'src/modules/EventManagement/constants'

interface Props {
  proofs: ProofListType
  isLoading: boolean
  onSort: (column: string) => void
  onEditProof: (id: string) => void
}
const ProofTable = ({ proofs, isLoading, onSort, onEditProof }: Props) => {
  return (
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
            proofs.data.map((proof, index) => (
              <tr
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                key={index}
                onClick={() => onEditProof(proof.id)}
              >
                <th className='px-2 py-4 font-medium w-[20%]'>
                  <span className='line-clamp-1'>{proof.eventName}</span>
                </th>
                <th className='px-2 py-4 font-medium overflow-hidden'>
                  <span className='line-clamp-1'>{proof.student.fullName}</span>
                </th>
                <th className='px-2 py-4 font-medium w-[18%]'>{formatDateTimeVN(proof.created)}</th>
                <th className='px-2 py-4 font-medium w-[18%]'>{formatDateTimeVN(proof.lastModified)}</th>
                <th className='px-2 py-4 font-medium w-[12%]'>{TypeToMessage(proof.proofType)}</th>
                <th className='px-2 py-4 font-medium w-[12%]'>{StatusToMessage(proof.proofStatus)}</th>
              </tr>
            ))}
      </tbody>
    </table>
  )
}

export default ProofTable
