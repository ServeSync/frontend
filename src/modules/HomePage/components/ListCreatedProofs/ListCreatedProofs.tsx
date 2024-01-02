import { useState } from 'react'
import CreateProofPage from 'src/modules/ProofManagement/pages/CreateProofPage/CreateProofPage'
import { GetAllProofsByStudentIdQuery } from 'src/modules/ProofManagement/services/Proof/getAllProofsByStudentId.query'
import Button from 'src/modules/Share/components/Button'
import ModalCustom from 'src/modules/Share/components/Modal'
import { ProfileStudent } from 'src/modules/Share/interfaces'
import ProofsOfStudentTable from 'src/modules/StudentManagement/components/ProofsOfStudentTable'

interface Props {
  tab: number
  index: number
  profile: ProfileStudent
}

const ListCreatedProofs = ({ tab, index, profile }: Props) => {
  const [isOpenModalProofSelect, setIsOpenModalProofSelect] = useState<boolean>(false)

  const handleOpenModalProofSelect = () => {
    setIsOpenModalProofSelect(true)
  }

  const handleCloseModalProofSelect = () => {
    setIsOpenModalProofSelect(false)
  }

  const [page, setPage] = useState<number>(1)

  const getAllProofsByStudentIdQuery = new GetAllProofsByStudentIdQuery(profile.id as string)
  const proofsOfStudent = getAllProofsByStudentIdQuery.fetch()

  const onLoadMore = () => {
    if (page < proofsOfStudent.totalPages) {
      setPage(page + 1)
    }
  }

  return (
    <div role='tabpanel' hidden={tab !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {tab === index && (
        <div className='font-semibold col-span-4 mt-5 px-4'>
          <div className='mb-4'>
            <div className='flex justify-between items-center'>
              <p className='font-semibold md:text-[16px] text-[12px]'>Danh sách minh chứng đã tạo</p>
              <div className='flex items-center gap-6'>
                <Button
                  onClick={handleOpenModalProofSelect}
                  type='button'
                  classNameButton='flex items-center gap-1 md:text-[14px] text-[12px] font-semibold text-white bg-[#26C6DA] md:px-4 max-md:px-2 py-2 rounded-lg'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                    />
                  </svg>
                  <span className='truncate'>Minh chứng</span>
                </Button>
                <ModalCustom isOpenModal={isOpenModalProofSelect} handleClose={handleCloseModalProofSelect}>
                  <CreateProofPage
                    handleCloseModalProofSelect={handleCloseModalProofSelect}
                    studentId={profile.id as string}
                  />
                </ModalCustom>
              </div>
            </div>
          </div>
          <ProofsOfStudentTable
            proofs={proofsOfStudent.data}
            isLoading={getAllProofsByStudentIdQuery.isLoading()}
            studentId={profile.id as string}
          />
          {proofsOfStudent?.totalPages > 1 && page < proofsOfStudent?.totalPages && (
            <div className='flex justify-center mt-3'>
              <Button classNameButton='text-[12px] text-[#1635F4]' onClick={onLoadMore}>
                Xem thêm
              </Button>
            </div>
          )}
          {proofsOfStudent?.total < 1 && (
            <div className='flex flex-col items-center mt-3 text-[#A0A2A4]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-8 h-8 max-md:w-4 max-md:h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
                />
              </svg>
              <span className='text-[16px] max-md:text-[8px] font-normal'>
                Hiện sinh viên chưa tham gia hoạt động nào.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ListCreatedProofs
