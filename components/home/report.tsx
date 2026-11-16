import { reportItems } from "@/lib/content";
import Icon from "@/components/ui/icon";
import SectionHeading from "@/components/ui/section-heading";

export default function Report() {
  return (
    <section className="container pt-[104px] pb-24">
      <div className="row gy-14 items-center">
        <div className="col-12 lg:col-5 lg:pr-10">
          <SectionHeading
            eyebrow="Ce que vous recevez"
            title="Un rapport"
            accent="qui vous aide à décider"
            intro="Pas un document technique illisible : un outil concret pour consulter des artisans, négocier un prix ou faire valoir vos droits."
            introClassName="text-lg text-muted-dark"
            className="gap-[18px]"
          />
        </div>
        <div className="col-12 lg:col-7">
          <ul className="m-0 flex list-none flex-col divide-y divide-line-soft rounded-3xl border border-line bg-white p-2">
            {reportItems.map((item) => (
              <li key={item.title} className="flex items-start gap-4 px-5 py-[18px]">
                <Icon
                  name="check-circle"
                  className="mt-0.5 size-[22px] shrink-0 text-forest"
                />
                <span className="flex flex-col">
                  <span className="text-[17px] font-bold">{item.title}</span>
                  <span className="text-[15px] text-muted">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
