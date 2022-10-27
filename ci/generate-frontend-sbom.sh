#!/usr/bin/env sh

mkdir -p ci/.cache
cd ci/.cache

if ! [ -f syft ]; then
    curl -L -o syft.tgz https://github.com/anchore/syft/releases/download/v0.59.0/syft_0.59.0_linux_amd64.tar.gz
    tar -xzf syft.tgz
fi

./syft packages ../../yarn.lock -o cyclonedx-xml > bom.xml

curl -X "POST" "https://dtrack-api.colamda.de/api/v1/bom" \
  -H 'Content-Type: multipart/form-data' \
  -H "X-Api-Key: ${DTRACK_API_KEY}" \
  -F "project=3cb485c7-3491-4b95-92b4-2341a20a5df8" \
  -F "bom=@bom.xml"
