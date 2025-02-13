import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة | دليل شركات نقل العفش',
  description: 'إجابات على الأسئلة الشائعة حول خدمات نقل العفش في المملكة العربية السعودية',
}

export default function FaqPage() {
  const breadcrumbItems = [
    {
      label: 'الأسئلة الشائعة',
      href: '/faq'
    }
  ]

  const faqs = [
    {
      question: 'كيف يتم تحديد سعر نقل العفش؟',
      answer: 'يتم تحديد السعر بناءً على عدة عوامل منها: كمية الأثاث، المسافة، الطابق، الخدمات الإضافية المطلوبة مثل الفك والتركيب والتغليف.'
    },
    {
      question: 'هل يوجد ضمان على نقل العفش؟',
      answer: 'نعم، جميع شركات نقل العفش المعتمدة لدينا تقدم ضمان على سلامة المنقولات وتعويض في حالة حدوث أي ضرر.'
    },
    {
      question: 'كم تستغرق عملية نقل العفش؟',
      answer: 'تختلف المدة حسب كمية الأثاث والمسافة، لكن في المتوسط تستغرق من 4-8 ساعات للمنزل العادي.'
    },
    {
      question: 'هل يتم توفير مواد التغليف؟',
      answer: 'نعم، تقوم الشركات بتوفير جميع مواد التغليف اللازمة من كراتين وبلاستيك فقاعي وأشرطة لاصقة.'
    },
    {
      question: 'هل يمكن نقل العفش بين المدن؟',
      answer: 'نعم، نوفر خدمة نقل العفش بين جميع مدن المملكة مع ضمان السلامة والأمان.'
    }
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          الأسئلة الشائعة
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {faq.question}
                </h2>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
} 