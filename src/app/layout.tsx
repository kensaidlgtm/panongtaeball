import type { Metadata } from 'next'
import { Sarabun } from 'next/font/google'
import './globals.css'
import Navbar from './_components/Navbar'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${sarabun.variable} font-sarabun`}>
        <Navbar />
        <div className='scroll-smooth snap-y snap-mandatory h-screen overflow-y-auto scrollbar-sm'>
          {children}
        </div>
      </body>
    </html>
  )
}
