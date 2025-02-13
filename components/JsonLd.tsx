interface JsonLdProps {
  cityName: string;
  serviceName?: string;
  region?: string;
}

export default function JsonLd({ cityName, serviceName, region }: JsonLdProps) {
  // إنشاء 10 مواقع مختلفة في المدينة
  const locations = [
    { lat: "24.7136", lng: "46.6753", area: "وسط المدينة" },
    { lat: "24.7235", lng: "46.6921", area: "شمال المدينة" },
    { lat: "24.6948", lng: "46.6842", area: "شرق المدينة" },
    { lat: "24.7012", lng: "46.6573", area: "غرب المدينة" },
    { lat: "24.6891", lng: "46.6718", area: "جنوب المدينة" },
    { lat: "24.7156", lng: "46.6836", area: "الحي التجاري" },
    { lat: "24.7078", lng: "46.6965", area: "المنطقة الصناعية" },
    { lat: "24.6978", lng: "46.6789", area: "الحي السكني" },
    { lat: "24.7198", lng: "46.6684", area: "منطقة الأعمال" },
    { lat: "24.7034", lng: "46.6892", area: "المنطقة الحيوية" }
  ];

  // إنشاء 10 شركات محلية
  const localBusinesses = locations.map((loc, index) => ({
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/city/${cityName}/branch/${index + 1}`,
    "name": serviceName 
      ? `${serviceName} في ${cityName} - ${loc.area}`
      : `شركة نقل عفش في ${cityName} - ${loc.area}`,
    "description": serviceName
      ? `خدمة ${serviceName} في ${cityName} ${loc.area} - نقل عفش مع الضمان وأفضل الأسعار`
      : `افضل شركة نقل عفش في ${cityName} ${loc.area} - خدمات نقل الاثاث مع الفك والتركيب`,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/city/${cityName}`,
    "telephone": `+9665${String(index + 1).padStart(8, '0')}`,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressRegion": region,
      "streetAddress": `${loc.area}، ${cityName}`,
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": loc.lat,
      "longitude": loc.lng
    },
    "areaServed": {
      "@type": "City",
      "name": cityName,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": region || "المملكة العربية السعودية"
      }
    },
    "openingHours": ["Mo-Su 00:00-23:59"],
    "image": [
      `${process.env.NEXT_PUBLIC_SITE_URL}/images/moving-service-${(index % 3) + 1}.jpg`
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (4.5 + (index * 0.1)).toFixed(1),
      "reviewCount": 100 + (index * 10),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": `عميل ${index + 1}`
        },
        "reviewBody": `خدمة ممتازة في ${cityName} ${loc.area} وسعر مناسب مع الضمان`
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": loc.lat,
        "longitude": loc.lng
      },
      "geoRadius": "5000"
    },
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL}/city/${cityName}`,
        "inLanguage": "ar",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "حجز خدمة نقل عفش"
      }
    }
  }));

  // Schema للخدمة إذا كانت موجودة
  const serviceSchema = serviceName ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${serviceName} في ${cityName}`,
    "serviceType": "MovingServices",
    "provider": {
      "@type": "MovingCompany",
      "name": `شركة نقل عفش في ${cityName}`
    },
    "areaServed": {
      "@type": "City",
      "name": cityName
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "SAR",
      "availability": "https://schema.org/InStock"
    }
  } : null;

  return (
    <>
      {localBusinesses.map((business, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
        />
      ))}
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
    </>
  );
} 