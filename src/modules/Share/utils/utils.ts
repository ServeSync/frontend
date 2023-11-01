/* eslint-disable import/no-named-as-default-member */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'
import { UseFormSetError } from 'react-hook-form'
import { ErrorCodeToMessage } from '../constants/errorCode'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { format, parseISO } from 'date-fns'
import moment from 'moment-timezone'
import { toast } from 'react-toastify'

export function handleError<T>(error: any, setError?: UseFormSetError<any>) {
  const { type, field, message } = ErrorCodeToMessage(error.response?.data.code)
  if (field) {
    setError &&
      setError(field as keyof T as string, {
        message,
        type
      })
  } else {
    toast.error(message)
  }
}

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnauthorizedError(error: unknown): error is AxiosError {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function formatDateTime(dateTime: string) {
  return format(parseISO(dateTime), 'yyyy-MM-dd')
}

export function formatDate(date: string) {
  return date && moment(date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
}

export function formatVNDateTime(date: string) {
  return moment(date).tz('Asia/Ho_Chi_Minh').format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
}

export function formatTime(time: string) {
  return moment(time).tz('Asia/Ho_Chi_Minh').format('HH:mm')
}
