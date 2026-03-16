const LightningEffect = () => {
  return (
    <div className="fixed inset-x-0 top-0 h-[40vh] pointer-events-none z-50 overflow-hidden">
      {/* Initial flash overlay */}
      <div className="absolute inset-0 bg-primary/20 animate-initial-flash" />

      {/* Atmospheric gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(228 100% 23% / 0.35) 0%, transparent 70%)",
        }}
      />

      {/* Lightning bolt 1 — left, pulsing with outer glow */}
      <svg
        className="absolute inset-0 w-full h-full animate-lightning-pulse"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M420 0 L405 80 L430 90 L400 180 L425 190 L410 300 L420 310 L408 400"
          stroke="hsl(228 100% 50%)"
          strokeWidth="2"
          opacity="0.7"
        />
        <path
          d="M420 0 L405 80 L430 90 L400 180 L425 190 L410 300"
          stroke="hsl(228 100% 40%)"
          strokeWidth="6"
          opacity="0.15"
          filter="blur(6px)"
        />
      </svg>

      {/* Lightning bolt 2 — right, offset timing */}
      <svg
        className="absolute inset-0 w-full h-full animate-lightning-pulse"
        style={{ animationDelay: "2s" }}
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M780 0 L795 90 L770 100 L800 200 L775 210 L790 320 L778 330 L785 400"
          stroke="hsl(228 100% 50%)"
          strokeWidth="2"
          opacity="0.7"
        />
        <path
          d="M780 0 L795 90 L770 100 L800 200 L775 210 L790 320"
          stroke="hsl(228 100% 40%)"
          strokeWidth="6"
          opacity="0.15"
          filter="blur(6px)"
        />
      </svg>

      {/* Ambient flashes */}
      <svg
        className="absolute inset-0 w-full h-full animate-lightning-1"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M600 0 L580 120 L620 130 L590 280"
          stroke="hsl(228 100% 45%)"
          strokeWidth="1.5"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

export default LightningEffect;
