import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { FormRequestEventType } from '../../../utils'
import RequestCreateEventForm from '../../../components/RequestEventForm/RequestEventForm'
import { GetAllActivitiesByCategoryIdQuery, GetAllEventCategoriesQuery } from '../../../services'
import { ActivityType, EventCategoryType, MarkerType } from '../../../interfaces'
import { useState } from 'react'
import { EditorState } from 'draft-js'

interface Props {
  page: number
  index: number
  register: UseFormRegister<FormRequestEventType>
  control: Control<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
  setValue: UseFormSetValue<FormRequestEventType>
  markers: MarkerType[]
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>
  file: File | undefined
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  description: EditorState
  onEditorStateChange: (editorState: EditorState) => void
}

const RequestEvent = ({
  page,
  index,
  setValue,
  errors,
  register,
  control,
  markers,
  setMarkers,
  file,
  setFile,
  description,
  onEditorStateChange
}: Props) => {
  const [categoryId, setCategoryId] = useState<string>('')

  const handleChangeCategory = (id: string) => {
    setCategoryId(id)
  }

  const getAllEventCategoriesQuery = new GetAllEventCategoriesQuery()
  const eventCategories = getAllEventCategoriesQuery.fetch() as EventCategoryType[]

  const getAllActivitiesByCategoryIdQuery = new GetAllActivitiesByCategoryIdQuery(categoryId)
  const activities = getAllActivitiesByCategoryIdQuery.fetch() as ActivityType[]

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && (
        <div className='gap-y-2 w-full mx-auto'>
          <RequestCreateEventForm
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            eventCategories={eventCategories}
            activities={activities}
            file={file}
            setFile={setFile}
            handleChangeCategory={handleChangeCategory}
            markers={markers}
            setMarkers={setMarkers}
            description={description}
            onEditorStateChange={onEditorStateChange}
          />
        </div>
      )}
    </div>
  )
}

export default RequestEvent
