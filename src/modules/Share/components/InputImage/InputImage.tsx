/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import Button from '../Button'
import classNames from 'classnames'

interface Props {
  onChange?: (file?: File) => void
  register: UseFormRegister<any>
  previewImage: string
  avatar?: string
  disabled?: boolean
  children?: React.ReactNode
  classNameButton?: string
  isHiddenButton: boolean
}

const InputImage = ({
  onChange,
  register,
  previewImage,
  avatar,
  disabled,
  children,
  classNameButton = 'absolute bg-slate-100 outline-none w-[48px] h-[48px] bottom-6 right-6 rounded-full',
  isHiddenButton
}: Props) => {
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
      <div className='relative bg-[#fbfbfb] outline-none h-full w-full rounded-xl overflow-hidden'>
        {previewImage || (avatar && avatar) ? (
          <img
            src={previewImage || (avatar && avatar)}
            alt='avatar'
            className='top-0 h-full w-full object-cover object-center absolute rounded-xl'
          />
        ) : (
          <div className='border-[1px] w-full h-full rounded-xl'></div>
        )}
        <Button
          type='button'
          classNameButton={classNames(classNameButton, {
            'opacity-0': (previewImage || (avatar && avatar)) && isHiddenButton === true
          })}
          onClick={handleUploadFile}
          disabled={disabled}
        >
          {children}
        </Button>
      </div>
    </Fragment>
  )
}

export default InputImage
