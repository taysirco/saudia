import { getCities } from './csvParser'
import { City } from '@/types/city'
import { cache } from '@/lib/cache'
import { MongoClient } from 'mongodb'

interface Location {
  lat: number;
  lng: number;
  title: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  services?: string[];
  workingHours?: string;
  openNow: boolean;
  hasWhatsapp: boolean;
  whatsappNumber: string;
  priceRange: string;
  experience: string;
  features: string[];
}

interface PlaceResult {
  title: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  phone: string;
  website: string;
  openNow: boolean;
  workingHours: string[];
}

const AREA_OFFSETS = [
  { lat: 0, lng: 0, name: 'وسط المدينة' },
  { lat: 0.02, lng: 0.02, name: 'شمال المدينة' },
  { lat: -0.02, lng: 0.02, name: 'شرق المدينة' },
  { lat: 0.02, lng: -0.02, name: 'غرب المدينة' },
  { lat: -0.02, lng: -0.02, name: 'جنوب المدينة' },
  { lat: 0.01, lng: 0.01, name: 'الحي التجاري' },
  { lat: -0.01, lng: 0.02, name: 'المنطقة الصناعية' },
  { lat: 0, lng: 0.015, name: 'الحي السكني' },
  { lat: 0.015, lng: -0.01, name: 'منطقة الأعمال' },
  { lat: -0.015, lng: 0.01, name: 'المنطقة الحيوية' }
]

// Add more realistic company names
const companyNames = [
  'جوهرة المملكة لنقل العفش',
  'الطيب لنقل العفش والأثاث',
  'النجمة لنقل العفش',
  'شركة نقل عفش مع فك وتركيب',
  'دينا نقل عفش',
  'مؤسسة نقل اثاث',
  'الشركة المتحدة للنقل',
  'شركة نقل عفش عمالة فلبينية',
  'الخبراء لنقل العفش',
  'الأمانة لنقل الأثاث'
];

// قائمة بالمناطق في كل مدينة
const areaNames = [
  'وسط المدينة',
  'شمال المدينة',
  'شرق المدينة',
  'غرب المدينة',
  'جنوب المدينة',
  'الحي التجاري',
  'المنطقة الصناعية',
  'الحي السكني',
  'منطقة الأعمال',
  'المنطقة الحيوية'
];

// Add more varied services
const allServices = [
  'نقل عفش',
  'فك وتركيب',
  'تغليف',
  'تخزين اثاث',
  'نقل مكاتب',
  'نقل مصانع',
  'رفع بالونش',
  'نقل خارج المدينة',
  'عمالة فلبينية',
  'عمالة مدربة',
  'ضمان على النقل',
  'تركيب مكيفات',
  'تركيب ستائر',
  'تركيب مطابخ',
  'تركيب غرف نوم'
];

// Add working hours variations
const workingHoursVariations = [
  'السبت - الخميس: 8:00 ص - 10:00 م',
  'يومياً: 24 ساعة',
  'السبت - الخميس: 7:00 ص - 11:00 م',
  'طوال أيام الأسبوع: 9:00 ص - 9:00 م',
  'السبت - الجمعة: 8:00 ص - 12:00 م'
];

export async function getCityLocations(cityName: string): Promise<Location[]> {
  try {
    const locations = generateLocations(cityName)
    return locations
  } catch (error) {
    console.error('Error getting locations:', error)
    return [] // إرجاع مصفوفة فارغة في حالة الخطأ
  }
}

function getDefaultLocations(cityName: string): Location[] {
  const defaultLat = 24.7136
  const defaultLng = 46.6753
  
  return AREA_OFFSETS.map(offset => ({
    lat: defaultLat + offset.lat,
    lng: defaultLng + offset.lng,
    title: `شركة نقل عفش في ${cityName} - ${offset.name}`,
    address: `${offset.name}، ${cityName}، المملكة العربية السعودية`
  }))
}

