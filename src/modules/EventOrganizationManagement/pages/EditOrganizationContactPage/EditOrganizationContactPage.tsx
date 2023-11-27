/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import Button from 'src/modules/Share/components/Button'
import { ContactType, EventOrganizationType } from '../../interfaces'
import { useMemo, useState } from 'react'
import EditEventOrganizationContactForm from '../../components/EditEventOrganizationContactForm'
import { useForm } from 'react-hook-form'
import { FormEventOrganizationContactSchema, FormEventOrganizationContactType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { EditEventOrganizationContactCommandHandler } from '../../services/EventOrganization/editEventOrganizationContact.command-handler'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import { StatusOrganizationToMessage } from '../../constants'
import Swal from 'sweetalert2'
import { handleError } from 'src/modules/Share/utils'
import { DeleteEventOrganizationContactCommandHandler } from '../../services'
interface Props {
  eventOrganization: EventOrganizationType
  OrganizationContact: ContactType | null
  handleClose: () => void
}
const EditOrganizationContactPage = ({ eventOrganization, OrganizationContact, handleClose }: Props) => {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
    setValue('imageUrl', ' ')
    setError('imageUrl', { message: '' })
  }
  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<FormEventOrganizationContactType>({
    resolver: yupResolver(FormEventOrganizationContactSchema)
  })

  const editOrganizationContactCommandHandler = new EditEventOrganizationContactCommandHandler()

  const handleEditOrganizationContact = handleSubmit(async (data) => {
    editOrganizationContactCommandHandler.handle(
      {
        id: eventOrganization.id as string,
        idContact: OrganizationContact?.id as string,
        data: data
      },
      file as File,
      () => {
        toast.success('Sửa thông tin thành viên thành công !')
        handleClose()
      },
      (error: any) => {
        handleError<FormEventOrganizationContactType>(error, setError)
      }
    )
  })

  const deleteEventOrganizationCommandHandler = new DeleteEventOrganizationContactCommandHandler()

  const handleDeleteOrganizationContact = (id: string, idContact: string) => {
    Swal.fire({
      title: 'Xác nhận xóa?',
      text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEventOrganizationCommandHandler.handle(
          id,
          idContact,
          () => {
            toast.success('Xóa thành viên thành công !')
            handleClose()
          },
          (error: any) => {
            handleError<FormEventOrganizationContactType>(error, setError)
          }
        )
      }
    })
  }

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[1000px]'>
      {OrganizationContact && (
        <div className='flex justify-between items-center w-full'>
          <div className='flex justify-center items-center gap-x-4'>
            <h2 className='text-[20px] font-semibold'>Thông tin thành viên </h2>
            <div
              className={classNames('px-2 py-2 rounded-full text-[12px] text-white', {
                'bg-[#195E8E]/80': OrganizationContact.status === 'Pending',
                'bg-[#26dc9c]/80': OrganizationContact.status === 'Active',
                'bg-[#ff4d4f]/80': OrganizationContact.status === 'Rejected'
              })}
            >
              {StatusOrganizationToMessage(OrganizationContact.status)}
            </div>
          </div>

          <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleClose}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 '
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </Button>
        </div>
      )}

      <form className='w-full px-2' onSubmit={handleEditOrganizationContact}>
        <EditEventOrganizationContactForm
          eventOrganization={eventOrganization}
          OrganizationContact={OrganizationContact}
          register={register}
          setValue={setValue}
          previewImage={previewImage}
          control={control}
          errors={errors}
          onChange={handleChangeFile}
          handleDeleteOrganizationContact={handleDeleteOrganizationContact}
          isLoading={editOrganizationContactCommandHandler.isLoading()}
        />
      </form>
    </div>
  )
}

export default EditOrganizationContactPage
