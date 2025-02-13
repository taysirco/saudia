import { Metadata } from 'next'
import Link from 'next/link'
import { getCities } from '@/utils/csvParser'
import { getSlugFromCity } from '@/utils/slugs'
import { serviceCategories } from '@/utils/serviceUtils'
import Image from 'next/image'
import { ServiceIcons } from '@/utils/icons'
import CityImage from '@/components/CityImage'

export const metadata: Metadata = {
  title: 'Saudi Moving - الدليل الأول لخدمات نقل العفش في المملكة العربية السعودية',
  description: 'دليل شامل لأفضل شركات نقل العفش في جميع مدن المملكة. خدمات احترافية، أسعار تنافسية، وضمان الجودة',
}

export default async function HomePage() {
  const cities = await getCities()
  const mainCities = cities
    .filter(city => [
      'الرياض',
      'جدة',
      'الدمام',
      'مكة المكرمة',
      'المدينة المنورة'
    ].includes(city.name))
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="نقل عفش"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              الدليل الأول لخدمات نقل العفش في المملكة
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              نقدم لك دليلاً شاملاً لأفضل شركات نقل العفش في جميع مدن المملكة
              مع ضمان الجودة وأفضل الأسعار
            </p>
            <Link
              href="/cities"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              اختر مدينتك
            </Link>
          </div>
        </div>
      </section>

      {/* المدن الرئيسية */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            خدماتنا في المدن الرئيسية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainCities.map(city => (
              <Link
                key={city.name}
                href={`/city/${getSlugFromCity(city.name)}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <CityImage 
                  citySlug={getSlugFromCity(city.name)} 
                  name={city.name} 
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    نقل عفش في {city.name}
                  </h3>
                  <p className="text-gray-600">
                    خدمات نقل العفش الشاملة في {city.name} مع الضمان
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* خدماتنا */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            خدماتنا المتكاملة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceCategories.map(category => (
              <div key={category.slug} className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                  {ServiceIcons[category.slug as keyof typeof ServiceIcons]}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {category.name}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {category.services.slice(0, 3).map(service => (
                    <li key={service.slug} className="flex items-center">
                      <span className="ml-2">•</span>
                      {service.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* مميزاتنا */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            لماذا Saudi Moving؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-7.208a2.5 2.5 0 114-2 2.5 2.5 0 01-4 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">دليل شامل</h3>
              <p className="text-gray-600">
                نقدم دليلاً شاملاً لأفضل شركات نقل العفش في جميع مدن المملكة
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-7.208a2.5 2.5 0 114-2 2.5 2.5 0 01-4 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">خدمة موثوقة</h3>
              <p className="text-gray-600">
                نضمن لك خدمة احترافية من شركات معتمدة وموثوقة
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-7.208a2.5 2.5 0 114-2 2.5 2.5 0 01-4 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">أسعار تنافسية</h3>
              <p className="text-gray-600">
                نوفر لك أفضل الأسعار مع ضمان جودة الخدمة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            ابدأ الآن مع أفضل خدمات نقل العفش
          </h2>
          <Link
            href="/cities"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            اختر مدينتك وابدأ
          </Link>
        </div>
      </section>
    </main>
  )
} 