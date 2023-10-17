import { useForm } from 'react-hook-form'
import CreateEventForm from '../../components/CreateEventForm'
import { FormEventSchema, FormEventType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'

interface Props {
  page: number
  index: number
}
const RequestCreteEvent = ({ page, index }: Props) => {
  const FormCreateEvent = useForm<FormEventType>({
    resolver: yupResolver(FormEventSchema)
  })

  const handleResetFormCreateEvent = () => {
    FormCreateEvent.reset()
  }
  const handleSubmitFormCreateEvent = FormCreateEvent.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && (
        <form onSubmit={handleSubmitFormCreateEvent}>
          <CreateEventForm
            eventCategories={[]}
            register={FormCreateEvent.register}
            errors={FormCreateEvent.formState.errors}
            control={FormCreateEvent.control}
            handleResetForm={handleResetFormCreateEvent}
          />
        </form>
      )}
    </div>
  )
}

export default RequestCreteEvent
