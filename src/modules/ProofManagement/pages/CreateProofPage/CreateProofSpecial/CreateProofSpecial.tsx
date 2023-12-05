/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { handleError } from 'src/modules/Share/utils'
import { GetAllEventActivitiesQuery } from 'src/modules/EventManagement/services'
import { FormProofSpecialSchema, FormProofSpecialType } from 'src/modules/ProofManagement/utils'
import { MakeProofSpecialCommandHandler } from 'src/modules/ProofManagement/services'
import Button from 'src/modules/Share/components/Button'
import ProofSpecialForm from 'src/modules/ProofManagement/components/ProofForm/ProofSpecialForm'

interface Props {
  handleCloseModalProofFormSpecial: () => void
  handleCloseModalProofSelect: () => void
}

const CreateProofSpecial = ({ handleCloseModalProofFormSpecial, handleCloseModalProofSelect }: Props) => {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
    setValue('imageUrl', ' ')
    setError('imageUrl', { message: '' })
  }

  const getAllEventActivitiesQuery = new GetAllEventActivitiesQuery('Individual')
  const activities = getAllEventActivitiesQuery.fetch()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<FormProofSpecialType>({
    resolver: yupResolver(FormProofSpecialSchema)
  })

  const makeProofSpecialCommandHandler = new MakeProofSpecialCommandHandler()

  const handleSubmitForm = handleSubmit((data) => {
    makeProofSpecialCommandHandler.handle(
      data,
      file as File,
      () => {
        handleCloseModalProofFormSpecial()
        handleCloseModalProofSelect()
        toast.success('Tạo minh chứng thành công !')
      },
      (error: any) => {
        handleError<FormProofSpecialType>(error, setError)
      }
    )
  })

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[620px]  max-h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#a6a6a6] scrollbar-track-[#e1e1e1]'>
      <div className='flex justify-between items-center w-full'>
        <div>
          <h2 className='text-[20px] font-semibold'>Đơn nộp minh chứng</h2>
          <h4 className='text-[12px]'>Đơn này với mục đích nhà trường sẽ xác nhận bạn đã tham gia sự kiện trước đó.</h4>
        </div>
        <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalProofFormSpecial}>
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
      <form className='w-full' onSubmit={handleSubmitForm}>
        <ProofSpecialForm
          control={control}
          register={register}
          errors={errors}
          activities={activities}
          previewImage={previewImage}
          handleChangeFile={handleChangeFile}
        />
        <div className='flex justify-end items-center'>
          <Button
            type='submit'
            classNameButton='flex justify-center items-center bg-[#26c6da] w-[118px] h-[40px] text-white p-2 rounded-xl font-semibold transition-all duration-300 hover:bg-[#195E8E]/90'
            isLoading={makeProofSpecialCommandHandler.isLoading()}
          >
            Xác nhận
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateProofSpecial
