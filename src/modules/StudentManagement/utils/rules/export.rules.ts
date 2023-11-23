import * as yup from 'yup'

export const FormExportFileSchema = yup.object().shape({
  formDate: yup.string(),
  toDate: yup.string().test('minTime', 'Thời gian kết thúc phải sau thời gian bắt đầu', function (endAt) {
    const startAt = this.parent.startAt
    if (!startAt || !endAt) {
      return true
    }
    const startDate = new Date(startAt)
    const endDate = new Date(endAt)
    return endDate > startDate
  })
})

export type FormExportFileType = yup.InferType<typeof FormExportFileSchema>
