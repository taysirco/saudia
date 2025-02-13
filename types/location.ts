export interface Location {
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