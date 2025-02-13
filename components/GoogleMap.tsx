"use client"

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

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

interface GoogleMapProps {
  cityName: string;
  locations: Location[];
}

export default function GoogleMap({ cityName, locations }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [activeLocation, setActiveLocation] = useState<Location | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
          version: 'weekly',
          libraries: ['places']
        })

        const google = await loader.load()
        
        if (!mapRef.current || locations.length === 0) return

        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat: locations[0].lat, lng: locations[0].lng },
          zoom: 12,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })

        setMap(newMap)

        // Clear existing markers
        markers.forEach(marker => marker.setMap(null))
        const newMarkers: google.maps.Marker[] = []

        // Add markers for each location
        locations.forEach((location, index) => {
          const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: newMap,
            title: location.title,
            label: {
              text: (index + 1).toString(),
              color: '#FFFFFF',
              fontSize: '14px'
            }
          })

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-4 min-w-[300px]">
                <h3 class="font-bold text-xl mb-2">${location.title}</h3>
                <div class="space-y-3">
                  <p class="text-gray-600">${location.address}</p>
                  
                  ${location.phone ? `
                    <div class="flex items-center text-gray-700">
                      <svg class="w-5 h-5 text-blue-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:${location.phone}" class="text-blue-600 hover:underline">${location.phone}</a>
                      ${location.hasWhatsapp ? `
                        <a href="https://wa.me/${location.whatsappNumber}" target="_blank" class="mr-2 text-green-600 hover:underline">
                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/>
                          </svg>
                        </a>
                      ` : ''}
                    </div>
                  ` : ''}

                  ${location.website ? `
                    <div class="flex items-center text-gray-700">
                      <svg class="w-5 h-5 text-blue-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a href="${location.website}" target="_blank" class="text-blue-600 hover:underline">
                        ${location.website.replace('https://www.', '')}
                      </a>
                    </div>
                  ` : ''}

                  <div class="flex items-center text-gray-700">
                    <svg class="w-5 h-5 text-blue-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>${location.workingHours}</span>
                    <span class="mr-2 px-2 py-1 rounded-full text-xs ${
                      location.openNow ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }">
                      ${location.openNow ? 'مفتوح الآن' : 'مغلق'}
                    </span>
                  </div>

                  <div class="flex items-center space-x-2 space-x-reverse">
                    <div class="flex items-center">
                      <span class="text-yellow-400 text-lg">★</span>
                      <span class="mr-1 font-semibold">${location.rating}</span>
                    </div>
                    <span class="text-gray-500">(${location.reviews} تقييم)</span>
                  </div>

                  <div class="text-gray-700">
                    <span class="font-semibold">الأسعار:</span> ${location.priceRange}
                  </div>

                  <div class="text-gray-700">
                    <span class="font-semibold">الخبرة:</span> ${location.experience}
                  </div>

                  <div class="mt-3">
                    <h4 class="font-semibold mb-2">المميزات:</h4>
                    <div class="flex flex-wrap gap-2">
                      ${location.features.map(feature => `
                        <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                          ${feature}
                        </span>
                      `).join('')}
                    </div>
                  </div>

                  <div class="mt-3">
                    <h4 class="font-semibold mb-2">الخدمات المتوفرة:</h4>
                    <div class="flex flex-wrap gap-2">
                      ${location.services.map(service => `
                        <span class="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm">
                          ${service}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                </div>
              </div>
            `
          })

          marker.addListener('click', () => {
            if (activeLocation) {
              infoWindow.close()
            }
            infoWindow.open(newMap, marker)
            setActiveLocation(location)
          })

          newMarkers.push(marker)
        })

        setMarkers(newMarkers)

      } catch (error) {
        console.error('Error loading Google Maps:', error)
      }
    }

    initMap()

    return () => {
      // Cleanup markers when component unmounts
      markers.forEach(marker => marker.setMap(null))
    }
  }, [locations])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
          <div ref={mapRef} className="w-full h-full" />
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold mb-4">نتائج البحث في {cityName}</h3>
          <div className="space-y-4 max-h-[452px] overflow-y-auto custom-scrollbar">
            {locations.map((location, index) => (
              <button
                key={index}
                onClick={() => setActiveLocation(location)}
                className={`w-full text-right p-4 rounded-lg transition-all ${
                  activeLocation === location
                    ? 'bg-blue-50 border-blue-500'
                    : 'hover:bg-gray-50 border-transparent'
                } border-2`}
              >
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">{location.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{location.address}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        {location.rating && (
                          <>
                            <span className="text-yellow-400 ml-1">★</span>
                            <span className="text-gray-700">{location.rating}</span>
                            {location.reviews ? (
                              <span className="text-gray-500 mr-1">
                                ({location.reviews} تقييم)
                              </span>
                            ) : null}
                          </>
                        )}
                      </div>
                      {location.phone && (
                        <a 
                          href={`tel:${location.phone}`}
                          className="text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {location.phone}
                        </a>
                      )}
                    </div>

                    {location.services && location.services.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {location.services.slice(0, 3).map((service, idx) => (
                          <span 
                            key={idx}
                            className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs"
                          >
                            {service}
                          </span>
                        ))}
                        {location.services.length > 3 && (
                          <span className="text-gray-500 text-xs">
                            +{location.services.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 