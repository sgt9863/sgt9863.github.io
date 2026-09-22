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

## 2026-09-22 — Photo diversification and local-file map fallback

### Changes

- Expanded the place-photo set from 37 to 66 reusable images. Every one of the 59 place queries and seven repeated timeline moments now resolves to a different asset.
- Replaced the incorrect Triton/Nopporo image with a sushi image and set its crop so the plate remains visible on a 390 px screen.
- Added a Sapporo soup-curry image to SAMA and labels it as an image, rather than presenting it as the restaurant's own dish.
- Replaced both building-oriented Shikotsu candidates with lake-and-mountain views: Lake Shikotsu with Mount Fuppushi for the itinerary and Lake Shikotsu with Mount Tarumae for the optional stop.
- Added distinct photos for ramen, jingisukan, airport/rental-car context, Otaru, Biei, Jozankei and repeated breakfast/departure cards.
- Generated `place-photo-cache.js` from the manifest so every current photo is included in offline storage without manually maintaining a second filename list.
- A page opened directly with `file://` no longer requests map tiles that the browser blocks. It keeps the local markers and shows a link to the hosted version for the background map. The hosted page continues to use OpenStreetMap tiles.
- Bumped the service-worker cache to `hokkaido-2026-v9`.

### Source review

- In addition to Wikimedia Commons, reviewed Unsplash, Pexels, Flickr Creative Commons, HOKKAIDO LOVE's photo library, Otaru Tourism Association's photo library, Jozankei Tourism Association's photo library, Photo AC, Pakutaso and Japan Search.
- Japanese tourism libraries are strongest for exact locations, but their terms vary: some require registration, use approval or submission of the finished work. Jozankei's library states that its tourism photos may be used freely; Otaru's association library allows qualifying non-commercial web use. The current batch retained assets whose source, author and reuse license could be recorded automatically.

### Validation

- JavaScript syntax checks passed for the app, map, generated photo manifest, generated cache list and service worker.
- The generated manifest contains 66 assets and 66 unique assignments; no place or repeated timeline moment shares an asset, and no image file is missing.
- At 390 px, no horizontal overflow was found. Browser review confirmed the soup curry on SAMA, the corrected sushi crop on Triton, the lake-and-mountain view at Shikotsu, map markers and the hosted-map status.
- Published commit `7bd148d8de2838bd7266f27bc4199427017fffd5` to `main`; GitHub Pages reported `built` for that exact commit with no error. Live files matched the validated local copies, and the public browser switched from the prior offline cache to `hokkaido-2026-v9`, then displayed `soup_curry.jpg` for SAMA and the new lake view for Shikotsu.

## 2026-09-22: Improve ramen, jingisukan and Mori no Uta imagery

- Replaced the ramen card with a close, warmly lit Sapporo miso ramen photo. At the user's request, the jingisukan stop uses a pastoral sheep photograph from Biei instead of a food photograph.
- Replaced the misleading Mori no Uta image, which showed vehicle chargers, with an autumn view of the Jozankei valley from the Jozankei Tourist Association photo library. The caption says it is a Jozankei autumn-forest image rather than claiming the photograph depicts the hotel itself.
- Replaced the Sanai Hill and Shujitsu Hill cards with two distinct views of golden Japanese larch in autumn. Both captions identify the photographs as larch-foliage images rather than claiming they show the named hills.
- Kept visible source and licence links in the photo credits. The ramen, sheep and larch photos come from Wikimedia Commons; the Jozankei image comes from the official tourist association library, whose page permits download and reuse for Jozankei tourism and events.
- Bumped the service-worker cache to `hokkaido-2026-v11` so existing phones receive the replacements.
- Published photo commit `a3222fe1d37a6f87ad2d7ac62f478b759467f6d9`; GitHub Pages reported `built` without error. SHA-256 comparisons confirmed the live manifest, worker and all five replaced images match the local validated copies. The public page then activated cache `v11` and exposed the new larch captions and credit links at 390 px with no horizontal overflow.

## 2026-09-22: Replace the 17 rejected photographs

- Replaced all 17 items marked `差替` in the full 66-image audit. Exact-location photos now cover Furano Marche, Jozankei Gensen Park, Chitose Aquarium, Hakkenzan, Iwato Kannon, the Jozankei footbath and Otaru Canal at night.
- Where a reusable exact shop or hotel photograph was unavailable, used a representative food, produce, starry-sky or breakfast image and labelled it as an image rather than a facility-specific photograph.
- Kept visible source links and complete author/licence metadata. Sources are Wikimedia Commons, Pexels and the Jozankei Tourist Association photo library.
- Added custom crop positions for the mushroom, cake and winter-star images and bumped the offline cache to `hokkaido-2026-v12`.
- Validation passed for 66 unique asset hashes, 59 mapped places, seven repeated moments, file existence, complete metadata, JavaScript syntax and fresh-origin browser loading. Publication status follows after the Pages deployment is verified.
