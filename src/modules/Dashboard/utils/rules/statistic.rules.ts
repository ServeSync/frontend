import { addDays } from 'date-fns'
import * as yup from 'yup'

export const FormTimeStatisticSchema = yup.object().shape({
  formDate: yup.string(),
  toDate: yup.string().test('successTime', 'Thời gian kết thúc phải sau thời gian bắt đầu', function (toDate) {
    const formDate = this.parent.formDate
    if (!formDate || !toDate) {
      return true
    }
    const startDate = new Date(formDate)
    const endDate = new Date(toDate)
    return endDate >= startDate
  })
})

export type FormTimeStatisticType = yup.InferType<typeof FormTimeStatisticSchema>

export const FormTimeStudentsStatisticSchema = yup.object().shape({
  formDate: yup.string(),
  toDate: yup.string().test('successTime', 'Thời gian thống kê ít nhất 1 ngày', function (toDate) {
    const formDate = this.parent.formDate
    if (!formDate || !toDate) {
      return true
    }
    const startDate = new Date(formDate)
    const endDate = new Date(toDate)
    const minDays = addDays(startDate, 1)
    return endDate >= minDays
  })
})

export type FormTimeStudentsStatisticType = yup.InferType<typeof FormTimeStudentsStatisticSchema>
