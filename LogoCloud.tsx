const LOGOS = [
  "Apex Corp",
  "Vertex Systems",
  "Obsidian Labs",
  "Zenith Protocol",
  "Cipher Networks",
  "Monolith Inc",
  "Helix Defense",
  "Prism Analytics",
];

const LogoCloud = () => {
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="mb-8 text-center">
        <p className="font-body text-xs text-muted-foreground tracking-[0.3em] uppercase">
          Trusted by industry leaders
        </p>
      </div>

      {/* Fade masks */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <div className="flex animate-scroll-left" style={{ width: "max-content" }}>
          {doubled.map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-8 sm:px-12 flex items-center justify-center h-16 group cursor-default"
            >
              <span className="font-heading text-xl sm:text-2xl tracking-wider uppercase text-foreground/40 transition-colors duration-300 group-hover:text-accent-foreground select-none">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
