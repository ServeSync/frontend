/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/modules/Share/components/Button'
import InputCSV from 'src/modules/Share/components/InputCSV'

interface Props {
  onChangeFile: (file?: File) => void
  onSubmitFile: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
  previewNameFile: string
}

const ImportFile = ({ onChangeFile, onSubmitFile, previewNameFile }: Props) => {
  return (
    <div className='bg-white p-6 rounded-lg'>
      <h2 className='w-full text-center mb-3 text-[24px] font-semibold'>Nhập file</h2>
      <form onSubmit={onSubmitFile}>
        <InputCSV onChange={onChangeFile} previewNameFile={previewNameFile} />
        <p className='text-[14px] mt-2'>
          Lưu ý: File có định dạng tương tự như file
          <Link to='/!' className='text-[#26C6DA] hover:underline mx-1'>
            tham khảo
          </Link>
          sau đây
        </p>
        <div className='w-full flex justify-end mt-4'>
          <Button
            type='submit'
            classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
          >
            Hoàn tất
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ImportFile
