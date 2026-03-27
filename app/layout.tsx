import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Venkatesh Buddula - Graphic & Web Designer',
  description: 'Professional resume of Venkatesh Buddula, a creative Graphic and Web Designer with 7+ years of experience in UI/UX, WordPress, and Shopify.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/profile.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/profile.ico', sizes: 'any' }
    ],
    apple: '/profile.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
