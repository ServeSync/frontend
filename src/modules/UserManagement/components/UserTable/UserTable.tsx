import HeaderTable from 'src/modules/Share/components/HeaderTable'
import { UsersListType } from '../../interfaces/User'
import { UserTableHeader } from '../../constants'
import Skeleton from 'react-loading-skeleton'
import ModalCustom from 'src/modules/Share/components/Modal'
import UserDetail from '../UserDetail'
import { useState } from 'react'

interface Props {
  users: UsersListType
  onSort: (column: string) => void
  isLoading: boolean
}

const UserTable = ({ users, onSort, isLoading }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const [selectedItem, setSelectedItem] = useState<string>('')

  const handleOpenModal = (item: string) => {
    setIsOpenModal(true)
    setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
    setSelectedItem('')
  }

  return (
    <div>
      <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2'>
        <HeaderTable header={UserTableHeader} onSort={onSort} />
        <tbody>
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, index) => (
                  <tr
                    className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                    key={index}
                  >
                    <th className='px-2 py-4 font-medium w-[50%]'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                    <th className='px-2 py-4 font-medium w-[50%]'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                  </tr>
                ))
            : users &&
              users.data.map((user) => (
                <tr
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                  key={user.id}
                  onClick={() => handleOpenModal(user.id)}
                >
                  <th className='px-2 py-4 font-medium w-[20%]'>{user.userName}</th>
                  <th className='px-2 py-4 font-medium w-[20%]'>{user.email}</th>
                </tr>
              ))}
        </tbody>
      </table>
      <ModalCustom isOpenModal={isOpenModal} handleClose={handleCloseModal}>
        <UserDetail userId={selectedItem} handleClose={handleCloseModal} />
      </ModalCustom>
    </div>
  )
}

export default UserTable
