import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como o site Pavio Atelier Natural trata dados e ligações externas.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <Link className="privacy-brand" href="/">Pavio <span>Atelier Natural</span></Link>
      <article>
        <p className="eyebrow">Informação</p>
        <h1>Política de privacidade</h1>
        <p className="privacy-lead">Esta política descreve apenas o funcionamento da primeira versão deste site institucional.</p>

        <h2>Dados recolhidos neste site</h2>
        <p>O site não utiliza ferramentas próprias de análise de tráfego, não disponibiliza formulários e não recolhe diretamente dados pessoais.</p>

        <h2>Ligações para plataformas externas</h2>
        <p>Algumas ações podem encaminhar para o WhatsApp ou para o Instagram. Ao seguir essas ligações, passa a utilizar serviços externos, cujo tratamento de dados é regido pelas políticas e condições das respetivas plataformas.</p>

        <h2>Alterações futuras</h2>
        <p>Se forem adicionados formulários, análise de utilização ou outros serviços que tratem dados, esta política será atualizada antes de essas funcionalidades serem disponibilizadas.</p>

        <Link className="button button--primary" href="/">Voltar ao início</Link>
      </article>
    </main>
  );
}
