import { Control, UseFormSetValue, FieldErrors, UseFormRegister } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { FormEventType } from '../../../utils'
import { GetAllActivitiesByCategoryIdQuery, GetAllEventCategoriesQuery } from '../../../services'
import EventForm from 'src/modules/EventManagement/components/EventForm/EventForm'
import { ActivityType, EventCategoryType, EventDetailType } from 'src/modules/EventManagement/interfaces'
import { EditorState } from 'draft-js'

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
  description: EditorState
  setDescription: React.Dispatch<React.SetStateAction<EditorState>>
}

const EditEvent = ({
  page,
  index,
  register,
  control,
  setValue,
  errors,
  file,
  setFile,
  event,
  description,
  setDescription
}: Props) => {
  const [categoryId, setCategoryId] = useState<string>(event ? event.activity.eventCategoryId : '')

  const handleChangeCategory = (id: string) => {
    setCategoryId(id)
  }

  useEffect(() => {
    event && setCategoryId(event.activity.eventCategoryId)
  }, [event, setCategoryId])

  const getAllEventCategoriesQuery = new GetAllEventCategoriesQuery('Event')
  const eventCategories = getAllEventCategoriesQuery.fetch() as EventCategoryType[]

  const getAllActivitiesByCategoryIdQuery = new GetAllActivitiesByCategoryIdQuery(categoryId)
  const activities = getAllActivitiesByCategoryIdQuery.fetch() as ActivityType[]

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && (
        <EventForm
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
          description={description}
          setDescription={setDescription}
        />
      )}
    </div>
  )
}

export default EditEvent
