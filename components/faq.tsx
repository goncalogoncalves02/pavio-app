import { siteContent } from "@/content/site";

export function Faq() {
  return (
    <section className="section faq-section" id="perguntas" aria-labelledby="faq-title">
      <div className="section-heading"><p className="eyebrow">Perguntas frequentes</p><h2 id="faq-title">Antes de acendermos a conversa.</h2></div>
      <div className="faq-list">
        {siteContent.faqs.map((item) => (
          <details key={item.question}><summary><span>{item.question}</span><span className="faq-symbol" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>
        ))}
      </div>
    </section>
  );
}
