interface Props {
  label: string;
  color?: string;
}

export default function CategoryTag(props: Props) {
  return (
    <span className="my-1 inline-block rounded-full bg-gray-500 px-3 py-1 text-sm font-semibold text-slate-100">
      {props.label}
    </span>
  );
}
