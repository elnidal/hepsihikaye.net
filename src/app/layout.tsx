import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HepsiHikaye - Kafamızda Çok Kuruyoruz',
  description: 'Öykü, Roman, Şiir, Deneme, Makale ve daha fazlası...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={montserrat.className}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow bg-[#f5f5f5]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
