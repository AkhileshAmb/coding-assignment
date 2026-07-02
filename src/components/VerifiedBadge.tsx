interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span
      className="inline-flex items-center ml-1 shrink-0"
      role="img"
      aria-label="Verified account"
      title="Verified account"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M19.9994 3.33301L24.5439 6.30626L30.0107 6.19634L31.6435 11.4111L36.1465 14.4394L34.4772 19.9997L36.1465 25.56L31.6435 28.5883L30.0107 33.8031L24.5439 33.6931L19.9994 36.6664L15.4549 33.6931L9.98807 33.8031L8.35528 28.5883L3.85229 25.56L5.52159 19.9997L3.85229 14.4394L8.35528 11.4111L9.98807 6.19634L15.4549 6.30626L19.9994 3.33301Z"
          fill="#3897F0"
        />
        <path
          d="M13.5 20.5L17.8 24.8L27 15"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}