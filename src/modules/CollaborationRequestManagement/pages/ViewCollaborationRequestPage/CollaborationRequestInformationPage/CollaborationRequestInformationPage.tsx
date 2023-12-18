import CollaborationRequestInformationForm from 'src/modules/CollaborationRequestManagement/components/CollaborationRequestForm/CollaborationRequestInformationForm'
import { CollaborationRequestType } from 'src/modules/CollaborationRequestManagement/interfaces'

interface Props {
  page: number
  index: number
  collaborationRequest: CollaborationRequestType
}
const CollaborationRequestInformationPage = ({ page, index, collaborationRequest }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && <CollaborationRequestInformationForm collaborationRequest={collaborationRequest} />}
    </div>
  )
}

export default CollaborationRequestInformationPage
