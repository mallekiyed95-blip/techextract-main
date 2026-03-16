import FeatureCard from "./FeatureCard";

const FEATURES = [
  {
    title: "Adaptive Core",
    description:
      "Self-calibrating processing architecture that responds to load conditions in real-time. Zero manual tuning. Zero downtime.",
  },
  {
    title: "Fault Isolation",
    description:
      "Compartmentalized failure domains ensure that cascading breakdowns are structurally impossible. Each module is its own fortress.",
  },
  {
    title: "Signal Clarity",
    description:
      "Sub-microsecond telemetry with noise-floor elimination. Every data point arrives clean, timestamped, and actionable.",
  },
  {
    title: "Thermal Envelope",
    description:
      "Passive cooling architecture rated for sustained operation at 95°C ambient. No fans. No failure points. No compromises.",
  },
  {
    title: "Zero-Trust Mesh",
    description:
      "Every node authenticates every packet. End-to-end encryption at the hardware level with post-quantum key exchange.",
  },
  {
    title: "Deployment Engine",
    description:
      "From commit to production in under 4 seconds. Atomic rollbacks. Immutable infrastructure. Battle-tested at scale.",
  },
];

const FeatureGrid = () => {
  return (
    <section id="systems" className="relative max-w-[1100px] mx-auto px-4 sm:px-6 py-24 sm:py-32">
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 20%, hsl(228 100% 23% / 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative mb-16 text-center">
        <h2 className="font-heading text-4xl sm:text-6xl uppercase tracking-tighter text-foreground mb-4">
          Core Systems
        </h2>
        <p className="font-body text-xs text-muted-foreground tracking-[0.3em] uppercase">
          Engineered without compromise
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
        {FEATURES.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
