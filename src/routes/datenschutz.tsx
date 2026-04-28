import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung — Riviera Med" },
      {
        name: "description",
        content:
          "Datenschutzerklärung der Riviera Med GmbH gemäss Schweizer DSG und DSGVO.",
      },
    ],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="rm-container max-w-3xl">
        <h1 className="text-[36px] md:text-[48px] font-semibold mb-2 leading-tight">
          Datenschutzerklärung
        </h1>
        <p className="text-sm text-muted-foreground mb-12">Riviera Med GmbH · Stand April 2026</p>

        <div className="space-y-10 text-[16px] leading-relaxed text-foreground/80">

          {/* Einleitung */}
          <p>
            Datenschutz und Datensicherheit sind wichtig für die Riviera Med GmbH («Riviera Med»; «wir»).
            Wir bearbeiten Ihre Personendaten verantwortungsbewusst, in Übereinstimmung mit anwendbaren
            gesetzlichen Bestimmungen und gemäss dieser Datenschutzerklärung.
          </p>

          {/* Inhalt */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">Inhalt dieser Datenschutzerklärung</h2>
            <p>
              In dieser Datenschutzerklärung informieren wir Sie darüber, wie wir Personendaten erheben und
              bearbeiten, wenn Sie unsere Website unter{" "}
              <a href="https://www.riviera-med.com" className="text-primary underline underline-offset-4 hover:text-primary/80">
                https://www.riviera-med.com
              </a>{" "}
              («Website») oder Social-Media-Seiten besuchen, uns kontaktieren oder unsere Leistungen in
              Anspruch nehmen.
            </p>
          </div>

          {/* Verantwortlicher */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">Verantwortlicher für die Datenbearbeitung</h2>
            <p>
              Für die in dieser Datenschutzerklärung beschriebenen Datenbearbeitungen ist Riviera Med
              verantwortlich. Bei Fragen oder wenn Sie Ihre datenschutzrechtlichen Betroffenenrechte
              wahrnehmen möchten, kontaktieren Sie uns bitte über{" "}
              <a href="mailto:info@riviera-med.com" className="text-primary underline underline-offset-4 hover:text-primary/80">
                info@riviera-med.com
              </a>{" "}
              oder schreiben Sie an: Adriano Marra, Riviera Med GmbH, Scheibenstrasse 3, 3600 Thun.
            </p>
          </div>

          {/* Kommunikation und Leistungserbringung */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">
              Bei der Kommunikation und Leistungserbringung bearbeitete Personendaten
            </h2>
            <p className="mb-3">Wir erheben die von Ihnen an uns übermittelten Informationen wie folgt:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>wenn Sie uns kontaktieren;</li>
              <li>wenn Sie sich auf der Website als Nutzer registrieren;</li>
              <li>wenn Sie Dienstleistungen bestellen.</li>
            </ul>
            <p className="mb-3">
              Dazu gehören allgemeine Personendaten, z.B. Name und Kontaktdaten, Geburtsdatum, sowie
              allenfalls Angaben zu Ihrer Position oder Rolle bei der Organisation, in deren Namen Sie uns
              kontaktieren.
            </p>
            <p className="mb-3">
              Wir bearbeiten auch Ihre Gesundheitsdaten. Dazu gehören Angaben zu Ihrem vergangenen oder
              aktuellen Gesundheitszustand, zum Behandlungsverlauf sowie zur Inanspruchnahme von
              Gesundheitsleistungen.
            </p>
            <p className="mb-3">
              Wenn Sie kostenpflichtige Dienstleistungen bestellen, erfragen wir zudem Ihre Finanzdaten,
              z.B. Ihre bevorzugte Zahlungsmethode und die Rechnungsadresse.
            </p>
            <p>
              Wir bearbeiten auch Personendaten, die wir von Dritten erhalten. Dazu gehören regelmässig
              Personendaten, die wir in der Korrespondenz oder in Besprechungen mit Kundinnen oder
              Geschäftspartnerinnen erhalten, z.B. Ihr Name und Angaben zu Ihrer Tätigkeit als
              Teammitglied der Kundin oder der Geschäftspartnerin.
            </p>
          </div>

          {/* Bereitstellung Website */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-4">
              Bereitstellung und Nutzung unserer Website
            </h2>

            <h3 className="text-[17px] font-semibold text-foreground mb-2">Nutzung zur Information</h3>
            <p className="mb-5">
              Sie können sich auf der Website über Riviera Med und unser Leistungsangebot informieren,
              ohne uns mitzuteilen, wer Sie sind. Wie bei jeder Verbindung mit einem Webserver
              protokolliert und speichert der Server automatisch gewisse technische Daten für kurze Zeit.
              Dazu gehören die IP-Adresse und das Betriebssystem Ihres Geräts, das Datum und der
              Zeitpunkt der Nutzung sowie die Art des Browsers, über den Sie auf die Website zugreifen.
            </p>

            <h3 className="text-[17px] font-semibold text-foreground mb-2">Webanalyse</h3>
            <p className="mb-5">
              Wir verwenden Webanalyse-Dienste (derzeit Google Analytics), um die Nutzung der Website
              auszuwerten und Informationen für ihre Optimierung zu erhalten. Die von uns verwendeten
              Webanalyse-Dienste erheben und speichern Nutzungsdaten unter Verwendung von Cookies. Vor
              ihrer Übermittlung an einen Server ausserhalb der Schweiz/EU/EWR werden die anfragenden
              IP-Adressen gekürzt. Wir übermitteln somit keine Personendaten an die Anbieterin der
              Webanalysedienste im Ausland.
            </p>

            <h3 className="text-[17px] font-semibold text-foreground mb-2">Werbetechnologien</h3>
            <p className="mb-5">
              Wir verwenden auf der Website Werbetechnologien von Google Ads. Damit können wir Personen,
              die unsere Website besuchen, beim Besuch anderer Websites mit für sie relevanter Werbung
              ansprechen. Die Werbemittel werden basierend auf einer Analyse Ihrer vorgängigen Nutzung
              unserer Website angezeigt. Hierfür setzen die Anbieterinnen der Werbetechnologien beim
              Besuch unserer Website Cookies.
            </p>

            <h3 className="text-[17px] font-semibold text-foreground mb-2">Social Plugins</h3>
            <p className="mb-5">
              Die auf der Website verwendeten Social Plugins ermöglichen es Ihnen, unsere Inhalte in
              sozialen Netzwerken zu empfehlen und zu teilen. Sie sind anhand der Logos des jeweiligen
              sozialen Netzwerks erkennbar. Wenn Sie mit dem Social Plugin interagieren, werden Daten an
              die jeweilige Anbieterin des sozialen Netzwerks gesendet.
            </p>

            <h3 className="text-[17px] font-semibold text-foreground mb-2">Ressourcen von externen Websites</h3>
            <p className="mb-5">
              Wir binden auf unserer Website Ressourcen von externen Servern ein (sichtbare Inhalte wie
              Videos, Bilder etc.). Beim Abruf dieser Ressourcen erfährt die Betreiberin der externen
              Server Ihre IP-Adresse und/oder gewisse Randdaten, die für die Nutzung notwendig sind.
            </p>

            <h3 className="text-[17px] font-semibold text-foreground mb-2">Anmerkung zum Einsatz von Cookies</h3>
            <p>
              Wir verwenden Cookies, Tags und ähnliche Technologien auf der Website, um Ihnen die
              bestmögliche Benutzererfahrung zu bieten und um uns zu helfen, die Website zu verbessern.
              Cookies sind Textdateien, die auf Ihren Computer oder Ihr Mobilgerät heruntergeladen werden,
              wenn Sie eine Website besuchen. Einige der von uns verwendeten Cookies sind notwendig, um
              bestimmte Funktionen der Website zur Verfügung zu stellen. Darüber hinaus verwenden wir
              Cookies, um die Nutzung der Website zu analysieren und um Informationen zur Optimierung zu
              erhalten. Sie können Ihren Browser anweisen, keine Cookies zu akzeptieren oder Sie jeweils
              anzufragen, bevor ein Cookie gesetzt wird. Sie können auch Cookies auf Ihrem Gerät löschen,
              indem Sie die entsprechende Funktion Ihres Browsers benutzen.
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">Nutzung unserer Social-Media-Seiten</h2>
            <p>
              Auf unseren Seiten in sozialen Medien finden Sie Beiträge zu aktuellen Entwicklungen bei
              Riviera Med sowie zu unserem Leistungsangebot. Die Anbieterinnen der sozialen Medien
              erheben und analysieren Nutzungsdaten wie die Anzahl Besuche und demographische Angaben zu
              den Besuchern unserer Unternehmensseiten. Wir erhalten von den Anbieterinnen darauf
              basierte Auswertungen, die nur aggregierte oder genügend anonymisierte Daten enthalten. Nur
              die jeweilige Anbieterin kann Sie aufgrund der erhobenen Nutzungsdaten identifizieren.
              Beachten Sie daher bitte die Datenschutzhinweise der jeweiligen Anbieterin.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">Nutzung unseres Newsletters</h2>
            <p>
              Wenn Sie sich für unseren Newsletter anmelden, erheben wir die von Ihnen übermittelten
              Informationen, darunter Vorname, Name und E-Mail-Adresse. Sie können uns jederzeit
              mitteilen, dass Sie in Zukunft auf den Erhalt unseres Newsletters verzichten möchten. Bitte
              nutzen Sie hierzu den Abmeldelink am Ende des Newsletters.
            </p>
          </div>

          {/* Zwecke */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">
              Zu welchen Zwecken wir Ihre Personendaten bearbeiten und auf welcher Basis
            </h2>
            <p className="mb-3">
              Ihre Personendaten bearbeiten wir primär, um unsere Gesundheitsleistungen fachgerecht und
              entsprechend unseren vertraglichen und gesetzlichen Pflichten zu erbringen, zu dokumentieren
              und abzurechnen. Zudem bearbeiten wir Ihre Personendaten zu folgenden Zwecken:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Beantwortung Ihrer Anfragen und Kommunikation mit Ihnen;</li>
              <li>Bearbeitung Ihrer Registrierung oder Bestellungen;</li>
              <li>Bereitstellung der Website;</li>
              <li>Analyse und Optimierung der Nutzung der Website;</li>
              <li>Evaluierung und Optimierung unserer Dienstleistungen;</li>
              <li>Marketing und Werbung;</li>
              <li>Optimierung unserer Beiträge auf unseren Social-Media-Unternehmensseiten;</li>
              <li>
                Information über neue Entwicklungen bei Riviera Med und über neue Dienstleistungen
                (z.B. über unseren Newsletter; wobei Sie uns jederzeit mitteilen können, dass Sie auf den
                Erhalt solcher Informationen verzichten möchten);
              </li>
              <li>Erfüllung gesetzlicher Pflichten;</li>
              <li>Durchsetzung von Rechtsansprüchen.</li>
            </ul>
            <p>
              Wir haben ein den genannten Zwecken entsprechendes berechtigtes Interesse an der Bearbeitung
              Ihrer Personendaten. Einige Bearbeitungen sind zudem notwendig, damit wir unsere
              vertraglichen Pflichten Ihnen gegenüber oder unsere gesetzlichen Pflichten (z.B.
              Aufbewahrungspflichten) erfüllen können.
            </p>
          </div>

          {/* Speicherung und Schutz */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">
              Wie wir Ihre Personendaten speichern und schützen
            </h2>
            <p>
              Wir speichern Ihre Personendaten nur in dem Umfang und so lange, wie dies für die Erfüllung
              der in dieser Datenschutzerklärung beschriebenen Zwecke oder zur Erfüllung gesetzlicher
              Pflichten notwendig ist. Im Interesse der Integrität und der Vertraulichkeit der
              Personendaten treffen wir angemessene technische und organisatorische Massnahmen. Wir
              implementieren entsprechend unserer Risikobeurteilung insbesondere Zugangskontrollen,
              Zugriffskontrollen sowie Verfahren zur regelmässigen Überprüfung, Bewertung und Evaluierung
              der Wirksamkeit der Massnahmen.
            </p>
          </div>

          {/* Weitergabe */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">
              An wen wir Ihre Personendaten weitergeben
            </h2>
            <p>
              Zur Erreichung der in dieser Datenschutzerklärung beschriebenen Zwecke kann es notwendig
              sein, dass wir Ihre Personendaten an andere Unternehmen weitergeben. Die Kategorien von
              Empfängerinnen sind externe Dienstleisterinnen und Lieferantinnen oder andere
              Geschäftspartnerinnen.
            </p>
          </div>

          {/* Ort der Bearbeitung */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">Ort der Bearbeitung</h2>
            <p>
              Ihre Personendaten speichern und bearbeiten wir primär in der Schweiz und in der EU. Wir
              können Ihre Personendaten aber auch an Empfängerinnen in Ländern ausserhalb der Schweiz
              oder der EU (weltweit, insbesondere USA) übermitteln. Datenübermittlungen in Länder ohne
              angemessenen Datenschutz nehmen wir dabei gestützt auf Standard-Datenschutzklauseln oder
              gesetzliche Ausnahmen (z.B. Notwendigkeit zur Vertragserfüllung) vor.
            </p>
          </div>

          {/* Rechte */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">
              Ihre Rechte in Bezug auf Ihre Personendaten
            </h2>
            <p className="mb-3">
              Sie haben die folgenden Rechte in Bezug auf Personendaten, die Sie betreffen:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>
                Das Recht, Auskunft darüber zu erhalten, welche Personendaten wir über Sie speichern und
                wie wir diese bearbeiten;
              </li>
              <li>
                das Recht auf Herausgabe oder Übertragung einer Kopie Ihrer Personendaten in einem
                gängigen Format;
              </li>
              <li>das Recht auf Berichtigung Ihrer Personendaten;</li>
              <li>das Recht auf Löschung Ihrer Personendaten;</li>
              <li>das Recht, Bearbeitungen Ihrer Personendaten zu widersprechen.</li>
            </ul>
            <p>
              Beachten Sie bitte, dass für diese Rechte gesetzliche Voraussetzungen und Ausnahmen gelten.
              Soweit rechtlich zulässig, können wir Ihre Anfrage zur Ausübung dieser Rechte ablehnen. Sie
              haben ausserdem das Recht, bei der zuständigen Datenschutzaufsichtsbehörde eine Beschwerde
              einzureichen.
            </p>
          </div>

          {/* Änderungen */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-3">
              Wie wir diese Datenschutzerklärung ändern können
            </h2>
            <p>
              Wir können diese Datenschutzerklärung jederzeit ändern, insbesondere wenn wir unsere
              Datenbearbeitungen ändern oder wenn neue Rechtsvorschriften anwendbar werden. Es gilt die
              jeweils unter{" "}
              <a href="https://www.riviera-med.com" className="text-primary underline underline-offset-4 hover:text-primary/80">
                https://www.riviera-med.com
              </a>{" "}
              bereitgestellte Version.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
