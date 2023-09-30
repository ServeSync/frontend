export const error_code = {
  // Auth error
  UserNameOrEmailNotFound: 'User:000002',
  AccountLockedOut: 'User:000003',
  IncorrectPassword: 'User:000004',
  ExpiredRefreshToken: 'User:000005',
  NotExistRefreshToken: 'User:000006',
  RefreshTokenAddedToUser: 'User:000007',
  ValidAccessToken: 'User:000008',
  // Role error
  RoleNotFound: 'Role:000001',
  PermissionAlreadyGrantedToRole: 'Role:000002',
  PermissionNotGrantedToRole: 'Role:000003',
  AdminRoleAccessDenied: 'Role:000004',
  DuplicateRoleName: 'DuplicateRoleName',
  // User error
  UserNotFound: 'User:000001',
  // Permission error
  PermissionNotFound: 'Permission:000001',
  // Student error
  CodeStudentAlreadyExists: 'Student:000001',
  CitizenIdStudentAlreadyExists: 'Student:000002',
  StudentNotFound: 'Student:000003',
  EmailStudentAlreadyExists: 'Student:000004'
} as const
