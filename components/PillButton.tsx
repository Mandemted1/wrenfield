"use client";

type PillButtonProps = {
  children: React.ReactNode;
  variant?: "fill" | "outline";
  tone?: "ink" | "bone";
  href?: string;
  onClick?: () => void;
  className?: string;
};

export default function PillButton({
  children,
  variant = "fill",
  tone = "ink",
  href,
  onClick,
  className = "",
}: PillButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-pill px-6 py-3 text-spec uppercase transition-colors";
  const styles =
    variant === "fill"
      ? "bg-sage text-ink hover:bg-sage-lt"
      : tone === "bone"
        ? "border border-bone text-bone bg-transparent hover:bg-bone hover:text-ink"
        : "border border-ink text-ink bg-transparent hover:bg-ink hover:text-bone";

  const classes = `${base} ${styles} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
