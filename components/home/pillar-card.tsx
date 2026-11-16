import type { Pillar } from "@/lib/content";
import ButtonLink from "@/components/ui/button-link";
import CheckList from "@/components/ui/check-list";
import Icon from "@/components/ui/icon";

export default function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-[28px] border border-line bg-white shadow-card">
      <div
        className={`flex flex-col gap-5 px-7 pt-7 pb-8 text-white ${pillar.headerClassName}`}
      >
        <div className="flex items-start justify-between">
          <span className="flex size-[60px] items-center justify-center rounded-[18px] bg-white/15">
            <Icon name={pillar.icon} strokeWidth={1.7} className="size-[30px] text-white" />
          </span>
          <span
            className="font-serif text-[56px] leading-none text-sage italic"
            aria-hidden="true"
          >
            {pillar.number}
          </span>
        </div>
        <h3 className="m-0 text-[30px] leading-[1.1] font-semibold tracking-[-0.01em]">
          {pillar.title}
        </h3>
        <p className="m-0 text-[17px] text-on-dark">{pillar.intro}</p>
      </div>

      <div className="flex grow flex-col gap-5 p-7">
        <CheckList items={pillar.points} />
        <p className="m-0 rounded-[14px] bg-paper px-4 py-3.5 text-[15px] text-muted-dark">
          <strong className="text-ink">Pour qui&nbsp;: </strong>
          {pillar.audience}
        </p>
        <ButtonLink
          href="#contact"
          variant="outline-forest"
          withArrow
          className="mt-auto min-h-[50px] gap-2 px-5"
        >
          {pillar.cta}
        </ButtonLink>
      </div>
    </article>
  );
}
