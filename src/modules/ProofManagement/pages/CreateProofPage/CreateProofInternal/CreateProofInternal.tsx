/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GetEventByIdQuery } from 'src/modules/EventManagement/services'
import { MakeProofInternalCommandHandler } from 'src/modules/ProofManagement/services'
import { FormProofInternalSchema, FormProofInternalType } from 'src/modules/ProofManagement/utils'
import { GetRegisteredEventsByStudent } from 'src/modules/StudentManagement/services/Students/getRegisteredEventsByStudent.query'
import { toast } from 'react-toastify'
import { handleError } from 'src/modules/Share/utils'
import ProofInternalForm from 'src/modules/ProofManagement/components/ProofForm/ProofInternalForm'
import Button from 'src/modules/Share/components/Button'

interface Props {
  handleCloseModalProofFormInternal: () => void
  handleCloseModalProofSelect: () => void
  studentId: string
}

const CreateProofInternal = ({ handleCloseModalProofFormInternal, handleCloseModalProofSelect, studentId }: Props) => {
  const [eventId, setEventId] = useState<string>()

  const getRegisteredEventsByStudent = new GetRegisteredEventsByStudent(studentId)
  const eventsList = getRegisteredEventsByStudent.fetch()
  const events = eventsList && eventsList.data

  const getEventByIdQuery = new GetEventByIdQuery(eventId as string)
  const event = getEventByIdQuery.fetch()

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

  const makeProofInternalCommandHandler = new MakeProofInternalCommandHandler()

  const handleSubmitForm = handleSubmit((data) => {
    makeProofInternalCommandHandler.handle(
      data,
      file as File,
      () => {
        handleCloseModalProofFormInternal()
        handleCloseModalProofSelect()
        toast.success('Tạo minh chứng thành công !')
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

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[620px]  max-h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#a6a6a6] scrollbar-track-[#e1e1e1]'>
      <div className='flex justify-between items-center w-full'>
        <div>
          <h2 className='text-[20px] font-semibold'>Đơn nộp minh chứng</h2>
          <h4 className='text-[12px]'>Đơn này với mục đích nhà trường sẽ xác nhận bạn đã tham gia sự kiện trước đó.</h4>
        </div>
        <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalProofFormInternal}>
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
        <ProofInternalForm
          control={control}
          register={register}
          errors={errors}
          events={events}
          event={event}
          eventId={eventId}
          setEventId={setEventId}
          previewImage={previewImage}
          handleChangeFile={handleChangeFile}
        />
        <div className='flex justify-end items-center gap-6'>
          <Button
            type='submit'
            classNameButton='flex justify-center items-center bg-[#26c6da] w-[118px] h-[40px] text-white p-2 rounded-xl font-semibold transition-all duration-300 hover:bg-[#195E8E]/90'
            isLoading={makeProofInternalCommandHandler.isLoading()}
          >
            Xác nhận
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateProofInternal
