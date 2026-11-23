import Icon from "./icon";

export default function CheckList({
  items,
  classCss = "text-primary",
}: {
  items: string[];
  classCss: string;
}) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item} className={`${classCss}`}>
          <Icon
            name="check"
            strokeWidth={2.2}
            className={`${classCss} size-[18px]`}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
