import RequestEventOrganizerForm from '../../components/RequestEventOrganizerForm'
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormRequestEventType } from '../../utils'

interface Props {
  page: number
  index: number
  register: UseFormRegister<FormRequestEventType>
  control: Control<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
}
const RequestEventOrganizer = ({ page, index, register, control, errors }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-3' aria-controls='simple-tabpanel-3'>
      {page === index && (
        <div>
          <RequestEventOrganizerForm control={control} errors={errors} register={register} />
        </div>
      )}
    </div>
  )
}

export default RequestEventOrganizer
