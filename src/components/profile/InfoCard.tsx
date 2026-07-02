interface InfoCardProps {
  title: string;
  value: string | number;
}

export function InfoCard({ title, value }: InfoCardProps) {
  return (
    <div className="border border-[var(--border)] rounded-xl p-3">
      <div className="text-[var(--text)] text-xs">
        {title}
      </div>

      <div className="font-semibold text-[var(--text-h)] mt-0.5">
        {value}
      </div>
    </div>
  );
}