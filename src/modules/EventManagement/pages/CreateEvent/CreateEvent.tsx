import { UseFormRegister, Control, FieldErrors, UseFormSetValue } from 'react-hook-form'
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
  register: UseFormRegister<FormEventType>
  control: Control<FormEventType>
  errors: FieldErrors<FormEventType>
  setValue: UseFormSetValue<FormEventType>
}

const CreateEvent = ({ page, index, register, control, errors, setValue }: Props) => {
  const [categoryId, setCategoryId] = useState<string>('')
  const [activitiesSearch, setActivitiesSearch] = useState<string>('')
  const [eventCategoriesSearch, setEventCategoriesSearch] = useState<string>('')

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
          register={register}
          control={control}
          errors={errors}
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
