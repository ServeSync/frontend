import { Control, Controller, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { FormEventType } from '../../utils'
import { OrganizerTableHeader } from '../../constants'
import { ContactType, ContactsListType, EventOrganizationType } from '../../interfaces'
import Button from 'src/modules/Share/components/Button'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'
import { GetAllContactsByOrganizationIdQuery } from '../../services'

interface Props {
  control: Control<FormEventType>
  getValues: UseFormGetValues<FormEventType>
  setValue: UseFormSetValue<FormEventType>
  eventOrganization: EventOrganizationType
  index: number
  listEventOrganizationsAdded: EventOrganizationType[]
  setListEventOrganizationsAdded: React.Dispatch<React.SetStateAction<EventOrganizationType[]>>
  handleRemoveEventOrganization: (id: number) => void
}

const EventOrganizationForm = ({
  control,
  getValues,
  setValue,
  eventOrganization,
  index,
  listEventOrganizationsAdded,
  setListEventOrganizationsAdded,
  handleRemoveEventOrganization
}: Props) => {
  const [errors, setErrors] = useState<string>('')

  const [listContactsAdded, setListContactsAdded] = useState<ContactType[]>([])

  const getAllContactsByOrganizationIdQuery = new GetAllContactsByOrganizationIdQuery(eventOrganization.id)
  const contactsList = getAllContactsByOrganizationIdQuery.fetch() as ContactsListType
  const contacts = contactsList && contactsList.data

  const handleAddContact = () => {
    const id = getValues('organizations.organizationReps.organizationRepId')
    const role = { ...getValues('organizations') }.organizationReps.role as string
    if (role && role !== '' && id && id !== '') {
      if (role.length <= 5) {
        setErrors('Vai trò nhà tổ chức ít nhất 5 kí tự')
      } else if (listContactsAdded.some((item) => item.id === id)) {
        setErrors('Nhà tổ chức đã được thêm vào sự kiện !')
      } else {
        const contact = contacts.find((item) => item.id === id) as ContactType
        const body = {
          ...contact,
          role: role
        }
        const data = [...listEventOrganizationsAdded]
        data[index].contacts = [...data[index].contacts, body]
        setListEventOrganizationsAdded(data)
        setValue('organizations.organizationReps.organizationRepId', undefined)
        setValue('organizations.organizationReps.role', '')
        setErrors('')
        setListContactsAdded([...listContactsAdded, body])
      }
    } else {
      setErrors('Vui lòng nhập đầy đủ thông tin !')
    }
  }

  const handleDeleteContact = (idOrganization: number, id: number) => {
    const newListEventOrganizationsAdded = [...listEventOrganizationsAdded]
    newListEventOrganizationsAdded[idOrganization].contacts.splice(id, 1)
    setListEventOrganizationsAdded(newListEventOrganizationsAdded)
  }

  return (
    <div className='border-[1px] border-gray-300 p-6 rounded-xl'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-[20px] font-semibold'>Thông tin ban tổ chức {index + 1}</h2>
        <Button
          type='button'
          classNameButton='hover:bg-slate-200 rounded-lg p-2'
          onClick={() => handleRemoveEventOrganization(index)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </Button>
      </div>
      <div className='grid grid-cols-5 gap-6'>
        <div className='col-span-1'>
          <img src={eventOrganization.imageUrl} alt='avatar_organizer' className='rounded-xl h-full object-cover' />
        </div>
        <div className='col-span-4'>
          <ul>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between font-medium'>
                <span>Tên tổ chức</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.name}</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between font-medium'>
                <span>Email</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.email}</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between font-medium'>
                <span>Phone</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.phoneNumber}</span>
            </li>
            <li className='flex gap-4 overflow-hidden'>
              <div className='w-[100px] flex justify-between font-medium'>
                <span>Địa chỉ</span>
                <span>:</span>
              </div>
              <span className='line-clamp-1 flex-1'>{eventOrganization.address}</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between font-medium'>
                <span>Vai trò</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.role}</span>
            </li>
          </ul>
        </div>
      </div>
      <h3 className='text-[16px] mt-4 mb-2 font-semibold'>Thành viên</h3>
      <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
        <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
          <tr className='text-[14px] text-gray-600'>
            {OrganizerTableHeader.map((item) => (
              <th className='px-2 py-2 text-center font-semibold' key={item.id}>
                <span>{item.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {eventOrganization.contacts &&
            eventOrganization.contacts.length !== 0 &&
            eventOrganization.contacts.map((item, id: number) => (
              <tr
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                key={`${id}${item.id}`}
              >
                <th className='px-2 py-4 font-medium w-[20%]'>{item.name}</th>
                <th className='px-2 py-4 font-medium'>{item.email}</th>
                <th className='px-2 py-4 font-medium w-[20%] text-center'>{item.phoneNumber}</th>
                <th className='px-2 py-4 font-medium w-[15%] text-center'>{item.role}</th>
                <th className='px-2 py-4 font-medium w-[13%] text-center'>
                  <Button
                    type='button'
                    classNameButton='py-2 px-2 rounded-lg text-[14px] hover:bg-slate-200'
                    onClick={() => handleDeleteContact(index, id)}
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
                </th>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <div className='col-span-4 flex justify-between items-center mb-4'>
          <h2 className='text-[16px] font-semibold'>Thêm nhà tổ chức</h2>
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
                    onChange={(_, option) => onChange(option ? option.id : '')}
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
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <div className='col-span-4'>
                <TextField
                  id='role'
                  label='Vai trò'
                  placeholder='Nhập vai trò'
                  className='w-full'
                  value={value}
                  onChange={onChange}
                />
              </div>
            )}
          />
          <div className='flex justify-end'>
            <Button
              type='button'
              classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold h-[48px] mt-[4px]'
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
