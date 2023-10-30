import { Control, UseFormSetValue, FieldErrors, UseFormRegister } from 'react-hook-form'
import { useState } from 'react'
import { FormEventType } from '../../utils'
import useQueryActivityConfig from '../../hooks/useQueryActivityConfig'
import useQueryEventCategoryConfig from '../../hooks/useQueryEventCategoryConfig'
import { GetAllActivitiesByCategoryIdQuery, GetAllEventCategoriesQuery } from '../../services'
import { ActivitiesListType, EventCategoriesListType } from '../../interfaces'
import CreateEventForm from '../../components/CreateEventForm'

interface Props {
  page: number
  index: number
  control: Control<FormEventType>
  register: UseFormRegister<FormEventType>
  setValue: UseFormSetValue<FormEventType>
  errors: FieldErrors<FormEventType>
  file: File | undefined
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

const CreateEvent = ({ page, index, register, control, setValue, errors, file, setFile }: Props) => {
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
        <CreateEventForm
          control={control}
          register={register}
          setValue={setValue}
          errors={errors}
          eventCategories={eventCategories && eventCategories.data}
          activities={activities && activities.data}
          file={file}
          setFile={setFile}
          onChangeCategory={handleChangeCategory}
          setEventCategoriesSearch={setEventCategoriesSearch}
          setActivitiesSearch={setActivitiesSearch}
        />
      )}
    </div>
  )
}

export default CreateEvent
