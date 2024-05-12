interface Props {
  icon?: React.ReactElement;
  textContent: string;
  areaLabel: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function HoverButton(props: Props) {
  return (
    <button
      onClick={(e) => props.onClick(e)}
      className="z-1 relative rounded-3xl bg-[#FAF7F2] px-4 py-2  hover:shadow-lg"
      aria-label={props.areaLabel}
    >
      {props.icon}
      <span className="font-body text-md text-slate-900">
        {props.textContent}
      </span>
    </button>
  );
}
