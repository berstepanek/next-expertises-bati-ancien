import Image from "next/image";
import { site } from "@/lib/content";
import { getHomeExpert } from "@/services/home";
import Icon from "@/components/ui/icon";
import SectionHeading from "@/components/ui/section-heading";

/* Sans photo renseignée dans SCF, un emplacement réservé est affiché. */
export default async function Expert() {
  const expert = await getHomeExpert();

  if (!expert || (!expert.title && expert.items.length === 0)) {
    return null;
  }

  const { photo } = expert;

  return (
    <section id="expert" className="border-y border-line bg-white">
      <div className="container py-24">
        <div className="row gy-14 items-center">
          <div className="col-12 lg:col-5">
            {photo ? (
              <Image
                src={photo.sourceUrl}
                alt={photo.altText || `${site.expertName} lors d'une expertise`}
                width={photo.width ?? 800}
                height={photo.height ?? 1000}
                className="aspect-[4/5] max-h-[560px] w-full rounded-[28px] object-cover"
              />
            ) : (
              <div className="flex aspect-[4/5] max-h-[560px] flex-col items-center justify-center gap-3 rounded-[28px] border border-dashed border-placeholder-line bg-placeholder text-muted-dark">
                <Icon name="person" strokeWidth={1.4} className="size-14 text-forest" />
                <span className="text-[15px] font-semibold">
                  [Photo de l&apos;expert sur un chantier]
                </span>
              </div>
            )}
          </div>

          <div className="col-12 lg:col-7 flex flex-col gap-5 lg:pl-10">
            <SectionHeading
              eyebrow={expert.baseline ?? undefined}
              title={expert.title ?? ""}
              intro={expert.description}
              introClassName="text-lg text-muted-dark"
              className="gap-5"
            />
            {expert.items.length > 0 && (
              <ul className="row g-[14px] m-0 mt-1 list-none p-0">
                {expert.items.map((item, i) => (
                  <li key={`${i}-${item.title}`} className="col-12 sm:col-6 flex">
                    <div className="flex w-full items-start gap-3 rounded-2xl bg-paper p-4">
                      <Icon
                        name="check-circle"
                        strokeWidth={1.8}
                        className="size-[22px] shrink-0 text-forest"
                      />
                      <span className="flex flex-col">
                        <span className="text-base font-bold">{item.title}</span>
                        {item.description && (
                          <span className="text-[15px] text-muted">
                            {item.description}
                          </span>
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
