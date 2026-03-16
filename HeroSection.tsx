import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Deep atmospheric background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, hsl(228 100% 23% / 0.18) 0%, transparent 70%)",
        }}
      />

      {/* Liquid Glass blob */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="animate-blob-rotate"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "min(500px, 80vw)",
            height: "min(500px, 80vw)",
            borderRadius: "40% 60% 55% 45% / 55% 40% 60% 45%",
            background:
              "radial-gradient(circle at 30% 40%, hsl(228 100% 23% / 0.45), hsl(228 100% 50% / 0.08) 60%, transparent 80%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 text-center animate-content-reveal">
        <h1
          className="font-heading text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] uppercase tracking-tighter leading-[0.85] text-foreground mb-6"
          style={{
            textShadow: "0 0 40px hsl(228 100% 23% / 0.5), 0 0 80px hsl(228 100% 23% / 0.25)",
          }}
        >
          Nocturne
          <br />
          Industries
        </h1>

        <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto mb-12 tracking-wider uppercase">
          Precision-engineered systems for the infrastructure of tomorrow.
          <br />
          Built to endure. Designed to dominate.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            className="px-8 py-3 h-auto font-heading text-lg tracking-widest uppercase border text-foreground transition-all duration-300"
            style={{
              borderColor: "hsl(228 100% 23% / 0.4)",
              background: "hsl(228 100% 23% / 0.15)",
              backdropFilter: "blur(12px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "hsl(228 100% 23% / 0.3)";
              e.currentTarget.style.boxShadow = "0 0 30px hsl(228 100% 23% / 0.4)";
              e.currentTarget.style.borderColor = "hsl(228 100% 50% / 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "hsl(228 100% 23% / 0.15)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "hsl(228 100% 23% / 0.4)";
            }}
          >
            Enter System
          </Button>
          <Button
            variant="ghost"
            className="px-8 py-3 h-auto font-heading text-lg tracking-widest uppercase text-muted-foreground hover:text-foreground border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5 transition-all duration-300"
          >
            View Specs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
