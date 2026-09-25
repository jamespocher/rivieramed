#!/usr/bin/env bash
# Build + Upload auf Infomaniak (SSH/rsync).
# Zugangsdaten: Infomaniak Manager → Hosting → SSH/FTP-Benutzer.
#   INFOMANIAK_SSH="benutzer@xxxxx.ftp.infomaniak.com" INFOMANIAK_PATH="/home/clients/xxxx/sites/riviera-med.com" ./deploy.sh
set -euo pipefail
: "${INFOMANIAK_SSH:?INFOMANIAK_SSH fehlt (z. B. benutzer@host.ftp.infomaniak.com)}"
: "${INFOMANIAK_PATH:?INFOMANIAK_PATH fehlt (Web-Root der Site auf dem Server)}"

npm run build
rsync -avz --delete \
  --exclude ".DS_Store" \
  dist/ "${INFOMANIAK_SSH}:${INFOMANIAK_PATH}/"
echo "✓ Deployed nach ${INFOMANIAK_SSH}:${INFOMANIAK_PATH}"
