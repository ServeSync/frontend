import { Fragment, useRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { StudentType } from 'src/modules/StudentManagement/interfaces/student.type'
import { FormStudentType } from 'src/modules/StudentManagement/utils/rules'

interface Props {
  onChange?: (file?: File) => void
  register: UseFormRegister<FormStudentType>
  previewImage: string
  student?: StudentType
}

const InputFile = ({ onChange, register, previewImage, student }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const OnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFormLocal = event.target.files?.[0]
    onChange && onChange(fileFormLocal)
  }

  const handleUploadFile = () => {
    fileInputRef.current?.click()
  }

  const avatar = student?.imageUrl

  return (
    <Fragment>
      <input
        type='file'
        className='hidden'
        accept='.jpg,.jpeg,.png'
        {...register('imageUrl')}
        ref={fileInputRef}
        onChange={OnFileChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(event) => ((event.target as any).value = null)}
      />
      <button
        type='button'
        onClick={handleUploadFile}
        className='relative bg-slate-300 rounded-full mt-4 outline-none w-full pt-[100%]'
      >
        <img
          src={
            previewImage ||
            (avatar && avatar) ||
            'https://cdn2.iconfinder.com/data/icons/user-interface-outlined-2020/48/create_new_account-512.png'
          }
          alt='avatar'
          className='rounded-full top-0 h-full w-full object-cover object-top absolute'
        />
      </button>
    </Fragment>
  )
}

export default InputFile
