import Icon from "./icon";

/* Accordéon natif <details> : aucun JavaScript côté client. */
export default function AccordionItem({
  question,
  children,
  defaultOpen = false,
}: {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-[18px] border border-line bg-white px-6 py-5"
    >
      <summary className="flex min-h-7 cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
        {question}
        <Icon
          name="chevron"
          className="size-5 shrink-0 text-forest transition-transform group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <div className="mt-3 text-base text-muted">{children}</div>
    </details>
  );
}
