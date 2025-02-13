import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'خدمات نقل العفش | دليل شركات نقل العفش',
  description: 'تعرف على خدمات نقل العفش المتكاملة من فك وتركيب وتغليف ونقل آمن للأثاث في المملكة العربية السعودية',
}

export default function ServicesPage() {
  const breadcrumbItems = [
    {
      label: 'خدماتنا',
      href: '/services'
    }
  ]

  const services = [
    {
      title: 'فك وتركيب الأثاث',
      description: 'خدمة احترافية لفك وتركيب جميع أنواع الأثاث والمفروشات بأيدي فنيين متخصصين',
      features: [
        'فك وتركيب غرف النوم',
        'فك وتركيب المطابخ',
        'فك وتركيب الستائر',
        'فك وتركيب المكيفات',
        'فك وتركيب الأجهزة الكهربائية'
      ]
    },
    {
      title: 'تغليف الأثاث',
      description: 'نستخدم أفضل مواد التغليف لحماية الأثاث أثناء النقل',
      features: [
        'تغليف بالكرتون المقوى',
        'تغليف بالبلاستيك الفقاعي',
        'تغليف خاص للأجهزة الحساسة',
        'تغليف المفروشات والستائر',
        'تغليف التحف والأغراض الثمينة'
      ]
    },
    {
      title: 'النقل الآمن',
      description: 'نقل الأثاث بسيارات مجهزة ومؤمنة لضمان سلامة المنقولات',
      features: [
        'سيارات مغلقة ومؤمنة',
        'سيارات مختلفة الأحجام',
        'سائقين محترفين',
        'تأمين على المنقولات',
        'خدمة النقل السريع'
      ]
    },
    {
      title: 'خدمات إضافية',
      description: 'خدمات متكاملة لتلبية جميع احتياجات العملاء',
      features: [
        'تنظيف المنزل بعد النقل',
        'ترتيب الأثاث في المنزل الجديد',
        'تخزين الأثاث',
        'صيانة الأثاث',
        'خدمة 24 ساعة'
      ]
    }
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          خدمات نقل العفش
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <span className="text-blue-600 ml-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
} 