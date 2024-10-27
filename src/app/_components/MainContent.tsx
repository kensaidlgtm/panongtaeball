'use client'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useTransition } from 'react'

type Props = {
  session: Session | null
}
export default function MainContent({ session }: Props) {
  console.log('main session: ', session)
  const [arenaRef, policyRef, memberRef] = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ]
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
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

  return (
    <>
      <div className='overflow-scroll flex-col snap-center scrollbar-sm h-full flex items-center'>
        <div className='flex flex-col gap-5 min-h-[700px] p-3 h-full justify-center'>
          <Image
            src='/logo.png'
            alt='logo'
            width={400}
            height={400}
            className='w-auto max-h-[40vh] self-center'
          />
          <div className='flex flex-col items-center justify-center gap-5'>
            <div className='flex gap-5 md:flex-row flex-col'>
              <Link
                href={'https://www.youtube.com/@panongtaeball'}
                target='_blank'
                className='cursor-pointer flex items-center gap-3 shadow-md rounded-lg p-4'>
                <Image src='/youtube.png' alt='logo' width={50} height={50} />
                <span className='font-medium text-xl'>พาน้องเตะบอล</span>
              </Link>
              <div
                className='cursor-pointer flex items-center gap-3 shadow-md rounded-lg p-4'
                onClick={() => {
                  arenaRef.current?.scrollIntoView()
                }}>
                <Image src='/logo.png' alt='logo' width={50} height={50} />
                <span className='font-medium text-xl'>สนามหญ้าเทียม</span>
              </div>
            </div>
            <Link
              href='https://maps.app.goo.gl/xVU4UreTyXvLj1rW9'
              target='_blank'
              className='border p-3 rounded-lg shadow-lg'>
              <Image
                src='/google-map.png'
                width={100}
                height={100}
                alt='google-map'
              />
            </Link>
          </div>
        </div>
      </div>
      <div
        id='arena'
        ref={arenaRef}
        className='scroll-pt-16 overflow-auto p-3 snap-center h-full flex items-center flex-col scrollbar-sm'>
        <div className='min-h-[700px] flex flex-col gap-4 h-full p-5 justify-center items-center'>
          <span className='text-3xl text-center'>
            สอบถามรายละเอียด & จองสนามได้ที่
          </span>
          <div className='flex items-center md:flex-row flex-col gap-2'>
            <div
              className='cursor-pointer flex items-center gap-3 shadow-md rounded-lg p-4'
              onClick={() => {
                policyRef.current?.scrollIntoView()
              }}>
              <Icon name='policy' className='text-success' />
              <span className='font-medium text-xl'>
                กฎระเบียบและการจองสนาม
              </span>
            </div>
            <div
              className='cursor-pointer flex items-center gap-3 shadow-md rounded-lg p-4'
              onClick={() => {
                memberRef.current?.scrollIntoView()
              }}>
              <Icon name='star' className='text-success' />
              <span className='font-medium text-xl'>สมาชิกพาน้องเตะบอล</span>
            </div>
          </div>
          <Image src='/lineOA.png' alt='lineOA' width={300} height={300} />
          <span className='text-center'>
            Line Official Account: พาน้องเตะบอล
          </span>

          <Link href='https://lin.ee/GWAaDmhm' target='_blank'>
            <Button className='bg-line-oa border-line-oa' roundness='round'>
              <Image
                src='/line_oa_logo.png'
                width={30}
                height={30}
                alt='line_oa_logo'
              />
              เพิ่มเพื่อนเลย !
            </Button>
          </Link>
        </div>
      </div>
      <div
        id='policy'
        ref={policyRef}
        className='scroll-pt-16 p-3 snap-center h-full'>
        <div className='p-5 flex flex-col gap-4 rounded-lg border w-full overflow-auto scrollbar-sm h-full'>
          <p className='justify-center text-2xl font-medium flex items-center gap-3'>
            กฎระเบียบและการจอง <Icon name='policy' className='text-disabled' />
          </p>
          <div className='flex justify-center items-center gap-3'>
            <span>สถานะของคุณคือ: </span>
            {session ? (
              <span>
                {roleDescription}{' '}
                {role === 'member' ? (
                  <span>({session?.user.memberId})</span>
                ) : (
                  ''
                )}
              </span>
            ) : (
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
            )}
          </div>
          <div className='flex flex-col gap-2 rounded-lg border p-3'>
            <div className='flex items-center gap-2'>
              <span className='text-xl font-medium'>สำหรับสมาชิกทั่วไป</span>
              <Icon name='person' className='text-disabled' />
            </div>
            <p>
              - จองผ่าน{' '}
              <Link
                href='https://lin.ee/GWAaDmhm'
                target='_blank'
                className='text-primary hover-underline cursor-pointer'>
                Line Official Account
              </Link>{' '}
              หรือโทรจองก่อนเท่านั้น
            </p>
            <p>- คนละ 50 บาท / ชั่วโมง (สนามเต็มที่ 21 คน)</p>
            <p>- ทีมละ 700 บาท / ชั่วโมง (ไม่จำกัดจำนวนคนเล่น)</p>
          </div>
          <div className='flex flex-col gap-2 rounded-lg p-3 border'>
            <div className='flex items-center gap-2'>
              <span className='text-xl font-medium'>
                สำหรับ
                <span
                  className='cursor-pointer text-primary'
                  onClick={() => {
                    memberRef.current?.scrollIntoView()
                  }}>
                  สมาชิกพาน้องเตะบอล
                </span>
              </span>
              <Icon name='star' className='text-disabled' />
            </div>
            <p>
              - จองผ่าน{' '}
              <Link
                href='https://lin.ee/GWAaDmhm'
                target='_blank'
                className='text-primary hover-underline cursor-pointer'>
                Line Official Account
              </Link>{' '}
              เพื่อแจ้งรหัสสมาชิก{' '}
              {role === 'member' ? <span>({session?.user.memberId})</span> : ''}{' '}
              หรือโทรจองก่อนเท่านั้น
            </p>
            <p>
              - สมาชิกพาน้องเตะบอลจ่ายแค่ 20 บาท / ชั่วโมง (สนามเต็มที่ 21 คน)
            </p>
            <p>
              - ทีมที่มีสมาชิกพาน้องเตะบอลอยู่ เสียค่าใช้จ่ายเพียงทีมละ 600 บาท
              / ชั่วโมง (ไม่จำกัดจำนวนคนเล่น)
            </p>
          </div>
          <div className='flex flex-col gap-2 rounded-lg p-3 border'>
            <div className='flex items-center gap-2'>
              <span className='text-xl font-medium'>ค่าอุปกรณ์สูญหาย</span>
              <Icon name='close' className='text-error' />
            </div>
            <p>- ลูกฟุตบอล ลูกละ 500 บาท</p>
            <p>- เสื้อเอี๊ยม ตัวละ 200 บาท</p>
          </div>
        </div>
      </div>
      <div
        id='member'
        ref={memberRef}
        className='scroll-pt-16 p-3 snap-center h-full'>
        <div className='shadow-md rounded-lg p-5 w-full h-full overflow-auto scrollbar-sm border'>
          <div className='gap-3 font-medium text-2xl mb-3 flex items-center justify-center'>
            <span>สิทธิพิเศษสำหรับสมาชิกพาน้องเตะบอล</span>
            <Icon name='star' className='text-[#DFD8C8]' />
          </div>
          <p>- ได้ราคาพิเศษส่วนตัวกรณีมาคนเดียวคือ 20 บาท / ชั่วโมง</p>
          <p>
            - ได้รับราคาพิเศษกรณีเช่ารายชั่วโมงเป็นทีม คิดชั่วโมงละ 600 บาท /
            ชั่วโมง
          </p>
          <p>
            - กรณีจองคิวชนกันกับสมาชิกทั่วไป สมาชิกพิเศษจะได้จองก่อนเสมอ
            แต่หากสมาชิกพิเศษจองเวลาเดียวกัน จะเลือกผู้ที่ทักมาจองก่อน
          </p>
          <p>
            - ได้รับค่านายหน้า 30% ของค่าสนามกรณีหาทีมมาเช่าแบบชั่วโมงได้ (1 ทีม
            / ครั้ง เท่านั้น เช่น ทีมนั้นมีสมาชิกพิเศษ 3 คน ก็จะได้แค่ 30%
            ของสนามอยู่ดี สมาชิกพิเศษต้องไปหารเงินกันเอง)
          </p>
          <div className='p-3 rounded-lg shadow-sm my-3 border'>
            <p className='text-center font-medium text-2xl'>การสมัครสมาชิก</p>
            <p>- ค่าใช้จ่าย 200 บาท / เดือน</p>
            <p>
              - สมัครผ่าน{' '}
              <Link
                href='https://lin.ee/GWAaDmhm'
                target='_blank'
                className='hover-underline cursor-pointer'>
                Line Official Account
              </Link>{' '}
              เพื่อแจ้งอีเมลที่ต้องการสมัครสมาชิก
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
