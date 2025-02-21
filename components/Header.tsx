import Link from 'next/link'
import { getCities } from '@/utils/csvParser'
import { getSlugFromCity, isCityValid } from '@/utils/slugs'

export default async function Header() {
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
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            نقل عفش
          </Link>
          
          <div className="flex space-x-4 space-x-reverse">
            <Link href="/cities" className="text-gray-600 hover:text-blue-600">
              كل المدن
            </Link>
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600">
                المدن الرئيسية
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {mainCities.map(city => (
                    <Link
                      key={city.name}
                      href={`/${getSlugFromCity(city.name)}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
} 