import { Tajawal } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'دليل شركات نقل العفش في المملكة العربية السعودية',
  description: 'دليل شامل لشركات نقل العفش في جميع مدن المملكة العربية السعودية مع أفضل الخدمات وأرخص الأسعار',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
} 