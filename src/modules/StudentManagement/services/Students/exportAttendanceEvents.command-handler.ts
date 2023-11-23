/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import studentAPI from './student.api'
import { FormExportFileType } from '../../utils'

class ExportAttendanceEventsCommandHandler {
  private _exportFileMutation

  constructor() {
    this._exportFileMutation = useMutation({
      mutationFn: (body: { id: string; data: FormExportFileType }) => studentAPI.exportAttendanceEvents(body)
    })
  }

  handle = (body: { id: string; data: FormExportFileType }, handleSuccess: any, handleError: any) => {
    return this._exportFileMutation.mutate(body, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: () => {
        handleError()
      }
    })
  }

  onSuccess() {
    return this._exportFileMutation.data?.data
  }

  isLoading() {
    return this._exportFileMutation.isLoading
  }
}

export { ExportAttendanceEventsCommandHandler }
