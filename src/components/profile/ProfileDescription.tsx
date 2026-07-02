interface Props {
  description?: string;
}

export function ProfileDescription({
  description,
}: Props) {
  if (!description) return null;

  return (
    <p className="mt-3 text-sm text-[var(--text)]">
      {description}
    </p>
  );
}