import { ForwardRefRenderFunction, forwardRef, useState } from 'react'

interface DateInputProps {
  placeholder: string
  error: string | undefined
}

const DateInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  DateInputProps
> = ({ placeholder, error, ...rest }, ref) => {
  const [type, setType] = useState('text')
  return (
    <input
      type={type}
      placeholder={placeholder}
      onFocus={() => {
        setType('datetime-local')
      }}
      onBlur={() => {
        setType('text')
      }}
      className={`bg-gray-500 border  border-gray-700 ${error && `boder-red-500`} rounded-lg p-[16px] w-[235px] h-[54px] mt-[-27px] text-gray-100 text-[16px] placeholder:text-gray-300 placeholder:text-[16px] focus:outline-0 focus:border-purple-dark cursor-pointer hover:border-purple-dark transition-all duration-300 ease-in-out`}
      ref={ref}
      {...rest}
    />
  )
}

const DateInput = forwardRef(DateInputBase)

export { DateInput }
