import { TextField } from '@mui/material'
import { ContentState, EditorState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { formatDateOfBirth } from 'src/modules/Share/utils'
import { CollaborationRequestType } from 'src/modules/CollaborationRequestManagement/interfaces'

interface Props {
  collaborationRequest: CollaborationRequestType
}

const CollaborationRequestOrganizationForm = ({ collaborationRequest }: Props) => {
  if (!collaborationRequest) return null

  const contentState = convertFromHTML(collaborationRequest.organization.description)
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
                src={collaborationRequest.organization.imageUrl}
                alt=''
                className='rounded-full top-0 h-full w-full object-cover object-top absolute'
              />
            </div>
          </div>
          <div className='col-span-3'>
            <TextField
              className='w-full'
              label='Tên tổ chức'
              value={collaborationRequest.organization.name}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              className='w-full'
              label='Số điện thoại'
              value={collaborationRequest.organization.phoneNumber}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              className='w-full'
              label='Địa chỉ email'
              value={collaborationRequest.organization.email}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className='col-span-3'>
            <TextField
              className='w-full'
              label='Địa chỉ '
              value={collaborationRequest.organization.address}
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
                src={collaborationRequest.organizationContact.imageUrl}
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
                value={collaborationRequest.organizationContact.name}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Số điện thoại'
                value={collaborationRequest.organizationContact.phoneNumber}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Địa chỉ email'
                value={collaborationRequest.organizationContact.email}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Địa chỉ '
                value={collaborationRequest.organizationContact.address}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Địa chỉ '
                value={collaborationRequest.organizationContact.address}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Vị trí nhân sự'
                value={collaborationRequest.organizationContact.position}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Ngày sinh'
                value={formatDateOfBirth(collaborationRequest.organizationContact.birth)}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1'>
              <TextField
                className='w-full'
                label='Giới tính'
                value={collaborationRequest.organizationContact.gender ? 'Nam' : 'Nữ'}
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

export default CollaborationRequestOrganizationForm
