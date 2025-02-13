'use client'

import { useState } from 'react'
import ServiceResults from './ServiceResults'
import GoogleMap from './GoogleMap'
import { PlaceResult } from '@/types/place' // تأكد من تعريف هذا النوع في types/place.ts

interface ServiceResultsTabsProps {
  cityName: string;
  serviceName: string;
  results: PlaceResult[];
}

export default function ServiceResultsTabs({ cityName, serviceName, results }: ServiceResultsTabsProps) {
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex border-b mb-4">
        <button 
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'map'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          الخريطة
        </button>
        <button 
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'list'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          النتائج
        </button>
      </div>
      
      {activeTab === 'map' ? (
        <div className="mt-4">
          <GoogleMap cityName={cityName} locations={results} />
        </div>
      ) : (
        <div className="mt-4">
          <ServiceResults
            cityName={cityName}
            serviceName={serviceName}
            results={results}
            currentPage={1}
            totalPages={Math.ceil(results.length / 10)}
            onPageChange={() => {}}
          />
        </div>
      )}
    </div>
  )
} 