/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ProofInternalForm from 'src/modules/ProofManagement/components/ProofForm/ProofInternalForm'
import { ProofDetailType } from 'src/modules/ProofManagement/interfaces'
import { EditProofInternalCommandHandler } from 'src/modules/ProofManagement/services/Proof/editProofInternal.command-handler'
import { FormProofInternalSchema, FormProofInternalType } from 'src/modules/ProofManagement/utils'
import Button from 'src/modules/Share/components/Button'
import { handleError } from 'src/modules/Share/utils'
import { GetRegisteredEventsByStudent } from 'src/modules/StudentManagement/services/Students/getRegisteredEventsByStudent.query'

interface Props {
  proof: ProofDetailType
  studentId: string
  handleDeleteProof: (id: string) => void
  isLoadingDelete: boolean
  handleCloseModalChange: () => void
}

const EditProofInternal = ({ proof, studentId, handleDeleteProof, isLoadingDelete, handleCloseModalChange }: Props) => {
  const [eventId, setEventId] = useState<string>()

  const getRegisteredEventsByStudent = new GetRegisteredEventsByStudent(studentId, 'Done')
  const eventsList = getRegisteredEventsByStudent.fetch()
  const events = eventsList && eventsList.data

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
    setValue,
    setError,
    formState: { errors }
  } = useForm<FormProofInternalType>({
    resolver: yupResolver(FormProofInternalSchema)
  })

  const editProofInternalCommandHandler = new EditProofInternalCommandHandler()

  const handleSubmitForm = handleSubmit((data) => {
    editProofInternalCommandHandler.handle(
      {
        id: proof?.id,
        data
      },
      file as File,
      () => {
        handleCloseModalChange()
        toast.success('Cập nhật minh chứng thành công !')
      },
      (error: any) => {
        handleError<FormProofInternalType>(error, setError)
      }
    )
  })

  useEffect(() => {
    if (events && eventId !== undefined) {
      setValue('eventRoleId', events.find((option) => option.id === eventId)?.roleId as string)
    }
  }, [events, eventId, setValue])

  useEffect(() => {
    if (proof) {
      setEventId(proof.eventId)
    }
  }, [setEventId, proof])

  return (
    <form className='w-full' onSubmit={handleSubmitForm}>
      <ProofInternalForm
        control={control}
        register={register}
        errors={errors}
        events={events}
        eventId={eventId}
        setEventId={setEventId}
        previewImage={previewImage}
        handleChangeFile={handleChangeFile}
        setValue={setValue}
        proof={proof}
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
            isLoading={editProofInternalCommandHandler.isLoading()}
          >
            Xác nhận
          </Button>
        </div>
      )}
    </form>
  )
}

export default EditProofInternal
