import { Control, UseFormSetValue, FieldErrors, UseFormRegister } from 'react-hook-form'
import { useEffect } from 'react'
import { FormEventType } from '../../../utils'
import { EventActivityType, EventCategoryType, EventDetailType } from 'src/modules/EventManagement/interfaces'
import { EditorState } from 'draft-js'
import CreateEventInformationForm from 'src/modules/EventManagement/components/EventForm/CreateEventInformationForm'

interface Props {
  page: number
  index: number
  control: Control<FormEventType>
  register: UseFormRegister<FormEventType>
  setValue: UseFormSetValue<FormEventType>
  errors: FieldErrors<FormEventType>
  file: File | undefined
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  event: EventDetailType
  descriptionEvent: EditorState
  setDescriptionEvent: React.Dispatch<React.SetStateAction<EditorState>>
  setActivitySelected: React.Dispatch<React.SetStateAction<EventActivityType | null | undefined>>
  eventCategories: EventCategoryType[]
  activities: EventActivityType[]
  setCategoryId: React.Dispatch<React.SetStateAction<string>>
}

const EditEventInformation = ({
  page,
  index,
  register,
  control,
  setValue,
  errors,
  file,
  setFile,
  event,
  descriptionEvent,
  setDescriptionEvent,
  setActivitySelected,
  eventCategories,
  activities,
  setCategoryId
}: Props) => {
  const handleChangeCategory = (id: string) => {
    setCategoryId(id)
  }

  useEffect(() => {
    event && setCategoryId(event.activity.eventCategoryId)
  }, [event, setCategoryId])

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && (
        <CreateEventInformationForm
          control={control}
          register={register}
          setValue={setValue}
          errors={errors}
          eventCategories={eventCategories && eventCategories}
          activities={activities && activities}
          file={file}
          setFile={setFile}
          onChangeCategory={handleChangeCategory}
          event={event}
          descriptionEvent={descriptionEvent}
          setDescriptionEvent={setDescriptionEvent}
          setActivitySelected={setActivitySelected}
        />
      )}
    </div>
  )
}

export default EditEventInformation
