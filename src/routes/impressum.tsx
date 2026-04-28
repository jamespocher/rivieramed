import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/impressum")({
  head: () => ({ meta: [{ title: "Impressum — Riviera Med" }] }),
  component: () => (
    <section className="py-16 md:py-24">
      <div className="rm-container max-w-2xl">
        <h1 className="text-[36px] md:text-[48px] font-semibold mb-6">Impressum</h1>
        <div className="space-y-2 text-foreground/85">
          <p><strong>Riviera Med GmbH</strong></p>
          <p>Scheibenstrasse 3<br />3600 Thun, Schweiz</p>
          <p>Telefon: <a href="tel:+41792375521" className="text-primary hover:underline">079 237 55 21</a></p>
          <p>E-Mail: <a href="mailto:info@riviera-med.com" className="text-primary hover:underline">info@riviera-med.com</a></p>
        </div>
      </div>
    </section>
  ),
});
