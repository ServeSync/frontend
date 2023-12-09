import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import EditOrganizationForm from '../EditOrganizationForm'
import { FormEventOrganizationType } from 'src/modules/EventOrganizationManagement/utils'
import { EventOrganizationType } from 'src/modules/EventOrganizationManagement/interfaces'

interface Props {
  page: number
  index: number
  register: UseFormRegister<FormEventOrganizationType>
  setValue: UseFormSetValue<FormEventOrganizationType>
  control: Control<FormEventOrganizationType>
  organization: EventOrganizationType
  onChange: (file?: File) => void
  previewImage: string
  isLoadingEdit: boolean
}

const OrganizationInfo = ({
  page,
  index,
  register,
  setValue,
  control,
  onChange,
  isLoadingEdit,
  organization,
  previewImage
}: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && (
        <div className='gap-y-2 w-full mx-auto'>
          <EditOrganizationForm
            setValue={setValue}
            register={register}
            control={control}
            onChange={onChange}
            isLoadingEdit={isLoadingEdit}
            organization={organization}
            previewImage={previewImage}
          />
        </div>
      )}
    </div>
  )
}

export default OrganizationInfo
