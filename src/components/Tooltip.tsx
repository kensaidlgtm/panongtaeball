'use client'

import { useState } from 'react'
import * as TooltipRadix from '@radix-ui/react-tooltip'

type TooltipProps = {
  delayDuration?: number
  trigger?: JSX.Element
  content?: JSX.Element
  align?: 'center' | 'start' | 'end'
  sideOffset?: number
}

export default function Tooltip({
  delayDuration = 800,
  trigger,
  content,
  align = 'center',
  sideOffset = 5,
}: TooltipProps) {
  const [open, setOpen] = useState(false)

  return (
    <TooltipRadix.Provider>
      <TooltipRadix.Root delayDuration={delayDuration} open={open}>
        <TooltipRadix.Trigger
          data-testid='tooltip-trigger'
          asChild
          onMouseEnter={() => {
            setOpen(true)
          }}
          onMouseLeave={() => {
            setOpen(false)
          }}
          onFocus={() => {
            setOpen(true)
          }}
          onBlur={() => {
            setOpen(false)
          }}>
          {trigger}
        </TooltipRadix.Trigger>
        <TooltipRadix.Portal>
          <TooltipRadix.Content
            className='z-50 shadow-lg -mb-[1px] rounded px-3 py-2 text-xs text-white'
            sideOffset={sideOffset}
            align={align}>
            {content}
            <TooltipRadix.Arrow className='fill-white' />
          </TooltipRadix.Content>
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  )
}
