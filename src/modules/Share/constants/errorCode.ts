interface ErrorCode {
  [key: string]: {
    message: string
    type: string
    field?: string
  }
}

export function ErrorCodeToMessage(errorCode: string): {
  message: string
  type: string
  field?: string
} {
  const mappedErrorCode: ErrorCode = {
    'User:000002': {
      message: 'Tài khoản không tồn tại !',
      type: 'Server',
      field: 'userNameOrEmail'
    },
    'User:000003': {
      message: 'Tài khoản bị khóa !',
      type: 'Server'
    },
    'User:000004': {
      message: 'Mật khẩu không chính xác !',
      type: 'Server',
      field: 'password'
    },
    'User:000005': {
      message: 'Phiên đăng nhập đã hết hạn !',
      type: 'Server'
    },
    'User:000006': {
      message: 'Phiên đăng nhập đã hết hạn !',
      type: 'Server'
    },
    InvalidToken: {
      message: 'Đổi mật khẩu thất bại !',
      type: 'Server'
    },
    DuplicateRoleName: {
      message: 'Role đã tồn tại !',
      type: 'Server',
      field: 'name'
    },
    'Role:000004': {
      message: 'Role admin không cho phép thay đổi !',
      type: 'Server'
    },
    'Student:000001': {
      message: 'Mã số sinh viên đã tồn tại !',
      type: 'Server',
      field: 'code'
    },
    'Student:000002': {
      message: 'Căn cước công dân đã tồn tại !',
      type: 'Server',
      field: 'citizenId'
    },
    'Student:000003': {
      message: 'Sinh viên không tồn tại !',
      type: 'Server'
    },
    'Student:000004': {
      message: 'Email đã tồn tại!',
      type: 'Server',
      field: 'email'
    },
    'Faculty:000002': {
      message: 'Khoa không tồn tại!',
      type: 'Server',
      field: 'facultyId'
    },
    'HomeRoom:000002': {
      message: 'Lớp sinh hoạt không tồn tại!',
      type: 'Server',
      field: 'homeRoomId'
    },
    'EducationProgram:000002': {
      message: 'Hệ đào tạo không tồn tại!',
      type: 'Server',
      field: 'educationProgramId'
    },
    'Event:000002': {
      message: 'Không phải thời điểm đăng ký !',
      type: 'Server'
    },
    'Event:000003': {
      message: 'Sự kiện không tồn tại !',
      type: 'Server'
    },
    'Event:000004': {
      message: 'Không phải thời gian điểm danh !',
      type: 'Server'
    },
    'EventAttendanceInfo:000001': {
      message: 'Thời gian điểm danh bị trùng nhau !',
      type: 'Server',
      field: 'attendanceInfos'
    },
    'EventAttendanceInfo:000003': {
      message: 'Thời gian điểm danh không nằm trong thời gian diễn ra sự kiện !',
      type: 'Server',
      field: 'attendanceInfos'
    },
    'EventRegistration:000002': {
      message: 'Khung giờ đăng ký bị trùng với thời gian diễn ra sự kiện !',
      type: 'Server',
      field: 'registrationInfos'
    },
    'EventRegistration:000004': {
      message: 'Khung giờ đăng ký bị trùng nhau !',
      type: 'Server',
      field: 'registrationInfos'
    },
    'EventRole:000002': {
      message: 'Vai trò không tồn tại !',
      type: 'Server'
    },
    'EventRole:000003': {
      message: 'Vai trò đã được đăng ký đủ số lượng !',
      type: 'Server'
    }
  }

  return mappedErrorCode[`${errorCode}`]
}
