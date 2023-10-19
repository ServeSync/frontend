import Button from 'src/modules/Share/components/Button'
import { RoleTableHeader } from '../../constants'
import { EventRole } from '../../interfaces'
import Skeleton from 'react-loading-skeleton'

interface Props {
  dataEventRole: EventRole[]
  setDataEventRole: React.Dispatch<React.SetStateAction<EventRole[]>>
}

const RegisterEventRoleTable = ({ dataEventRole, setDataEventRole }: Props) => {
  const handleRemoveEventRole = (id: number) => {
    const data = [...dataEventRole]
    data.splice(id, 1)
    setDataEventRole(data)
  }

  return (
    <div>
      <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
        <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
          <tr className='text-[14px] text-gray-600'>
            {RoleTableHeader.map((item) => (
              <th className='px-2 py-2 font-medium' key={item.id}>
                <span>{item.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataEventRole && dataEventRole.length !== 0 ? (
            dataEventRole.map((item, index) => (
              <tr
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                key={index}
              >
                <th className='px-2 py-4 font-medium w-[20%]'>{item.name}</th>
                <th className='px-2 py-4 font-medium'>{item.description}</th>
                <th className='px-2 py-4 font-medium w-[7%] text-center'>{item.score}</th>
                <th className='px-2 py-4 font-medium w-[15%] text-center'>
                  <input type='checkbox' name='' id='' checked={item.isNeedApprove === 'true'} />
                </th>
                <th className='px-2 py-4 font-medium w-[13%]'>
                  <div>
                    <Button type='button' classNameButton='py-2 px-2 rounded-lg text-[14px] hover:bg-gray-200'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6 text-[#3fd6d9]'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                        />
                      </svg>
                    </Button>
                    <Button
                      type='button'
                      classNameButton='py-2 px-2 rounded-lg text-[14px] hover:bg-slate-200'
                      onClick={() => handleRemoveEventRole(index)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6 text-[#ff4848]'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                        />
                      </svg>
                    </Button>
                    <button type='button'></button>
                  </div>
                </th>
              </tr>
            ))
          ) : (
            <tr className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'>
              <th className='px-2 py-4 font-medium w-[20%]'>
                <Skeleton className='h-[16px]' borderRadius={20} />
              </th>
              <th className='px-2 py-4 font-medium '>
                <Skeleton className='h-[16px]' borderRadius={20} />
              </th>
              <th className='px-2 py-4 font-medium w-[10%]'>
                <Skeleton className='h-[16px]' borderRadius={20} />
              </th>
              <th className='px-2 py-4 font-medium w-[20%]'>
                <Skeleton className='h-[16px]' borderRadius={20} />
              </th>
              <th className='px-2 py-4 font-medium w-[13%]'>
                <Skeleton className='h-[16px]' borderRadius={20} />
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RegisterEventRoleTable
