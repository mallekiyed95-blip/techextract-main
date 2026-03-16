import { useCallback, useRef, useState } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden p-8 sm:p-10 transition-all duration-300"
      style={{
        border: "1px solid hsl(228 100% 23% / 0.2)",
        background: "hsl(228 100% 23% / 0.05)",
        backdropFilter: "blur(12px)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "hsl(228 100% 23% / 0.4)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "hsl(228 100% 23% / 0.2)";
      }}
    >
      {/* Spotlight glow */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: spotlightPos.x - 100,
            top: spotlightPos.y - 100,
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle, hsl(228 100% 23% / 0.2) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10">
        <h3 className="font-heading text-2xl sm:text-3xl uppercase tracking-wider text-foreground mb-4">
          {title}
        </h3>
        <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
