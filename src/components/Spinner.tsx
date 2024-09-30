import React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'

const SpinnerVariants = cva('border-2 rounded-[50%] animate-spin', {
  variants: {
    color: {
      primary: 'border-t-primary',
      secondary: 'border-t-secondary',
      success: 'border-t-success',
      error: 'border-t-error',
      shopee: 'border-t-shopee',
      lazada: 'border-t-lazada',
      tiktok: 'border-t-tiktok',
    },
    size: {
      small: 'w-4 h-4',
      medium: 'w-6 h-6',
      large: 'w-10 h-10 ',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'medium',
  },
})

interface SpinnerProps extends VariantProps<typeof SpinnerVariants> {
  className?: string
}

export default function Spinner({ color, size, className }: SpinnerProps) {
  return (
    <div
      data-testid='spinner'
      className={SpinnerVariants({ color, size, className })}
    />
  )
}
