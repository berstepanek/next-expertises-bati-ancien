import { testimonials } from "@/lib/content";
import SectionHeading from "@/components/ui/section-heading";

export default function Testimonials() {
  return (
    <section className="border-y border-line bg-mist">
      <div className="container py-24">
        <SectionHeading
          eyebrow="Témoignages"
          title="Ce qu'en disent"
          accent="nos clients"
          className="mb-10"
        />
        <div className="row g-5">
          {testimonials.map((t, i) => (
            <div key={i} className="col-12 md:col-6 lg:col-4 flex">
              <figure className="m-0 flex w-full flex-col gap-5 rounded-[22px] border border-line bg-white p-7">
                <svg className="size-7 fill-sage-300" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 21c3 0 7-1 7-8V5H3v8h4c0 4-2 5-4 5zM14 21c3 0 7-1 7-8V5h-7v8h4c0 4-2 5-4 5z" />
                </svg>
                <blockquote className="m-0 text-[17px] text-body">{t.quote}</blockquote>
                <figcaption className="mt-auto flex flex-col border-t border-line-soft pt-4">
                  <span className="text-base font-bold">{t.author}</span>
                  <span className="text-sm text-muted">{t.context}</span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
