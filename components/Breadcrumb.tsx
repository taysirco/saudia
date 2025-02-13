import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

interface Props {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav className="bg-white shadow-sm mb-6">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-4 space-x-reverse">
          <li>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              الرئيسية
            </Link>
          </li>
          
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              {index === items.length - 1 ? (
                <span className="text-gray-700">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-blue-600 hover:text-blue-800">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
} 