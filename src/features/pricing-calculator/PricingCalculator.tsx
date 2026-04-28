import { useMemo, useState } from "react";
import { Heart, Home, Moon, Activity } from "lucide-react";

// Reference rates (CHF)
const RATES = {
  pflegePerHour: 65.4, // blended KLV Art. 7b reference
  hauswirtschaftPerHour: 55,
  physioPerHour: 95,
  nachtPraesenz: 400,
  nachtSitz: 420,
  nachtDiplomiert: 460,
  wegpauschale: 7,
  patientShareMaxPerDay: 15.35,
};
const WEEKS_PER_MONTH = 4.33;

type Inputs = {
  pflege: { on: boolean; hours: number };
  haus: { on: boolean; hours: number };
  physio: { on: boolean; hours: number };
  nacht: { on: boolean; nights: number; tier: "praesenz" | "sitz" | "diplomiert" };
  daysPerWeek: number;
};

const CHF = (n: number) =>
  new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(n);

function compute(i: Inputs) {
  const pflegeHoursMonth = i.pflege.on ? i.pflege.hours * WEEKS_PER_MONTH : 0;
  const hausHoursMonth = i.haus.on ? i.haus.hours * WEEKS_PER_MONTH : 0;
  const physioHoursMonth = i.physio.on ? i.physio.hours * WEEKS_PER_MONTH : 0;
  const nightsMonth = i.nacht.on ? i.nacht.nights * WEEKS_PER_MONTH : 0;

  const nachtRate =
    i.nacht.tier === "praesenz"
      ? RATES.nachtPraesenz
      : i.nacht.tier === "sitz"
        ? RATES.nachtSitz
        : RATES.nachtDiplomiert;

  // Krankenkasse covers pflege + physio (with Rx)
  const krankenkasseCovered =
    pflegeHoursMonth * RATES.pflegePerHour + physioHoursMonth * RATES.physioPerHour;

  // Days per month with pflege visits → patient share applies
  const careDaysPerMonth = i.pflege.on ? i.daysPerWeek * WEEKS_PER_MONTH : 0;
  const patientShare = Math.min(
    careDaysPerMonth * RATES.patientShareMaxPerDay,
    krankenkasseCovered,
  );

  // Wegpauschale per visit (count days when someone comes)
  const visitDays =
    (i.pflege.on || i.haus.on ? i.daysPerWeek * WEEKS_PER_MONTH : 0) + nightsMonth;
  const wegpauschale = visitDays * RATES.wegpauschale;

  const selfPay =
    hausHoursMonth * RATES.hauswirtschaftPerHour +
    nightsMonth * nachtRate +
    wegpauschale;

  const expected = selfPay + patientShare;
  const low = Math.round(expected * 0.9);
  const high = Math.round(expected * 1.15);

  return {
    krankenkasseCovered: Math.round(krankenkasseCovered),
    patientShare: Math.round(patientShare),
    selfPay: Math.round(selfPay),
    wegpauschale: Math.round(wegpauschale),
    expected: Math.round(expected),
    low,
    high,
  };
}

const services = [
  { key: "pflege", icon: Heart, label: "Pflege & Betreuung", unit: "Std./Woche", max: 40, step: 1, default: 4 },
  { key: "haus", icon: Home, label: "Hauswirtschaft", unit: "Std./Woche", max: 20, step: 1, default: 2 },
  { key: "physio", icon: Activity, label: "Physiotherapie", unit: "Std./Woche", max: 5, step: 0.5, default: 1 },
] as const;

