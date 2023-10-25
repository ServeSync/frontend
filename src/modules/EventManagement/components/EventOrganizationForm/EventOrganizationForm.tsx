import { Control, Controller, UseFormGetValues } from 'react-hook-form'
import { FormEventType } from '../../utils'
import { OrganizerTableHeader } from '../../constants'
import Skeleton from 'react-loading-skeleton'
import { ContactType, EventOrganizationType } from '../../interfaces'
import Button from 'src/modules/Share/components/Button'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'

interface Props {
  control: Control<FormEventType>
  getValues: UseFormGetValues<FormEventType>
  eventOrganization: EventOrganizationType
  contacts: ContactType[]
  index: number
  listEventOrganizationsAdded: EventOrganizationType[]
  setListEventOrganizationsAdded: React.Dispatch<React.SetStateAction<EventOrganizationType[]>>
}

const EventOrganizationForm = ({
  control,
  getValues,
  eventOrganization,
  contacts,
  index,
  listEventOrganizationsAdded,
  setListEventOrganizationsAdded
}: Props) => {
  const [errors, setErrors] = useState<string>('')
  const [contactId, setContactId] = useState<string>('')

  const handleAddContact = () => {
    const role = { ...getValues('organizations') }.organizationReps.role as string
    if (role && role !== '' && contactId && contactId !== '') {
      const contact = contacts.find((item) => item.id === contactId) as ContactType
      const body = {
        ...contact,
        role: role
      }
      const data = [...listEventOrganizationsAdded]
      data[index].contacts = [...data[index].contacts, body]
      setListEventOrganizationsAdded(data)
      setErrors('')
    } else {
      setErrors('Vui lòng nhập đầy đủ thông tin !')
    }
  }

  const handleChangeContact = (id: string) => {
    setContactId(id)
  }

  return (
    <div className='border-[1px] border-gray-300 p-6 rounded-xl'>
      <h2 className='text-[20px] mb-4'>Thông tin ban tổ chức 1</h2>
      <div className='grid grid-cols-5 gap-6'>
        <div className='col-span-1'>
          <img src={eventOrganization.imageUrl} alt='avatar_organizer' className='' />
        </div>
        <div className='col-span-4'>
          <ul>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between'>
                <span>Tên tổ chức</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.name}</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between'>
                <span>Email</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.email}</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between'>
                <span>Phone</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.phoneNumber}</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between'>
                <span>Địa chỉ</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.address}</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between'>
                <span>Vai trò</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.role}</span>
            </li>
          </ul>
        </div>
      </div>
      <h3 className='text-[16px] mb-4'>Thành viên</h3>
      <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
        <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
          <tr className='text-[14px] text-gray-600'>
            {OrganizerTableHeader.map((item) => (
              <th className='px-2 py-2 font-medium text-center' key={item.id}>
                <span>{item.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {eventOrganization.contacts && eventOrganization.contacts.length !== 0
            ? eventOrganization.contacts.map((item, index: number) => (
                <tr
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                  key={`${index}${item.id}`}
                >
                  <th className='px-2 py-4 font-medium w-[20%]'>{item.name}</th>
                  <th className='px-2 py-4 font-medium'>{item.email}</th>
                  <th className='px-2 py-4 font-medium w-[20%] text-center'>{item.phoneNumber}</th>
                  <th className='px-2 py-4 font-medium w-[15%] text-center'>{item.role}</th>
                  <th className='px-2 py-4 font-medium w-[13%]'>
                    <div>
                      <Button
                        type='button'
                        classNameButton='py-2 px-2 rounded-lg text-[14px] hover:bg-gray-200'
                        // onClick={() => onEditEventRole(index)}
                      >
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
                        // onClick={() => handleRemoveEventRole(index)}
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
            : Array(2)
                .fill(0)
                .map((_, index) => (
                  <tr
                    className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                    key={index}
                  >
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                    <th className='px-2 py-4 font-medium'>
                      <Skeleton className='h-[16px]' borderRadius={20} />
                    </th>
                  </tr>
                ))}
        </tbody>
      </table>
      <div>
        <div className='col-span-4 flex justify-between items-center mb-2'>
          <h2 className='text-[16px]'>Thêm nhà tổ chức</h2>
        </div>
        <div className='grid grid-cols-9 gap-x-6'>
          <Controller
            name={'organizations.organizationReps.organizationRepId'}
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-4'>
                  <Autocomplete
                    disablePortal
                    id='contacts'
                    options={contacts ? contacts : []}
                    value={(contacts && contacts.find((option) => option.id === value)) || null}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label='Chọn đại diện' />}
                    onChange={(_, option) => {
                      onChange(option ? option.id : '')
                      handleChangeContact(option?.id as string)
                    }}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name={'organizations.organizationReps.role'}
            control={control}
            render={({ field: { onChange } }) => (
              <div className='col-span-4'>
                <TextField
                  id='role'
                  label='Vai trò'
                  placeholder='Nhập vai trò'
                  className='w-full'
                  onChange={onChange}
                />
              </div>
            )}
          />
          <div className='flex items-center justify-end'>
            <Button
              type='button'
              classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold h-[40px]'
              onClick={handleAddContact}
            >
              Thêm
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventOrganizationForm
