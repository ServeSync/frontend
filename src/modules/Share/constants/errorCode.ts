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
    // Auth
    'User:000001': {
      message: 'Người dùng không tồn tại !',
      type: 'Server'
    },
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
    // Role
    DuplicateRoleName: {
      message: 'Role đã tồn tại !',
      type: 'Server',
      field: 'name'
    },
    'Role:000001': {
      message: 'Role không tồn tại !',
      type: 'Server'
    },
    'Role:000004': {
      message: 'Role không cho phép thêm mới, xóa và chỉnh sửa !',
      type: 'Server'
    },
    // Student
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
      message: 'Email đã tồn tại !',
      type: 'Server',
      field: 'email'
    },
    'Student:000007': {
      message: 'Bạn đã đăng kí sự kiện với vai trò đã chọn !',
      type: 'Server'
    },
    'Student:000008': {
      message: 'Bạn đã được chấp nhận tham gia sự kiện !',
      type: 'Server'
    },
    'Student:000009': {
      message: 'Bạn đã điểm danh sự kiện !',
      type: 'Server'
    },
    'Student:000010': {
      message: 'Bạn không được duyệt tham gia sự kiện !',
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
    // Faculty
    'Faculty:000002': {
      message: 'Khoa không tồn tại!',
      type: 'Server',
      field: 'facultyId'
    },
    // HomeRoom
    'HomeRoom:000002': {
      message: 'Lớp sinh hoạt không tồn tại!',
      type: 'Server',
      field: 'homeRoomId'
    },
    // EducationProgram
    'EducationProgram:000002': {
      message: 'Hệ đào tạo không tồn tại!',
      type: 'Server',
      field: 'educationProgramId'
    },
    // Event
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
    'Event:000006': {
      message: 'Sự kiện đã bắt đầu !',
      type: 'Server'
    },
    'Event:000007': {
      message: 'Sự kiện không thể được chấp thuận vì  thời gian hiện tại lớn hơn phiên đăng ký',
      type: 'Server'
    },
    'Event:000008': {
      message: 'Sự kiện không thể bị từ chối !',
      type: 'Server'
    },
    'Event:000009': {
      message: 'Sự kiện không thể cập nhật vì sự kiện đã diễn ra phiên đăng ký !',
      type: 'Server'
    },
    'Event:000010': {
      message: 'Sự kiện không ở trạng thái đã tổ chức !',
      type: 'Server'
    },
    // Event Attendance
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
    'EventAttendanceInfo:000004': {
      message: 'Khung giờ điểm danh không tồn tại !',
      type: 'Server',
      field: 'attendanceInfos'
    },
    'EventAttendanceInfo:000005': {
      message: 'Yêu cầu điểm danh không hợp lệ !',
      type: 'Server'
    },
    'EventAttendanceInfo:000006': {
      message: 'Không thể cập nhật thông tin điểm danh !',
      type: 'Server'
    },
    // Event Role
    'EventRole:000002': {
      message: 'Vai trò không tồn tại !',
      type: 'Server'
    },
    'EventRole:000003': {
      message: 'Vai trò đã được đăng ký đủ số lượng !',
      type: 'Server'
    },
    'EventRole:000004': {
      message: 'Vai trò không thể cập nhật !',
      type: 'Server'
    },
    'EventOrganizationContact:000005': {
      message: 'Đại diện không ở trạng thái chờ !',
      type: 'Server'
    },
    // Organization In Event
    'OrganizationInEvent:000002': {
      message: 'Nhà tổ chức chưa được thêm vào sự kiện !',
      type: 'Server'
    },
    'OrganizationInEvent:000003': {
      message: 'Không thể cập nhật thông tin tổ chức !',
      type: 'Server'
    },
    // Event Organization Representative
    'OrganizationRepInEvent:000002': {
      message: 'Nhà đại diện không được thêm vào sự kiện !',
      type: 'Server'
    },
    // Event Registration
    'EventRegistration:000002': {
      message: 'Khung giờ đăng ký bị trùng với thời gian diễn ra sự kiện !',
      type: 'Server',
      field: 'registrationInfos'
    },
    'EventRegistration:000003': {
      message: 'Không thể cập nhật thông tin điểm danh !',
      type: 'Server',
      field: 'registrationInfos'
    },
    'EventRegistration:000004': {
      message: 'Khung giờ đăng ký bị trùng nhau !',
      type: 'Server',
      field: 'registrationInfos'
    },
    'EventRegistration:000005': {
      message: 'Khung giờ đăng ký không tồn tại !',
      type: 'Server',
      field: 'registrationInfos'
    },
    //Event Category
    'EventCategory:000001': {
      message: 'Loại sự kiện không tồn tại !',
      type: 'Server'
    },
    'EventActivity:000001': {
      message: 'Hoạt động sự kiện không tồn tại !',
      type: 'Server'
    },
    'EventActivity:000002': {
      message: 'Điểm của vai trò không ở trong khung điểm của hoạt động !',
      type: 'Server',
      field: 'score'
    },
    // Event Collaboration Request
    'EventCollaborationRequest:000001': {
      message: 'Yêu cầu tạo sự kiện không tồn tại !',
      type: 'Server'
    },
    'EventCollaborationRequest:000002': {
      message: 'Quá hạn duyệt yêu cầu tạo sự kiện !',
      type: 'Server'
    },
    'EventCollaborationRequest:000003': {
      message: 'Yêu cầu tạo sự kiện không ở trạng thái cần chờ xử lý !',
      type: 'Server'
    },
    'EventCollaborationRequest:000004': {
      message: 'Không thể từ chối yêu cầu tạo sự kiện !',
      type: 'Server'
    },
    // Event Organization
    'EventOrganization:000001': {
      message: 'Nhà tổ chức sự kiện không tồn tại !',
      type: 'Server'
    },
    'EventOrganization:000002': {
      message: 'Email này đã được đăng ký bởi tổ chức khác',
      type: 'Server',
      field: 'email'
    },
    'EventOrganization:000003': {
      message: 'Không thể xóa tổ chức đã tham gia tổ chức sự kiện trước đó ',
      type: 'Server'
    },
    'EventOrganization:000004': {
      message: 'Tên nhà tổ chức sự kiện đã tồn tại',
      type: 'Server',
      field: 'name'
    },
    'EventOrganization:000005': {
      message: 'Nhà tổ chức không ở trạng thái chờ',
      type: 'Server'
    },
    'EventOrganization:000006': {
      message: 'Nhà tổ chức không ở trạng thái kích hoạt',
      type: 'Server'
    },
    'EventOrganizationContact:000001': {
      message: 'Nhà đại diện tổ chức không tồn tại',
      type: 'Server'
    },
    'EventOrganizationContact:000002': {
      message: 'Nhà đại diện không thuộc về tổ chức',
      type: 'Server'
    },
    'EventOrganizationContact:000003': {
      message: 'Email đã được thiết lập ở một thành viên khác trong tổ chức',
      type: 'Server'
    },
    'EventOrganizationContact:000004': {
      message: 'Không thể xóa nhà đại diện tổ chức',
      type: 'Server'
    },
    // Change Password
    PasswordMismatch: {
      message: 'Mật khẩu hiện tại không đúng !',
      type: 'Server',
      field: 'currentPassword'
    },
    // Proof
    'Proof:000001': {
      message: 'Minh chứng đã được duyệt !',
      type: 'Server'
    },
    'Proof:000002': {
      message: 'Minh chứng không tồn tại !',
      type: 'Server'
    },
    'Proof:000003': {
      message: 'Minh chứng đã được xử lí !',
      type: 'Server'
    },
    'Proof:000004': {
      message: 'Minh chứng không thể xóa !',
      type: 'Server'
    }
  }

  return mappedErrorCode[`${errorCode}`]
}
