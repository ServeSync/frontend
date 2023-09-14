import { error_code } from '../constants/errorCode'

export function isUserNameNotFound(errorCode: string) {
  return errorCode === error_code.UserNameOrEmailNotFound
}

export function isAccountLockedOut(errorCode: string) {
  return errorCode === error_code.AccountLockedOut
}

export function isIncorrectPassword(errorCode: string) {
  return errorCode === error_code.IncorrectPassword
}

export function isPermissionAlreadyGrantedToRole(errorCode: string) {
  return errorCode === error_code.PermissionAlreadyGrantedToRole
}

export function isPermissionNotGrantedToRole(errorCode: string) {
  return errorCode === error_code.PermissionNotGrantedToRole
}

export function isAdminRoleAccessDenied(errorCode: string) {
  return errorCode === error_code.AdminRoleAccessDenied
}

export function isUserNotFound(errorCode: string) {
  return errorCode === error_code.UserNotFound
}

export function isPermissionNotFound(errorCode: string) {
  return errorCode === error_code.PermissionNotFound
}

export function isDuplicateRoleName(errorCode: string) {
  return errorCode === error_code.DuplicateRoleName
}