export function PricingCalculator() {
  const [state, setState] = useState<Inputs>({
    pflege: { on: true, hours: 4 },
    haus: { on: true, hours: 2 },
    physio: { on: false, hours: 1 },
    nacht: { on: false, nights: 2, tier: "praesenz" },
    daysPerWeek: 5,
  });

  const r = useMemo(() => compute(state), [state]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      {/* Inputs */}
      <div className="bg-surface border border-border rounded-xl p-6 md:p-8 space-y-6">
        {services.map((s) => {
          const svc = state[s.key] as { on: boolean; hours: number };
          return (
            <div key={s.key} className="border-b border-border last:border-0 pb-6 last:pb-0">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={svc.on}
                  onChange={(e) =>
                    setState((st) => ({ ...st, [s.key]: { ...svc, on: e.target.checked } }))
                  }
                  className="h-6 w-6 rounded border-2 border-border accent-[oklch(0.36_0.04_175)] cursor-pointer"
                />
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-[17px] font-semibold">{s.label}</span>
              </label>
              {svc.on && (
                <div className="mt-5 pl-9">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{s.unit}</span>
                    <span className="text-[22px] font-semibold tabular-nums">{svc.hours}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={s.max}
                    step={s.step}
                    value={svc.hours}
                    onChange={(e) =>
                      setState((st) => ({
                        ...st,
                        [s.key]: { ...svc, hours: parseFloat(e.target.value) },
                      }))
                    }
                    className="w-full h-2 rounded-full appearance-none bg-border accent-[oklch(0.36_0.04_175)] cursor-pointer"
                    aria-label={`${s.label} – Stunden pro Woche`}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Nacht */}
        <div className="border-b border-border pb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={state.nacht.on}
              onChange={(e) =>
                setState((st) => ({ ...st, nacht: { ...st.nacht, on: e.target.checked } }))
              }
              className="h-6 w-6 rounded border-2 border-border accent-[oklch(0.36_0.04_175)] cursor-pointer"
            />
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Moon className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-[17px] font-semibold">Nachtwachen</span>
          </label>
          {state.nacht.on && (
            <div className="mt-5 pl-9 space-y-5">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Nächte pro Woche</span>
                  <span className="text-[22px] font-semibold tabular-nums">{state.nacht.nights}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={7}
                  value={state.nacht.nights}
                  onChange={(e) =>
                    setState((st) => ({ ...st, nacht: { ...st.nacht, nights: parseInt(e.target.value) } }))
                  }
                  className="w-full h-2 rounded-full appearance-none bg-border accent-[oklch(0.36_0.04_175)]"
                  aria-label="Nächte pro Woche"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["praesenz", "sitz", "diplomiert"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setState((st) => ({ ...st, nacht: { ...st.nacht, tier: t } }))}
                    className={`h-12 rounded-md border text-[14px] font-medium transition-colors ${
                      state.nacht.tier === t
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-surface-alt"
                    }`}
                  >
                    {t === "praesenz" ? "Präsenz" : t === "sitz" ? "Sitzwache" : "Diplomiert"}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Days per week */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-[15px] font-semibold">Einsatztage pro Woche</span>
            <span className="text-[22px] font-semibold tabular-nums">{state.daysPerWeek}</span>
          </div>
          <input
            type="range"
            min={1}
            max={7}
            value={state.daysPerWeek}
            onChange={(e) =>
              setState((st) => ({ ...st, daysPerWeek: parseInt(e.target.value) }))
            }
            className="w-full h-2 rounded-full appearance-none bg-border accent-[oklch(0.36_0.04_175)]"
            aria-label="Einsatztage pro Woche"
          />
        </div>
      </div>

      {/* Results */}
      <aside className="bg-primary text-primary-foreground rounded-xl p-6 md:p-8 lg:sticky lg:top-[140px] h-fit">
        <p className="text-[13px] uppercase tracking-[0.12em] font-semibold text-primary-foreground/70 mb-2">
          Geschätzte monatliche Kosten
        </p>

        <div className="py-5 border-b border-primary-foreground/20">
          <div className="flex items-baseline gap-2">
            <span className="text-[48px] md:text-[56px] font-semibold tracking-tight tabular-nums leading-none">
              {CHF(r.expected)}
            </span>
            <span className="text-primary-foreground/70 text-[15px]">/ Monat</span>
          </div>
          <p className="mt-2 text-[14px] text-primary-foreground/70 tabular-nums">
            Spanne: {CHF(r.low)} – {CHF(r.high)}
          </p>
        </div>

        <dl className="py-5 space-y-3 text-[15px] border-b border-primary-foreground/20">
          <div className="flex justify-between gap-4">
            <dt className="text-primary-foreground/80">Krankenkasse übernimmt</dt>
            <dd className="font-semibold tabular-nums">{CHF(r.krankenkasseCovered)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-primary-foreground/80">Patientenbeteiligung</dt>
            <dd className="font-semibold tabular-nums">{CHF(r.patientShare)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-primary-foreground/80">Selbstzahlung</dt>
            <dd className="font-semibold tabular-nums">{CHF(r.selfPay)}</dd>
          </div>
          <div className="flex justify-between gap-4 text-[13px] text-primary-foreground/60">
            <dt>davon Wegpauschale</dt>
            <dd className="tabular-nums">{CHF(r.wegpauschale)}</dd>
          </div>
        </dl>

        <p className="mt-5 text-[13px] text-primary-foreground/70 leading-relaxed">
          Unverbindliche Schätzung auf Basis durchschnittlicher KLV-Tarife. Eine individuelle Offerte erstellen wir gerne im Erstgespräch.
        </p>

        <a
          href="tel:+41792375521"
          className="mt-5 inline-flex w-full h-[52px] items-center justify-center px-6 rounded-md bg-primary-foreground text-primary font-semibold hover:bg-white transition-colors"
        >
          Jetzt beraten lassen
        </a>
      </aside>
    </div>
  );
}
