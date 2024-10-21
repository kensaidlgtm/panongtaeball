import * as RadixCheckbox from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import Icon from './Icon'
import Spinner from './Spinner'

type CheckboxProps = {
  className?: string
  checked: boolean
  disabled?: boolean
  indicatorClassName?: string
  loading?: boolean
  onChange: (checked: boolean) => unknown
  id?: string
}

export default function Checkbox({
  className = '',
  checked,
  disabled,
  indicatorClassName,
  loading,
  onChange,
  id = '',
}: CheckboxProps) {
  return loading ? (
    <Spinner />
  ) : (
    <RadixCheckbox.Root
      id={id}
      disabled={disabled}
      checked={checked}
      onCheckedChange={onChange}
      className={twMerge(
        clsx({
          'flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 border-field-gray bg-white hover:bg-stroke-gray aria-checked:border-none':
            true,
          'pointer-events-none aria-checked:bg-field-gray': disabled,
          'aria-checked:bg-primary': !disabled,
        }),
        className
      )}>
      <RadixCheckbox.Indicator className='leading-none text-white'>
        <Icon
          name='check'
          className={twMerge(
            'p-[6px] text-base font-extrabold',
            indicatorClassName
          )}
        />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}
