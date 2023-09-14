export const error_code = {
  // Auth error
  UserNameOrEmailNotFound: 'User:000002',
  AccountLockedOut: 'User:000003',
  IncorrectPassword: 'User:000004',
  // Role error
  RoleNotFound: 'Role:000001',
  PermissionAlreadyGrantedToRole: 'Role:000002',
  PermissionNotGrantedToRole: 'Role:000003',
  AdminRoleAccessDenied: 'Role:000004',
  DuplicateRoleName: 'DuplicateRoleName',
  // User error
  UserNotFound: 'User:000001',
  // Permission error
  PermissionNotFound: 'Permission:000001'
} as const
