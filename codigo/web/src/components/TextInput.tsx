import React, { ForwardRefRenderFunction, forwardRef } from 'react'

// import { Container } from './styles';
interface InputProps {
  placeholder: string
  type?: string
  error: string | undefined
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { placeholder, type = 'text', error, ...rest },
  ref,
) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`bg-gray-500 border border-gray-700 ${
        error ?? `border-red-500`
      } rounded-lg p-[16px] w-[400px] h-[54px] mt-[-27px] text-gray-100 text-[16px] placeholder:text-gray-300 placeholder:text-[16px] focus:outline-0 focus:border-purple-dark cursor-pointer hover:border-purple-dark transition-all duration-300 ease-in-out`}
      ref={ref}
      {...rest}
    />
  )
}

const TextInput = forwardRef(InputBase)

export { TextInput }
