import { UseFormRegister, Control, FieldErrors } from 'react-hook-form'
import CreateEventForm from '../../components/CreateEventForm'
import { FormEventType } from '../../utils'
import { EventCategoriesListType } from '../../interfaces'
import { useState } from 'react'
import { GetAllActivitiesByCategoryIdQuery, GetAllEventCategoriesQuery } from '../../services'

interface Props {
  page: number
  index: number
  register: UseFormRegister<FormEventType>
  control: Control<FormEventType>
  errors: FieldErrors<FormEventType>
}

const CreateEvent = ({ page, index, register, control, errors }: Props) => {
  const [categoryId, setCategoryId] = useState<string>('')

  const getAllEventCategoriesQuery = new GetAllEventCategoriesQuery()
  const eventCategories = getAllEventCategoriesQuery.fetch() as EventCategoriesListType

  const getAllActivitiesByCategoryIdQuery = new GetAllActivitiesByCategoryIdQuery(categoryId)
  const activities = getAllActivitiesByCategoryIdQuery.fetch()

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
          eventCategories={eventCategories && eventCategories.data}
          activities={activities && activities.data}
          handleChangeCategory={handleChangeCategory}
        />
      )}
    </div>
  )
}

export default CreateEvent
