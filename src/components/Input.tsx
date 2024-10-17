import { forwardRef } from 'react'
import clsx from 'clsx'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Spinner from './Spinner'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string | boolean
  errorClassName?: string
  register?: UseFormRegisterReturn | null
  startIcon?: JSX.Element
  startIconContainerClassName?: string
  endIcon?: JSX.Element
  inputClassName?: string
  containerClassName?: string
  endIconContainerClassName?: string
  loading?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      containerClassName = '',
      errorClassName,
      inputClassName = '',
      disabled,
      register,
      error,
      placeholder = 'กรอกข้อมูล',
      type = 'text',
      value,
      startIcon,
      startIconContainerClassName,
      endIcon,
      endIconContainerClassName,
      loading,
      ...props
    },
    ref
  ) => {
    return (
      <div
        data-testid='input-container'
        className={twMerge('relative', containerClassName)}>
        {startIcon && (
          <div
            data-testid='input-start-icon'
            className={twMerge(
              'absolute left-3 top-[10px]',
              startIconContainerClassName
            )}>
            {startIcon}
          </div>
        )}
        <input
          {...props}
          type={type}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          className={twMerge(
            clsx({
              'group h-10 w-full rounded border-[1px] border-[#E4E4E4] px-4 py-2 text-secondary outline-none placeholder:text-field-gray focus:border-primary':
                true,
              'pointer-events-none border-stroke-gray bg-grey-light text-field-gray':
                disabled,
              '!border-error': error,
              'pl-9': startIcon,
              'pr-11': endIcon,
            }),
            inputClassName
          )}
          ref={register ? undefined : ref}
          {...register}
        />
        {Boolean(loading || endIcon) && (
          <div
            data-testid='input-end-icon'
            className={twMerge(
              'absolute right-3 top-[9px]',
              endIconContainerClassName
            )}>
            {loading ? <Spinner /> : endIcon}
          </div>
        )}
        {typeof error === 'string' && (
          <p
            data-testid='input-error-text'
            className={twMerge(
              'absolute -bottom-[18px] text-xs text-error',
              errorClassName
            )}>
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
