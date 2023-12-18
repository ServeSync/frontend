import CollaborationRequestOrganizationForm from 'src/modules/CollaborationRequestManagement/components/CollaborationRequestForm/CollaborationRequestOrganizationForm'
import { CollaborationRequestType } from 'src/modules/CollaborationRequestManagement/interfaces'

interface Props {
  page: number
  index: number
  collaborationRequest: CollaborationRequestType
}
const CollaborationRequestOrganizationPage = ({ page, index, collaborationRequest }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-2' aria-controls='simple-tabpanel-2'>
      {page === index && <CollaborationRequestOrganizationForm collaborationRequest={collaborationRequest} />}
    </div>
  )
}

export default CollaborationRequestOrganizationPage
