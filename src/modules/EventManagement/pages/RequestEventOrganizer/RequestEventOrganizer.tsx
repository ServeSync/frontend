import RequestEventOrganizerForm from '../../components/RequestEventOrganizerForm'
import { Control, FieldErrors, UseFormRegister, useForm } from 'react-hook-form'
import { FormRequestEventSchema, FormRequestEventType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'

interface Props {
  page: number
  index: number
  register: UseFormRegister<FormRequestEventType>
  control: Control<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
}
const RequestEventOrganizer = ({ page, index, register, control, errors }: Props) => {
  const FormRequestEvent = useForm<FormRequestEventType>({
    resolver: yupResolver(FormRequestEventSchema)
  })
  const handleResetFormCreateEvent = () => {
    FormRequestEvent.reset()
  }

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-3' aria-controls='simple-tabpanel-3'>
      {page === index && (
        <div>
          <RequestEventOrganizerForm
            control={control}
            errors={errors}
            register={register}
            handleResetForm={handleResetFormCreateEvent}
          />
        </div>
      )}
    </div>
  )
}

export default RequestEventOrganizer
