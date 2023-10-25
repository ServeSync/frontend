import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { FormEventType } from '../../utils'
import CreateEventOrganizationForm from '../../components/CreateEventOrganizationForm'
import { useEffect, useState } from 'react'
import { GetAllContactsByOrganizationIdQuery, GetAllEventOrganizationsQuery } from '../../services'
import {
  ContactsListType,
  EventOrganizationFormType,
  EventOrganizationRepFormType,
  EventOrganizationType,
  EventOrganizationsListType
} from '../../interfaces'
import EventOrganizationForm from '../../components/EventOrganizationForm'

interface Props {
  page: number
  index: number
  control: Control<FormEventType>
  getValues: UseFormGetValues<FormEventType>
  setValue: UseFormSetValue<FormEventType>
  setDataEventOrganization: React.Dispatch<React.SetStateAction<EventOrganizationFormType[]>>
}

const EventOrganization = ({ page, index, control, getValues, setValue, setDataEventOrganization }: Props) => {
  const [organizationId, setOrganizationId] = useState<string>('')
  const [listEventOrganizationsAdded, setListEventOrganizationsAdded] = useState<EventOrganizationType[]>([])
  const [errors, setErrors] = useState<string>('')

  useEffect(() => {
    const organization = listEventOrganizationsAdded.map((item) => {
      let organizationReps: EventOrganizationRepFormType[] = []
      item.contacts.map((contact) => {
        organizationReps = [
          ...organizationReps,
          {
            organizationRepId: contact.id,
            role: contact.role
          }
        ]
      })
      const result: EventOrganizationFormType = {
        organizationId: item.id,
        role: item.role,
        organizationReps: organizationReps
      }
      return result
    })
    setDataEventOrganization(organization)
  }, [listEventOrganizationsAdded, setDataEventOrganization])

  const getAllEventOrganizationsQuery = new GetAllEventOrganizationsQuery()
  const eventOrganizations = getAllEventOrganizationsQuery.fetch() as EventOrganizationsListType

  const getAllContactsByOrganizationIdQuery = new GetAllContactsByOrganizationIdQuery(organizationId)
  const contacts = getAllContactsByOrganizationIdQuery.fetch() as ContactsListType

  const handleChangeEventOrganization = (id: string) => {
    setOrganizationId(id)
  }

  const handleAddEventOrganization = () => {
    const role = { ...getValues('organizations') }.role as string
    if (role && role !== '' && organizationId && organizationId !== '') {
      const eventOrganization = eventOrganizations.data.find(
        (item) => item.id === organizationId
      ) as EventOrganizationType
      const body = {
        ...eventOrganization,
        role: role,
        contacts: []
      }
      setListEventOrganizationsAdded([...listEventOrganizationsAdded, body])
      setValue('organizations.organizationId', '')
      setValue('organizations.role', '')
      setErrors('')
    } else {
      setErrors('Vui lòng nhập đầy đủ thông tin !')
    }
  }

  return (
    <div role='tabpanel' hidden={page !== index} id='tab-3' aria-controls='simple-tabpanel-3'>
      {page === index && (
        <div className='flex flex-col gap-6'>
          {listEventOrganizationsAdded &&
            listEventOrganizationsAdded.length !== 0 &&
            listEventOrganizationsAdded.map((eventOrganization, index) => (
              <div key={`${index}${eventOrganization.id}`}>
                <EventOrganizationForm
                  control={control}
                  getValues={getValues}
                  index={index}
                  eventOrganization={eventOrganization}
                  contacts={contacts && contacts.data}
                  listEventOrganizationsAdded={listEventOrganizationsAdded}
                  setListEventOrganizationsAdded={setListEventOrganizationsAdded}
                />
              </div>
            ))}
          <CreateEventOrganizationForm
            control={control}
            getValues={getValues}
            eventOrganizations={eventOrganizations && eventOrganizations.data}
            handleChangeEventOrganization={handleChangeEventOrganization}
            handleAddEventOrganization={handleAddEventOrganization}
            errors={errors}
          />
        </div>
      )}
    </div>
  )
}

export default EventOrganization
