'use client'
import { manageFirstLight } from '@/app/actions'
import Button from '@/components/Button'
export default function AdminContent() {
  return (
    <div className='flex flex-col h-[calc(100vh-128px)] p-6'>
      <div className='flex flex-col items-center gap-4 rounded-lg shadow-lg p-6'>
        <span className='font-medium text-2xl'>จัดการไฟสนาม</span>
        <div className='flex flex-wrap gap-4'>
          <div className='flex flex-col gap-3 items-center justify-center'>
            <span>ไฟสนามดวงที่1</span>
            <div className='flex items-center gap-3'>
              <Button
                intent='success'
                onClick={async () => await manageFirstLight('on')}>
                เปิดไฟ
              </Button>
              <Button
                intent='error'
                onClick={async () => await manageFirstLight('off')}>
                ปิดไฟ
              </Button>
            </div>
          </div>
          <div className='flex flex-col gap-3 items-center justify-center'>
            <span>ไฟสนามดวงที่2</span>
            <div className='flex items-center gap-3'>
              <Button intent='success' disabled>
                เปิดไฟ
              </Button>
              <Button intent='error' disabled>
                ปิดไฟ
              </Button>
            </div>
          </div>
          <div className='flex flex-col gap-3 items-center justify-center'>
            <span>ไฟสนามดวงที่3</span>
            <div className='flex items-center gap-3'>
              <Button intent='success' disabled>
                เปิดไฟ
              </Button>
              <Button intent='error' disabled>
                ปิดไฟ
              </Button>
            </div>
          </div>
          <div className='flex flex-col gap-3 items-center justify-center'>
            <span>ไฟสนามดวงที่4</span>
            <div className='flex items-center gap-3'>
              <Button intent='success' disabled>
                เปิดไฟ
              </Button>
              <Button intent='error' disabled>
                ปิดไฟ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
