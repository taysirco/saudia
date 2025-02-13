import { MetadataRoute } from 'next'
import { getCities } from '@/utils/csvParser'
import { getSlugFromCity } from '@/utils/slugs'
import { serviceCategories } from '@/utils/serviceUtils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cities = await getCities()
  const entries: MetadataRoute.Sitemap = []

  // Add cities pages
  cities.forEach(city => {
    const citySlug = getSlugFromCity(city.name)
    entries.push({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/city/${citySlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    })

    // Add service pages for each city
    serviceCategories.forEach(category => {
      category.services.forEach(service => {
        entries.push({
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/city/${citySlug}/${service.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7
        })
      })
    })
  })

  return entries
} 