import { siteContent } from "@/content/site";

export function Faq() {
  return (
    <section className="section faq-section" id="perguntas" aria-labelledby="faq-title">
      <div className="section-heading" data-reveal><p className="eyebrow">Perguntas frequentes</p><h2 id="faq-title">Antes de acendermos a <em className="accent">conversa</em>.</h2></div>
      <div className="faq-list" data-reveal>
        {siteContent.faqs.map((item) => (
          <details key={item.question}><summary><span>{item.question}</span><span className="faq-symbol" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>
        ))}
      </div>
    </section>
  );
}
