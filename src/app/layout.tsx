import type { Metadata } from 'next'
import { Sarabun } from 'next/font/google'
import 'material-icons/iconfont/material-icons.css'
import './global.css'
import Navbar from './_components/Navbar'
import Toast from '@/components/Toast'
import Footer from './_components/Footer'

const sarabun = Sarabun({
  preload: true,
  weight: ['400', '500', '700'],
  subsets: ['latin', 'thai'],
  variable: '--font-sarabun',
})

export const metadata: Metadata = {
  title: 'พาน้องเตะบอล',
  description: 'พาน้องเตะบอล ศูนย์รวมความสุขที่เกิดจากการเตะบอลกับเด็ก ๆ',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${sarabun.variable} font-sarabun antialiased`}>
        <Toast />
        <Navbar />
        <div className='bg-white text-black scroll-smooth snap-y snap-mandatory h-[calc(100vh-128px)] overflow-y-auto scrollbar-sm'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
