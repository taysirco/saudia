export interface City {
  name: string;
  region: string;
}

export interface Keyword {
  text: string;
}

export interface MetaData {
  title: string;
  description: string;
  keywords: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  timestamp: Date;
} 