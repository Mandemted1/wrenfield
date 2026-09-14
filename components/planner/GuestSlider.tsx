"use client";

export default function GuestSlider({
  value,
  min = 20,
  max = 240,
  step = 10,
  onChange,
}: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor="guest-count" className="text-eyebrow text-stone">
          Guest count
        </label>
        <span className="text-display-lg" aria-hidden="true">
          {value}
        </span>
      </div>
      <input
        id="guest-count"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuenow={value}
        aria-valuetext={`${value} guests`}
        className="mt-4 w-full cursor-pointer"
      />
    </div>
  );
}
