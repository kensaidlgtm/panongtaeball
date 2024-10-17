'use client'
import Button from '@/components/Button'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

export default function Navbar() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className='flex justify-between p-3 fixed top-0 shadow-lg w-full h-16 bg-white'>
      <div />
      {pathname !== '/register' && (
        <Button
          disabled={isPending}
          loading={isPending}
          onClick={() => {
            startTransition(() => {
              router.push('/register')
            })
          }}>
          สมัครสมาชิก
        </Button>
      )}
    </div>
  )
}
