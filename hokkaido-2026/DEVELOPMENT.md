# Development record

## 2026-09-22 — Daily maps and destination photography

### Purpose and constraints

- Make each day's route and optional detours easy to inspect on a phone.
- Add a photograph to every scheduled destination, all 40 detour cards, and each night-photography candidate.
- Keep the existing static GitHub Pages deployment and offline itinerary behavior.
- Use photographs that permit public web reuse, even though the site is intended for personal travel planning. The current GitHub Pages URL is publicly reachable.

### Decisions

- Added one Leaflet map per day, combining the day's scheduled stops and currently filtered detours. The map includes fit, interaction and expand controls, a text selector, and links to Google Maps.
- Vendored Leaflet so the interface remains available offline. OpenStreetMap tiles load lazily only when the map enters the viewport and are not stored for offline use, in line with the public tile-service policy.
- Verified and recorded 57 unique stop coordinates. When a facility is represented by a nearby parking area or an area-level point, the map detail explains the choice.
- Selected 37 Wikimedia Commons photographs with CC or public-domain reuse terms. Exact facility images are used where available; otherwise the card labels the image as a surrounding-area view. Each card links to the original file page, and the credits page lists the author and license.
- Resized destination photos to a maximum of 720 px and JPEG quality 72. This reduced the local photo set from about 8.5 MB to about 4.5 MB while preserving sufficient detail for mobile cards.
- Bumped the service-worker cache to `hokkaido-2026-v6`. It stores the itinerary, local map library, coordinate data and all published photographs; online background maps and live external information still require a connection.

### Validation

- JavaScript syntax checks passed for `app.js`, `maps.js`, `place-photos.js` and `sw.js`.
- Browser automation passed at 320 px, 390 px and 1365 px for all four day pages and all four detour pages.
- The automated check opened all 57 mapped places, verified details and Google Maps links, exercised map controls and filters, and found no page errors.
- Offline validation passed with itinerary text, photo cards and mapped-place details available while OpenStreetMap tiles were unavailable.
- Smartphone screenshots were reviewed for the day timeline, detour grid and 37-photo credits index.
- The feature commit `6b94688` was pushed to `main`; GitHub Pages reported `built` with no error. The same browser suite then passed against `https://sgt9863.com/hokkaido-2026/`, including offline reload.

### Sources and limits

- Coordinate research is stored in the local project at `projects/hokkaido-trip-2026/map-research/coordinate-sources.json`.
- Photograph selection metadata is stored in `place-photos.js`; the original Wikimedia Commons file page and license URL are retained for each asset.
- Cultural Affairs Agency guidance was used to distinguish personal copying from uploading material to a publicly reachable server. No claim is made that a public website becomes exempt from copyright rules merely because its intended audience is two people.
- Background map availability depends on the OpenStreetMap tile service and a network connection. Route lines are intentionally handed off to Google Maps so current roads and traffic are used.
