import { useState } from "react";
import { getInitials } from "@/utils/formatters";

interface AvatarProps {
  src: string;
  alt: string;
  name: string;
  className?: string;
}

export function Avatar({ src, alt, name, className }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center rounded-full flex-shrink-0 font-semibold ${className ?? ""}`}
        style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
        role="img"
        aria-label={alt}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover flex-shrink-0 ${className ?? ""}`}
      onError={() => setFailed(true)}
    />
  );
}