const SITEMAP_LINKS = [
  { label: "Systems", href: "#systems" },
  { label: "Protocol", href: "#protocol" },
  { label: "Network", href: "#network" },
  { label: "Documentation", href: "#docs" },
];

const COMPANY_LINKS = [
  { label: "About", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Press", href: "#press" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_ICONS = [
  { label: "X", icon: "𝕏" },
  { label: "GitHub", icon: "⌘" },
  { label: "LinkedIn", icon: "in" },
  { label: "Discord", icon: "◆" },
];

const Footer = () => {
  return (
    <footer id="contact" className="relative py-20 sm:py-24">
      {/* Atmospheric gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 50% 100%, hsl(228 100% 23% / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Left — Brand */}
          <div>
            <h3 className="font-heading text-3xl uppercase tracking-wider text-foreground mb-4">
              Tech_Extract
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Precision-engineered infrastructure for organizations that demand
              absolute reliability. No compromises. No exceptions.
            </p>
          </div>

          {/* Center — Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-heading text-lg uppercase tracking-wider text-foreground mb-4">
                Sitemap
              </h4>
              <ul className="space-y-3">
                {SITEMAP_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg uppercase tracking-wider text-foreground mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Social */}
          <div className="flex md:justify-end">
            <div>
              <h4 className="font-heading text-lg uppercase tracking-wider text-foreground mb-4">
                Connect
              </h4>
              <div className="flex gap-3">
                {SOCIAL_ICONS.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center text-sm font-body text-muted-foreground hover:text-foreground transition-all duration-300"
                    style={{
                      border: "1px solid hsl(228 100% 23% / 0.3)",
                      background: "hsl(228 100% 23% / 0.1)",
                      backdropFilter: "blur(12px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "hsl(228 100% 23% / 0.25)";
                      e.currentTarget.style.boxShadow = "0 0 16px hsl(228 100% 23% / 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "hsl(228 100% 23% / 0.1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mb-6"
          style={{
            height: "0.5px",
            background: "hsl(228 100% 23% / 0.3)",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tech_Extract. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
            Built to endure. Designed to dominate.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
