import { Control, UseFormSetValue, FieldErrors, UseFormRegister, UseFormSetError } from 'react-hook-form'
import { useState } from 'react'
import { FormEventType } from '../../../utils'
import { GetAllActivitiesByCategoryIdQuery, GetAllEventCategoriesQuery } from '../../../services'
import { ActivityType, EventCategoryType } from 'src/modules/EventManagement/interfaces'
import { EditorState } from 'draft-js'
import CreateEventInformationForm from 'src/modules/EventManagement/components/EventForm/CreateEventInformationForm'

interface Props {
  page: number
  index: number
  control: Control<FormEventType>
  register: UseFormRegister<FormEventType>
  setValue: UseFormSetValue<FormEventType>
  setError: UseFormSetError<FormEventType>
  errors: FieldErrors<FormEventType>
  file: File | undefined
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  description: EditorState
  setDescription: React.Dispatch<React.SetStateAction<EditorState>>
}

const CreateEventInformation = ({
  page,
  index,
  register,
  control,
  setValue,
  setError,
  errors,
  file,
  setFile,
  description,
  setDescription
}: Props) => {
  const [categoryId, setCategoryId] = useState<string>('')

  const handleChangeCategory = (id: string) => {
    setCategoryId(id)
  }

  const getAllEventCategoriesQuery = new GetAllEventCategoriesQuery('Event')
  const eventCategories = getAllEventCategoriesQuery.fetch() as EventCategoryType[]

  const getAllActivitiesByCategoryIdQuery = new GetAllActivitiesByCategoryIdQuery(categoryId)
  const activities = getAllActivitiesByCategoryIdQuery.fetch() as ActivityType[]

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && (
        <CreateEventInformationForm
          control={control}
          register={register}
          setValue={setValue}
          setError={setError}
          errors={errors}
          eventCategories={eventCategories && eventCategories}
          activities={activities && activities}
          file={file}
          setFile={setFile}
          onChangeCategory={handleChangeCategory}
          description={description}
          setDescription={setDescription}
        />
      )}
    </div>
  )
}

export default CreateEventInformation
