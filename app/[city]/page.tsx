import { Metadata } from 'next'
import { getCityFromSlug } from '@/utils/slugs'
// ... باقي الاستيرادات

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityName = getCityFromSlug(params.city)
  // ... باقي الكود
}

export default async function CityPage({ params }: Props) {
  const cityName = getCityFromSlug(params.city)
  // ... باقي الكود
} 