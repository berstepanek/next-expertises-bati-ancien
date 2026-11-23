import { getHomeMethod } from "@/services/home";
import SectionHeading from "@/components/ui/section-heading";

export default async function Method() {
  const method = await getHomeMethod();

  if (!method || (!method.title && method.steps.length === 0)) {
    return null;
  }

  return (
    <section id="methode" className="container pt-[104px] pb-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow={method.baseline ?? undefined}
          title={method.title ?? ""}
          titleClassName="text-[clamp(32px,4vw,46px)]"
          className="max-w-[640px]"
        />
        {method.description && (
          <p className="m-0 max-w-[400px] text-[17px] text-muted">
            {method.description}
          </p>
        )}
      </div>

      <ol className="row g-5 m-0 list-none p-0">
        {method.steps.map((step, i) => (
          <li key={`${i}-${step.title}`} className="col-12 sm:col-6 lg:col-3 flex">
            <div className="flex w-full flex-col gap-3 rounded-[22px] border border-line bg-white p-7">
              <span
                className="flex size-11 items-center justify-center rounded-full bg-primary text-[17px] font-bold text-white"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="m-0 text-xl font-semibold">{step.title}</h3>
              {step.description && (
                <p className="m-0 text-base text-muted">{step.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
