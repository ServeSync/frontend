interface Status {
  [key: string]: string
}
export const StatusOrganizationToMessage = (stautus: string) => {
  const mappedEventStatus: Status = {
    Pending: 'Đang chờ ',
    Active: 'Đã đồng ý',
    Rejected: 'Đã từ chối'
  }
  return mappedEventStatus[`${stautus}`]
}
