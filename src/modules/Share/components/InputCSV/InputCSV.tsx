/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useRef } from 'react'
import Button from '../Button'

interface Props {
  onChange: (file?: File) => void
  previewNameFile: string
}

const InputCSV = ({ onChange, previewNameFile }: Props) => {
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
        accept='.csv'
        ref={fileInputRef}
        onChange={OnFileChange}
        onClick={(event) => ((event.target as any).value = null)}
      />
      <Button
        type='button'
        classNameButton='p-6 border-[#26C6DA] border-[2px] border-dashed w-full'
        onClick={handleUploadFile}
      >
        <div>
          {previewNameFile ? (
            <div className='flex flex-col justify-between items-center h-[112px]'>
              <img
                src='https://wiki.tino.org/wp-content/uploads/2021/05/icon_file-CSV_plano-512.png'
                alt='csv_image'
                className='w-[80px]'
              />
              <span>{previewNameFile}</span>
            </div>
          ) : (
            <div className='h-[112px] flex items-end justify-center'>Chọn file</div>
          )}
          <p className='mt-2'>Hỗ trợ file định dạng: CSV</p>
        </div>
      </Button>
    </Fragment>
  )
}

export default InputCSV
