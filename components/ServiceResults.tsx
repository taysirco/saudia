'use client'

import { Location } from '@/types/location'
import { motion } from 'framer-motion'

interface ServiceResultsProps {
  cityName: string;
  locations: Location[];
}

export default function ServiceResults({ cityName, locations = [] }: ServiceResultsProps) {
  if (!locations || locations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">لا توجد نتائج متاحة حالياً</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-l from-purple-600 via-blue-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
        نتائج البحث عن دينا نقل عفش في {cityName}
      </h2>

      <div className="space-y-4">
        {locations.map((location, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            key={index}
            className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <motion.h3 
                  className="text-xl font-bold text-gray-900 mb-2"
                  whileHover={{ color: '#2563EB' }}
                  transition={{ duration: 0.2 }}
                >
                  {location.title}
                </motion.h3>
                
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {location.rating && (
                    <motion.div 
                      className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-yellow-400 text-lg ml-1">★</span>
                      <span className="font-bold text-gray-700">{location.rating}</span>
                      {location.reviews && (
                        <span className="text-gray-500 mr-1">
                          ({location.reviews})
                        </span>
                      )}
                    </motion.div>
                  )}
                  {location.openNow && (
                    <motion.span 
                      className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      مفتوح 24 ساعة
                    </motion.span>
                  )}
                </div>

                <p className="text-gray-600 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location.address}
                </p>

                {location.phone && (
                  <div className="flex items-center space-x-4 space-x-reverse mb-4">
                    <motion.a 
                      whileHover={{ scale: 1.05, backgroundColor: '#2563EB', color: '#fff' }}
                      whileTap={{ scale: 0.95 }}
                      href={`tel:${location.phone}`}
                      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full flex items-center transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {location.phone}
                    </motion.a>
                    {location.hasWhatsapp && (
                      <motion.a 
                        whileHover={{ scale: 1.05, backgroundColor: '#22C55E', color: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://wa.me/${location.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-50 text-green-600 px-4 py-2 rounded-full flex items-center transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/>
                        </svg>
                        واتساب
                      </motion.a>
                    )}
                  </div>
                )}

                {location.services && location.services.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {location.services.map((service, idx) => (
                      <motion.span 
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center border border-blue-100"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full ml-2"></span>
                        {service}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 