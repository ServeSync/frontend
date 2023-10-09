/* eslint-disable import/no-named-as-default-member */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'
import { UseFormSetError } from 'react-hook-form'
import { ErrorCodeToMessage } from '../constants/errorCode'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { format, parseISO } from 'date-fns'
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

export function formatDateTime(date: string) {
  return format(parseISO(date), 'yyyy-MM-dd')
}
