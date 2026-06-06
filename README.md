# 🏙️ Smart City Magdeburg — Echtzeit-Dashboard

A real-time city dashboard for Magdeburg, Germany — built with vanilla HTML, CSS, and JavaScript. Displays live environmental, mobility, energy, and cultural data for the "Ottostadt an der Elbe".

![Smart City Magdeburg](https://img.shields.io/badge/Smart%20City-Magdeburg-E84E0C?style=flat-square) ![License](https://img.shields.io/badge/license-MIT-green?style=flat-square) ![Status](https://img.shields.io/badge/status-live-brightgreen?style=flat-square)

---

## ✨ Features

- **Live Map** — Interactive Leaflet map with POI layers (restaurants, cafés, bars, sights) and animated tram/bus positions
- **Real-Time Data** — Elbe water level via PegelOnline WSV, weather & air quality via Open-Meteo
- **5 Dashboard Pages** — Overview, Mobility, Environment, Energy, and City
- **AI Chatbot** — Powered by Claude (Anthropic API); answers questions about Magdeburg in German and English
- **DE / EN Toggle** — Full bilingual interface
- **Responsive** — Mobile-first, works on all screen sizes

---

## 📊 Data Sources

| Data | Source | Refresh |
|------|--------|---------|
| Elbe water level | [PegelOnline WSV](https://www.pegelonline.wsv.de/) | Every 5 min |
| Weather & temperature | [Open-Meteo](https://open-meteo.com/) | Every 10 min |
| Air quality (AQI) | [Open-Meteo Air Quality API](https://air-quality-api.open-meteo.com/) | Every 10 min |
| Transit / parking / energy | Simulated (MVB / Stadtwerke MD) | Every 5 sec |

---

## 🗂️ Project Structure

```
├── index.html        # Main application (HTML + embedded CSS + JS)
├── style.css         # Standalone stylesheet (v2)
├── app.js            # Standalone JavaScript module
└── README.md
```

> **Note:** `index.html` is self-contained and runs independently. `style.css` and `app.js` are the modularised equivalents for reference or separate builds.

---

## 🚀 Getting Started

No build step required. Just open `index.html` in a browser — or serve it with any static file server:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .

# VS Code
# Use the Live Server extension
```

Then open `http://localhost:8080`.

---

## 🤖 Chatbot Setup

The AI assistant uses the [Anthropic Claude API](https://www.anthropic.com/). The API key is handled by the Claude.ai artifact runtime — **no key is required when running inside Claude.ai**.

For standalone deployment, add your API key to the fetch call in `app.js` (or `index.html`):

```js
headers: {
  'Content-Type': 'application/json',
  'x-api-key': 'YOUR_API_KEY_HERE',          // add this
  'anthropic-version': '2023-06-01',          // add this
  'anthropic-dangerous-direct-browser-access': 'true'  // for client-side use
}
```

> ⚠️ For production, proxy the API call through a backend to keep your key secure.

---

## 🗺️ Map

Uses [Leaflet.js](https://leafletjs.com/) with OpenStreetMap tiles. POI layers include:

- 🍽 Restaurants · ☕ Cafés · 🍺 Bars · ⭐ Sights
- 🚋 Tram stops + animated live tram positions
- 🚌 Bus stops + animated live bus positions
- 📍 User geolocation

---

## 🧱 Tech Stack

| Layer | Library / API |
|-------|--------------|
| Maps | Leaflet.js 1.9.4 |
| Charts | Chart.js 4.4.1 |
| Fonts | Google Fonts (Outfit, Fraunces, DM Mono) |
| Weather | Open-Meteo (free, no key needed) |
| Water level | PegelOnline WSV REST API (free) |
| AI chatbot | Anthropic Claude (`claude-sonnet-4-20250514`) |

---

## 📍 Coverage Area

**Magdeburg, Saxony-Anhalt, Germany** — 52.12°N, 11.63°E

Key locations included: Hauptbahnhof, Domplatz, Hasselbachplatz, Alter Markt, Breiter Weg, Rotehornpark, Herrenkrug, Elbauenpark, Universitätsplatz.

---

## 🌍 Inspiration

Inspired by the **IMIQ Project** (*Intelligenter Mobilitätsraum im Quartier*) at the Otto von Guericke University Magdeburg (OVGU), and the **IBA 2027** Smart City initiative.

---

## 📄 License

MIT — free to use, modify, and distribute.

---

*Daten: PegelOnline WSV · Open-Meteo · MVB · Stadtwerke MD · Anthropic Claude*
