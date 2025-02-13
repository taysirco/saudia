import Link from 'next/link'
import { getCities } from '@/utils/csvParser'
import { getSlugFromCity } from '@/utils/slugs'

export default async function Footer() {
  const cities = await getCities()
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">عن الموقع</h3>
            <p className="text-gray-400">
              دليل شامل لشركات نقل العفش في المملكة العربية السعودية. نساعدك في العثور على أفضل شركات نقل الأثاث في مدينتك.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">المدن الرئيسية</h3>
            <ul className="space-y-2">
              {cities.slice(0, 6).map((city) => (
                <li key={city.name}>
                  <Link 
                    href={`/city/${getSlugFromCity(city.name)}`}
                    className="hover:text-white transition-colors"
                  >
                    نقل عفش {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            جميع الحقوق محفوظة © {new Date().getFullYear()} دليل نقل العفش
          </p>
        </div>
      </div>
    </footer>
  )
} 