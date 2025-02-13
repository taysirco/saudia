import { Metadata } from 'next'
import { getCityFromSlug, getSlugFromCity } from '@/utils/slugs'
import { serviceCategories, getCityServiceUrl } from '@/utils/serviceUtils'
import Breadcrumb from '@/components/Breadcrumb'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

interface Props {
  params: { city: string; service: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityName = getCityFromSlug(params.city)
  const service = findService(params.service)
  
  const title = `${service?.title || ''} في ${cityName} - خدمات نقل العفش`
  const description = `${service?.description || ''} في ${cityName} مع أفضل الأسعار والضمان`

  return {
    title,
    description,
    openGraph: {
      title,
      description
    }
  }
}

function findService(serviceSlug: string) {
  for (const category of serviceCategories) {
    const service = category.services.find(s => s.slug === serviceSlug)
    if (service) return service
  }
  return null
}

export default function ServicePage({ params }: Props) {
  const cityName = getCityFromSlug(params.city)
  const service = findService(params.service)

  if (!service) {
    return <div>الخدمة غير موجودة</div>
  }

  const breadcrumbItems = [
    {
      label: 'المدن',
      href: '/cities'
    },
    {
      label: cityName,
      href: `/city/${params.city}`
    },
    {
      label: service.title,
      href: getCityServiceUrl(params.city, params.service)
    }
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {service.title} في {cityName}
            </h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                تفاصيل الخدمة
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-6">
                  {service.description} في {cityName}
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  مميزات الخدمة
                </h3>
                <ul className="list-disc pr-5 space-y-2">
                  <li>خدمة احترافية ومضمونة</li>
                  <li>أسعار تنافسية</li>
                  <li>فريق عمل متخصص</li>
                  <li>ضمان سلامة المنقولات</li>
                  <li>خدمة سريعة وموثوقة</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <ContactForm cityName={cityName} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
} 