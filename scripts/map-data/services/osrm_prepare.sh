#!/usr/bin/env bash
# Prompt 81, services table, step 2: build the local routing graph (OSRM, car profile without ferries, MLD).
# Usage: scripts/map-data/services/osrm_prepare.sh <scratch_dir>
#   <scratch_dir>/osm/portugal.osm.pbf   the OpenStreetMap extract (see content/facts/map/services/README.md)
#   <scratch_dir>/tools                  where the npm package @project-osrm/osrm is installed (never in the repo)
# Ubuntu 24.04 (glibc 2.39): @project-osrm/osrm 26.4.0 is the newest prebuilt that runs (26.9.0 needs glibc 2.43);
# its binaries need oneTBB, taken from the PyPI wheel tbb 2022.1.0 (unzipped, on LD_LIBRARY_PATH).
# --small-component-size 100: OSRM joins a point to the main road network when the nearest roads form a "small component" (default: under 1000
# nodes). Corvo's whole road network is that small, so with the default its town hall was joined to a road on Flores, 18 km away.
# About 3 minutes, 6 GB of memory and 1.2 GB of disk on 4 cores.
set -euo pipefail
D="$1"; T="$D/tools"; mkdir -p "$T/v26.4.0" "$T/whl" "$T/tbb" "$D/osrm"
[ -d "$T/v26.4.0/node_modules/@project-osrm/osrm" ] || (cd "$T/v26.4.0" && npm init -y >/dev/null && npm install @project-osrm/osrm@26.4.0)
[ -d "$T/tbb/tbb-2022.1.0.data" ] || (pip download tbb==2022.1.0 --no-deps -d "$T/whl" -q && cd "$T/tbb" && unzip -q -o "$T"/whl/tbb-2022.1.0-*.whl)
P="$T/v26.4.0/node_modules/@project-osrm/osrm"; B="$P/lib/binding_napi_v8"
export LD_LIBRARY_PATH="$T/tbb/tbb-2022.1.0.data/data/lib"
# The profile: OSRM's own car.lua with ferries switched off, so a "drive time" never includes a boat and no route crosses the sea.
rm -rf "$D/osrm/profile" && mkdir -p "$D/osrm/profile" && cp -r "$P/profiles/." "$D/osrm/profile/"
# ferries off: without this line a ferry tagged motor_vehicle=yes is still driven at the profile's default speed.
sed -i "s/^function WayHandlers.ferries(profile,way,result,data)$/function WayHandlers.ferries(profile,way,result,data)\n  if data.route == 'ferry' then return false end/" "$D/osrm/profile/lib/way_handlers.lua"
grep -q "if data.route == 'ferry' then return false end" "$D/osrm/profile/lib/way_handlers.lua"
cd "$D/osrm" && rm -f portugal.osrm* && ln -sf ../osm/portugal.osm.pbf portugal.osm.pbf
"$B/osrm-extract" -p "$D/osrm/profile/car.lua" -t 4 --small-component-size 100 portugal.osm.pbf > extract.log 2>&1
"$B/osrm-partition" portugal.osrm > partition.log 2>&1
"$B/osrm-customize" portugal.osrm > customize.log 2>&1
echo "osrm graph ready: $D/osrm/portugal.osrm"
