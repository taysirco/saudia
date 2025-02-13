import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'أسعار نقل العفش | دليل شركات نقل العفش',
  description: 'تعرف على أسعار نقل العفش في المملكة العربية السعودية وأفضل العروض والخصومات المتوفرة',
}

export default function PricesPage() {
  const breadcrumbItems = [
    {
      label: 'الأسعار',
      href: '/prices'
    }
  ]

  const pricePackages = [
    {
      name: 'الباقة الأساسية',
      price: 'يبدأ من 500 ريال',
      features: [
        'فك وتركيب الأثاث',
        'تغليف أساسي',
        'نقل داخل المدينة',
        'عمالة مدربة',
        'ضمان سلامة المنقولات'
      ]
    },
    {
      name: 'الباقة المتقدمة',
      price: 'يبدأ من 800 ريال',
      features: [
        'فك وتركيب الأثاث',
        'تغليف شامل',
        'نقل داخل المدينة',
        'عمالة مدربة',
        'ضمان سلامة المنقولات',
        'خدمة التنظيف',
        'ترتيب الأثاث'
      ]
    },
    {
      name: 'الباقة المتكاملة',
      price: 'يبدأ من 1200 ريال',
      features: [
        'فك وتركيب الأثاث',
        'تغليف شامل',
        'نقل داخل وخارج المدينة',
        'عمالة مدربة',
        'ضمان سلامة المنقولات',
        'خدمة التنظيف',
        'ترتيب الأثاث',
        'تخزين مؤقت',
        'تأمين شامل'
      ]
    }
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          أسعار نقل العفش
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricePackages.map((pkg) => (
            <div key={pkg.name} className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {pkg.name}
              </h2>
              <p className="text-xl text-blue-600 font-bold mb-6">
                {pkg.price}
              </p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            احصل على عرض سعر خاص
          </h2>
          <ContactForm cityName="" />
        </div>
      </div>

      <Footer />
    </>
  )
} 