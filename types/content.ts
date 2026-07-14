export type GalleryItem = {
  id: string;
  artworkPath: string;
  alt: string;
  title: string;
  description: string;
  whatsAppMessage: string;
};

export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type Benefit = {
  eyebrow: string;
  title: string;
  description: string;
};

export type OrderStep = {
  number: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SiteContent = {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
  };
  navigation: NavigationItem[];
  benefits: Benefit[];
  orderSteps: OrderStep[];
  faqs: FaqItem[];
  defaultWhatsAppMessage: string;
};
