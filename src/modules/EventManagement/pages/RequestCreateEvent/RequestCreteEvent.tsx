import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { FormRequestEventType } from '../../utils'
import RequestCreateEventForm from '../../components/RequestCreateEventForm'
import { GetAllActivitiesByCategoryIdQuery, GetAllEventCategoriesQuery } from '../../services'
import { ActivitiesListType, EventCategoriesListType, MarkerType } from '../../interfaces'
import useQueryEventCategoryConfig from '../../hooks/useQueryEventCategoryConfig'
import useQueryActivityConfig from '../../hooks/useQueryActivityConfig'
import { useState } from 'react'

interface Props {
  page: number
  index: number
  register: UseFormRegister<FormRequestEventType>
  control: Control<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
  setValue: UseFormSetValue<FormRequestEventType>
  markers: MarkerType[]
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>
}

const RequestCreteEvent = ({ page, index, setValue, errors, register, control, markers, setMarkers }: Props) => {
  const [categoryId, setCategoryId] = useState<string>('')
  const [activitiesSearch, setActivitiesSearch] = useState<string>('')
  const [eventCategoriesSearch, setEventCategoriesSearch] = useState<string>('')

  const queryEventCategoryConfig = useQueryEventCategoryConfig(eventCategoriesSearch)
  const queryActivityConfig = useQueryActivityConfig(activitiesSearch)

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
        <RequestCreateEventForm
          register={register}
          control={control}
          errors={errors}
          setValue={setValue}
          eventCategories={eventCategories && eventCategories.data}
          activities={activities && activities?.data}
          handleChangeCategory={handleChangeCategory}
          setEventCategoriesSearch={setEventCategoriesSearch}
          setActivitiesSearch={setActivitiesSearch}
          markers={markers}
          setMarkers={setMarkers}
        />
      )}
    </div>
  )
}

export default RequestCreteEvent
