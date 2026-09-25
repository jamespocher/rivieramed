import { createFileRoute } from "@tanstack/react-router";
import { CONTACT } from "@/lib/contact";
import { impressumQuery } from "@/lib/cms-queries";
import { useCms } from "@/hooks/use-cms";

type CmsData = {
  companyName?: string; street?: string; city?: string
  phone?: string; phoneTel?: string; email?: string; hinEmail?: string; extraInfo?: string
}

export const Route = createFileRoute("/impressum")({
  head: () => ({ meta: [{ title: "Impressum — Riviera Med" }] }),
  component: ImpressumPage,
});

function ImpressumPage() {
  const cms = useCms<CmsData>(impressumQuery) ?? {};

  const companyName = cms.companyName ?? "Riviera Med GmbH";
  const street = cms.street ?? CONTACT.street;
  const city = cms.city ?? `${CONTACT.city}, Schweiz`;
  const phone = cms.phone ?? CONTACT.phone;
  const phoneTel = cms.phoneTel ?? CONTACT.phoneTel;
  const email = cms.email ?? CONTACT.email;
  const hinEmail = cms.hinEmail ?? CONTACT.hinEmail;

  return (
    <section className="py-16 md:py-24">
      <div className="rm-container max-w-2xl">
        <h1 className="text-[36px] md:text-[48px] mb-6">Impressum</h1>
        <div className="space-y-2 text-foreground/85">
          <p><strong>{companyName}</strong></p>
          <p>{street}<br />{city}</p>
          <p>Telefon: <a href={`tel:${phoneTel}`} className="text-primary hover:underline">{phone}</a></p>
          <p>E-Mail: <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a></p>
          <p>HIN (verschlüsselt): <a href={`mailto:${hinEmail}`} className="text-primary hover:underline">{hinEmail}</a></p>
          {cms.extraInfo && <p className="mt-4 text-foreground/75 whitespace-pre-line">{cms.extraInfo}</p>}
        </div>

        <div className="mt-12 pt-8 border-t border-border text-foreground/75">
          <p className="rm-eyebrow mb-2">Website</p>
          <p>
            Website gemacht von{" "}
            <a href="https://www.stube90.ch" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
              STUBE90, Studio Bern 90
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
