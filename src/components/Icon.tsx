import React from 'react'
import clsx from 'clsx'
import { MaterialIcon } from 'material-icons'
import { twMerge } from 'tailwind-merge'

type BaseIconProps = {
  name: MaterialIcon
  dataTestId?: string
  as?: keyof React.ReactHTML
  className?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  style?: React.CSSProperties
}

type IconVariant = 'default' | 'outlined' | 'rounded' | 'sharp' | 'twoTone'

type IconVariantProps = BaseIconProps & {
  variant: IconVariant
}

type OutlinedIconProps = BaseIconProps & {
  outlined: true
  variant?: never
}

type RoundedIconProps = BaseIconProps & {
  rounded: true
  variant?: never
}

type SharpIconProps = BaseIconProps & {
  sharp: true
  variant?: never
}

type TwoToneIconProps = BaseIconProps & {
  twoTone: true
  variant?: never
}

type IconProps = BaseIconProps &
  Partial<Omit<OutlinedIconProps, 'variant'>> &
  Partial<Omit<RoundedIconProps, 'variant'>> &
  Partial<Omit<SharpIconProps, 'variant'>> &
  Partial<Omit<TwoToneIconProps, 'variant'>> &
  Partial<IconVariantProps>

function Icon({ name, variant, as, className }: IconVariantProps): JSX.Element
function Icon({ name, as, className }: BaseIconProps): JSX.Element
function Icon({ name, outlined, as, className }: OutlinedIconProps): JSX.Element
function Icon({ name, rounded, as, className }: RoundedIconProps): JSX.Element
function Icon({ name, sharp, as, className }: SharpIconProps): JSX.Element
function Icon({ name, twoTone, as, className }: TwoToneIconProps): JSX.Element

function Icon({
  name,
  dataTestId,
  variant,
  outlined,
  rounded,
  sharp,
  twoTone,
  as = 'span',
  className,
  onClick,
  style,
}: IconProps) {
  const As = as

  let iconVariant = variant
  if (outlined) iconVariant = 'outlined'
  if (rounded) iconVariant = 'rounded'
  if (sharp) iconVariant = 'sharp'
  if (twoTone) iconVariant = 'twoTone'
  if (!iconVariant) iconVariant = 'default'

  const iconClassName = twMerge(
    clsx({
      'select-none text-md': true,
      'material-icons': iconVariant === 'default',
      'material-icons-outlined': iconVariant === 'outlined',
      'material-icons-round': iconVariant === 'rounded',
      'material-icons-sharp': iconVariant === 'sharp',
      'material-icons-two-tone': iconVariant === 'twoTone',
    }),
    className
  )

  return (
    <As
      data-testid={dataTestId}
      className={iconClassName}
      onClick={onClick}
      style={style}>
      {name}
    </As>
  )
}

export default Icon
