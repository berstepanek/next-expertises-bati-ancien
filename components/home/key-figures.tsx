import { keyFigures } from "@/lib/content";

export default function KeyFigures() {
  return (
    <section aria-label="Chiffres clés" className="border-b border-line bg-white">
      <div className="container py-8">
        <dl className="row g-6 m-0">
          {keyFigures.map((f) => (
            <div key={f.label} className="col-12 sm:col-6 lg:col-3">
              <div className="flex flex-col-reverse gap-0.5 border-l border-line pl-5">
                <dt className="text-[15px] text-muted">{f.label}</dt>
                <dd className="m-0 text-4xl font-semibold tracking-[-0.02em]">
                  {f.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
