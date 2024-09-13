'use client'
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
            <span className='font-medium text-xl'>พาน้องเตะบอลอารีน่า</span>
          </div>
        </div>
      </div>
      <div ref={arenaRef} className='snap-center h-screen '>
        พาน้องเตะบอลอารีน่า
      </div>
    </>
  )
}
