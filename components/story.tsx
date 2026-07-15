import Image from "next/image";

import { siteContent } from "@/content/site";

export function Story() {
  const { story } = siteContent;

  return (
    <section className="story-section" id="historia" aria-labelledby="historia-title">
      <div className="story-artwork" data-reveal>
        <div className="story-image-frame">
          <Image src={story.portrait.src} alt={story.portrait.alt} width={800} height={1000} sizes="(max-width: 760px) 92vw, 34vw" />
        </div>
      </div>
      <div className="story-copy" data-reveal>
        <p className="eyebrow">A artesã</p>
        <h2 id="historia-title">Mãos que <em className="accent">moldam</em> a luz.</h2>
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="story-signature">{story.signature}</p>
      </div>
    </section>
  );
}
