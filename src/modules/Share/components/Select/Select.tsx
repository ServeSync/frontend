import { UseFormRegister } from 'react-hook-form'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  id: string
  name: string
  label: string
  className?: string
  classNameSelect: string
  defaultOptions?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any
  error?: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({
  register,
  id,
  name,
  label,
  className,
  classNameSelect,
  defaultOptions,
  options,
  error,
  onChange
}: Props) => {
  return (
    <div className={className}>
      <label htmlFor={id} className='mb-2'>
        {label}
      </label>
      <select id={id} className={classNameSelect} {...register(name)} onChange={onChange}>
        {defaultOptions && <option value=''>{defaultOptions}</option>}
        {options &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          options.map((option: any) => (
            <option value={option.id} key={option.id} className='py-2'>
              {option.name}
            </option>
          ))}
      </select>
      <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error}</span>
    </div>
  )
}

export default Select
