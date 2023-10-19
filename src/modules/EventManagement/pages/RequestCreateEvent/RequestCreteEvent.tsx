import { Control, FieldErrors, UseFormRegister, useForm } from 'react-hook-form'
import { FormRequestEventSchema, FormRequestEventType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import RequestCreateEventForm from '../../components/RequestCreateEventForm'
import { GetAllEventCategoriesQuery } from '../../services'
import { EventCategoriesListType } from '../../interfaces'

interface Props {
  page: number
  index: number
  register: UseFormRegister<FormRequestEventType>
  control: Control<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
}

const RequestCreteEvent = ({ page, index }: Props) => {
  const FormCreateEvent = useForm<FormRequestEventType>({
    resolver: yupResolver(FormRequestEventSchema)
  })

  const handleResetFormCreateEvent = () => {
    FormCreateEvent.reset()
  }

  const getAllEventCategoriesQuery = new GetAllEventCategoriesQuery()
  const eventCategories = getAllEventCategoriesQuery.fetch() as EventCategoriesListType

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && (
        <RequestCreateEventForm
          eventCategories={eventCategories}
          register={FormCreateEvent.register}
          errors={FormCreateEvent.formState.errors}
          control={FormCreateEvent.control}
          handleResetForm={handleResetFormCreateEvent}
        />
      )}
    </div>
  )
}

export default RequestCreteEvent
