# Umzug von Vercel zu Infomaniak

Die Website ist eine statische Single-Page-App (Vite). Sie braucht keinen
Node-Server – ein normales **Infomaniak Webhosting** (Apache) reicht.
Die Datei `public/.htaccess` übernimmt SPA-Routing, HTTPS-Redirect, Caching
und die Sicherheits-Header, die bisher in `vercel.json` standen.

## 1. Hosting einrichten (einmalig)

1. Infomaniak Manager → **Webhosting** → Site hinzufügen: `riviera-med.com`
   (falls das Hosting noch nicht existiert: „Web + Mail"-Hosting Schweiz).
2. **SSL**: Let's Encrypt-Zertifikat aktivieren (Manager → Site → SSL-Zertifikat).
   Ist meist schon automatisch aktiv.
3. **FTP/SSH-Benutzer** anlegen (Manager → Hosting → FTP/SSH) und SSH aktivieren.
   Den Web-Root merken, z. B. `/home/clients/<id>/sites/riviera-med.com`.

## 2. Deployen

Variante A – Script (empfohlen, per SSH/rsync):

```bash
INFOMANIAK_SSH="benutzer@xxxxx.ftp.infomaniak.com" \
INFOMANIAK_PATH="/home/clients/<id>/sites/riviera-med.com" \
./deploy.sh
```

Variante B – manuell:

```bash
npm run build
```

Danach den **Inhalt** von `dist/` (inkl. der versteckten `.htaccess`) per
FTP/SFTP (z. B. Cyberduck, FileZilla) in den Web-Root hochladen. Alte Dateien
im Web-Root vorher löschen, damit keine veralteten Assets liegen bleiben.

Prüfen: `https://riviera-med.com/tarife` direkt aufrufen → muss die Tarifseite
zeigen (nicht 404). Wenn 404: `.htaccess` fehlt im Web-Root.

## 3. DNS umstellen

Im DNS der Domain (Infomaniak oder externer Registrar):

| Typ   | Name | Wert                                   |
|-------|------|----------------------------------------|
| A     | @    | IP des Infomaniak-Hostings (Manager → Site → „DNS-Konfiguration") |
| CNAME | www  | riviera-med.com                        |

Die bisherigen Vercel-Einträge (`76.76.21.21` / `cname.vercel-dns.com`)
entfernen. Umstellung dauert bis zu 24 h, meist wenige Minuten.
Liegt die Domain bereits bei Infomaniak, genügt ein Klick auf
„DNS automatisch konfigurieren".

## 4. Vercel abschalten

Erst wenn die Seite auf Infomaniak sauber läuft: Vercel-Projekt löschen oder
die Domain im Vercel-Projekt entfernen. `vercel.json` und `.vercel/` im
Repository können danach gelöscht werden.

## Sanity-CORS freischalten (wichtig!)

Sanity blockiert Anfragen von unbekannten Domains. Sonst bleiben die
eingebauten Texte stehen und im Browser erscheinen CORS-Fehler.
sanity.io → Projekt `amas9704` → **API → CORS origins** → hinzufügen:

- `https://riviera-med.com` und `https://www.riviera-med.com`
- `http://localhost:5173` (lokale Entwicklung)

## Was weiterhin extern läuft

- **Sanity CMS** (Texte) – wird vom Browser direkt bei Sanity abgefragt,
  Hosting-unabhängig. Fällt Sanity aus, zeigt die Seite die eingebauten Texte.
- **Supabase** (Anmeldeformular) – ebenfalls Hosting-unabhängig.

Wer Formulardaten ebenfalls in der Schweiz halten möchte: Infomaniak bietet
keine direkte Supabase-Alternative; eine Option wäre ein kleines PHP-Skript
auf dem Hosting, das das Formular per Mail weiterleitet.

## Bilder neu optimieren

Neue Fotos als JPG in `src/assets/` legen, Eintrag in
`scripts/optimize-images.mjs` ergänzen und ausführen:

```bash
node scripts/optimize-images.mjs
```
