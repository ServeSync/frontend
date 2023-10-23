import { Control, FieldErrors, UseFormRegister, UseFormReset, UseFormSetValue } from 'react-hook-form'
import { FormRequestEventType } from '../../utils'
import RequestCreateEventForm from '../../components/RequestCreateEventForm'
import { GetAllEventCategoriesQuery } from '../../services'
import { EventCategoriesListType } from '../../interfaces'

interface Props {
  page: number
  index: number
  register: UseFormRegister<FormRequestEventType>
  control: Control<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
  setValue: UseFormSetValue<FormRequestEventType>
  reset: UseFormReset<FormRequestEventType>
}

const RequestCreteEvent = ({ page, index, setValue, errors, register, reset, control }: Props) => {
  const getAllEventCategoriesQuery = new GetAllEventCategoriesQuery()
  const eventCategories = getAllEventCategoriesQuery.fetch() as EventCategoriesListType

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && (
        <RequestCreateEventForm
          reset={reset}
          setValue={setValue}
          eventCategories={eventCategories}
          register={register}
          errors={errors}
          control={control}
        />
      )}
    </div>
  )
}

export default RequestCreteEvent
