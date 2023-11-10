import { isUndefined, omitBy } from 'lodash'
import { EventOrganizationConfig } from 'src/modules/EventManagement/interfaces/EventOrganization/event_organization.config'
import { useQueryParams } from 'src/modules/Share/hooks'

export type QueryOrganizerConfig = {
  [key in keyof EventOrganizationConfig]: string
}

const useQueryOrganizationConfig = () => {
  const queryOrganizerParams: QueryOrganizerConfig = useQueryParams()
  const queryOrganizerConfig: QueryOrganizerConfig = omitBy(
    {
      search: queryOrganizerParams.search,
      sorting: queryOrganizerParams.sorting,
      page: queryOrganizerParams.page || 1,
      size: queryOrganizerParams.size || 10,
      id: queryOrganizerParams.id
    },
    isUndefined
  )
  return queryOrganizerConfig
}

export default useQueryOrganizationConfig
