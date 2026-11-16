import Icon from "./icon";

export default function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" strokeWidth={2.2} className="size-[18px] text-forest" />
          {item}
        </li>
      ))}
    </ul>
  );
}
