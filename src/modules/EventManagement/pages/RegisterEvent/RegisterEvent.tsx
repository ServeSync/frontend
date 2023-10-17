import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormEventRoleSchema, FormEventRoleType, FormRegisterEventSchema, FormRegisterEventType } from '../../utils'
import RegisterEventForm from '../../components/RegisterEventForm'
import EventRoleTable from '../../components/EventRoleTable'
import EventRoleForm from '../../components/CreateEventRoleForm'

interface Props {
  page: number
  index: number
}

const RegisterEvent = ({ page, index }: Props) => {
  const FormRegisterEvent = useForm<FormRegisterEventType>({
    resolver: yupResolver(FormRegisterEventSchema)
  })

  const handleSubmitFormRegisterEvent = FormRegisterEvent.handleSubmit((data) => {
    console.log(data)
  })

  const handleResetFormRegisterEvent = () => {
    FormRegisterEvent.reset()
  }

  const FormCreateEventRole = useForm<FormEventRoleType>({
    resolver: yupResolver(FormEventRoleSchema)
  })

  const handleSubmitFormEventRole = FormCreateEventRole.handleSubmit((data) => {
    console.log(data)
  })

  const handleResetFormEventRole = () => {
    FormCreateEventRole.reset()
  }
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-2' aria-controls='simple-tabpanel-2'>
      {page === index && (
        <div className='flex flex-col'>
          <form onSubmit={handleSubmitFormRegisterEvent}>
            <RegisterEventForm
              register={FormRegisterEvent.register}
              errors={FormRegisterEvent.formState.errors}
              control={FormRegisterEvent.control}
              handleResetForm={handleResetFormRegisterEvent}
            />
          </form>
          <EventRoleTable />
          <form onSubmit={handleSubmitFormEventRole}>
            <EventRoleForm
              register={FormCreateEventRole.register}
              errors={FormCreateEventRole.formState.errors}
              control={FormCreateEventRole.control}
              handleResetForm={handleResetFormEventRole}
            />
          </form>
        </div>
      )}
    </div>
  )
}

export default RegisterEvent
