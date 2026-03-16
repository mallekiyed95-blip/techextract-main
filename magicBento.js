/**
 * MagicBento Vanilla JS Implementation
 * Requires GSAP
 */

class MagicBento {
  constructor(options = {}) {
    this.container = typeof options.container === 'string' 
      ? document.querySelector(options.container) 
      : options.container;

    if (!this.container) return;

    this.options = {
      particleCount: 12,
      spotlightRadius: 400,
      glowColor: '0, 245, 255', // Nocturne Secondary (Cyan)
      enableTilt: true,
      enableMagnetism: true,
      enableSpotlight: true,
      enableStars: true,
      clickEffect: true,
      textAutoHide: true,
      cards: options.cards || [
        { title: 'Adaptive core', description: 'Dynamically scales resource allocation based on real-time sub-network demand forecasting.', label: 'Scale' },
        { title: 'Fault isolation', description: 'Micro-segmentation algorithms instantly quarantine anomalies to prevent cascading failure.', label: 'Security' },
        { title: 'Signal clarity', description: 'Quantum noise reduction filters out 99.9% of extraneous telemetry data streams.', label: 'Data' },
        { title: 'Zero trust mesh', description: 'Cryptographic identity verification required for every inter-node transmission.', label: 'Zero trust' },
        { title: 'Thermal envelope', description: 'AI-driven cooling distribution ensures hardware remains well within optimal thresholds.', label: 'Hardware' },
        { title: 'Rapid deploy', description: 'Containerized payloads can be securely mobilized to edge locations in under 4 seconds.', label: 'Speed' }
      ],
      ...options
    };

    this.cards = [];
    this.spotlight = null;
    this.isMobile = window.innerWidth <= 768;

    this.init();
  }

  init() {
    this.renderHtml();
    
    if (this.options.enableSpotlight && !this.isMobile) {
      this.initSpotlight();
    }

    this.initCards();

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }

  renderHtml() {
    this.container.classList.add('bento-section');
    this.container.innerHTML = '';
    
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    
    this.options.cards.forEach((cardData, i) => {
      const card = document.createElement('div');
      card.className = `magic-bento-card ${this.options.textAutoHide ? 'magic-bento-card--text-autohide' : ''} magic-bento-card--border-glow`;
      card.style.setProperty('--glow-color', this.options.glowColor);
      
      card.innerHTML = `
        <div class="magic-bento-card__header">
          <div class="magic-bento-card__label">${cardData.label}</div>
        </div>
        <div class="magic-bento-card__content">
          <h2 class="magic-bento-card__title">${cardData.title}</h2>
          <p class="magic-bento-card__description">${cardData.description}</p>
        </div>
      `;
      
      grid.appendChild(card);
      this.cards.push(card);
    });
    
    this.container.appendChild(grid);
  }

  initSpotlight() {
    this.spotlight = document.createElement('div');
    this.spotlight.className = 'global-spotlight';
    this.spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${this.options.glowColor}, 0.15) 0%,
        rgba(${this.options.glowColor}, 0.08) 15%,
        rgba(${this.options.glowColor}, 0.04) 25%,
        rgba(${this.options.glowColor}, 0.02) 40%,
        rgba(${this.options.glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(this.spotlight);

    const handleMouseMove = (e) => {
      const rect = this.container.getBoundingClientRect();
      const mouseInside = e.clientX >= rect.left && e.clientX <= rect.right && 
                          e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!mouseInside) {
        gsap.to(this.spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        this.cards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
        return;
      }

      const proximity = this.options.spotlightRadius * 0.5;
      const fadeDistance = this.options.spotlightRadius * 0.75;
      let minDistance = Infinity;

      this.cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - 
                         Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
        const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;

        card.style.setProperty('--glow-x', `${relativeX}%`);
        card.style.setProperty('--glow-y', `${relativeY}%`);
        card.style.setProperty('--glow-intensity', glowIntensity.toString());
        card.style.setProperty('--glow-radius', `${this.options.spotlightRadius}px`);
      });

      gsap.to(this.spotlight, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity = minDistance <= proximity ? 0.8 : 
                            minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;

      gsap.to(this.spotlight, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      this.cards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
      gsap.to(this.spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
  }

  initCards() {
    this.cards.forEach(card => {
      let particles = [];
      let timeouts = [];

      const createParticle = () => {
        const p = document.createElement('div');
        const color = this.options.glowColor;
        p.style.cssText = `
          position: absolute; width: 4px; height: 4px; border-radius: 50%;
          background: rgba(${color}, 1); box-shadow: 0 0 6px rgba(${color}, 0.6);
          pointer-events: none; z-index: 100;
          left: ${Math.random() * card.offsetWidth}px;
          top: ${Math.random() * card.offsetHeight}px;
        `;
        return p;
      };

      card.addEventListener('mouseenter', () => {
        if (this.isMobile) return;

        if (this.options.enableTilt) {
          gsap.to(card, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
        }

        if (this.options.enableStars) {
          for (let i = 0; i < this.options.particleCount; i++) {
            const timeoutId = setTimeout(() => {
              const p = createParticle();
              card.appendChild(p);
              particles.push(p);
              
              gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
              gsap.to(p, {
                x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100,
                rotation: Math.random() * 360, duration: 2 + Math.random() * 2,
                ease: 'none', repeat: -1, yoyo: true
              });
              gsap.to(p, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
            }, i * 100);
            timeouts.push(timeoutId);
          }
        }
      });

      card.addEventListener('mousemove', (e) => {
        if (this.isMobile || (!this.options.enableTilt && !this.options.enableMagnetism)) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        if (this.options.enableTilt) {
          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;
          gsap.to(card, { rotateX, rotateY, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
        }

        if (this.options.enableMagnetism) {
          gsap.to(card, { x: (x - centerX) * 0.05, y: (y - centerY) * 0.05, duration: 0.3, ease: 'power2.out' });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (this.isMobile) return;

        if (this.options.enableTilt) gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
        if (this.options.enableMagnetism) gsap.to(card, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });

        if (this.options.enableStars) {
          timeouts.forEach(clearTimeout);
          timeouts = [];
          particles.forEach(p => {
            gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)', onComplete: () => p.remove() });
          });
          particles = [];
        }
      });

      card.addEventListener('click', (e) => {
        if (this.isMobile || !this.options.clickEffect) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const maxDist = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), 
                                Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));

        const ripple = document.createElement('div');
        ripple.style.cssText = `
          position: absolute; width: ${maxDist * 2}px; height: ${maxDist * 2}px; border-radius: 50%;
          background: radial-gradient(circle, rgba(${this.options.glowColor}, 0.4) 0%, rgba(${this.options.glowColor}, 0.2) 30%, transparent 70%);
          left: ${x - maxDist}px; top: ${y - maxDist}px; pointer-events: none; z-index: 1000;
        `;
        card.appendChild(ripple);
        gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
      });
    });
  }
}
