#!/usr/bin/env sh
set -e

SYFT_VERSION=1.51.0

mkdir -p ci/.cache
cd ci/.cache

if ! [ -f "syft-${SYFT_VERSION}" ]; then
    curl -L -o syft.tgz "https://github.com/anchore/syft/releases/download/v${SYFT_VERSION}/syft_${SYFT_VERSION}_linux_amd64.tar.gz"
    tar -xzf syft.tgz syft
    mv syft "syft-${SYFT_VERSION}"
    rm syft.tgz
fi

"./syft-${SYFT_VERSION}" scan ../../pnpm-lock.yaml -o cyclonedx-xml > bom.xml

curl -X "POST" "https://dtrack-api.colamda.de/api/v1/bom" \
  -H 'Content-Type: multipart/form-data' \
  -H "X-Api-Key: ${DTRACK_API_KEY}" \
  -F "project=3cb485c7-3491-4b95-92b4-2341a20a5df8" \
  -F "bom=@bom.xml"
