import { getHomeReport } from "@/services/home";
import Icon from "@/components/ui/icon";
import SectionHeading from "@/components/ui/section-heading";

export default async function Report() {
  const report = await getHomeReport();

  if (!report || (!report.title && report.items.length === 0)) {
    return null;
  }

  return (
    <section className="container pt-[104px] pb-24">
      <div className="row gy-14 items-center">
        <div className="col-12 lg:col-5 lg:pr-10">
          <SectionHeading
            eyebrow={report.baseline ?? undefined}
            title={report.title ?? ""}
            intro={report.description}
            introClassName="text-lg text-muted-dark"
            className="gap-[18px]"
          />
        </div>
        <div className="col-12 lg:col-7">
          <ul className="m-0 flex list-none flex-col divide-y divide-line-soft rounded-3xl border border-line bg-white p-2">
            {report.items.map((item, i) => (
              <li
                key={`${i}-${item.title}`}
                className="flex items-start gap-4 px-5 py-[18px]"
              >
                <Icon
                  name="check-circle"
                  className="mt-0.5 size-[22px] shrink-0 text-primary"
                />
                <span className="flex flex-col">
                  <span className="text-[17px] font-bold">{item.title}</span>
                  {item.description && (
                    <span className="text-[15px] text-muted">
                      {item.description}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
