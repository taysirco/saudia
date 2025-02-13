import { getCities, getKeywords } from '@/utils/csvParser'
import { Metadata } from 'next'
import { getCityFromSlug, getSlugFromCity } from '@/utils/slugs'
import { serviceCategories, getAllServicesForCity } from '@/utils/serviceUtils'
import Breadcrumb from '@/components/Breadcrumb'
import JsonLd from '@/components/JsonLd'
import Footer from '@/components/Footer'
import Link from 'next/link'
import GoogleMap from '@/components/GoogleMap'
import { getCityLocations } from '@/utils/locationUtils'
import { Keyword } from '@/types/city'
import ContactForm from '@/components/ContactForm'

interface Props {
  params: { city: string }
}

export async function generateStaticParams() {
  const cities = await getCities()
  return cities.map((city) => ({
    city: getSlugFromCity(city.name),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityName = getCityFromSlug(params.city)
  const keywords = await getKeywords()
  
  const description = `دليل شامل لأفضل شركات نقل العفش في ${cityName} مع خدمات ${keywords.slice(0, 3).map(k => k.text).join('، ')} وأفضل الأسعار`
  
  return {
    title: `أفضل شركات نقل العفش في ${cityName} | دليل نقل العفش`,
    description,
    openGraph: {
      title: `أفضل شركات نقل العفش في ${cityName}`,
      description
    }
  }
}

export default async function CityPage({ params }: Props) {
  const cityName = getCityFromSlug(params.city)
  const keywords = await getKeywords()
  const cities = await getCities()
  const currentCity = cities.find(city => city.name === cityName)
  const mapLocations = await getCityLocations(cityName)
  const allServices = getAllServicesForCity(cityName)

  const breadcrumbItems = [
    {
      label: 'المدن',
      href: '/cities'
    },
    {
      label: cityName,
      href: `/city/${params.city}`
    }
  ]

  return (
    <>
      <JsonLd cityName={cityName} />
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* مقدمة المدينة */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                أفضل شركات نقل العفش في {cityName}
              </h1>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  مرحبًا بكم في دليل نقل العفش الشامل لمدينة {cityName}. نوفر لكم قائمة بأفضل شركات نقل الأثاث المعتمدة في المدينة، مع ضمان الجودة والأمان وأفضل الأسعار.
                </p>
                <p className="mb-4">
                  اختر من بين {allServices.length} خدمة متخصصة في نقل العفش، تشمل:
                </p>
                <ul className="list-disc pr-6 mb-4">
                  <li>نقل عفش من الباب للباب</li>
                  <li>فك وتركيب الأثاث</li>
                  <li>تغليف وتعبئة الأثاث</li>
                  <li>تخزين الأثاث الآمن</li>
                  <li>نقل الأثاث الثقيل</li>
                </ul>
                <p>
                  جميع الشركات المعروضة هنا مرخصة ومعتمدة، مع تقييمات عالية من العملاء السابقين.
                </p>
              </div>
            </section>

            {/* الخريطة التفاعلية */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                أفضل 10 شركات نقل عفش في {cityName}
              </h2>
              <div className="h-[500px] rounded-lg overflow-hidden">
                <GoogleMap 
                  cityName={cityName}
                  locations={mapLocations.slice(0, 10)}
                />
              </div>
            </section>

            {/* خدمات المدينة */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                خدمات نقل العفش في {cityName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allServices.map((service, index) => (
                  <Link
                    key={index}
                    href={`/city/${params.city}/${service.slug}`}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* النموذج الجانبي */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  نصائح لاختيار شركة نقل عفش
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-2">1</span>
                    تأكد من ترخيص الشركة
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-2">2</span>
                    تحقق من التقييمات والمراجعات
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-2">3</span>
                    اطلب عرض أسعار مسبق
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-2">4</span>
                    تأكد من وجود تأمين على المنقولات
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  احصل على عرض سعر مجاني
                </h3>
                <ContactForm cityName={cityName} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
} 