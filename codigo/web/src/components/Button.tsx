import { PlusCircle, MagnifyingGlass } from '@phosphor-icons/react'
import { ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}


export function PrimaryButton({isLoading,type, ...rest}: ButtonProps) {
  return (
    <button
      type={type}
      className={`bg-blue-dark w-[45px] h-[52px] rounded-lg text-gray-100 text-[14px] flex items-center justify-center gap-2 mt-[-26px] hover:bg-blue-light ${isLoading && 'opacity-50'}'`}
      {...rest}
    >
      <PlusCircle size={24} />
    </button>
  )
}
export function SecondaryButton({ type,isLoading, ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={`bg-gray-500 w-[45px] h-[52px] rounded-lg text-gray-100 text-[14px] flex items-center justify-center gap-2 mt-[-26px] hover:bg-gray-400 ${isLoading && 'opacity-50'}'`}

      {...rest}
    >
      <MagnifyingGlass size={24} />
    </button>
  )
}
