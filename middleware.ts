import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // التحقق من الروابط القديمة التي تبدأ بـ /city
  if (url.pathname.startsWith('/city/')) {
    // استخراج اسم المدينة من الرابط القديم
    const citySlug = url.pathname.split('/')[2]
    
    // إعادة التوجيه إلى الرابط الجديد
    return NextResponse.redirect(new URL(`/${citySlug}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/city/:path*'
} 