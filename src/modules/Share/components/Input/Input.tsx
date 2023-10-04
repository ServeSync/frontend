import { UseFormRegister } from 'react-hook-form'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  id: string
  name: string
  label: string
  placeholder?: string
  type?: string
  className: string
  classNameInput: string
  error?: string
}
const Input = ({ register, id, placeholder, type = 'text', name, classNameInput, className, label, error }: Props) => {
  return (
    <div className={className}>
      <label htmlFor={id} className='mb-2'>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className={classNameInput + ' placeholder:font-normal'}
        {...register(name)}
      />
      <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error}</span>
    </div>
  )
}

export default Input
