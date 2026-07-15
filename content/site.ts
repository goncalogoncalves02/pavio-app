import type { SiteContent } from "@/types/content";

export const siteContent: SiteContent = {
  brand: {
    name: "Pavio Atelier Natural",
    shortName: "Pavio",
    tagline: "Velas que acendem momentos.",
    logoPath: "/brand/pavio-logo.png",
    logoAlt: "Pavio — Velas que acendem momentos",
  },
  business: {
    locality: "Setúbal",
    countryName: "Portugal",
    shippingArea: "Portugal continental",
    pickupLabel: "Recolha em Setúbal a combinar",
  },
  seo: {
    title: "Velas artesanais personalizadas em Setúbal | Pavio",
    description:
      "Velas artísticas e personalizadas em ceras naturais, feitas à mão em Setúbal. Recolha a combinar e envios para Portugal continental.",
  },
  navigation: [
    { label: "Atelier", href: "#atelier" },
    { label: "Galeria", href: "#galeria" },
    { label: "História", href: "#historia" },
    { label: "Encomendar", href: "#encomendas" },
    { label: "Perguntas", href: "#perguntas" },
    { label: "Contactos", href: "#contactos" },
  ],
  seals: [
    {
      label: "Selo · 01",
      title: "Ceras 100% naturais",
      description: "Soja, colza e ceras vegetais certificadas.",
    },
    {
      label: "Selo · 02",
      title: "Zero parafina",
      description: "Sem derivados de petróleo, do pavio à cera.",
    },
    {
      label: "Selo · 03",
      title: "Óleos naturais",
      description: "Fragrâncias delicadas, de origem botânica.",
    },
    {
      label: "Selo · 04",
      title: "Feito à mão em Setúbal",
      description: "Pequenos lotes, moldados no nosso atelier.",
    },
  ],
  benefits: [
    {
      eyebrow: "Matéria",
      title: "Ceras naturais, sem parafina",
      description:
        "Escolhemos ceras de origem natural e trabalhamos cada peça em pequenos lotes, com tempo e atenção.",
    },
    {
      eyebrow: "Aroma",
      title: "Óleos naturais para perfumar",
      description:
        "Criamos atmosferas delicadas com óleos naturais para fragrância, escolhidos em função de cada composição.",
    },
    {
      eyebrow: "Intenção",
      title: "Personalização com significado",
      description:
        "Cores, formas e detalhes podem ser pensados para presentes, celebrações e decoração de espaços.",
    },
  ],
  story: {
    paragraphs: [
      "O Pavio nasceu de uma mesa de cozinha, de tardes a experimentar ceras vegetais e a perseguir uma ideia simples: que uma vela pode ser, ao mesmo tempo, objeto de arte e gesto de afeto.",
      "Hoje, no nosso atelier em Setúbal, cada peça continua a ser moldada uma a uma — sem moldes industriais, sem pressa. Escolhemos matérias que respeitam a natureza e desenhamos cada encomenda em conversa com quem a vai receber.",
    ],
    signature: "— do atelier Pavio, com as mãos na cera",
    portrait: {
      src: "/gallery/retrato-artesa.svg",
      alt: "Ilustração de uma artesã a segurar uma vela artesanal no atelier",
    },
  },
  orderSteps: [
    {
      number: "01",
      title: "Conte-nos a sua ideia",
      description:
        "Partilhe a ocasião, referências, quantidades e data desejada através do WhatsApp.",
    },
    {
      number: "02",
      title: "Desenhamos a proposta",
      description:
        "Afinamos consigo os detalhes e preparamos um orçamento personalizado, sem preços tabelados.",
    },
    {
      number: "03",
      title: "Produzimos com cuidado",
      description:
        "Após confirmação, cada vela é produzida artesanalmente e preparada para seguir até si.",
    },
  ],
  testimonials: [
    {
      quote:
        "A vela que encomendei para o casamento da minha irmã fez toda a gente perguntar de onde vinha. Uma peça única, mesmo.",
      author: "Marta S. · Lisboa",
    },
    {
      quote:
        "Chegou embalada como um presente de joalharia. O aroma é subtil e a chama dura horas.",
      author: "Rui P. · Porto",
    },
    {
      quote:
        "Pedi uma cor impossível e acertaram à primeira. Sente-se o cuidado em cada detalhe.",
      author: "Inês C. · Braga",
    },
  ],
  faqs: [
    {
      question: "As velas podem ser personalizadas?",
      answer:
        "Sim. Avaliamos cores, formas, aromas, acabamento e apresentação de acordo com a ocasião e a viabilidade artesanal de cada pedido.",
    },
    {
      question: "Como é definido o valor da encomenda?",
      answer:
        "Cada pedido recebe um orçamento próprio, considerando a composição, personalização, quantidade e prazo. Não trabalhamos com preços fixos no site.",
    },
    {
      question: "Fazem envios?",
      answer:
        "Sim, fazemos envios para Portugal continental. As condições e o valor do envio são confirmados antes de concluir a encomenda.",
    },
    {
      question: "Posso recolher a encomenda em Setúbal?",
      answer:
        "Sim. A recolha em Setúbal pode ser combinada diretamente com o atelier, de acordo com a disponibilidade e após confirmação da encomenda.",
    },
    {
      question: "Com quanta antecedência devo encomendar?",
      answer:
        "Quanto mais cedo falar connosco, melhor. O prazo depende do tipo de peça, quantidade e agenda do atelier, por isso confirmamos sempre a disponibilidade consigo.",
    },
  ],
  defaultWhatsAppMessage:
    "Olá! Gostava de pedir um orçamento personalizado para uma vela artesanal.",
};
