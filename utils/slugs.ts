interface CitySlugMap {
  [key: string]: string;
}

// Arabic city names to English slugs mapping
export const cityToSlug: CitySlugMap = {
  // المنطقة الوسطى
  'الرياض': 'riyadh',
  'بريدة': 'buraidah',
  'الخرج': 'kharj',
  'الزلفي': 'zulfi',
  'المجمعة': 'majmaah',
  'الدوادمي': 'dawadmi',
  'الأفلاج': 'aflaj',
  'شقراء': 'shaqra',
  'الدرعية': 'diriyah',
  'عنيزة': 'unaizah',
  'الرس': 'rass',
  'وادي الدواسر': 'wadi-aldawasir',

  // المنطقة الغربية
  'جدة': 'jeddah',
  'مكة المكرمة': 'makkah',
  'المدينة المنورة': 'madinah',
  'الطائف': 'taif',
  'ينبع': 'yanbu',
  'رابغ': 'rabigh',
  'القنفذة': 'qunfudhah',
  'الليث': 'laith',
  'بلجرشي': 'baljarshi',
  'الوجه': 'wajh',
  'أملج': 'umluj',

  // المنطقة الشرقية
  'الدمام': 'dammam',
  'الخبر': 'khobar',
  'الجبيل': 'jubail',
  'حفر الباطن': 'hafr-albatin',
  'الهفوف': 'hofuf',
  'القطيف': 'qatif',
  'الأحساء': 'ahsa',
  'سيهات': 'saihat',
  'الخفجي': 'khafji',
  'تاروت': 'tarut',
  'بقيق': 'buqayq',

  // المنطقة الشمالية
  'تبوك': 'tabuk',
  'عرعر': 'arar',
  'سكاكا': 'sakaka',
  'حائل': 'hail',
  'القريات': 'qurayyat',
  'طريف': 'turaif',
  'رفحاء': 'rafha',
  'الشنان': 'shanan',
  'ضباء': 'duba',

  // المنطقة الجنوبية
  'أبها': 'abha',
  'نجران': 'najran',
  'جازان': 'jazan',
  'الباحة': 'baha',
  'خميس مشيط': 'khamis-mushait',
  'بيشة': 'bisha',
  'صبيا': 'sabya'
};

// English slugs to Arabic city names mapping
export const slugToCity: CitySlugMap = Object.entries(cityToSlug).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

// تصنيف المناطق
export const regions = {
  'Central': 'المنطقة الوسطى',
  'Western': 'المنطقة الغربية',
  'Eastern': 'المنطقة الشرقية',
  'Northern': 'المنطقة الشمالية',
  'Southern': 'المنطقة الجنوبية'
};

// تصنيف المدن حسب المناطق للمساعدة في التنظيم
export const cityRegions = {
  // المنطقة الوسطى
  'riyadh': 'Central',
  'buraidah': 'Central',
  'kharj': 'Central',
  'zulfi': 'Central',
  'majmaah': 'Central',
  'dawadmi': 'Central',
  'aflaj': 'Central',
  'shaqra': 'Central',
  'diriyah': 'Central',
  'unaizah': 'Central',
  'rass': 'Central',
  'wadi-aldawasir': 'Central',

  // المنطقة الغربية
  'jeddah': 'Western',
  'makkah': 'Western',
  'madinah': 'Western',
  'taif': 'Western',
  'yanbu': 'Western',
  'rabigh': 'Western',
  'qunfudhah': 'Western',
  'laith': 'Western',
  'baljarshi': 'Western',
  'wajh': 'Western',
  'umluj': 'Western',

  // المنطقة الشرقية
  'dammam': 'Eastern',
  'khobar': 'Eastern',
  'jubail': 'Eastern',
  'hafr-albatin': 'Eastern',
  'hofuf': 'Eastern',
  'qatif': 'Eastern',
  'ahsa': 'Eastern',
  'saihat': 'Eastern',
  'khafji': 'Eastern',
  'tarut': 'Eastern',
  'buqayq': 'Eastern',

  // المنطقة الشمالية
  'tabuk': 'Northern',
  'arar': 'Northern',
  'sakaka': 'Northern',
  'hail': 'Northern',
  'qurayyat': 'Northern',
  'turaif': 'Northern',
  'rafha': 'Northern',
  'shanan': 'Northern',
  'duba': 'Northern',

  // المنطقة الجنوبية
  'abha': 'Southern',
  'najran': 'Southern',
  'jazan': 'Southern',
  'baha': 'Southern',
  'khamis-mushait': 'Southern',
  'bisha': 'Southern',
  'sabya': 'Southern'
};

export function getSlugFromCity(cityName: string | undefined): string {
  if (!cityName) return '';
  return cityToSlug[cityName] || encodeURIComponent(cityName.toLowerCase().replace(/ /g, '-'));
}

export function getCityFromSlug(slug: string | undefined): string {
  if (!slug) return '';
  return slugToCity[slug] || decodeURIComponent(slug.replace(/-/g, ' '));
}

export function getRegionName(regionKey: string): string {
  return regions[regionKey as keyof typeof regions] || regionKey;
}

export function getCityRegion(slug: string): string {
  return cityRegions[slug] || 'Unknown';
}

// إضافة دالة للتحقق من وجود المدينة
export function isCityValid(cityName: string | undefined): boolean {
  if (!cityName) return false;
  return Boolean(cityToSlug[cityName]) || cityName.length > 0;
} 