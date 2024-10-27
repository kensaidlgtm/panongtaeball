import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='flex bg-white items-center gap-3 p-5 border-t justify-end h-16 shadow-lg relative z-10'>
      <Link href='https://www.youtube.com/@panongtaeball' target='_blank'>
        <Image
          className='min-w-[30px] max-w-[30px]'
          src='/youtube.png'
          width={30}
          height={30}
          alt='youtube'
        />
      </Link>
      <Link href='https://maps.app.goo.gl/xVU4UreTyXvLj1rW9' target='_blank'>
        <Image
          src='/map-marker.png'
          className='min-w-[30px] max-w-[30px]'
          width={30}
          height={30}
          alt='map-marker'
        />
      </Link>
      <span className='line-clamp-2'>
        Copyright &#169; 2024 พาน้องเตะบอล All rights reserved.
      </span>
    </div>
  )
}
