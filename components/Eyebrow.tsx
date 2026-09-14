export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-eyebrow flex items-center gap-2 text-ink">
      <span
        aria-hidden="true"
        className="inline-block h-[6px] w-[6px] rounded-full border border-current"
      />
      {children}
    </div>
  );
}
