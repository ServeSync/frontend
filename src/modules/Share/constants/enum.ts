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

export const StatusIsDisable = (status: string) => {
  const mappedEventStatus: StatusButton = {
    Cancelled: true,
    Happening: true,
    Done: true,
    Expired: true,
    Rejected: true,
    Pending: false,
    Upcoming: false,
    Approved: false
  }
  return mappedEventStatus[`${status}`]
}

interface Type {
  [key: string]: string
}

export const TypeToMessage = (type: string) => {
  const mappedEventType: Type = {
    Internal: 'Trong trường',
    External: 'Ngoài trường',
    Collaboration: 'Kết hợp',
    Special: 'Đặc biệt'
  }

  return mappedEventType[`${type}`]
}
