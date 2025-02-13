import { Metadata } from 'next'
import Link from 'next/link'
import { getCities } from '@/utils/csvParser'
import { getSlugFromCity, getRegionName } from '@/utils/slugs'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'مدن المملكة | دليل شركات نقل العفش',
  description: 'دليل شامل لخدمات نقل العفش في جميع مدن المملكة العربية السعودية - اختر مدينتك واحصل على أفضل خدمات نقل الأثاث',
}

export default async function CitiesPage() {
  const cities = await getCities()
  
  // تنظيم المدن حسب المنطقة
  const citiesByRegion = cities.reduce((acc, city) => {
    const region = city.region || 'أخرى'
    if (!acc[region]) {
      acc[region] = []
    }
    acc[region].push(city)
    return acc
  }, {} as Record<string, typeof cities>)

  const breadcrumbItems = [
    {
      label: 'المدن',
      href: '/cities'
    }
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">مدن المملكة العربية السعودية</h1>
        
        {Object.entries(citiesByRegion).map(([region, cities]) => (
          <div key={region} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{region}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cities.map(city => (
                <Link
                  key={city.name}
                  href={`/city/${getSlugFromCity(city.name)}`}
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold">{city.name}</h3>
                  <p className="text-gray-600 text-sm">خدمات نقل العفش</p>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            خدماتنا متوفرة في جميع مدن المملكة
          </h2>
          <p className="text-gray-600">
            نقدم خدمات نقل العفش في جميع مدن المملكة العربية السعودية مع ضمان الجودة والأمان.
            اختر مدينتك واحصل على أفضل خدمات نقل الأثاث.
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
} 