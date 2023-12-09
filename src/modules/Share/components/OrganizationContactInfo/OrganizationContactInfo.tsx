import { EventOrganizationType } from 'src/modules/EventOrganizationManagement/interfaces'
import EditOrganizationInfo from '../EditOrganizationInfo'

interface Props {
  page: number
  index: number
  organization: EventOrganizationType
}
const OrganizationContactInfo = ({ page, index, organization }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && (
        <div className='gap-y-2 w-full mx-auto'>
          <EditOrganizationInfo organization={organization} />
        </div>
      )}
    </div>
  )
}

export default OrganizationContactInfo
