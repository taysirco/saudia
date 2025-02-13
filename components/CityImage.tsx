import Image from 'next/image'

const cityImages: { [key: string]: string } = {
  'riyadh': '/images/cities/riyadh.jpg',
  'jeddah': '/images/cities/jeddah.jpg',
  'dammam': '/images/cities/dammam.jpg',
  'makkah': '/images/cities/makkah.jpg',
  'madinah': '/images/cities/madinah.jpg',
  'default': '/images/cities/default.jpg'
}

export default function CityImage({ citySlug, name }: { citySlug: string, name: string }) {
  const imageSrc = cityImages[citySlug] || cityImages.default

  return (
    <div className="relative h-48">
      <Image
        src={imageSrc}
        alt={`نقل عفش في ${name}`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  )
} 