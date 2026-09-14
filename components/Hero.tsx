import HeroCrossfade from "./HeroCrossfade";
import PillButton from "./PillButton";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-forest">
      <HeroCrossfade />
      <div className="absolute inset-0 bg-forest/45" aria-hidden="true" />

      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16">
        <h1 className="text-display-xl max-w-3xl text-bone">
          Four spaces,
          <br />
          forty acres,
          <br />
          one event at a time.
        </h1>
        <p className="text-body mt-6 max-w-xl text-bone/90">
          A restored 1892 dairy barn and three more rooms on an estate
          between Rhinebeck and Red Hook. We host one event per weekend.
          It&rsquo;s yours from Friday noon to Sunday noon.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <PillButton variant="fill" href="#planner">
            Plan your event
          </PillButton>
          <PillButton variant="outline" tone="bone" href="#contact">
            Check a date
          </PillButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 z-10 md:left-16">
        <span className="text-spec uppercase tracking-[0.04em] text-bone/80">
          Dutchess County &middot; 95 minutes from Manhattan
        </span>
      </div>
    </section>
  );
}
