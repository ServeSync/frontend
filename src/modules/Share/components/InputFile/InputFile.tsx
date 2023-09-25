import { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
import upload from '../../assets/images/upload.png'

interface Props {
  onChange?: (file?: File) => void
}

const InputFile = ({ onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const OnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFormLocal = event.target.files?.[0]
    if (fileFormLocal) {
      toast.error('Dụng lượng file tối đa 1 MB và định dạng: .JPEG, .PNG')
    } else {
      onChange && onChange(fileFormLocal)
    }
  }

  const handleUploadFile = () => {
    fileInputRef.current?.click()
  }

  return (
    <Fragment>
      <input
        type='file'
        className='hidden'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={OnFileChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(event) => ((event.target as any).value = null)}
      />
      <button
        type='button'
        onClick={handleUploadFile}
        className='px-10 py-16 bg-slate-300 rounded-lg mt-4 outline-none'
      >
        <img src={upload} alt='avatar' className='h-20 w-20' />
        <span className='text-[14px] text-gray-500'>Chọn ảnh</span>
      </button>
    </Fragment>
  )
}

export default InputFile
