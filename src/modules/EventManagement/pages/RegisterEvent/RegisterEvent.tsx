/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UseFieldArrayReturn,
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormResetField
} from 'react-hook-form'
import { FormEventType } from '../../utils'
import RegisterEventRoleTable from '../../components/RegisterEventRoleTable'
import RegisterEventTimeForm from '../../components/RegisterEventTimeForm'
import RegisterEventRoleForm from '../../components/RegisterEventRoleForm'
import { EventRole } from '../../interfaces'

interface Props {
  page: number
  index: number
  register: UseFormRegister<FormEventType>
  control: Control<FormEventType>
  errors: FieldErrors<FormEventType>
  getValues: UseFormGetValues<FormEventType>
  resetField: UseFormResetField<FormEventType>
  FieldRegistration: UseFieldArrayReturn<FormEventType, 'registrationInfos'>
  FieldAttendance: UseFieldArrayReturn<FormEventType, 'attendanceInfos'>
  dataEventRole: EventRole[]
  setDataEventRole: React.Dispatch<React.SetStateAction<EventRole[]>>
}

const RegisterEvent = ({
  page,
  index,
  register,
  control,
  errors,
  getValues,
  resetField,
  FieldRegistration,
  FieldAttendance,
  dataEventRole,
  setDataEventRole
}: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-2' aria-controls='simple-tabpanel-2'>
      {page === index && (
        <div className='flex flex-col'>
          <RegisterEventTimeForm
            errors={errors}
            control={control}
            FieldRegistration={FieldRegistration}
            FieldAttendance={FieldAttendance}
          />
          <RegisterEventRoleTable dataEventRole={dataEventRole} setDataEventRole={setDataEventRole} />
          <RegisterEventRoleForm
            register={register}
            errors={errors}
            control={control}
            getValues={getValues}
            resetField={resetField}
            dataEventRole={dataEventRole}
            setDataEventRole={setDataEventRole}
          />
        </div>
      )}
    </div>
  )
}

export default RegisterEvent
