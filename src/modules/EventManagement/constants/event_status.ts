export const eventStatus = [
  { id: 'Cancelled', name: 'Đã hủy' },
  { id: 'Happening', name: 'Đang diễn ra' },
  { id: 'Done', name: 'Đã tổ chức' },
  { id: 'Expired', name: 'Đã hết hạn' },
  { id: 'Pending', name: 'Đang kiểm duyệt' },
  { id: 'Rejected', name: 'Bị hủy' },
  { id: 'Upcoming', name: 'Sắp diễn ra' }
]

interface Status {
  [key: string]: string
}

export const StatusToMessage = (status: string) => {
  const mappedEventStatus: Status = {
    Cancelled: 'Đã hủy',
    Happening: 'Đang diễn ra',
    Done: 'Đã tổ chức',
    Expired: 'Đã hết hạn',
    Pending: 'Đang kiểm duyệt',
    Rejected: 'Bị hủy',
    Attendance: 'Đang điểm danh',
    Registration: 'Đã đăng kí',
    Upcoming: 'Sắp diễn ra',
    Approved: 'Đã duyệt',
    ClosedRegistration: 'Đã đóng đăng kí'
  }
  return mappedEventStatus[`${status}`]
}
