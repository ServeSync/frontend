import { Control, UseFormSetValue, FieldErrors } from 'react-hook-form'
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
  setValue: UseFormSetValue<FormEventType>
  errors: FieldErrors<FormEventType>
}

const CreateEvent = ({ page, index, control, setValue, errors }: Props) => {
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
          setValue={setValue}
          errors={errors}
          eventCategories={eventCategories && eventCategories.data}
          activities={activities && activities.data}
          onChangeCategory={handleChangeCategory}
          setEventCategoriesSearch={setEventCategoriesSearch}
          setActivitiesSearch={setActivitiesSearch}
        />
      )}
    </div>
  )
}

export default CreateEvent
