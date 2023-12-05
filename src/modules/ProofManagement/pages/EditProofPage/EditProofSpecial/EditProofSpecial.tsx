import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GetAllEventActivitiesQuery } from 'src/modules/EventManagement/services'
import ProofSpecialForm from 'src/modules/ProofManagement/components/ProofForm/ProofSpecialForm'
import { ProofDetailType } from 'src/modules/ProofManagement/interfaces'
import { EditProofSpecialCommandHandler } from 'src/modules/ProofManagement/services/Proof/editProofSpecial.command-handler'
import { FormProofSpecialSchema, FormProofSpecialType } from 'src/modules/ProofManagement/utils'
import Button from 'src/modules/Share/components/Button'

interface Props {
  proof: ProofDetailType
  handleDeleteProof: (id: string) => void
  isLoadingDelete: boolean
}

const EditProofSpecial = ({ proof, handleDeleteProof, isLoadingDelete }: Props) => {
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

  const editProofSpecialCommandHandler = new EditProofSpecialCommandHandler()

  const handleSubmitForm = handleSubmit((data) => {
    // makeProofSpecialCommandHandler.handle(
    //   data,
    //   file as File,
    //   () => {
    //     handleCloseModalProofFormSpecial()
    //     handleCloseModalProofSelect()
    //     toast.success('Tạo minh chứng thành công !')
    //   },
    //   (error: any) => {
    //     handleError<FormProofSpecialType>(error, setError)
    //   }
    // )
    console.log(data)
  })

  return (
    <form className='w-full' onSubmit={handleSubmitForm}>
      <ProofSpecialForm
        control={control}
        register={register}
        errors={errors}
        activities={activities}
        previewImage={previewImage}
        handleChangeFile={handleChangeFile}
      />
      {proof && proof.proofStatus === 'Pending' && (
        <div className='flex justify-end items-center gap-6'>
          <Button
            type='button'
            classNameButton='flex justify-center items-center bg-[#da2626] w-[100px] h-[40px] text-white p-2 rounded-xl font-semibold transition-all duration-300 hover:bg-[#8e1919]/90'
            isLoading={isLoadingDelete}
            onClick={() => handleDeleteProof(proof?.id as string)}
          >
            Xóa
          </Button>
          <Button
            type='submit'
            classNameButton='flex justify-center items-center bg-[#26c6da] w-[118px] h-[40px] text-white p-2 rounded-xl font-semibold transition-all duration-300 hover:bg-[#195E8E]/90'
            isLoading={editProofSpecialCommandHandler.isLoading()}
          >
            Xác nhận
          </Button>
        </div>
      )}
    </form>
  )
}

export default EditProofSpecial
