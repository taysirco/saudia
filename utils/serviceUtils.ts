import { getSlugFromCity } from './slugs'

export interface Service {
  title: string;
  slug: string;
  description: string;
  category: string;
}

export interface ServiceCategory {
  name: string;
  slug: string;
  services: Service[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    name: 'خدمات النقل الأساسية',
    slug: 'basic-moving-services',
    services: [
      {
        title: 'نقل عفش',
        slug: 'furniture-moving',
        description: 'خدمة نقل العفش الشاملة مع الضمان',
        category: 'basic'
      },
      {
        title: 'نقل عفش مضمون',
        slug: 'guaranteed-moving',
        description: 'خدمة نقل العفش مع ضمان شامل ضد الأضرار',
        category: 'basic'
      },
      {
        title: 'نقل عفش مع الضمان',
        slug: 'insured-moving',
        description: 'نقل العفش مع ضمان التعويض',
        category: 'basic'
      },
      {
        title: 'نقل عفش عمالة فلبينية',
        slug: 'filipino-movers',
        description: 'خدمة نقل العفش باحترافية مع عمالة فلبينية مدربة',
        category: 'basic'
      },
      {
        title: 'دينا نقل عفش',
        slug: 'moving-truck',
        description: 'خدمة نقل العفش بسيارات مجهزة',
        category: 'basic'
      },
      {
        title: 'شركة نقل عفش',
        slug: 'moving-company',
        description: 'خدمات شركة نقل العفش المتكاملة',
        category: 'basic'
      },
      {
        title: 'افضل شركة نقل عفش',
        slug: 'best-moving-company',
        description: 'أفضل خدمات نقل العفش مع الضمان',
        category: 'basic'
      },
      {
        title: 'نقل اثاث',
        slug: 'furniture-transport',
        description: 'نقل الأثاث المنزلي والمكتبي',
        category: 'basic'
      },
      {
        title: 'ارخص شركة نقل عفش',
        slug: 'cheapest-moving-company',
        description: 'أرخص شركة نقل عفش مع ضمان جودة الخدمة',
        category: 'basic'
      },
      {
        title: 'اسعار نقل العفش',
        slug: 'moving-prices',
        description: 'أسعار تنافسية لخدمات نقل العفش مع عروض خاصة',
        category: 'basic'
      }
    ]
  },
  {
    name: 'خدمات العمالة المتخصصة',
    slug: 'labor-services',
    services: [
      {
        title: 'عمالة مدربة لنقل العفش',
        slug: 'trained-movers',
        description: 'عمالة متخصصة ومدربة لنقل العفش باحترافية',
        category: 'labor'
      },
      {
        title: 'عمالة فلبينية محترفة',
        slug: 'professional-filipino',
        description: 'عمالة فلبينية مدربة لنقل العفش',
        category: 'labor'
      }
    ]
  },
  {
    name: 'خدمات الرفع والتنزيل',
    slug: 'lifting-services',
    services: [
      {
        title: 'ونش رفع اثاث',
        slug: 'furniture-lift',
        description: 'خدمة رفع الأثاث بالونش للأدوار العليا',
        category: 'lifting'
      },
      {
        title: 'رفع اثاث للأدوار العليا',
        slug: 'high-floor-lifting',
        description: 'خدمة رفع الأثاث للشقق المرتفعة',
        category: 'lifting'
      }
    ]
  },
  {
    name: 'خدمات التخزين',
    slug: 'storage-services',
    services: [
      {
        title: 'تخزين اثاث',
        slug: 'furniture-storage',
        description: 'خدمة تخزين الأثاث في مستودعات آمنة',
        category: 'storage'
      },
      {
        title: 'شركة تخزين اثاث',
        slug: 'storage-company',
        description: 'خدمات تخزين احترافية للأثاث',
        category: 'storage'
      },
      {
        title: 'مستودعات تخزين',
        slug: 'storage-units',
        description: 'مستودعات آمنة ومجهزة لتخزين الأثاث',
        category: 'storage'
      }
    ]
  },
  {
    name: 'خدمات الفك والتركيب',
    slug: 'assembly-services',
    services: [
      {
        title: 'فك وتركيب غرف النوم',
        slug: 'bedroom-assembly',
        description: 'خدمة فك وتركيب غرف النوم بأيدي متخصصين',
        category: 'assembly'
      },
      {
        title: 'فك وتركيب المطابخ',
        slug: 'kitchen-assembly',
        description: 'فك وتركيب المطابخ بجميع أنواعها',
        category: 'assembly'
      },
      {
        title: 'فك وتركيب الستائر',
        slug: 'curtain-assembly',
        description: 'خدمة فك وتركيب الستائر بجميع أنواعها',
        category: 'assembly'
      }
    ]
  },
  {
    name: 'خدمات التغليف',
    slug: 'packing-services',
    services: [
      {
        title: 'تغليف الاثاث',
        slug: 'furniture-packing',
        description: 'تغليف الأثاث باحترافية لحمايته أثناء النقل',
        category: 'packing'
      },
      {
        title: 'تغليف المقتنيات الثمينة',
        slug: 'valuables-packing',
        description: 'تغليف خاص للمقتنيات الثمينة والقابلة للكسر',
        category: 'packing'
      }
    ]
  }
];

export function getServiceSlug(title: string): string {
  return title.toLowerCase().replace(/ /g, '-');
}

export function getCityServiceUrl(citySlug: string, serviceSlug: string): string {
  return `/city/${citySlug}/${serviceSlug}`;
}

export function getAllServicesForCity(cityName: string) {
  const citySlug = getSlugFromCity(cityName);
  const allServices: Service[] = [];
  
  serviceCategories.forEach(category => {
    category.services.forEach(service => {
      allServices.push({
        ...service,
        title: `${service.title} في ${cityName}`,
        description: service.description.replace('{city}', cityName)
      });
    });
  });
  
  return allServices;
} 