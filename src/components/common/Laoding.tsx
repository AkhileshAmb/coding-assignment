interface Props {
  title?: string;
}

export function Loading({
  title = "Loading..."
}: Props) {

  return (
    <p
      className="text-[var(--text)] text-center"
      role="status"
    >
      {title}
    </p>
  );
}