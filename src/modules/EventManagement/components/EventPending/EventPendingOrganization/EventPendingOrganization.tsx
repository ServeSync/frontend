import { TextField } from '@mui/material'
import { ContentState, EditorState, convertFromHTML } from 'draft-js'
import { EventPendingType } from 'src/modules/EventManagement/interfaces'
import { Editor } from 'react-draft-wysiwyg'
import { formatDateOfBirth } from 'src/modules/Share/utils'

interface Props {
  eventPending: EventPendingType
}

const EventPendingOrganization = ({ eventPending }: Props) => {
  if (!eventPending) return null
  const contentState = convertFromHTML(eventPending.organization.description)
  const description = EditorState.createWithContent(
    ContentState.createFromBlockArray(contentState.contentBlocks, contentState.entityMap)
  )

  return (
    <div className='flex flex-col gap-y-8 w-full mx-auto'>
      <div>
        <h2 className='text-[24px] text-black font-bold col-span-4 mb-10 bg-transparent'>Thông tin ban tổ chức</h2>
        <div className='grid grid-cols-8 gap-4'>
          <div className='col-span-2 row-span-3'>
            <div className='relative bg-slate-300 rounded-full outline-none w-full pt-[100%]'>
              <img
                src={eventPending.organization.imageUrl}
                alt=''
                className='rounded-full top-0 h-full w-full object-cover object-top absolute'
              />
            </div>
          </div>
          <div className='col-span-3'>
            <TextField
              className='w-full'
              label='Tên tổ chức'
              value={eventPending.organization.name}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              className='w-full'
              label='Số điện thoại'
              value={eventPending.organization.phoneNumber}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              className='w-full'
              label='Địa chỉ email'
              value={eventPending.organization.email}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              className='w-full'
              label='Địa chỉ '
              value={eventPending.organization.address}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-6'>
            <div className='border-[1px] border-[#C8C8C8] rounded-lg overflow-hidden'>
              <Editor readOnly editorState={description} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-[24px] text-black font-bold col-span-4 mb-10 bg-transparent'>Thông tin người đại diện</h2>
        <div className='grid grid-cols-8 gap-4'>
          <div className='col-span-2'>
            <div className='relative bg-slate-300 rounded-full outline-none w-full pt-[100%]'>
              <img
                src={eventPending.organizationContact.imageUrl}
                alt=''
                className='rounded-full top-0 h-full w-full object-cover object-top absolute'
              />
            </div>
          </div>
          <div className='col-span-6 grid grid-cols-2 gap-4'>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Tên người đại diện'
                value={eventPending.organizationContact.name}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Số điện thoại'
                value={eventPending.organizationContact.phoneNumber}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Địa chỉ email'
                value={eventPending.organizationContact.email}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Địa chỉ '
                value={eventPending.organizationContact.address}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Địa chỉ '
                value={eventPending.organizationContact.address}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Vị trí nhân sự'
                value={eventPending.organizationContact.position}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Ngày sinh'
                value={formatDateOfBirth(eventPending.organizationContact.birth)}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
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
    </div>
  )
}

export default EventPendingOrganization
