import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { FormEventType } from '../../utils'
import CreateEventOrganizationForm from '../../components/CreateEventOrganizationForm'
import { useEffect, useState } from 'react'
import { GetAllEventOrganizationsQuery } from '../../services'
import {
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
  const [listEventOrganizationsAdded, setListEventOrganizationsAdded] = useState<EventOrganizationType[]>([])
  const [errors, setErrors] = useState<string>('')

  const [representatives, setRepresentatives] = useState<EventOrganizationType[]>([])

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

  const handleAddEventOrganization = () => {
    const id = getValues('organizations.organizationId')
    const role = { ...getValues('organizations') }.role as string
    if (role && role !== '' && id && id !== '') {
      if (role.length <= 5) {
        setErrors('Vai trò đại diện ít nhất 5 kí tự')
      } else if (listEventOrganizationsAdded.some((item) => item.id === id)) {
        setErrors('Ban tổ chức đã được thêm vào sự kiện !')
      } else {
        const eventOrganization = eventOrganizations.data.find((item) => item.id === id) as EventOrganizationType
        const body = {
          ...eventOrganization,
          role: role,
          contacts: []
        }
        setListEventOrganizationsAdded([...listEventOrganizationsAdded, body])
        setValue('organizations.organizationId', undefined)
        setValue('organizations.role', '')
        setErrors('')
        setRepresentatives([
          ...representatives,
          eventOrganizations && (eventOrganizations.data.find((item) => item.id === id) as EventOrganizationType)
        ])
      }
    } else {
      setErrors('Vui lòng nhập đầy đủ thông tin !')
    }
  }

  const handleRemoveEventOrganization = (id: number) => {
    const newListEventOrganizationsAdded = [...listEventOrganizationsAdded]
    newListEventOrganizationsAdded.splice(id, 1)
    setListEventOrganizationsAdded(newListEventOrganizationsAdded)
    const newRepresentatives = [...representatives]
    newRepresentatives.splice(id, 1)
    setRepresentatives(newRepresentatives)
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
                  setValue={setValue}
                  index={index}
                  eventOrganization={eventOrganization}
                  listEventOrganizationsAdded={listEventOrganizationsAdded}
                  setListEventOrganizationsAdded={setListEventOrganizationsAdded}
                  handleRemoveEventOrganization={handleRemoveEventOrganization}
                />
              </div>
            ))}
          <CreateEventOrganizationForm
            control={control}
            representatives={representatives}
            eventOrganizations={eventOrganizations && eventOrganizations.data}
            handleAddEventOrganization={handleAddEventOrganization}
            errors={errors}
          />
        </div>
      )}
    </div>
  )
}

export default EventOrganization
