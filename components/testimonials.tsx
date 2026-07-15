import { siteContent } from "@/content/site";

export function Testimonials() {
  return (
    <section className="section testimonials-section" aria-label="Testemunhos">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Testemunhos</p>
        <h2>Histórias que já <em className="accent">acendemos</em>.</h2>
      </div>
      <div className="testimonial-grid">
        {siteContent.testimonials.map((testimonial) => (
          <figure className="testimonial" data-reveal key={testimonial.author}>
            <span className="testimonial-mark" aria-hidden="true">“</span>
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>{testimonial.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
