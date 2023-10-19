import EventOrganizerForm from '../../components/EventOrganizerForm'
import { Control, FieldErrors, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { FormEventType } from '../../utils'
import CreateEventOrganizerForm from '../../components/CreateEventOrganizationForm'
import { useState } from 'react'
import { GetAllContactsByOrganizationIdQuery, GetAllEventOrganizationsQuery } from '../../services'
import {
  EventOrganization,
  EventOrganizationRep,
  EventOrganizationType,
  EventOrganizationsListType
} from '../../interfaces'

interface Props {
  page: number
  index: number
  control: Control<FormEventType>
  errors: FieldErrors<FormEventType>
  getValues: UseFormGetValues<FormEventType>
  setValue: UseFormSetValue<FormEventType>
  dataEventOrganization: EventOrganization[]
  setDataEventOrganization: React.Dispatch<React.SetStateAction<EventOrganization[]>>
  dataEventOrganizationRep: EventOrganizationRep[]
  setDataEventOrganizationRep: React.Dispatch<React.SetStateAction<EventOrganizationRep[]>>
}

const EventOrganizer = ({
  page,
  index,
  control,
  errors,
  getValues,
  setValue,
  setDataEventOrganization,
  dataEventOrganizationRep,
  setDataEventOrganizationRep
}: Props) => {
  const [organizationId, setOrganizationId] = useState<string>('')
  const [listEventOrganizationAdded, setListEventOrganizationAdded] = useState<EventOrganizationType[]>([])

  const getAllEventOrganizationsQuery = new GetAllEventOrganizationsQuery()
  const eventOrganizations = getAllEventOrganizationsQuery.fetch() as EventOrganizationsListType

  const getAllContactsByOrganizationIdQuery = new GetAllContactsByOrganizationIdQuery(organizationId)
  const contacts = getAllContactsByOrganizationIdQuery.fetch()

  const handleChangeEventOrganization = (id: string) => {
    setOrganizationId(id)
  }

  const handleAddEventOrganization = () => {
    setListEventOrganizationAdded([
      ...listEventOrganizationAdded,
      eventOrganizations.data.find((item) => item.id === organizationId) as EventOrganizationType
    ])
    setValue('organizations.organizationId', '')
  }

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-3' aria-controls='simple-tabpanel-3'>
      {page === index && (
        <div>
          {listEventOrganizationAdded.map((eventOrganization) => {
            return (
              <div key={eventOrganization.id}>
                <EventOrganizerForm
                  control={control}
                  errors={errors}
                  eventOrganization={{ ...eventOrganization, role: { ...getValues('organizations') }.role }}
                />
              </div>
            )
          })}

          <CreateEventOrganizerForm
            control={control}
            errors={errors}
            getValues={getValues}
            eventOrganizations={eventOrganizations && eventOrganizations.data}
            contacts={contacts && contacts.data}
            handleChangeEventOrganization={handleChangeEventOrganization}
            handleAddEventOrganization={handleAddEventOrganization}
            setDataEventOrganization={setDataEventOrganization}
            dataEventOrganizationRep={dataEventOrganizationRep}
            setDataEventOrganizationRep={setDataEventOrganizationRep}
          />
        </div>
      )}
    </div>
  )
}

export default EventOrganizer
