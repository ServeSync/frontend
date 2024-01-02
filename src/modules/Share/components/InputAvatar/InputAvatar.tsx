/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import Button from '../Button'

interface Props {
  onChange?: (file?: File) => void
  register: UseFormRegister<any>
  previewImage: string
  avatar?: string
}

const InputAvatar = ({ onChange, register, previewImage, avatar }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const OnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFormLocal = event.target.files?.[0]
    onChange && onChange(fileFormLocal)
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
        {...register('imageUrl')}
        ref={fileInputRef}
        onChange={OnFileChange}
        onClick={(event) => ((event.target as any).value = null)}
      />
      <Button
        type='button'
        classNameButton='relative bg-slate-300 rounded-full outline-none w-full pt-[100%]'
        onClick={handleUploadFile}
      >
        <img
          src={
            previewImage ||
            (avatar && avatar) ||
            'http://res.cloudinary.com/dboijruhe/image/upload/v1700226509/ServeSync/98ab36c2-5939-4135-b919-52f0d0e6360d-avatar-default.png'
          }
          alt='avatar'
          className='rounded-full top-0 h-full w-full  object-cover object-top absolute '
        />
      </Button>
    </Fragment>
  )
}

export default InputAvatar
