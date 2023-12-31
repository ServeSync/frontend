/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UseFieldArrayReturn,
  Control,
  UseFormGetValues,
  UseFormResetField,
  UseFormSetValue,
  FieldErrors
} from 'react-hook-form'
import { FormEventType } from '../../../utils'
import { EventActivityType, EventRole } from '../../../interfaces'
import RegisterEventTimeForm from 'src/modules/EventManagement/components/EventForm/RegisterEventTimeForm'
import RegisterEventRoleForm from 'src/modules/EventManagement/components/EventForm/RegisterEventRoleForm'
import { EditorState } from 'draft-js'

interface Props {
  page: number
  index: number
  control: Control<FormEventType>
  getValues: UseFormGetValues<FormEventType>
  errors: FieldErrors<FormEventType>
  resetField: UseFormResetField<FormEventType>
  setValue: UseFormSetValue<FormEventType>
  FieldRegistration: UseFieldArrayReturn<FormEventType, 'registrationInfos'>
  FieldAttendance: UseFieldArrayReturn<FormEventType, 'attendanceInfos'>
  dataEventRole: EventRole[]
  setDataEventRole: React.Dispatch<React.SetStateAction<EventRole[]>>
  descriptionEventRole: EditorState
  setDescriptionEventRole: React.Dispatch<React.SetStateAction<EditorState>>
  activitySelected: EventActivityType | null | undefined
}

const CreateEventRegistration = ({
  page,
  index,
  control,
  getValues,
  errors,
  setValue,
  resetField,
  FieldRegistration,
  FieldAttendance,
  dataEventRole,
  setDataEventRole,
  descriptionEventRole,
  setDescriptionEventRole,
  activitySelected
}: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-2' aria-controls='simple-tabpanel-2'>
      {page === index && (
        <div className='flex flex-col'>
          <RegisterEventTimeForm
            control={control}
            errors={errors}
            FieldRegistration={FieldRegistration}
            FieldAttendance={FieldAttendance}
          />
          <RegisterEventRoleForm
            control={control}
            getValues={getValues}
            setValue={setValue}
            errors={errors}
            resetField={resetField}
            dataEventRole={dataEventRole}
            setDataEventRole={setDataEventRole}
            descriptionEventRole={descriptionEventRole}
            setDescriptionEventRole={setDescriptionEventRole}
            activitySelected={activitySelected}
          />
        </div>
      )}
    </div>
  )
}

export default CreateEventRegistration
