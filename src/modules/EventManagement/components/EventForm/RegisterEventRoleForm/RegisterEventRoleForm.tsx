import { Control, Controller, UseFormGetValues, UseFormResetField, UseFormSetValue } from 'react-hook-form'
import { Fragment, useEffect, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import Button from 'src/modules/Share/components/Button'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { FormEventType } from '../../../utils'
import { EventDetailType, EventRole } from '../../../interfaces'
import { RoleTableHeader, isNeedApprove } from '../../../constants'
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import Parser from 'html-react-parser'

interface Props {
  control: Control<FormEventType>
  getValues: UseFormGetValues<FormEventType>
  resetField: UseFormResetField<FormEventType>
  setValue: UseFormSetValue<FormEventType>
  dataEventRole: EventRole[]
  setDataEventRole: React.Dispatch<React.SetStateAction<EventRole[]>>
  event?: EventDetailType
}

const RegisterEventRoleForm = ({
  control,
  getValues,
  resetField,
  setValue,
  dataEventRole,
  setDataEventRole,
  event
}: Props) => {
  const [isEditEventRole, setIsEditEventRole] = useState<boolean>(false)
  const [description, setDescription] = useState<EditorState>(EditorState.createEmpty())

  const onEditorStateChange = (editorState: EditorState) => {
    setDescription(editorState)
  }

  const [index, setIndex] = useState<number>(0)
  const [errors, setErrors] = useState<string>('')

  useEffect(() => {
    event && setDataEventRole(event.roles)
  }, [event, setDataEventRole])

  const onEditEventRole = (index: number) => {
    setIsEditEventRole(true)
    setIndex(index)
    const data = [...dataEventRole]
    setValue('roles.name', data[index].name)
    setValue('roles.isNeedApprove', data[index].isNeedApprove)
    setValue('roles.quantity', data[index].quantity)
    setValue('roles.score', data[index].score)
    const blocksFromHTML = convertFromHTML(data[index].description as string)
    const description = EditorState.createWithContent(
      ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
    )
    setDescription(description)
  }

  const handleSubmit = () => {
    const role = {
      name: { ...getValues('roles') }.name as string,
      isNeedApprove: { ...getValues('roles') }.isNeedApprove as string,
      description: draftToHtml(convertToRaw(description.getCurrentContent())),
      quantity: ({ ...getValues('roles') }.quantity as string).replace(/^0+/, ''),
      score: ({ ...getValues('roles') }.score as string).replace(/^0+/, '')
    }
    const regexNumber = /^\d+$/
    const eventRoles: EventRole[] = [...dataEventRole]
    isEditEventRole ? eventRoles.splice(index, 1) : eventRoles
    if (role.description && role.isNeedApprove && role.name && role.quantity && role.score) {
      if (role.name.length < 5) {
        setErrors('Tên vài trò ít nhất 5 kí tự !')
      } else if (role.description.length <= 10) {
        setErrors('Mô tả vài trò ít nhất 10 kí tự !')
      } else if (eventRoles.some((item) => item.name === role.name)) {
        setErrors('Vai trò đã tồn tại !')
      } else if (!regexNumber.test(role.quantity) || !regexNumber.test(role.score)) {
        setErrors('Vui lòng nhập số lượng và điểm là số dương !')
      } else {
        if (isEditEventRole) {
          const data = [...dataEventRole]
          data[index] = role
          setDataEventRole(data)
          setIsEditEventRole(false)
        } else {
          setDataEventRole([...dataEventRole, role])
        }
        setErrors('')
        reset()
        setDescription(EditorState.createEmpty())
      }
    } else {
      setErrors('Vui lòng nhập đầy đủ dữ liệu !')
    }
  }

  const handleRemoveEventRole = (id: number) => {
    const data = [...dataEventRole]
    data.splice(id, 1)
    setDataEventRole(data)
  }

  const handleResetForm = () => {
    reset()
    setDescription(EditorState.createEmpty())
  }

  const handleCancelEdit = () => {
    setIsEditEventRole(false)
    reset()
    setDescription(EditorState.createEmpty())
  }

  const reset = () => {
    resetField('roles.name')
    resetField('roles.description')
    resetField('roles.quantity')
    resetField('roles.score')
    resetField('roles.isNeedApprove')
  }

  return (
    <Fragment>
      <div>
        <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
          <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
            <tr className='text-[16px] text-gray-600'>
              {RoleTableHeader.map((item) => (
                <th className='px-2 py-2 font-semibold' key={item.id}>
                  <span>{item.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataEventRole &&
              dataEventRole.length !== 0 &&
              dataEventRole.map((item, index) => (
                <tr
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                  key={index}
                >
                  <th className='px-2 py-4 font-medium w-[20%] overflow-hidden'>
                    <span className='line-clamp-1'>{item.name}</span>
                  </th>
                  <th className='px-2 py-4 font-medium overflow-hidden'>
                    <span className='line-clamp-1'>{Parser(item.description)}</span>
                  </th>
                  <th className='px-2 py-4 font-medium w-[8%]'>{item.quantity}</th>
                  <th className='px-2 py-4 font-medium w-[4%]'>{item.score}</th>
                  <th className='px-2 py-4 font-medium w-[12%]'>
                    <input
                      type='checkbox'
                      defaultChecked={item.isNeedApprove === 'true'}
                      disabled
                      readOnly
                      className='ml-12'
                    />
                  </th>
                  <th className='px-2 py-4 font-medium w-[10%]'>
                    <div>
                      <Button
                        type='button'
                        classNameButton='py-2 px-2 rounded-lg text-[14px] hover:bg-gray-200'
                        onClick={() => onEditEventRole(index)}
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
              ))}
          </tbody>
        </table>
      </div>
      <div className='border-[1px] border-gray-300 p-4'>
        <div className='grid grid-cols-12 gap-6'>
          <Controller
            name='roles.name'
            control={control}
            render={({ field: { onChange, value = '' } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-4'>
                  <TextField
                    id='role_name'
                    label='Vai trò'
                    placeholder='Nhập vai trò'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='roles.quantity'
            control={control}
            render={({ field: { onChange, value = '' } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-2'>
                  <TextField
                    id='role_quantity'
                    label='Số lượng'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='roles.score'
            control={control}
            render={({ field: { onChange, value = '' } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-2'>
                  <TextField
                    id='role_score'
                    label='Điểm'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name={'roles.isNeedApprove'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-4'>
                  <Autocomplete
                    disablePortal
                    id='isNeedApprove'
                    options={isNeedApprove}
                    value={isNeedApprove.find((option) => option.id === value) || null}
                    getOptionLabel={(option) => option.name}
                    noOptionsText='Không có lựa chọn'
                    renderInput={(params) => <TextField {...params} label='Yêu cầu duyệt' />}
                    onChange={(_, option) => onChange(option ? option.id : '')}
                    className='bg-white'
                  />
                </div>
              </LocalizationProvider>
            )}
          />
          <div className='col-span-12'>
            <div className='border-[1px] border-[#C8C8C8] rounded-lg overflow-hidden'>
              <Editor
                editorState={description}
                onEditorStateChange={onEditorStateChange}
                placeholder='Nhập mô tả vai trò'
              />
            </div>
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors}</span>
          </div>
          <div className='flex justify-end col-span-12 gap-4'>
            {isEditEventRole && (
              <Button
                type='button'
                classNameButton='bg-gray-300 py-2 px-6 rounded-xl text-[14px] text-white font-semibold h-[48px]'
                onClick={handleCancelEdit}
              >
                Hủy
              </Button>
            )}
            <Button
              type='button'
              classNameButton='bg-[#da4848] py-2 px-6 rounded-xl text-[14px] text-white font-semibold h-[48px]'
              onClick={handleResetForm}
            >
              Làm mới
            </Button>
            <Button
              type='button'
              classNameButton='bg-[#26C6DA] py-2 px-6 rounded-xl text-[14px] text-white font-semibold h-[48px]'
              onClick={handleSubmit}
            >
              {isEditEventRole ? 'Lưu' : 'Thêm'}
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default RegisterEventRoleForm
