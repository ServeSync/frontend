import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CreateEventForm from '../../components/CreateEventForm'
import { FormEventSchema, FormEventType } from '../../utils'
// import moment from 'moment-timezone'

interface Props {
  page: number
  index: number
}

const CreateEvent = ({ page, index }: Props) => {
  const FormCreateEvent = useForm<FormEventType>({
    resolver: yupResolver(FormEventSchema)
  })

  const handleSubmitFormCreateEvent = FormCreateEvent.handleSubmit((data) => {
    console.log(data)
    // const vietnamTime = moment(data.startTime).tz('Asia/Ho_Chi_Minh').format('HH:mm')
    // const vietnamDate = moment(data.startDate).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')
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
            errors={FormCreateEvent.formState.errors}
            control={FormCreateEvent.control}
            handleResetForm={handleResetFormCreateEvent}
          />
        </form>
      )}
    </div>
  )
}

export default CreateEvent
