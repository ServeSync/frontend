import { UseFormRegister } from 'react-hook-form'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  classNameInput: string
  name: string
}

const InputSearch = ({ classNameInput, name, register }: Props) => {
  return (
    <div className='relative'>
      <input type='text' placeholder='Tìm kiếm' className={classNameInput} {...register(name)} />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        className='w-4 h-4 absolute top-[13px] left-[12px] text-gray-600'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
        />
      </svg>
    </div>
  )
}

export default InputSearch
