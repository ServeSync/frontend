import { useForm } from 'react-hook-form'
import { FormRequestEventSchema, FormRequestEventType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import RequestCreateEventForm from '../../components/RequestCreateEventForm'

interface Props {
  page: number
  index: number
}
const RequestCreteEvent = ({ page, index }: Props) => {
  const FormCreateEvent = useForm<FormRequestEventType>({
    resolver: yupResolver(FormRequestEventSchema)
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
          <RequestCreateEventForm
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
