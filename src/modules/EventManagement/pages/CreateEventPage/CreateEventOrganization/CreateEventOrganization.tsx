import { Control, UseFormGetValues, UseFormSetValue, FieldErrors } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { EventOrganizationFormType, EventOrganizationRepFormType } from '../../../interfaces'
import { FormEventType } from '../../../utils'
import CreateEventOrganizationForm from 'src/modules/EventManagement/components/EventForm/CreateEventOrganizationForm'
import CreateEventOrganizationContactForm from 'src/modules/EventManagement/components/EventForm/CreateEventOrganizationContactForm'
import { EventOrganizationType, EventOrganizationsListType } from 'src/modules/EventOrganizationManagement/interfaces'
import { GetAllEventOrganizationsQuery } from 'src/modules/EventOrganizationManagement/services'

interface Props {
  page: number
  index: number
  control: Control<FormEventType>
  errors: FieldErrors<FormEventType>
  getValues: UseFormGetValues<FormEventType>
  setValue: UseFormSetValue<FormEventType>
  dataEventOrganization: EventOrganizationFormType[]
  setDataEventOrganization: React.Dispatch<React.SetStateAction<EventOrganizationFormType[]>>
}

const CreateEventOrganization = ({
  page,
  index,
  control,
  errors,
  getValues,
  setValue,
  setDataEventOrganization
}: Props) => {
  const [listEventOrganizationsAdded, setListEventOrganizationsAdded] = useState<EventOrganizationType[]>([])

  const [errorsLocal, setErrorsLocal] = useState<string>('')

  const [representatives, setRepresentatives] = useState<EventOrganizationType[]>([])

  useEffect(() => {
    const organization = listEventOrganizationsAdded.map((item) => {
      let organizationReps: EventOrganizationRepFormType[] = []
      item.representatives.map((contact) => {
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

  const getAllEventOrganizationsQuery = new GetAllEventOrganizationsQuery('Active')
  const eventOrganizations = getAllEventOrganizationsQuery.fetch() as EventOrganizationsListType

  const handleAddEventOrganization = () => {
    const id = getValues('organizations.organizationId')
    const role = { ...getValues('organizations') }.role as string
    if (role && role !== '' && id && id !== '') {
      if (role.length < 5) {
        setErrorsLocal('Vai trò đại diện ít nhất 5 kí tự')
      } else if (listEventOrganizationsAdded.some((item) => item.id === id)) {
        setErrorsLocal('Ban tổ chức đã được thêm vào sự kiện !')
      } else {
        const eventOrganization = eventOrganizations.data.find((item) => item.id === id) as EventOrganizationType
        const body = {
          ...eventOrganization,
          role: role,
          representatives: []
        }
        setListEventOrganizationsAdded([...listEventOrganizationsAdded, body])
        setValue('organizations.organizationId', undefined)
        setValue('organizations.role', '')
        setErrorsLocal('')
        setRepresentatives([
          ...representatives,
          eventOrganizations && (eventOrganizations.data.find((item) => item.id === id) as EventOrganizationType)
        ])
      }
    } else {
      setErrorsLocal('Vui lòng nhập đầy đủ thông tin !')
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
          {listEventOrganizationsAdded.length !== 0 &&
            listEventOrganizationsAdded.map((eventOrganization, index) => (
              <div key={`${index}${eventOrganization.id}`}>
                <CreateEventOrganizationContactForm
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
            errorsLocal={errorsLocal}
            errors={errors}
          />
        </div>
      )}
    </div>
  )
}

export default CreateEventOrganization
