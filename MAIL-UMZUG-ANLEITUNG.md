# E-Mail-Umzug Google → Infomaniak (gemeinsamer Termin)

Ziel: Alle bisherigen E-Mails von den Google-Postfächern (über Wix) in die neuen
Infomaniak-Postfächer kopieren – **ohne dass ein Drittanbieter Zugriff erhält**.
Die Kopie läuft über das Mailprogramm auf dem Computer von Riviera Med.
Passwörter gibt ausschliesslich Riviera Med ein.

Dauer: ca. 30 Minuten Einrichtung, danach läuft das Kopieren im Hintergrund
(je nach Postfachgrösse 1–4 Stunden).

---

## Vorbereitung (James, vorher)

- [ ] Im Infomaniak-Manager unter **Mail-Service** für jede Adresse ein Postfach
      anlegen – exakt gleich geschrieben wie bei Google (z. B. `info@riviera-med.com`).
- [ ] Für jedes Postfach ein **Startpasswort** setzen. Riviera Med ändert es am Termin.
- [ ] Prüfen, dass auf dem Computer von Riviera Med **Apple Mail** oder **Outlook**
      vorhanden ist (beide können Google per «Mit Google anmelden», kein App-Passwort nötig).
- [ ] Wix-Zugang bereithalten – wird am Termin noch **nicht** gebraucht.

## Am Termin, pro Postfach

### 1. Google-Konto im Mailprogramm einrichten (falls nicht schon vorhanden)

**Apple Mail:** Mail → Einstellungen → Accounts → «+» → **Google** → Anmelden
im Google-Fenster (macht Riviera Med) → nur «Mail» aktivieren.

**Outlook:** Datei → Konto hinzufügen → Google-Adresse eingeben → Anmelden im
Google-Fenster.

Warten, bis alle Ordner geladen sind (unten links steht der Fortschritt).

### 2. Infomaniak-Konto im Mailprogramm einrichten

**Apple Mail:** Mail → Einstellungen → Accounts → «+» → **Anderer Mail-Account**

**Outlook:** Datei → Konto hinzufügen → Erweiterte Optionen → «Konto manuell einrichten» → IMAP

| Einstellung | Wert |
|---|---|
| E-Mail-Adresse / Benutzername | die vollständige Adresse, z. B. `info@riviera-med.com` |
| Passwort | das Infomaniak-Postfachpasswort |
| Eingangsserver (IMAP) | `mail.infomaniak.com`, Port **993**, SSL/TLS |
| Ausgangsserver (SMTP) | `mail.infomaniak.com`, Port **465**, SSL/TLS, Authentifizierung mit denselben Daten |

### 3. E-Mails kopieren

1. Im linken Bereich des Mailprogramms das **Google-Konto** aufklappen.
2. Ordner **Posteingang** anklicken, alle Nachrichten markieren (⌘A bzw. Strg+A).
3. Die markierten Nachrichten mit der Maus in den **Posteingang des Infomaniak-Kontos** ziehen.
   Beim Ziehen **Alt** (Mac) bzw. **Strg** (Windows) gedrückt halten → es wird **kopiert**,
   nicht verschoben. Bei Google bleibt alles erhalten.
4. Dasselbe für **Gesendet** → Infomaniak **Gesendet**.
5. Weitere Ordner/Labels bei Bedarf (Entwürfe und Spam können weggelassen werden).
6. Das Programm zeigt unten den Fortschritt. Computer **nicht in den Ruhezustand**
   schicken, Mailprogramm offen lassen.

Tipp bei sehr grossen Postfächern: in Blöcken kopieren (z. B. nach Jahr sortieren
und je ein Jahr ziehen). Bricht etwas ab, einfach den Block nochmals ziehen –
Duplikate sind im Zweifel besser als Lücken.

### 4. Kontrolle

- [ ] Im Infomaniak-Webmail (`mail.infomaniak.com`) einloggen: Anzahl Nachrichten
      im Posteingang grob mit Google vergleichen.
- [ ] Ein paar alte E-Mails mit Anhang öffnen → Anhang vorhanden?

---

## Was am Termin NICHT passiert

- Keine DNS-Änderung in Wix. Neue E-Mails kommen weiterhin bei Google an.
- Kein Domain-Transfer.

Die Umstellung der Domain (Website + Mail) machen wir an einem separaten Abend,
wenn auch die Website auf Infomaniak getestet ist. Kurz davor wird Schritt 3
nochmals für die seit dem Termin eingegangenen E-Mails wiederholt.

## Nach der Umstellung (später)

- Handys/Computer auf das Infomaniak-Konto umstellen (Werte aus Schritt 2).
- Google-Konto noch 2 Wochen im Mailprogramm lassen, dann entfernen.
- Wix: Geschäfts-E-Mail und Website-Plan kündigen, Domain transferieren.
