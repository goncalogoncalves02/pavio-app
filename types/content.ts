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

export type Seal = {
  label: string;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  author: string;
};

export type Story = {
  paragraphs: string[];
  signature: string;
  portrait: {
    src: string;
    alt: string;
  };
};

export type SiteContent = {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
  };
  navigation: NavigationItem[];
  seals: Seal[];
  benefits: Benefit[];
  story: Story;
  orderSteps: OrderStep[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  defaultWhatsAppMessage: string;
};
