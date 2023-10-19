import EventOrganizerForm from '../../components/EventOrganizerForm'
import { Control, FieldErrors, UseFormGetValues } from 'react-hook-form'
import { FormEventType } from '../../utils'
import CreateEventOrganizerForm from '../../components/CreateEventOrganizerForm'
import { useState } from 'react'
import { GetAllContactsByOrganizationIdQuery, GetAllEventOrganizationsQuery } from '../../services'
import { EventOrganization, EventOrganizationsListType } from '../../interfaces'

interface Props {
  page: number
  index: number
  control: Control<FormEventType>
  errors: FieldErrors<FormEventType>
  getValues: UseFormGetValues<FormEventType>
  handleDataEventOrganization: (data: EventOrganization) => void
}

const EventOrganizer = ({ page, index, control, errors, getValues, handleDataEventOrganization }: Props) => {
  const [organizationId, setOrganizationId] = useState<string>('')

  const getAllEventOrganizationsQuery = new GetAllEventOrganizationsQuery()
  const eventOrganizations = getAllEventOrganizationsQuery.fetch() as EventOrganizationsListType

  const getAllContactsByOrganizationIdQuery = new GetAllContactsByOrganizationIdQuery(organizationId)
  const contacts = getAllContactsByOrganizationIdQuery.fetch()

  const handleChangeOrganization = (id: string) => {
    setOrganizationId(id)
  }

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-3' aria-controls='simple-tabpanel-3'>
      {page === index && (
        <div>
          <EventOrganizerForm control={control} errors={errors} />
          <CreateEventOrganizerForm
            control={control}
            errors={errors}
            getValues={getValues}
            eventOrganizations={eventOrganizations && eventOrganizations.data}
            contacts={contacts && contacts.data}
            handleChangeOrganization={handleChangeOrganization}
            handleDataEventOrganization={handleDataEventOrganization}
          />
        </div>
      )}
    </div>
  )
}

export default EventOrganizer
