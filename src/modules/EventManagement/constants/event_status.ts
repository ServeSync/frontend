export const eventStatus = [
  { id: 'Cancelled', name: 'Đã hủy' },
  { id: 'Happening', name: 'Đang xảy ra' },
  { id: 'Done', name: 'Đã hoàn thành' },
  { id: 'Expired', name: 'Đã hết hạn' },
  { id: 'Pending', name: 'Chưa duyệt' },
  { id: 'Rejected', name: 'Bị hủy' },
  { id: 'Upcoming', name: 'Sắp diễn ra' }
]

interface Status {
  [key: string]: string
}

export function StatusToMessage(status: string) {
  const mappedEventStatus: Status = {
    Cancelled: 'Đã hủy',
    Happening: 'Đang xảy ra',
    Done: 'Đã hoàn thành',
    Expired: 'Đã hết hạn',
    Pending: 'Chưa duyệt',
    Rejected: 'Bị hủy',
    Attendance: 'Đang tham dự',
    Registration: 'Đã đăng kí',
    Upcoming: 'Sắp diễn ra'
  }
  return mappedEventStatus[`${status}`]
}
