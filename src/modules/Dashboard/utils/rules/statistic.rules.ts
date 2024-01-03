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
