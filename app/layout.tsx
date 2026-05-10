import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '台股月營收查詢',
  description: '快速查詢台股月營收資料，提供即時更新的財務資訊。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-TW"
      className={geistSans.variable}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
