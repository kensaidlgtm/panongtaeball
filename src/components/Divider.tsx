import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type Props = Partial<Omit<HTMLHRElement, 'className'>> & {
  className?: string
  vertical?: boolean
}

export default function Divider({ className, vertical, id }: Props) {
  return (
    <hr
      id={id}
      className={twMerge(
        clsx(
          {
            'w-full border-b-0 border-t-[1px]': !vertical,
            'h-full border-b-0 border-l-[1px] border-r-0 border-t-0': vertical,
          },
          className
        )
      )}
    />
  )
}
