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
      <button type='button' onClick={handleUploadFile} className='px-2 py-4 bg-slate-300 rounded-lg mt-4 outline-none'>
        <img
          src={
            previewImage ||
            (avatar && avatar) ||
            'https://res.cloudinary.com/dboijruhe/image/upload/v1695882589/ServeSync/fu47apujqu1uxj4gkveu.png?fbclid=IwAR3xmkQr_MC2QsKINh2bAcTMIfyQ5bj7PW4LBsKI9RZbw9zxlM2ZHR5GfDY'
          }
          alt='avatar'
          className='h-36 w-36'
        />
        {previewImage ? (
          <span className='text-[14px] text-gray-500'>Đổi ảnh</span>
        ) : (
          <span className='text-[14px] text-gray-500'>Chọn ảnh</span>
        )}
      </button>
    </Fragment>
  )
}

export default InputFile
