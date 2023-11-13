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
      message: 'Role không cho phép thêm mới, xóa và chỉnh sửa !',
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
    'Student:000007': {
      message: 'Sinh viên đã đăng kí sự kiện với vai trò đã chọn',
      type: 'Server'
    },
    'Student:000008': {
      message: 'Sinh viên đã được chấp nhận tham gia sự kiện',
      type: 'Server'
    },
    'Student:000009': {
      message: 'Bạn đã điểm danh tham gia sự kiện !',
      type: 'Server'
    },
    'Student:000010': {
      message: 'Bạn chưa đăng ký tham gia sự kiện !',
      type: 'Server'
    },
    'Student:000011': {
      message: 'Bạn không ở trong vùng diễn ra sự kiện !',
      type: 'Server'
    },
    'Student:000012': {
      message: 'Đơn xin đăng ký tham gia sự kiện không ở trạng thái kiểm duyệt !',
      type: 'Server'
    },
    'Student:000013': {
      message: 'Đơn xin đăng ký không tồn tại !',
      type: 'Server'
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
    'Event:000005': {
      message: 'Sự kiện không thể bị hủy !',
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
    'EventAttendanceInfo:000005': {
      message: 'Yêu cầu điểm danh không hợp lệ!',
      type: 'Server'
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
    },
    'EventCollaborationRequest:000002': {
      message: 'Ngày duyệt sự kiện phải trước ngày tổ chức hơn 1 ngày !',
      type: 'Server'
    },

    'EventActivity:000001': {
      message: 'Hoạt động sự kiện không tồn tại !',
      type: 'Server'
    },
    'EventOrganization:000002': {
      message: 'Email này đã được đăng ký bởi tổ chức khác',
      type: 'Server'
    },
    'EventOrganization:000003': {
      message: 'Nhà tổ chức hiện đang tổ chức một sự kiện ',
      type: 'Server'
    },
    'EventOrganization:000004': {
      message: 'Tên nhà tổ chức sự kiện đã tồn tại',
      type: 'Server'
    }
  }

  return mappedErrorCode[`${errorCode}`]
}
