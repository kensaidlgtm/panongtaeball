import React, { forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import Spinner from './Spinner'

const ButtonVariants = cva(
  'min-w-fit h-10 outline-0 relative flex items-center justify-center text-white border-[1px] gap-1 hover:opacity-[0.85]',
  {
    variants: {
      intent: {
        primary: 'bg-primary border-primary',
        secondary: 'bg-secondary border-secondary',
        success: 'bg-success border-success',
        error: 'bg-error border-error',
      },
      fullWidth: {
        true: 'w-full justify-center',
      },
      disabled: {
        true: 'pointer-events-none text-field-gray',
      },
      outlined: {
        true: 'bg-white',
      },
      loading: {
        true: 'pointer-events-none',
      },
      size: {
        small: 'text-xs p-2',
        medium: 'text-base py-2 px-4',
        large: 'text-lg py-4 px-8',
      },
      roundness: {
        square: 'rounded-none',
        round: 'rounded-md',
        pill: 'rounded-full',
      },
    },
    compoundVariants: [
      {
        outlined: true,
        disabled: false,
        intent: 'primary',
        className: 'text-primary',
      },
      {
        outlined: true,
        disabled: true,
        intent: 'primary',
        className: 'border-field-gray bg-white',
      },
      {
        outlined: false,
        disabled: true,
        intent: 'primary',
        className: 'border-none bg-stroke-gray',
      },
      {
        outlined: true,
        disabled: false,
        intent: 'secondary',
        className: 'hover:text-white hover:bg-secondary text-secondary',
      },
      {
        outlined: true,
        disabled: true,
        intent: 'secondary',
        className: 'border-field-gray bg-white',
      },
      {
        outlined: false,
        disabled: true,
        intent: 'secondary',
        className: 'border-none bg-stroke-gray',
      },
      {
        outlined: true,
        disabled: false,
        intent: 'success',
        className: 'text-success bg-white',
      },
      {
        outlined: true,
        disabled: true,
        intent: 'success',
        className: 'border-field-gray bg-white',
      },
      {
        outlined: false,
        disabled: true,
        intent: 'success',
        className: 'border-none bg-stroke-gray',
      },
      {
        outlined: true,
        disabled: false,
        intent: 'error',
        className: 'text-error bg-white',
      },
      {
        outlined: true,
        disabled: true,
        intent: 'error',
        className: 'border-field-gray bg-white',
      },
      {
        outlined: false,
        disabled: true,
        intent: 'error',
        className: 'border-none bg-stroke-gray',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
      roundness: 'pill',
    },
  }
)

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof ButtonVariants> {
  endIcon?: JSX.Element
  startIcon?: JSX.Element
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      endIcon,
      intent,
      size,
      startIcon,
      roundness,
      fullWidth,
      disabled = false,
      outlined = false,
      children,
      loading,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          ButtonVariants({
            disabled,
            intent,
            size,
            outlined,
            roundness,
            fullWidth,
            loading,
          }),
          className
        )}
        {...props}>
        {startIcon && !loading && (
          <div
            data-testid='button-start-icon'
            className='relative left-0 flex items-center'>
            {startIcon}
          </div>
        )}
        {loading ? <Spinner color={intent} size={size} /> : children}
        {endIcon && !loading && (
          <div
            data-testid='button-end-icon'
            className='relative right-0 flex items-center'>
            {endIcon}
          </div>
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
