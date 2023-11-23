/* eslint-disable @typescript-eslint/no-explicit-any */
import studentAPI from './student.api'
import { FormExportFileType } from '../../utils'
import FileSaver from 'file-saver'

class ExportAttendanceEventsCommandHandler {
  handle = (body: { id: string; data: FormExportFileType }, handleError: any) => {
    studentAPI
      .exportAttendanceEvents(body)
      .then((res) => {
        const data = res.data
        const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        FileSaver.saveAs(blob, 'student.xlsx')
      })
      .catch((error) => handleError(error.response.data))
  }
}

export { ExportAttendanceEventsCommandHandler }
