import { getHomeTestimonials } from "@/services/home";
import SectionHeading from "@/components/ui/section-heading";

export default async function Testimonials() {
  const testimonials = await getHomeTestimonials();

  if (!testimonials || testimonials.items.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-line bg-mist">
      <div className="container py-24">
        <SectionHeading
          eyebrow={testimonials.baseline ?? undefined}
          title={testimonials.title ?? ""}
          className="mb-10"
        />
        <div className="row g-5">
          {testimonials.items.map((item, i) => (
            <div key={`${i}-${item.name ?? ""}`} className="col-12 md:col-6 lg:col-4 flex">
              <figure className="m-0 flex w-full flex-col gap-5 rounded-[22px] border border-line bg-white p-7">
                <svg className="size-7 fill-sage-300" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 21c3 0 7-1 7-8V5H3v8h4c0 4-2 5-4 5zM14 21c3 0 7-1 7-8V5h-7v8h4c0 4-2 5-4 5z" />
                </svg>
                <blockquote className="m-0 whitespace-pre-line text-[17px] text-body">
                  {item.description}
                </blockquote>
                {item.name && (
                  <figcaption className="mt-auto flex flex-col border-t border-line-soft pt-4">
                    <span className="text-base font-bold">{item.name}</span>
                  </figcaption>
                )}
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
