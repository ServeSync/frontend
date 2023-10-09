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
    DuplicateEmail: {
      message: 'Email đã tồn tại!',
      type: 'Server',
      field: 'email'
    },
    InvalidImage: {
      message: 'Vui lòng điền ảnh!',
      type: 'Server',
      field: 'imageUrl'
    }
  }

  return mappedErrorCode[`${errorCode}`]
}
