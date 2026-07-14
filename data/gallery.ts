import type { GalleryItem } from "@/types/content";

const galleryItems: GalleryItem[] = [
  {
    id: "jardim-e-luz",
    artworkPath: "/gallery/jardim-e-luz.svg",
    alt: "Vela artesanal verde-sálvia decorada com pequenas flores em tons creme",
    title: "Jardim & Luz",
    description: "Uma composição botânica delicada para oferecer ou criar um recanto sereno.",
    whatsAppMessage: "Olá! Gostava de saber mais sobre uma vela inspirada em Jardim & Luz.",
  },
  {
    id: "aurora",
    artworkPath: "/gallery/aurora.svg",
    alt: "Vela artesanal ondulada em tons de areia e terracota sobre uma base clara",
    title: "Aurora",
    description: "Linhas orgânicas e cor suave numa peça pensada para uma ocasião especial.",
    whatsAppMessage: "Olá! Gostava de saber mais sobre uma vela inspirada em Aurora.",
  },
  {
    id: "flor-de-linho",
    artworkPath: "/gallery/flor-de-linho.svg",
    alt: "Vela artesanal creme em forma de flor, apresentada sobre tecido de linho",
    title: "Flor de Linho",
    description: "Uma presença escultórica, discreta e luminosa para decoração ou lembrança.",
    whatsAppMessage: "Olá! Gostava de saber mais sobre uma vela inspirada em Flor de Linho.",
  },
  {
    id: "sereno",
    artworkPath: "/gallery/sereno.svg",
    alt: "Conjunto de velas artesanais cilíndricas em tons de argila e marfim",
    title: "Sereno",
    description: "Volumes simples e naturais que podem ser personalizados para o seu momento.",
    whatsAppMessage: "Olá! Gostava de saber mais sobre uma vela inspirada em Sereno.",
  },
];

export function getGalleryItems(): GalleryItem[] {
  return galleryItems.map((item) => ({ ...item }));
}
