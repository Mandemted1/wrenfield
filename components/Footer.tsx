import Logo from "./Logo";
import Arrow from "./Arrow";
import Botanical from "./Botanical";

const EXPLORE_LINKS = [
  { label: "Spaces", href: "#spaces" },
  { label: "Plan your event", href: "#planner" },
  { label: "What it costs", href: "#costs" },
  { label: "Stay", href: "#stay" },
  { label: "Gallery", href: "#gallery" },
  { label: "Questions", href: "#questions" },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-forest px-6 py-20 text-bone md:px-16">
      <Botanical corner="bottom-right" variant="branch" tone="bone" />
      <Botanical corner="bottom-left" variant="sprig" tone="bone" />

      <div className="grid gap-12 md:grid-cols-4">
        <div>
          <Logo tone="bone" />
          <p className="text-body mt-6 max-w-xs text-bone/85">
            Wrenfield is a working estate in Dutchess County. One event per
            weekend, four spaces, forty beds, and every price on the website.
          </p>
        </div>

        <div>
          <div className="text-eyebrow mb-4 text-bone/70">Visit</div>
          <p className="text-body text-bone/90">
            1174 Wrenfield Road
            <br />
            Red Hook, NY 12571
            <br />
            95 minutes from Manhattan
            <br />
            25 minutes from Rhinecliff station
          </p>
        </div>

        <div>
          <div className="text-eyebrow mb-4 text-bone/70">Contact</div>
          <p className="text-body text-bone/90">
            (845) 555-0173
            <br />
            hello@wrenfield.com
            <br />
            Mon&ndash;Sat, 9am&ndash;6pm
          </p>
        </div>

        <div>
          <div className="text-eyebrow mb-4 text-bone/70">Explore</div>
          <ul className="text-body flex flex-col gap-2 text-bone/90">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-bone">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 border-t border-bone/20 pt-8">
        <div className="text-eyebrow text-bone/70">
          Two emails a year. Open dates and the occasional cancellation.
        </div>
        <div className="mt-4 flex max-w-sm items-center gap-3 border-b border-bone/40 pb-2">
          <input
            type="email"
            placeholder="Your email"
            className="text-spec w-full bg-transparent text-bone placeholder:text-bone/50 focus:outline-none"
          />
          <button type="button" aria-label="Register to our newsletter" className="text-bone">
            <Arrow />
          </button>
        </div>
      </div>

      <div className="text-spec mt-16 flex flex-wrap items-center justify-between gap-4 text-bone/60">
        <span>&copy; 2026 Wrenfield LLC</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-bone">
            Privacy
          </a>
          <a href="#" className="hover:text-bone">
            Terms
          </a>
          <a href="#" className="hover:text-bone">
            Accessibility
          </a>
        </div>
      </div>
    </footer>
  );
}
