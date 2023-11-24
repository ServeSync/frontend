interface Status {
  [key: string]: string
}
export const StatusOrganizationToMessage = (stautus: string) => {
  const mappedEventStatus: Status = {
    Pending: 'Đã mời',
    Active: 'Đã kích hoạt',
    Rejected: 'Đã từ chối'
  }
  return mappedEventStatus[`${stautus}`]
}
