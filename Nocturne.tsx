import React, { useState, useEffect, useRef } from 'react';
import FloatingLines from './FloatingLines.tsx';
import Ribbons from './Ribbons.tsx';
import LogoLoop from './LogoLoop.tsx';
import SpotlightCard from './SpotlightCard.tsx';

// Using a custom hook for intersection observer to trigger animations
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting] as const;
};

// Counter component for stats
const AnimatedCounter = ({ endValue, duration = 2000, isPercentage = false, prefix = "", suffix = "" }: any) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver();

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * endValue);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, endValue, duration]);

  // Format based on needs
  let displayValue = count.toFixed(isPercentage ? 3 : 0);
  if (endValue === 1 && !isPercentage) {
    displayValue = count.toFixed(1); // for <4s if we just pass 4
  }

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

// Fade up wrapper
const FadeUp = ({ children, delay = 0, style = {} }: any) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`fade-slide-up ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

export default function NocturneIndustries() {
  const [navShimmer, setNavShimmer] = useState({ x: 0, y: 0, active: true });
  const [mounted, setMounted] = useState(false);
  const [timelineRef, timelineVisible] = useIntersectionObserver({ threshold: 0.2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setNavShimmer({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    });
  };

  const partnerLogos = [
    { node: <span style={{fontFamily:'Orbitron',letterSpacing:'0.15em',fontSize:'13px',color:'rgba(255,255,255,0.5)'}}>APEX CORP</span>, title:"Apex Corp" },
    { node: <span style={{fontFamily:'Orbitron',letterSpacing:'0.15em',fontSize:'13px',color:'rgba(255,255,255,0.5)'}}>VERTEX SYSTEMS</span>, title:"Vertex Systems" },
    { node: <span style={{fontFamily:'Orbitron',letterSpacing:'0.15em',fontSize:'13px',color:'rgba(255,255,255,0.5)'}}>OBSIDIAN LABS</span>, title:"Obsidian Labs" },
    { node: <span style={{fontFamily:'Orbitron',letterSpacing:'0.15em',fontSize:'13px',color:'rgba(255,255,255,0.5)'}}>ZENITH PROTOCOL</span>, title:"Zenith Protocol" },
    { node: <span style={{fontFamily:'Orbitron',letterSpacing:'0.15em',fontSize:'13px',color:'rgba(255,255,255,0.5)'}}>CIPHER NETWORKS</span>, title:"Cipher Networks" },
    { node: <span style={{fontFamily:'Orbitron',letterSpacing:'0.15em',fontSize:'13px',color:'rgba(255,255,255,0.5)'}}>AURORA TECH</span>, title:"Aurora Tech" },
    { node: <span style={{fontFamily:'Orbitron',letterSpacing:'0.15em',fontSize:'13px',color:'rgba(255,255,255,0.5)'}}>NEXUS CORE</span>, title:"Nexus Core" },
  ];

  const renderHeroText = (text: string, delayOffset: number) => {
    return text.split(' ').map((word, i) => (
      <span
        key={i}
        className="hero-text-word"
        style={{ animationDelay: `${delayOffset + i * 150}ms`, marginRight: '0.25em' }}
      >
        {word}
      </span>
    ));
  };

  return (
    <div style={{ background: '#050810', minHeight: '100vh', position: 'relative', fontFamily: 'DM Mono, monospace', color: 'white' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

        .hero-text-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-slide-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .fade-slide-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .timeline-line {
          width: 2px;
          background: rgba(255,255,255,0.1);
          position: absolute;
          left: 11px;
          top: 0;
          height: 100%;
          transform-origin: top;
          transform: scaleY(0);
          transition: transform 1.5s ease;
        }

        .timeline-line.visible {
          transform: scaleY(1);
        }

        @keyframes pulseGradient {
          0% { background-color: rgba(74,144,226,0.05); }
          50% { background-color: rgba(0,245,255,0.08); }
          100% { background-color: rgba(74,144,226,0.05); }
        }
        
        .cta-pulse {
          animation: pulseGradient 6s infinite ease-in-out;
        }
      `}</style>

      {/* NAVBAR */}
      <nav
        onMouseMove={handleNavMouseMove}
        onMouseLeave={() => setNavShimmer(p => ({ ...p, active: false }))}
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          backdropFilter: 'blur(20px)',
          background: navShimmer.active 
            ? `radial-gradient(circle at ${navShimmer.x}px ${navShimmer.y}px, rgba(255,255,255,0.08), rgba(255,255,255,0.04) 60%)`
            : 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50px',
          padding: '14px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          transition: 'background 0.6s ease',
          width: 'max-content'
        }}
      >
        <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '16px' }}>
          TECH_EXTRACT
        </div>
        <div style={{ display: 'flex', gap: '24px', fontFamily: 'DM Mono', fontSize: '13px', letterSpacing: '0.1em' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>SYSTEMS</a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>PROTOCOL</a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>NETWORK</a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>CONTACT</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Absolute Backgrounds */}
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={5}
            lineDistance={5}
            bendRadius={5}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
            linesGradient={["#0a0a1a", "#1a2a6c", "#4A90E2", "#00F5FF"]}
            mixBlendMode="screen"
          />
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '500px', zIndex: 1, opacity: 0.3, pointerEvents: 'none' }}>
          <Ribbons
            baseThickness={9}
            colors={["#4A90E2", "#00F5FF"]}
            speedMultiplier={0.42}
            maxAge={500}
            enableFade={true}
            enableShaderEffect={false}
          />
        </div>

        {/* Content */}
        <div style={{ zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{
            fontFamily: 'Orbitron',
            fontSize: 'clamp(60px, 10vw, 140px)',
            fontWeight: 900,
            whiteSpace: 'nowrap',
            lineHeight: 1,
            margin: 0,
            textShadow: '0 0 60px rgba(74,144,226,0.3)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {mounted && (
              <>
                <div>{renderHeroText("NOCTURNE", 0)}</div>
                <div>{renderHeroText("INDUSTRIES", 600)}</div>
              </>
            )}
          </h1>
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: 0, letterSpacing: '0.2em', fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
              PRECISION ENGINEERED SYSTEMS FOR THE INFRASTRUCTURE OF TOMORROW.
            </p>
            <p style={{ margin: 0, letterSpacing: '0.2em', fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
              BUILT TO ENDURE. DESIGNED TO DOMINATE.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '20px', marginTop: '48px' }}>
            <button style={{
              background: 'rgba(74,144,226,0.15)', border: '1px solid #4A90E2', color: 'white',
              padding: '14px 36px', fontFamily: 'Orbitron', fontSize: '12px', letterSpacing: '0.2em',
              borderRadius: '2px', cursor: 'pointer', transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(74,144,226,0.3)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(74,144,226,0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(74,144,226,0.15)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              ENTER SYSTEM
            </button>
            <button style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white',
              padding: '14px 36px', fontFamily: 'Orbitron', fontSize: '12px', letterSpacing: '0.2em',
              borderRadius: '2px', cursor: 'pointer', transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'white'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
            >
              VIEW SPECS
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.5, animation: 'fadeInUp 1s infinite alternate' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.2em', marginBottom: '8px' }}>SCROLL</span>
          <div style={{ width: '1px', height: '24px', background: 'linear-gradient(to bottom, white, transparent)' }} />
        </div>
      </section>

      {/* TRUSTED BY SECTION */}
      <section style={{ paddingTop: '60px', paddingBottom: '60px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', marginBottom: '32px' }}>
          TRUSTED BY INDUSTRY LEADERS
        </div>
        <LogoLoop
          logos={partnerLogos}
          speed={80}
          direction="left"
          logoHeight={40}
          gap={80}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="#050810"
          useCustomRender={false}
        />
      </section>

      {/* CORE SYSTEMS SECTION */}
      <section style={{ paddingTop: '120px', paddingBottom: '120px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
        <FadeUp>
          <h2 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, textAlign: 'center', margin: 0 }}>
            CORE SYSTEMS
          </h2>
          <p style={{ textAlign: 'center', letterSpacing: '0.3em', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginBottom: '80px', marginTop: '16px' }}>
            ENGINEERED WITHOUT COMPROMISE
          </p>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {[
            { title: "ADAPTIVE CORE", icon: "⚙", desc: "Self-calibrating processing architecture that responds to load conditions in real time. Zero manual tuning. Zero downtime." },
            { title: "FAULT ISOLATION", icon: "⬡", desc: "Compartmentalized failure domains ensure that cascading breakdowns are structurally impossible. Each module is its own fortress." },
            { title: "SIGNAL CLARITY", icon: "◈", desc: "Sub-microsecond telemetry with noise floor elimination. Every data point arrives clean, timestamped, and actionable." },
            { title: "THERMAL ENVELOPE", icon: "◉", desc: "Passive cooling architecture rated for sustained operation at 95°C ambient. No fans. No failure points. No compromises." },
            { title: "ZERO-TRUST MESH", icon: "⬟", desc: "Every node authenticates every packet. End-to-end encryption at the hardware level with post-quantum key exchange." },
            { title: "DEPLOYMENT ENGINE", icon: "▲", desc: "From commit to production in under 4 seconds. Atomic rollbacks. Immutable infrastructure. Battle-tested at scale." },
          ].map((feature, i) => (
            <FadeUp key={feature.title} delay={i * 100}>
              <SpotlightCard spotlightColor="rgba(0, 245, 255, 0.08)">
                <div style={{
                  padding: '32px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '4px',
                  height: '100%'
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '16px', color: 'white' }}>{feature.icon}</div>
                  <h3 style={{ fontFamily: 'Orbitron', fontSize: '14px', letterSpacing: '0.15em', marginBottom: '12px', color: '#fff' }}>
                    {feature.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                    {feature.desc}
                  </p>
                </div>
              </SpotlightCard>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* PERFORMANCE METRICS SECTION */}
      <section style={{ backgroundColor: 'rgba(74,144,226,0.03)', padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { val: 99.999, suffix: "%", label: "UPTIME SLA", isPct: true },
            { val: 4, prefix: "<", suffix: "s", label: "DEPLOY TIME", isPct: false },
            { val: 0, suffix: "", label: "SECURITY BREACHES", isPct: false },
            { val: 50, suffix: "M+", label: "PACKETS/SEC", isPct: false }
          ].map((stat, i) => (
            <div key={i} style={{
              flex: '1 1 200px',
              textAlign: 'center',
              padding: '24px',
              borderRight: i !== 3 ? '1px solid rgba(255,255,255,0.06)' : 'none'
            }}>
              <div style={{ fontFamily: 'Orbitron', fontSize: 'clamp(40px,5vw,72px)', fontWeight: 900, color: '#00F5FF', lineHeight: 1 }}>
                <AnimatedCounter endValue={stat.val} duration={2000} isPercentage={stat.isPct} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)', marginTop: '16px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROTOCOL TIMELINE SECTION */}
      <section style={{ paddingTop: '120px', paddingBottom: '120px', maxWidth: '800px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
        <FadeUp>
          <h2 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, margin: '0 0 16px 0' }}>SYSTEM PROTOCOL</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0 0 60px 0', fontSize: '14px' }}>The rigorous deployment standard enforcing uncompromised stability.</p>
        </FadeUp>

        <div ref={timelineRef} style={{ position: 'relative', paddingLeft: '48px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div className={`timeline-line ${timelineVisible ? 'visible' : ''}`} />
          
          {[
            { step: "01", title: "INIT", desc: "Bootstrap minimal isolated environment." },
            { step: "02", title: "SCAN", desc: "Deep heuristic scan of the complete dependency tree." },
            { step: "03", title: "AUTHENTICATE", desc: "Cryptographic verification of all modules." },
            { step: "04", title: "ENCRYPT", desc: "AES-256-GCM memory encryption activated prior to boot." },
            { step: "05", title: "DEPLOY", desc: "Atomic blue-green cutover with zero dropped connections." },
            { step: "06", title: "MONITOR", desc: "Continuous sub-millisecond telemetry ingested to AI core." },
          ].map((item, i) => {
            // just hardcode that active steps are first 3 to show the glow diff
            const isActive = i < 3; 
            return (
              <FadeUp key={item.step} delay={i * 150} style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '-48px', top: '4px', width: '24px', height: '24px',
                  borderRadius: '50%', background: '#050810',
                  border: `2px solid ${isActive ? '#00F5FF' : '#4A90E2'}`,
                  zIndex: 2,
                  boxShadow: isActive ? '0 0 15px rgba(0,245,255,0.4)' : 'none'
                }} />
                <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: isActive ? '#00F5FF' : 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>
                  STEP // {item.step}
                </div>
                <h3 style={{ fontFamily: 'Orbitron', fontSize: '18px', margin: '0 0 8px 0', color: isActive ? 'white' : 'rgba(255,255,255,0.8)' }}>
                  {item.title}
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                  {item.desc}
                </p>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section style={{ paddingTop: '80px', paddingBottom: '120px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
        <FadeUp>
          <h2 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 900, marginBottom: '60px', textAlign: 'center' }}>FIELD REPORTS</h2>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[
            { quote: "The deployment pipeline alone saved us 40 hours a week.", name: "Marcus Chen", role: "CTO @ Apex Corp" },
            { quote: "Fault isolation caught 3 cascade failures before they reached production.", name: "Irina Volkov", role: "Head of Infrastructure @ Obsidian Labs" },
            { quote: "Zero-trust mesh made our compliance audit effortless.", name: "David Osei", role: "CISO @ Zenith Protocol" }
          ].map((testimonial, i) => (
            <FadeUp key={i} delay={i * 200}>
              <div style={{
                backdropFilter: 'blur(10px)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px',
                padding: '32px',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,245,255,0.3)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0,245,255,0.05)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{ marginBottom: '24px', color: 'rgba(74,144,226,0.5)', fontSize: '24px', fontFamily: 'Orbitron' }}>"</div>
                <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.6, marginBottom: '32px', minHeight: '66px' }}>
                  {testimonial.quote}
                </p>
                <div>
                  <div style={{ fontFamily: 'Orbitron', color: 'white', fontSize: '14px', marginBottom: '4px' }}>{testimonial.name}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>{testimonial.role}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA BANNER SECTION */}
      <section className="cta-pulse" style={{
        paddingTop: '140px', paddingBottom: '140px',
        borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)',
        textAlign: 'center', paddingLeft: '24px', paddingRight: '24px'
      }}>
        <FadeUp>
          <h2 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(32px,4vw,56px)', fontWeight: 900, marginBottom: '24px' }}>
            READY TO ENTER THE SYSTEM?
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '48px', letterSpacing: '0.05em' }}>
            Join the organizations that refuse to compromise.
          </p>
          <button style={{
            background: 'rgba(0,245,255,0.1)', border: '1px solid #00F5FF', color: 'white',
            padding: '18px 48px', fontFamily: 'Orbitron', fontSize: '14px', letterSpacing: '0.2em',
            borderRadius: '2px', cursor: 'pointer', transition: 'all 0.3s ease',
            boxShadow: '0 0 20px rgba(0,245,255,0.15)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(0,245,255,0.2)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(0,245,255,0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(0,245,255,0.1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,255,0.15)';
          }}
          >
            REQUEST ACCESS
          </button>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer style={{ paddingTop: '80px', paddingBottom: '40px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '80px' }}>
          <div>
            <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '18px', marginBottom: '16px' }}>TECH_EXTRACT</div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              Engineering the foundation for the next generation of digital infrastructure.
            </p>
          </div>
          <div>
            <div style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'white', marginBottom: '24px', fontWeight: 700 }}>SITEMAP</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='white'} onMouseOut={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>Systems</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='white'} onMouseOut={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>Protocol</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='white'} onMouseOut={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>Network</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='white'} onMouseOut={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>Documentation</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'white', marginBottom: '24px', fontWeight: 700 }}>COMPANY</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='white'} onMouseOut={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>About</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='white'} onMouseOut={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>Careers</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='white'} onMouseOut={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>Press</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='white'} onMouseOut={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>Contact</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'white', marginBottom: '24px', fontWeight: 700 }}>CONNECT</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {["X", "⌘", "in", "◆"].map((icon, i) => (
                <div key={i} style={{
                  width: '36px', height: '36px', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#00F5FF';
                  e.currentTarget.style.borderColor = '#00F5FF';
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(0,245,255,0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
          <div>© 2026 Tech_Extract. All rights reserved.</div>
          <div style={{ letterSpacing: '0.2em' }}>BUILT TO ENDURE. DESIGNED TO DOMINATE.</div>
        </div>
      </footer>
    </div>
  );
}
