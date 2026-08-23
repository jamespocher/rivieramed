import { createFileRoute } from "@tanstack/react-router";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { sanityClient, datenschutzQuery } from "@/lib/sanity";

type CmsData = { title?: string; stand?: string; body?: unknown[] }

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung — Riviera Med" },
      { name: "description", content: "Datenschutzerklärung der Riviera Med GmbH gemäss Schweizer DSG und DSGVO." },
    ],
  }),
  loader: async (): Promise<CmsData | null> => {
    try { return await sanityClient.fetch<CmsData>(datenschutzQuery) } catch { return null }
  },
  component: DatenschutzPage,
});

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-foreground/80 leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="text-[20px] font-semibold text-foreground mt-10 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-[17px] font-semibold text-foreground mt-6 mb-2">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-1 mb-4 text-foreground/80">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-1 mb-4 text-foreground/80">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-primary underline underline-offset-4 hover:text-primary/80"
      >
        {children}
      </a>
    ),
  },
};

function DatenschutzPage() {
  const cms = Route.useLoaderData();

  if (cms?.body?.length) {
    return (
      <section className="py-16 md:py-24">
        <div className="rm-container max-w-3xl">
          <h1 className="text-[36px] md:text-[48px] font-semibold mb-2 leading-tight">
            {cms.title ?? "Datenschutzerklärung"}
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Riviera Med GmbH · Stand {cms.stand ?? "April 2026"}
          </p>
          <div className="text-[16px] leading-relaxed">
            <PortableText value={cms.body} components={ptComponents} />
          </div>
        </div>
      </section>
    );
  }

  // Fallback: hardcoded content
  return (
    <section className="py-16 md:py-24">
      <div className="rm-container max-w-3xl">
        <h1 className="text-[36px] md:text-[48px] font-semibold mb-2 leading-tight">Datenschutzerklärung</h1>
        <p className="text-sm text-muted-foreground mb-12">Riviera Med GmbH · Stand April 2026</p>
        <div className="space-y-10 text-[16px] leading-relaxed text-foreground/80">
          <p>Datenschutz und Datensicherheit sind wichtig für die Riviera Med GmbH («Riviera Med»; «wir»). Wir bearbeiten Ihre Personendaten verantwortungsbewusst, in Übereinstimmung mit anwendbaren gesetzlichen Bestimmungen und gemäss dieser Datenschutzerklärung.</p>
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">Inhalt dieser Datenschutzerklärung</h2>
            <p>In dieser Datenschutzerklärung informieren wir Sie darüber, wie wir Personendaten erheben und bearbeiten, wenn Sie unsere Website unter <a href="https://www.riviera-med.com" className="text-primary underline underline-offset-4 hover:text-primary/80">https://www.riviera-med.com</a> («Website») oder Social-Media-Seiten besuchen, uns kontaktieren oder unsere Leistungen in Anspruch nehmen.</p>
          </div>
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">Verantwortlicher für die Datenbearbeitung</h2>
            <p>Für die in dieser Datenschutzerklärung beschriebenen Datenbearbeitungen ist Riviera Med verantwortlich. Bei Fragen oder wenn Sie Ihre datenschutzrechtlichen Betroffenenrechte wahrnehmen möchten, kontaktieren Sie uns bitte über <a href="mailto:info@riviera-med.com" className="text-primary underline underline-offset-4 hover:text-primary/80">info@riviera-med.com</a> oder schreiben Sie an: Adriano Marra, Riviera Med GmbH, Scheibenstrasse 3, 3600 Thun.</p>
          </div>
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">Bei der Kommunikation und Leistungserbringung bearbeitete Personendaten</h2>
            <p className="mb-3">Wir erheben die von Ihnen an uns übermittelten Informationen wie folgt:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4"><li>wenn Sie uns kontaktieren;</li><li>wenn Sie sich auf der Website als Nutzer registrieren;</li><li>wenn Sie Dienstleistungen bestellen.</li></ul>
            <p className="mb-3">Dazu gehören allgemeine Personendaten, z.B. Name und Kontaktdaten, Geburtsdatum, sowie allenfalls Angaben zu Ihrer Position oder Rolle bei der Organisation, in deren Namen Sie uns kontaktieren.</p>
            <p className="mb-3">Wir bearbeiten auch Ihre Gesundheitsdaten. Dazu gehören Angaben zu Ihrem vergangenen oder aktuellen Gesundheitszustand, zum Behandlungsverlauf sowie zur Inanspruchnahme von Gesundheitsleistungen.</p>
            <p className="mb-3">Wenn Sie kostenpflichtige Dienstleistungen bestellen, erfragen wir zudem Ihre Finanzdaten, z.B. Ihre bevorzugte Zahlungsmethode und die Rechnungsadresse.</p>
            <p>Wir bearbeiten auch Personendaten, die wir von Dritten erhalten. Dazu gehören regelmässig Personendaten, die wir in der Korrespondenz oder in Besprechungen mit Kundinnen oder Geschäftspartnerinnen erhalten, z.B. Ihr Name und Angaben zu Ihrer Tätigkeit als Teammitglied der Kundin oder der Geschäftspartnerin.</p>
          </div>
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-4">Bereitstellung und Nutzung unserer Website</h2>
            <h3 className="text-[17px] font-semibold text-foreground mb-2">Nutzung zur Information</h3>
            <p className="mb-5">Sie können sich auf der Website über Riviera Med und unser Leistungsangebot informieren, ohne uns mitzuteilen, wer Sie sind. Wie bei jeder Verbindung mit einem Webserver protokolliert und speichert der Server automatisch gewisse technische Daten für kurze Zeit. Dazu gehören die IP-Adresse und das Betriebssystem Ihres Geräts, das Datum und der Zeitpunkt der Nutzung sowie die Art des Browsers, über den Sie auf die Website zugreifen.</p>
            <h3 className="text-[17px] font-semibold text-foreground mb-2">Webanalyse</h3>
            <p className="mb-5">Wir verwenden Webanalyse-Dienste (derzeit Google Analytics), um die Nutzung der Website auszuwerten und Informationen für ihre Optimierung zu erhalten. Die von uns verwendeten Webanalyse-Dienste erheben und speichern Nutzungsdaten unter Verwendung von Cookies. Vor ihrer Übermittlung an einen Server ausserhalb der Schweiz/EU/EWR werden die anfragenden IP-Adressen gekürzt. Wir übermitteln somit keine Personendaten an die Anbieterin der Webanalysedienste im Ausland.</p>
            <h3 className="text-[17px] font-semibold text-foreground mb-2">Werbetechnologien</h3>
            <p className="mb-5">Wir verwenden auf der Website Werbetechnologien von Google Ads. Damit können wir Personen, die unsere Website besuchen, beim Besuch anderer Websites mit für sie relevanter Werbung ansprechen. Die Werbemittel werden basierend auf einer Analyse Ihrer vorgängigen Nutzung unserer Website angezeigt. Hierfür setzen die Anbieterinnen der Werbetechnologien beim Besuch unserer Website Cookies.</p>
            <h3 className="text-[17px] font-semibold text-foreground mb-2">Anmerkung zum Einsatz von Cookies</h3>
            <p>Wir verwenden Cookies, Tags und ähnliche Technologien auf der Website, um Ihnen die bestmögliche Benutzererfahrung zu bieten und um uns zu helfen, die Website zu verbessern. Sie können Ihren Browser anweisen, keine Cookies zu akzeptieren oder Sie jeweils anzufragen, bevor ein Cookie gesetzt wird.</p>
          </div>
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">Ihre Rechte in Bezug auf Ihre Personendaten</h2>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Das Recht auf Auskunft darüber, welche Personendaten wir über Sie speichern;</li>
              <li>das Recht auf Herausgabe oder Übertragung einer Kopie Ihrer Personendaten;</li>
              <li>das Recht auf Berichtigung Ihrer Personendaten;</li>
              <li>das Recht auf Löschung Ihrer Personendaten;</li>
              <li>das Recht, Bearbeitungen Ihrer Personendaten zu widersprechen.</li>
            </ul>
            <p>Bei Fragen wenden Sie sich an <a href="mailto:info@riviera-med.com" className="text-primary underline underline-offset-4 hover:text-primary/80">info@riviera-med.com</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
