import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";
import { CONTACT } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-[oklch(0.22_0.04_265)] text-[oklch(0.88_0.01_260)]">
      <div className="rm-container py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-5">
            <Logo height={42} variant="weiss" />
          </div>
          <p className="text-[15px] leading-relaxed text-[oklch(0.78_0.005_100)]">
            Spitex in den Regionen Thun & Bern. Pflege und Betreuung zu Hause – kompetent, herzlich, rund um die Uhr.
          </p>
        </div>

        <div>
          <h3 className="text-white text-[15px] font-semibold mb-4">Leistungen</h3>
          <ul className="space-y-2.5 text-[15px]">
            <li><Link to="/leistungen" className="hover:text-accent transition-colors">Pflege & Betreuung</Link></li>
            <li><Link to="/leistungen" className="hover:text-accent transition-colors">Hauswirtschaft</Link></li>
            <li><Link to="/leistungen" className="hover:text-accent transition-colors">Nachtwachen</Link></li>
            <li><Link to="/leistungen" className="hover:text-accent transition-colors">Physiotherapie</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-[15px] font-semibold mb-4">Unternehmen</h3>
          <ul className="space-y-2.5 text-[15px]">
            <li><Link to="/ueber-uns" className="hover:text-accent transition-colors">Über uns</Link></li>
            <li><Link to="/tarife" className="hover:text-accent transition-colors">Tarife</Link></li>
            <li><Link to="/jobs" className="hover:text-accent transition-colors">Jobs</Link></li>
            <li><Link to="/kontakt" className="hover:text-accent transition-colors">Kontakt</Link></li>
            <li><Link to="/datenschutz" className="hover:text-accent transition-colors">Datenschutz</Link></li>
            <li><Link to="/impressum" className="hover:text-accent transition-colors">Impressum</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-[15px] font-semibold mb-4">Erreichbarkeit</h3>
          <ul className="space-y-3 text-[15px]">
            <li className="flex items-start gap-2.5">
              <Phone className="h-4 w-4 mt-1 shrink-0 text-accent" aria-hidden />
              <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-accent transition-colors tabular-nums">{CONTACT.phone}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="h-4 w-4 mt-1 shrink-0 text-accent" aria-hidden />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-accent transition-colors">{CONTACT.email}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 mt-1 shrink-0 text-accent" aria-hidden />
              <span>
                <a href={`mailto:${CONTACT.hinEmail}`} className="hover:text-accent transition-colors">{CONTACT.hinEmail}</a>
                <span className="block text-[13px] text-[oklch(0.70_0.005_100)]">HIN – für medizinische Unterlagen</span>
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-1 shrink-0 text-accent" aria-hidden />
              <span>{CONTACT.street}<br />{CONTACT.city}</span>
            </li>
          </ul>
          <p className="mt-4 text-[13px] text-[oklch(0.70_0.005_100)]">24/7 · 365 Tage im Jahr</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="rm-container py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-[13px] text-[oklch(0.70_0.005_100)]">
          <p>© {new Date().getFullYear()} Riviera Med GmbH. Alle Rechte vorbehalten.</p>
          <p>Alle Krankenkassen anerkannt · KLV-konform</p>
        </div>
      </div>
    </footer>
  );
}
