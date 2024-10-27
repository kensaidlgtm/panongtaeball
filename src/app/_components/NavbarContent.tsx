'use client'

import Button from '@/components/Button'
import { logOut } from '../actions'
import { useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import toast from 'react-hot-toast'
import Image from 'next/image'
import Icon from '@/components/Icon'

type Props = {
  session: Session | null
}
export default function NavbarContent({ session }: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const role = session?.user.role

  const roleDescription = (() => {
    switch (role) {
      case 'user':
        return 'สมาชิกทั่วไป'
      case 'member':
        return 'สมาชิกพาน้องเตะบอล'
      case 'owner':
        return 'เจ้าของสนาม'
      default:
        return 'สมาชิกทั่วไป'
    }
  })()

  function renderAuth() {
    if (pathname === '/login') {
      return
    }

    if (session) {
      return (
        <div className='flex items-center gap-4'>
          <span className='line-clamp-2 cursor-pointer'>
            {session.user?.name || '-'}{' '}
            <span className='sm:hidden'>
              {' '}
              {session.user.role === 'member'
                ? session.user.memberId
                : `( ${roleDescription} )`}
            </span>
            <span className='max-sm:hidden'>
              ( {roleDescription}{' '}
              {session.user.role === 'member' && session.user.memberId} )
            </span>
          </span>
          <Button
            intent='error'
            disabled={isPending}
            loading={isPending}
            onClick={() => {
              startTransition(async () => {
                const err = await logOut()

                if (err) {
                  toast.error('ไม่สามารถออกจากระบบได้')

                  return
                }

                toast.success('ออกจากระบบสำเร็จ')
                router.push('/')
                router.refresh()
              })
            }}>
            <Icon className='sm:hidden' name='logout' />
            <span className='max-sm:hidden'>ออกจากระบบ</span>
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
    <div className='flex justify-between p-3 gap-4 shadow-lg w-full h-16 bg-white z-10 relative'>
      <div className='flex items-center gap-1 xl:gap-4'>
        <Image
          src='/logo.png'
          alt='logo'
          width={50}
          height={50}
          className='max-sm:hidden cursor-pointer'
          onClick={() =>
            startTransition(() => {
              router.push('/')
            })
          }
        />
        <div
          className='font-medium cursor-pointer p-2 rounded-lg hover:opacity-90 flex items-center'
          onClick={() =>
            startTransition(() => {
              router.push('/')
            })
          }>
          <Icon className='xl:hidden' name='home' outlined />
          <span className='max-xl:hidden'>หน้าหลัก</span>
        </div>
        <div
          className='font-medium cursor-pointer p-2 rounded-lg hover:opacity-90 flex items-center'
          onClick={() =>
            startTransition(() => {
              router.push('/#arena')
            })
          }>
          <Icon className='xl:hidden' name='sports_soccer' outlined />
          <span className='max-xl:hidden'>สนามหญ้าเทียม</span>
        </div>
        <div
          className='font-medium cursor-pointer p-2 rounded-lg hover:opacity-90 flex items-center'
          onClick={() =>
            startTransition(() => {
              router.push('/#policy')
            })
          }>
          <Icon className='xl:hidden' name='policy' outlined />
          <span className='max-xl:hidden'>กฎระเบียบและการจอง</span>
        </div>
        <div
          className='font-medium cursor-pointer p-2 rounded-lg hover:opacity-90 flex items-center'
          onClick={() =>
            startTransition(() => {
              router.push('/#member')
            })
          }>
          <Icon className='xl:hidden' name='star_outline' />
          <span className='max-xl:hidden'>สมาชิกพาน้องเตะบอล</span>
        </div>
      </div>
      {renderAuth()}
    </div>
  )
}
