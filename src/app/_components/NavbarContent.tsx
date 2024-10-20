'use client'

import Button from '@/components/Button'
import { signOutAction as signOut } from '../actions'
import { useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import toast from 'react-hot-toast'
import Image from 'next/image'

type Props = {
  session: Session | null
}
export default function NavbarContent({ session }: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  function render() {
    if (pathname === '/login') {
      return
    }

    if (session) {
      return (
        <div className='flex items-center gap-4'>
          <span>สวัสดีคุณ {session.user?.name || '-'}</span>
          <Button
            intent='error'
            disabled={isPending}
            loading={isPending}
            onClick={() => {
              startTransition(async () => {
                const err = await signOut()

                if (err) {
                  toast.error('ไม่สามารถออกจากระบบได้')

                  return
                }

                toast.success('ออกจากระบบสำเร็จ')
                router.push('/')
                router.refresh()
              })
            }}>
            ออกจากระบบ
          </Button>
        </div>
      )
    } else {
      return (
        <Button
          disabled={isPending}
          loading={isPending}
          onClick={() => {
            startTransition(() => {
              router.push('/login')
            })
          }}>
          เข้าสู่ระบบ
        </Button>
      )
    }
  }
  return (
    <div className='flex justify-between p-3 fixed top-0 shadow-lg w-full h-16 bg-white'>
      <div className='flex items-center gap-4'>
        <Image
          src='/logo.png'
          alt='logo'
          width={50}
          height={50}
          className='cursor-pointer'
          onClick={() =>
            startTransition(() => {
              router.push('/')
            })
          }
        />
        <div
          className='font-medium cursor-pointer border border-disabled shadow-sm p-2 rounded-lg hover:opacity-90'
          onClick={() =>
            startTransition(() => {
              router.push('/')
            })
          }>
          หน้าหลัก
        </div>
      </div>
      {render()}
    </div>
  )
}
