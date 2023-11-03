import { TextField } from '@mui/material'
import { ContentState, EditorState } from 'draft-js'
import { EventPendingType } from 'src/modules/EventManagement/interfaces'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { formatDateOfBirth } from 'src/modules/Share/utils'

interface Props {
  eventPending: EventPendingType
}
const EventPendingOrganization = ({ eventPending }: Props) => {
  if (!eventPending) return null
  const contentState = ContentState.createFromText(eventPending.organization.description)
  const editorState = EditorState.createWithContent(contentState)
  return (
    <div className='flex flex-col gap-y-8 w-full mx-auto'>
      <div className=''>
        <h2 className='text-[24px] text-black font-bold col-span-4 mb-10 bg-transparent '>Thông tin ban tổ chức</h2>
        <div className='grid grid-cols-8 gap-4'>
          <div className='col-span-2 row-span-3'>
            <div className='w-full h-full flex items-center justify-center'>
              <img
                src={eventPending.organization.imageUrl}
                alt=''
                className='rounded-full object-cover max-w-full max-h-full'
              />
            </div>
          </div>
          <div className='col-span-3'>
            <TextField
              style={{ width: '100%' }}
              label='Tên tổ chức'
              value={eventPending.organization.name}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              style={{ width: '100%' }}
              label='Số điện thoại'
              value={eventPending.organization.phoneNumber}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              style={{ width: '100%' }}
              label='Địa chỉ email'
              value={eventPending.organization.email}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              style={{ width: '100%' }}
              label='Địa chỉ '
              value={eventPending.organization.address}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-6'>
            <div className='border-[1px] border-[#C8C8C8] rounded-lg overflow-hidden'>
              <Editor readOnly editorState={editorState} />
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <h2 className='text-[24px] text-black font-bold col-span-4 mb-10 bg-transparent '>Thông tin người đại diện</h2>
        <div className='grid grid-cols-8 gap-4'>
          <div className='col-span-2 row-span-4'>
            <img src={eventPending.organizationContact.imageUrl} alt='' className='rounded-full object-cover w-full ' />
          </div>
          <div className='col-span-3'>
            <TextField
              style={{ width: '100%' }}
              label='Tên người đại diện'
              value={eventPending.organizationContact.name}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              style={{ width: '100%' }}
              label='Số điện thoại'
              value={eventPending.organizationContact.phoneNumber}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              style={{ width: '100%' }}
              label='Địa chỉ email'
              value={eventPending.organizationContact.email}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              style={{ width: '100%' }}
              label='Địa chỉ '
              value={eventPending.organizationContact.address}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              style={{ width: '100%' }}
              label='Địa chỉ '
              value={eventPending.organizationContact.address}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              style={{ width: '100%' }}
              label='Vị trí nhân sự'
              value={eventPending.organizationContact.position}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              style={{ width: '100%' }}
              label='Ngày sinh'
              value={formatDateOfBirth(eventPending.organizationContact.birth)}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              style={{ width: '100%' }}
              label='Giới tính'
              value={eventPending.organizationContact.gender ? 'Nam' : 'Nữ'}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPendingOrganization
