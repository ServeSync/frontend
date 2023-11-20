import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormRequestEventType } from '../../../utils'
import RequestEventOrganizationForm from 'src/modules/EventManagement/components/RequestEventForm/RequestEventOrganizationForm'
import RequestEventOrganizationContactForm from 'src/modules/EventManagement/components/RequestEventForm/RequestEventOrganizationContactForm'

interface Props {
  page: number
  index: number
  register: UseFormRegister<FormRequestEventType>
  control: Control<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
  handleChangeFileOrganizer: (file?: File) => void
  handleChangeFileOrganizerContact: (file?: File) => void
  previewImageOrganizer: string
  previewImageOrganizerContact: string
}

const RequestEventOrganization = ({
  page,
  index,
  register,
  control,
  errors,
  handleChangeFileOrganizer,
  handleChangeFileOrganizerContact,
  previewImageOrganizer,
  previewImageOrganizerContact
}: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-3' aria-controls='simple-tabpanel-3'>
      {page === index && (
        <div className='flex flex-col gap-y-2 w-full mx-auto'>
          <RequestEventOrganizationForm
            handleChangeFileOrganizer={handleChangeFileOrganizer}
            previewImageOrganizer={previewImageOrganizer}
            register={register}
            control={control}
            errors={errors}
          />
          <RequestEventOrganizationContactForm
            handleChangeFileOrganizerContact={handleChangeFileOrganizerContact}
            previewImageOrganizerContact={previewImageOrganizerContact}
            register={register}
            control={control}
            errors={errors}
          />
        </div>
      )}
    </div>
  )
}

export default RequestEventOrganization
