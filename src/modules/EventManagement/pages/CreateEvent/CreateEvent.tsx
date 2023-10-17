import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CreateEventForm from '../../components/CreateEventForm'
import { FormEventSchema, FormEventType } from '../../utils'
import { EventCategoriesListType } from '../../interfaces'
import { GetAllEventCategoriesQuery } from '../../services/EventCategory'

interface Props {
  page: number
  index: number
}

const CreateEvent = ({ page, index }: Props) => {
  const getAllEventCategoriesQuery = new GetAllEventCategoriesQuery()
  const eventCategories = getAllEventCategoriesQuery.fetch() as EventCategoriesListType

  const FormCreateEvent = useForm<FormEventType>({
    resolver: yupResolver(FormEventSchema)
  })

  const handleSubmitFormCreateEvent = FormCreateEvent.handleSubmit((data) => {
    console.log(data)
  })

  const handleResetFormCreateEvent = () => {
    FormCreateEvent.reset()
  }

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && (
        <form onSubmit={handleSubmitFormCreateEvent}>
          <CreateEventForm
            register={FormCreateEvent.register}
            control={FormCreateEvent.control}
            errors={FormCreateEvent.formState.errors}
            handleResetForm={handleResetFormCreateEvent}
            eventCategories={eventCategories && eventCategories.data}
          />
        </form>
      )}
    </div>
  )
}

export default CreateEvent
