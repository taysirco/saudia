import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'من نحن | دليل شركات نقل العفش في المملكة العربية السعودية',
  description: 'تعرف على دليل شركات نقل العفش في المملكة العربية السعودية - دليلك الشامل لخدمات نقل الأثاث الموثوقة',
}

export default function AboutPage() {
  const breadcrumbItems = [
    {
      label: 'من نحن',
      href: '/about'
    }
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          من نحن
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              نحن دليل متخصص في خدمات نقل العفش في المملكة العربية السعودية، نهدف إلى توفير تجربة سهلة وموثوقة للعملاء الباحثين عن أفضل شركات نقل الأثاث في مدنهم.
            </p>

            <h2 className="text-2xl font-bold mb-4">رؤيتنا</h2>
            <p className="mb-6">
              أن نكون المنصة الرائدة في مجال خدمات نقل العفش، نقدم حلولاً مبتكرة تلبي احتياجات عملائنا وتضمن لهم تجربة نقل آمنة وسلسة.
            </p>

            <h2 className="text-2xl font-bold mb-4">مهمتنا</h2>
            <ul className="list-disc pr-6 mb-6">
              <li>توفير دليل شامل لأفضل شركات نقل العفش المعتمدة</li>
              <li>ضمان جودة الخدمة وحماية حقوق العملاء</li>
              <li>تقديم أسعار تنافسية وشفافة</li>
              <li>توفير خدمات متكاملة من الفك والتركيب والتغليف</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">قيمنا</h2>
            <ul className="list-disc pr-6">
              <li>المصداقية والشفافية في التعامل</li>
              <li>الاحترافية في تقديم الخدمة</li>
              <li>الالتزام بالمواعيد والجودة</li>
              <li>رضا العملاء هو أولويتنا</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
} 