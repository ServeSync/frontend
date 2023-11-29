/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from 'src/modules/Share/components/Button'
import CreateEventOrganizationContactForm from '../../components/CreateEventOrganizationContactForm'
import { useForm } from 'react-hook-form'
import { FormEventOrganizationContactSchema, FormEventOrganizationContactType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo, useState } from 'react'
import { CreateEventOrganizationContactCommandHandler } from '../../services'
import { EventOrganizationType } from '../../interfaces'
import { toast } from 'react-toastify'
import { handleError } from 'src/modules/Share/utils'

interface Props {
  eventOrganization: EventOrganizationType
  handleClose: () => void
}

const CreateEventOrganizationContactPage = ({ eventOrganization, handleClose }: Props) => {
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

  const createOrganizationContactCommandHandler = new CreateEventOrganizationContactCommandHandler()

  const handleCreateOrganizationContact = handleSubmit(async (data) => {
    try {
      if (data.email === eventOrganization.email) {
        setError('email', { message: 'Email không được trùng email tổ chức' })
        return
      }
      await createOrganizationContactCommandHandler.handle(
        {
          id: eventOrganization.id as string,
          data: data
        },
        file as File,
        () => {
          toast.success('Gửi lời mời thành viên thành công !')
          handleClose()
        },
        (error: any) => {
          handleError<FormEventOrganizationContactType>(error, setError)
        }
      )
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[1000px]'>
      <div className='flex justify-between items-center w-full'>
        <h2 className='text-[20px] font-semibold'>Thông tin thành viên</h2>
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
      <form className='w-full px-2' onSubmit={handleCreateOrganizationContact}>
        <CreateEventOrganizationContactForm
          register={register}
          control={control}
          errors={errors}
          onChange={handleChangeFile}
          previewImage={previewImage}
          isLoading={createOrganizationContactCommandHandler.isLoading()}
          handleClose={handleClose}
        />
      </form>
    </div>
  )
}

export default CreateEventOrganizationContactPage
