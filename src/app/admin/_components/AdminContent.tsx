'use client'

import {
  manageFirstLight,
  manageFourthLight,
  manageSecondLight,
  manageThirdLight,
} from '@/app/actions'
import Button from '@/components/Button'

// Reusable component for light controls
const LightControl = ({
  lightNumber,
  manageLight,
}: {
  lightNumber: number
  manageLight: (state: 'on' | 'off') => Promise<void>
}) => (
  <div className='flex flex-col gap-3 items-center justify-center'>
    <span>ไฟสนามดวงที่{lightNumber}</span>
    <div className='flex items-center gap-3'>
      <Button intent='success' onClick={async () => await manageLight('on')}>
        เปิดไฟ
      </Button>
      <Button intent='error' onClick={async () => await manageLight('off')}>
        ปิดไฟ
      </Button>
    </div>
  </div>
)

export default function AdminContent() {
  return (
    <div className='flex flex-col h-[calc(100vh-128px)] p-6'>
      <div className='flex flex-col items-center gap-4 rounded-lg shadow-lg p-6'>
        <span className='font-medium text-2xl'>จัดการไฟสนาม</span>
        <div className='flex flex-wrap gap-4'>
          <LightControl lightNumber={1} manageLight={manageFirstLight} />
          <LightControl lightNumber={2} manageLight={manageSecondLight} />
          <LightControl lightNumber={3} manageLight={manageThirdLight} />
          <LightControl lightNumber={4} manageLight={manageFourthLight} />
        </div>
      </div>
    </div>
  )
}
