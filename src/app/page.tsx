'use client'
import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

export default function Home() {
  const [arenaRef] = [useRef<HTMLDivElement | null>(null)]
  return (
    <>
      <div className='bg-gradient-to-b to-light-green from-90% to-100% from-white snap-center h-screen flex justify-center items-center flex-col gap-5'>
        <Image
          src='/logo.png'
          alt='logo'
          width={400}
          height={400}
          className='w-auto max-h-[40vh]'
        />
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
      </div>
      <div
        ref={arenaRef}
        className='p-3 snap-center h-screen flex items-center justify-center gap-4 flex-col'>
        <span className='text-3xl text-center'>
          สอบถามรายละเอียด & จองสนามได้ที่
        </span>
        <Image src='/lineOA.png' alt='lineOA' width={300} height={300} />
        <span className='text-center'>Line Official Account: พาน้องเตะบอล</span>
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
    </>
  )
}
