import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'اتصل بنا | دليل شركات نقل العفش',
  description: 'تواصل معنا للحصول على خدمات نقل العفش في مدينتك - نوفر لك أفضل عروض شركات نقل الأثاث',
}

export default function ContactPage() {
  const breadcrumbItems = [
    {
      label: 'اتصل بنا',
      href: '/contact'
    }
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          اتصل بنا
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              معلومات التواصل
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-700 mb-2">العنوان</h3>
                <p className="text-gray-600">المملكة العربية السعودية</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700 mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-600">info@example.com</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700 mb-2">ساعات العمل</h3>
                <p className="text-gray-600">من الأحد إلى الخميس: 9 صباحاً - 6 مساءً</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              نموذج التواصل
            </h2>
            <ContactForm cityName="" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
} 