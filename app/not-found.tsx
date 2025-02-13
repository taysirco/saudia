import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          عذراً، الصفحة غير موجودة
        </h2>
        <p className="text-gray-600 mb-8">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  )
} 