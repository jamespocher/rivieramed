import { Link, useLocation } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useScrolled } from "@/hooks/use-reveal";

const nav = [
  { to: "/leistungen", label: "Leistungen" },
  { to: "/tarife", label: "Tarife" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(32);
  const { pathname } = useLocation();

  // Transparent-over-hero only on the homepage; other pages always use solid nav
  const canBeTransparent = pathname === "/";
  const transparent = canBeTransparent && !scrolled && !open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-surface/85 backdrop-blur-md border-b border-border shadow-soft"
      }`}
    >
      <div className="rm-container flex h-[88px] items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center shrink-0 group"
          aria-label="Spitex Riviera Med – Startseite"
        >
          <span
            className={`transition-all duration-300 group-hover:scale-105 ${
              transparent ? "rounded-md bg-white/95 px-3 py-1.5 shadow-soft" : ""
            }`}
          >
            <Logo height={89} />
          </span>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Hauptnavigation"
        >
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative px-4 py-2 rounded-md text-[16px] font-medium transition-colors rm-link ${
                transparent
                  ? "text-white/90 hover:text-white"
                  : "text-foreground/80 hover:text-primary"
              }`}
              activeProps={{
                className: transparent
                  ? "text-white"
                  : "text-primary",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+41792375521"
            className={`hidden md:inline-flex items-center gap-2 h-11 px-4 rounded-md text-[15px] font-medium transition-all ${
              transparent
                ? "text-white hover:bg-white/10"
                : "text-primary hover:bg-surface-alt"
            }`}
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span className="tabular-nums">079 237 55 21</span>
          </a>
          <Link
            to="/kontakt"
            className={`hidden md:inline-flex h-11 items-center px-5 rounded-md font-medium transition-all hover:-translate-y-0.5 hover:shadow-card ${
              transparent
                ? "bg-white text-primary hover:bg-white"
                : "bg-primary text-primary-foreground hover:bg-primary-hover"
            }`}
          >
            Erstgespräch
          </Link>
          <button
            className={`lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-md transition-colors ${
              transparent
                ? "text-white hover:bg-white/10"
                : "hover:bg-surface-alt"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schliessen" : "Menü öffnen"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-surface rm-fade-in">
          <div className="rm-container py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-md text-[17px] font-medium hover:bg-surface-alt transition-colors"
                activeProps={{ className: "text-primary bg-surface-alt" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+41792375521"
              className="mt-2 inline-flex items-center gap-2 px-4 py-3 rounded-md text-primary font-medium border border-border"
            >
              <Phone className="h-5 w-5" /> 079 237 55 21
            </a>
            <Link
              to="/kontakt"
              onClick={() => setOpen(false)}
              className="inline-flex justify-center px-4 py-3 rounded-md bg-primary text-primary-foreground font-medium"
            >
              Erstgespräch vereinbaren
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
