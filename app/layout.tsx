import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className='scroll-smooth snap-y snap-mandatory h-screen overflow-y-auto'>
          {children}
        </div>
      </body>
    </html>
  )
}
