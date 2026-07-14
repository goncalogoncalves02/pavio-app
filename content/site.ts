import type { SiteContent } from "@/types/content";

export const siteContent: SiteContent = {
  brand: {
    name: "Pavio Atelier Natural",
    shortName: "Pavio",
    tagline: "Velas artísticas, feitas para cada história.",
  },
  navigation: [
    { label: "Atelier", href: "#atelier" },
    { label: "Galeria", href: "#galeria" },
    { label: "Como encomendar", href: "#encomendas" },
    { label: "Perguntas", href: "#perguntas" },
    { label: "Contactos", href: "#contactos" },
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
        "Sim, fazemos envios para Portugal continental. A entrega local ou recolha pode estar disponível consoante a zona e é combinada antes da confirmação.",
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
