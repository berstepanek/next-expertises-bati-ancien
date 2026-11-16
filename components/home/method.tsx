import { steps } from "@/lib/content";
import SectionHeading from "@/components/ui/section-heading";

export default function Method() {
  return (
    <section id="methode" className="container pt-[104px] pb-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Notre méthode"
          title="Quatre étapes,"
          accent="aucune surprise"
          titleClassName="text-[clamp(32px,4vw,46px)]"
          className="max-w-[640px]"
        />
        <p className="m-0 max-w-[400px] text-[17px] text-muted">
          Vous savez à chaque étape ce qui va se passer, combien cela coûte et
          ce que vous recevrez.
        </p>
      </div>

      <ol className="row g-5 m-0 list-none p-0">
        {steps.map((step, i) => (
          <li key={step.title} className="col-12 sm:col-6 lg:col-3 flex">
            <div className="flex w-full flex-col gap-3 rounded-[22px] border border-line bg-white p-7">
              <span
                className="flex size-11 items-center justify-center rounded-full bg-forest text-[17px] font-bold text-white"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="m-0 text-xl font-semibold">{step.title}</h3>
              <p className="m-0 text-base text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
