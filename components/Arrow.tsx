export default function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 10"
      className={`h-[10px] w-[40px] ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <line x1="0" y1="5" x2="36" y2="5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M30 1 L36 5 L30 9"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
