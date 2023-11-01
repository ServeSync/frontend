import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { FormRequestEventType } from '../../utils'
import RequestCreateEventForm from '../../components/RequestCreateEventForm'
import { GetAllActivitiesByCategoryIdQuery, GetAllEventCategoriesQuery } from '../../services'
import { ActivitiesListType, EventCategoriesListType, MarkerType } from '../../interfaces'
import useQueryEventCategoryConfig from '../../hooks/useQueryEventCategoryConfig'
import useQueryActivityConfig from '../../hooks/useQueryActivityConfig'
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

const RequestCreteEvent = ({
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
  const [eventCategoriesSearch, setEventCategoriesSearch] = useState<string>('')
  const [activitiesSearch, setActivitiesSearch] = useState<string>('')

  const queryActivityConfig = useQueryActivityConfig(activitiesSearch)
  const queryEventCategoryConfig = useQueryEventCategoryConfig(eventCategoriesSearch)

  const getAllEventCategoriesQuery = new GetAllEventCategoriesQuery(queryEventCategoryConfig)
  const eventCategories = getAllEventCategoriesQuery.fetch() as EventCategoriesListType

  const getAllActivitiesByCategoryIdQuery = new GetAllActivitiesByCategoryIdQuery(categoryId, queryActivityConfig)
  const activities = getAllActivitiesByCategoryIdQuery.fetch() as ActivitiesListType

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && (
        <div className='gap-y-2 w-full mx-auto'>
          <RequestCreateEventForm
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            eventCategories={eventCategories && eventCategories.data}
            activities={activities && activities?.data}
            file={file}
            setFile={setFile}
            handleChangeCategory={handleChangeCategory}
            setEventCategoriesSearch={setEventCategoriesSearch}
            setActivitiesSearch={setActivitiesSearch}
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

export default RequestCreteEvent