function generateLocations(cityName: string): Location[] {
  const baseLat = parseFloat(cityName)
  const baseLng = parseFloat(cityName)

  const locations: Location[] = AREA_OFFSETS.map((offset, index) => {
    const companyName = companyNames[index % companyNames.length]
    const phone = generateSaudiPhoneNumber()
    const rating = (4 + Math.random()).toFixed(1)
    const reviews = Math.floor(Math.random() * 100) + 20
    
    // Generate a more realistic website URL
    const websiteTypes = ['com', 'net', 'sa']
    const websiteDomain = companyName
      .replace(/\s+/g, '')
      .replace(/[^\w\s]/gi, '')
      .toLowerCase()
    const websiteExt = websiteTypes[Math.floor(Math.random() * websiteTypes.length)]
    const website = `https://www.${websiteDomain}.${websiteExt}`

    // Select random number of services (5-8)
    const numServices = Math.floor(Math.random() * 4) + 5
    const services = shuffleArray(allServices).slice(0, numServices)

    // Select random working hours
    const workingHours = workingHoursVariations[Math.floor(Math.random() * workingHoursVariations.length)]

    // Generate a more descriptive title
    const title = `${companyName} - ${offset.name}`

    // Generate a more detailed address
    const address = `${offset.name}، شارع ${generateStreetName()}، ${cityName}، ${cityName}`

    return {
      lat: baseLat + offset.lat,
      lng: baseLng + offset.lng,
      title,
      address,
      phone,
      website,
      rating: parseFloat(rating),
      reviews,
      workingHours,
      services,
      // Add additional business info
      openNow: Math.random() > 0.2, // 80% chance of being open
      hasWhatsapp: Math.random() > 0.3, // 70% chance of having WhatsApp
      whatsappNumber: phone,
      priceRange: generatePriceRange(),
      experience: `${Math.floor(Math.random() * 15) + 5} سنة خبرة`,
      features: generateFeatures()
    }
  })

  return locations
}

// دالة مساعدة لإنشاء رقم هاتف سعودي
function generateSaudiPhoneNumber(): string {
  const prefixes = ['050', '055', '053', '054', '056', '059']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const number = Math.floor(Math.random() * 10000000).toString().padStart(7, '0')
  return `${prefix}${number}`
}

// دالة مساعدة لإنشاء ساعات العمل
function generateWorkingHours(): string[] {
  return [
    'السبت - الخميس: 8:00 ص - 10:00 م',
    'الجمعة: 2:00 م - 10:00 م'
  ]
}

// دالة مساعدة للحصول على إحداثيات المدينة
function getCityBaseLocation(cityName: string): { lat: number; lng: number } {
  const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
    'الرياض': { lat: 24.7136, lng: 46.6753 },
    'جدة': { lat: 21.5433, lng: 39.1728 },
    'مكة المكرمة': { lat: 21.3891, lng: 39.8579 },
    'المدينة المنورة': { lat: 24.4672, lng: 39.6139 },
    'الدمام': { lat: 26.4207, lng: 50.0888 },
    'الطائف': { lat: 21.2667, lng: 40.4167 },
    'تبوك': { lat: 28.3835, lng: 36.5662 },
    'بريدة': { lat: 26.3267, lng: 43.9667 },
    'الخبر': { lat: 26.2172, lng: 50.1971 },
    'حائل': { lat: 27.5219, lng: 41.6957 },
    'حفر الباطن': { lat: 28.4328, lng: 45.9708 },
    'الهفوف': { lat: 25.3795, lng: 49.5865 },
    'الجبيل': { lat: 27.0174, lng: 49.6225 }
  }

  return cityCoordinates[cityName] || { lat: 24.7136, lng: 46.6753 } // الرياض كموقع افتراضي
}

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Helper function to generate street names
function generateStreetName(): string {
  const streets = [
    'الملك فهد',
    'الملك عبدالله',
    'الأمير سلطان',
    'الأمير محمد',
    'العليا',
    'التحلية',
    'الستين',
    'الثلاثين',
    'النخيل',
    'الورود'
  ]
  return streets[Math.floor(Math.random() * streets.length)]
}

// Helper function to generate price range
function generatePriceRange(): string {
  const ranges = [
    'يبدأ من 300 ريال',
    'يبدأ من 500 ريال',
    'حسب المسافة والكمية',
    'أسعار تنافسية',
    'اتصل لمعرفة السعر'
  ]
  return ranges[Math.floor(Math.random() * ranges.length)]
}

// Helper function to generate business features
function generateFeatures(): string[] {
  const allFeatures = [
    'ضمان على النقل',
    'تأمين على المنقولات',
    'سيارات مجهزة',
    'عمالة مدربة',
    'خدمة 24 ساعة',
    'دفع إلكتروني',
    'تقسيط متاح',
    'خصم 10%',
    'تغليف مجاني',
    'معاينة مجانية'
  ]
  const numFeatures = Math.floor(Math.random() * 3) + 3 // 3-5 features
  return shuffleArray(allFeatures).slice(0, numFeatures)
} 