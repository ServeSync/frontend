import { UseFormRegister } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  id: string
  name: string
  type?: string
  label?: string
  placeholder?: string
  autoComplete?: string
  className: string
  classNameInput: string
  error?: string
  children?: React.ReactNode
  isLoading?: boolean
}

const Input = ({
  register,
  id,
  name,
  type = 'text',
  label,
  placeholder,
  autoComplete,
  className,
  classNameInput,
  error,
  children,
  isLoading
}: Props) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className='mb-2'>
          {label}
        </label>
      )}
      {isLoading && isLoading ? (
        <Skeleton className='h-[34px]' />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          id={id}
          className={classNameInput + ' placeholder:font-normal'}
          {...register(name)}
        />
      )}
      {children && children}
      <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error}</span>
    </div>
  )
}

export default Input
