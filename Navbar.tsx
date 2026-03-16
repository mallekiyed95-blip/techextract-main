import { useState } from "react";

const NAV_LINKS = [
  { label: "Systems", href: "#systems" },
  { label: "Protocol", href: "#protocol" },
  { label: "Network", href: "#network" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-[60] backdrop-blur-xl"
      style={{
        borderBottom: "1px solid hsl(228 100% 23% / 0.3)",
        background: "hsl(0 2% 6% / 0.4)",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="font-heading text-2xl tracking-widest text-foreground uppercase">
          Tech_Extract
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-16">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link font-body text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-foreground transition-transform duration-200 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-transform duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-6 pt-2 backdrop-blur-xl"
          style={{
            borderBottom: "1px solid hsl(228 100% 23% / 0.3)",
            background: "hsl(0 2% 6% / 0.8)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 font-body text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
