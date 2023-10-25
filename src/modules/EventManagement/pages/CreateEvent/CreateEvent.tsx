import { Control, UseFormSetValue } from 'react-hook-form'
import CreateEventForm from '../../components/CreateEventForm'
import { FormEventType } from '../../utils'
import { ActivitiesListType, EventCategoriesListType } from '../../interfaces'
import { useState } from 'react'
import { GetAllActivitiesByCategoryIdQuery, GetAllEventCategoriesQuery } from '../../services'
import useQueryActivityConfig from '../../hooks/useQueryActivityConfig'
import useQueryEventCategoryConfig from '../../hooks/useQueryEventCategoryConfig'

interface Props {
  page: number
  index: number
  control: Control<FormEventType>
  setValue: UseFormSetValue<FormEventType>
}

const CreateEvent = ({ page, index, control, setValue }: Props) => {
  const [categoryId, setCategoryId] = useState<string>('')
  const [eventCategoriesSearch, setEventCategoriesSearch] = useState<string>('')
  const [activitiesSearch, setActivitiesSearch] = useState<string>('')

  const queryActivityConfig = useQueryActivityConfig(activitiesSearch)
  const queryEventCategoryConfig = useQueryEventCategoryConfig(eventCategoriesSearch)

  const getAllEventCategoriesQuery = new GetAllEventCategoriesQuery(queryEventCategoryConfig)
  const eventCategories = getAllEventCategoriesQuery.fetch() as EventCategoriesListType

  const getAllActivitiesByCategoryIdQuery = new GetAllActivitiesByCategoryIdQuery(categoryId, queryActivityConfig)
  const activities = getAllActivitiesByCategoryIdQuery.fetch() as ActivitiesListType

  const handleChangeCategory = (id: string) => {
    setCategoryId(id)
  }

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && (
        <CreateEventForm
          control={control}
          setValue={setValue}
          eventCategories={eventCategories && eventCategories.data}
          activities={activities && activities?.data}
          handleChangeCategory={handleChangeCategory}
          setEventCategoriesSearch={setEventCategoriesSearch}
          setActivitiesSearch={setActivitiesSearch}
        />
      )}
    </div>
  )
}

export default CreateEvent
