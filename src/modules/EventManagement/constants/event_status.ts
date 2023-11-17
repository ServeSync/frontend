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
    Rejected: 'Đã từ chối',
    Attendance: 'Đang trong thời gian điểm danh',
    Registration: 'Đang trong thời gian đăng ký',
    Upcoming: 'Sắp diễn ra',
    Approved: 'Đã duyệt',
    ClosedRegistration: 'Đã đóng đăng kí'
  }
  return mappedEventStatus[`${status}`]
}

interface StatusButton {
  [key: string]: boolean
}

export const StatusIsShowButton = (status: string) => {
  const mappedEventStatus: StatusButton = {
    Cancelled: false,
    Happening: false,
    Done: false,
    Expired: false,
    Pending: true,
    Rejected: false,
    Upcoming: true,
    Approved: true
  }
  return mappedEventStatus[`${status}`]
}
