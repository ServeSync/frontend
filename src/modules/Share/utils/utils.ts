import axios, { AxiosError } from 'axios'
import { error_code } from '../constants/errorCode'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { format, parseISO } from 'date-fns'

// Auth
export function isUserNameNotFoundError(errorCode: string) {
  return errorCode === error_code.UserNameOrEmailNotFound
}

export function isAccountLockedOutError(errorCode: string) {
  return errorCode === error_code.AccountLockedOut
}

export function isIncorrectPasswordError(errorCode: string) {
  return errorCode === error_code.IncorrectPassword
}

export function isExpiredRefreshTokenError(errorCode: string) {
  return errorCode === error_code.ExpiredRefreshToken
}

export function isNotExistRefreshTokenError(errorCode: string) {
  return errorCode === error_code.NotExistRefreshToken
}

export function isRefreshTokenAddedToUser(errorCode: string) {
  return errorCode === error_code.RefreshTokenAddedToUser
}

export function isValidAccessToken(errorCode: string) {
  return errorCode === error_code.ValidAccessToken
}

// Role
export function isPermissionAlreadyGrantedToRole(errorCode: string) {
  return errorCode === error_code.PermissionAlreadyGrantedToRole
}

export function isPermissionNotGrantedToRole(errorCode: string) {
  return errorCode === error_code.PermissionNotGrantedToRole
}

export function isAdminRoleAccessDeniedError(errorCode: string) {
  return errorCode === error_code.AdminRoleAccessDenied
}

export function isDuplicateRoleNameError(errorCode: string) {
  return errorCode === error_code.DuplicateRoleName
}

// User
export function isUserNotFoundError(errorCode: string) {
  return errorCode === error_code.UserNotFound
}

// Permission
export function isPermissionNotFoundError(errorCode: string) {
  return errorCode === error_code.PermissionNotFound
}

// Student
export function isCodeStudentAlreadyExistsError(errorCode: string) {
  return errorCode === error_code.CodeStudentAlreadyExists
}

export function isCitizenIdStudentAlreadyExistsError(errorCode: string) {
  return errorCode === error_code.CitizenIdStudentAlreadyExists
}

export function isEmailStudentAlreadyExistsExistsError(errorCode: string) {
  return errorCode === error_code.EmailStudentAlreadyExists
}

export function isStudentNotFound(errorCode: string) {
  return errorCode === error_code.StudentNotFound
}

// Status code
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnauthorizedError(error: unknown): error is AxiosError {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

// Format
export function formatDateTime(date: string) {
  return format(parseISO(date), 'yyyy-MM-dd')
}
