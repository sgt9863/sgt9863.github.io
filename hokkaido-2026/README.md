# Hokkaido itinerary, November 7–10 2026

Static mobile-first, read-only travel guide, served at `/hokkaido-2026/` by the existing GitHub Pages site.

- `data.js`: itinerary, optional detours, photography candidates and source/photograph credits.
- `app.js`: hash-based daily navigation and accessible UI.
- `style.css`: responsive layout.
- `sw.js`: offline cache limited to this subdirectory. **Bump `CACHE` whenever any public content or asset changes.**
- `itinerary.txt`: downloadable plain-text copy; regenerate from `data.js` after content changes.
- `images/`: approved photographs P03, P04, P06, P12. See the website's credits screen for attribution and file-specific licenses.

No build is required. Serve the parent repository over localhost and open `/hokkaido-2026/`. Service workers require localhost or HTTPS.

The schedule preserves user-provided anchors; other times are planning estimates. Car return19:00 remains recorded, alongside an earlier-return recommendation due to18:30 final winter shuttle. Unconfirmed meal times, maintenance closures and snow-dependent access are marked in the UI. No bookings are modified by this website.

Detailed preparation, research and verification records live in the separate local project `projects/hokkaido-trip-2026/`. No personal booking numbers or account credentials are included here.
