import { Metadata } from 'next'
import { getCityFromSlug, getSlugFromCity } from '@/utils/slugs'
import { serviceCategories, getCityServiceUrl } from '@/utils/serviceUtils'
import { getCities } from '@/utils/csvParser'
import Breadcrumb from '@/components/Breadcrumb'
import ServiceResultsTabs from '@/components/ServiceResultsTabs'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { getCityLocations } from '@/utils/locationUtils'
import ServiceResults from '@/components/ServiceResults'

interface Props {
  params: { city: string; service: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityName = getCityFromSlug(params.city)
  const service = serviceCategories
    .flatMap(cat => cat.services)
    .find(s => s.slug === params.service)

  const title = `${service?.title} في ${cityName} | أفضل شركة نقل عفش في ${cityName}`
  const description = `احصل على ${service?.title} في ${cityName} بأفضل الأسعار. شركة نقل عفش معتمدة في ${cityName} تقدم ${service?.title} مع الضمان. اتصل الآن!`

  return {
    title,
    description,
    openGraph: {
      title,
      description
    },
    alternates: {
      canonical: `/city/${params.city}/${params.service}`
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

export async function generateStaticParams() {
  const cities = await getCities()
  const params: { city: string; service: string }[] = []

  cities.forEach(city => {
    const citySlug = getSlugFromCity(city.name)
    serviceCategories.forEach(category => {
      category.services.forEach(service => {
        params.push({
          city: citySlug,
          service: service.slug
        })
      })
    })
  })

  return params
}

export default async function ServicePage({ params }: Props) {
  const cityName = getCityFromSlug(params.city)
  const service = serviceCategories
    .flatMap(cat => cat.services)
    .find(s => s.slug === params.service)

  const locations = await getCityLocations(cityName)

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
      label: service?.title || '',
      href: `/city/${params.city}/${params.service}`
    }
  ]

  const contentSections = [
    `شركة نقل عفش في ${cityName} تقدم ${service?.title} بأعلى جودة`,
    `نقل عفش في ${cityName} مع الضمان وأفضل الأسعار`,
    `خدمة ${service?.title} في ${cityName} من الباب للباب`,
    `فريق متخصص في ${service?.title} في ${cityName}`,
    `نقل عفش مضمون في ${cityName} مع ${service?.title}`
  ]

  return (
    <>
      <JsonLd 
        cityName={cityName} 
        serviceName={service?.title}
      />
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {service?.title} في {cityName} | أفضل شركة نقل عفش
        </h1>

        <ServiceResults 
          cityName={cityName}
          locations={locations}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none mb-8">
              {contentSections.map((section, index) => (
                <p key={index} className="mb-4">
                  {section}
                </p>
              ))}
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                لماذا تختارنا لـ {service?.title} في {cityName}؟
              </h2>
              <ul className="list-disc pr-6 space-y-2 mb-6">
                <li>فريق عمل محترف ومدرب</li>
                <li>أحدث سيارات نقل العفش</li>
                <li>أسعار تنافسية بدون تكاليف خفية</li>
                <li>ضمان شامل على جميع المنقولات</li>
                <li>خدمة 24 ساعة في {cityName}</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                خطوات {service?.title} في {cityName}
              </h2>
              <ol className="list-decimal pr-6 space-y-2">
                <li>الاتصال وتحديد الموعد</li>
                <li>تقديم عرض سعر شامل</li>
                <li>تنفيذ الخدمة باحترافية</li>
                <li>التسليم والضمان</li>
              </ol>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <ContactForm 
                cityName={cityName}
                serviceName={service?.title}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
} 