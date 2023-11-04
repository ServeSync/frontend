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

const InputImage = ({ onChange, register, previewImage, avatar }: Props) => {
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
      <div className='relative bg-[#AAE4E6] outline-none h-full w-full rounded-2xl'>
        <img
          src={
            previewImage ||
            (avatar && avatar) ||
            'https://cdn.sforum.vn/sforum/wp-content/uploads/2020/08/Pastel-iPhone-wallpaper-Arthur1992aS-iDownloadBlog-Blue-thumbnail-1472x1472-1.jpeg'
          }
          alt='avatar'
          className='top-0 h-full w-full object-cover object-center absolute rounded-2xl'
        />
        <Button
          type='button'
          classNameButton='absolute bg-slate-100 outline-none w-[48px] h-[48px] bottom-6 right-6 rounded-full'
          onClick={handleUploadFile}
        >
          <div className='flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
              />
            </svg>
          </div>
        </Button>
      </div>
    </Fragment>
  )
}

export default InputImage
