interface Status {
  [key: string]: string
}
export const StatusOrganizationToMessage = (status: string) => {
  const mappedEventOrganizationStatus: Status = {
    Pending: 'Đã mời',
    Active: 'Đã kích hoạt',
    Rejected: 'Đã từ chối'
  }
  return mappedEventOrganizationStatus[`${status}`]
}
