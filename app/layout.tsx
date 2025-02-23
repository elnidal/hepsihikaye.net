import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'HepsiHikaye - Kafamızda Çok Kuruyoruz',
  description: 'Edebiyat ve blog içerikleri',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={montserrat.variable}>
      <body className="font-sans bg-[#F5F5F5] min-h-screen">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
