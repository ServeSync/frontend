import RequestEventOrganizerForm from '../../components/RequestEventOrganizerForm'
import { useForm } from 'react-hook-form'
import { FormEventOrganizerSchema, FormEventOrganizerType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo, useState } from 'react'

interface Props {
  page: number
  index: number
}
const RequestEventOrganizer = ({ page, index }: Props) => {
  const [file1, setFile1] = useState<File>()
  const [file2, setFile2] = useState<File>()

  const previewImage1 = useMemo(() => {
    return file1 ? URL.createObjectURL(file1) : ''
  }, [file1])

  const previewImage2 = useMemo(() => {
    return file2 ? URL.createObjectURL(file2) : ''
  }, [file2])

  const handleChangeFile1 = (file?: File) => {
    setFile1(file)
  }
  const handleChangeFile2 = (file?: File) => {
    setFile2(file)
  }

  const FormRequestEvent = useForm<FormEventOrganizerType>({
    resolver: yupResolver(FormEventOrganizerSchema)
  })

  const handleSubmitFormCreateEvent = FormRequestEvent.handleSubmit(async (data) => {
    console.log(data)
  })

  const handleResetFormCreateEvent = () => {
    FormRequestEvent.reset()
  }

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-3' aria-controls='simple-tabpanel-3'>
      {page === index && (
        <div>
          <form onSubmit={handleSubmitFormCreateEvent}>
            <RequestEventOrganizerForm
              previewImage1={previewImage1}
              previewImage2={previewImage2}
              onChange1={handleChangeFile1}
              onChange2={handleChangeFile2}
              control={FormRequestEvent.control}
              errors={FormRequestEvent.formState.errors}
              register={FormRequestEvent.register}
              handleResetForm={handleResetFormCreateEvent}
            />
          </form>
        </div>
      )}
    </div>
  )
}

export default RequestEventOrganizer
