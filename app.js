'use strict';

// ======================================================
// CONSTANTS & CONFIG
// ======================================================
const MAGDEBURG = { lat: 52.1205, lng: 11.6276 };
const PEGEL_BASE   = 'https://www.pegelonline.wsv.de/webservices/rest-api/v2';
const WEATHER_BASE = 'https://api.open-meteo.com/v1';
const AQI_BASE     = 'https://air-quality-api.open-meteo.com/v1';
const LAT = 52.1205, LNG = 11.6276;

// ======================================================
// TRANSLATIONS  — complete DE / EN
// ======================================================
const TRANSLATIONS = {
  de: {
    // NAV
    nav_overview:'Übersicht', nav_mobility:'Mobilität', nav_environment:'Umwelt',
    nav_energy:'Energie', nav_city:'Die Stadt',
    mob_nav_overview:'🏙️ Übersicht', mob_nav_mobility:'🚌 Mobilität',
    mob_nav_environment:'🌿 Umwelt', mob_nav_energy:'⚡ Energie', mob_nav_city:'🏛️ Die Stadt',
    // HEADER
    live_label:'LIVE',
    // OVERVIEW PAGE
    overview_title:'Stadtüberblick',
    overview_sub:'Aktualisierung läuft…',
    chip_ok:'✓ Alle Systeme normal',
    chip_warn:'⚠ 1 Baustelle aktiv',
    kpi_aqi:'Luftqualität AQI', kpi_elbe:'Elbe-Pegel', kpi_traffic:'Verkehr', kpi_temp:'Temperatur',
    kpi_pm25_label:'PM2.5', kpi_elbe_sub:'Strombrücke · cm ü. NN',
    kpi_traffic_sub:'% Auslastung · Innenstadt', kpi_humidity_sub:'Feuchtigkeit:',
    map_title:'Stadtkarte · Magdeburg',
    map_filter_all:'Alle', map_filter_restaurants:'🍽 Restaurants', map_filter_cafes:'☕ Cafés',
    map_filter_bars:'🍺 Bars', map_filter_sights:'⭐ Sehenswürdigkeiten',
    map_filter_trams:'🚋 Trams', map_filter_buses:'🚌 Busse', map_filter_sbahn:'🚂 S-Bahn',
    legend_tram:'Tram-Stop', legend_bus:'Bus-Stop', legend_sbahn:'S-Bahn',
    legend_restaurant:'Restaurant', legend_cafe:'Café', legend_bar:'Bar', legend_sight:'Sehenswürdigkeit',
    map_locate_btn:'📍 Mein Standort',
    alerts_title:'Aktive Meldungen',
    alert1_title:'Wasserrohrbruch · Breiter Weg', alert1_body:'Sperrung aktiv · Einsatz vor Ort · Est. 3h',
    alert2_title:'Stau A2 Ausfahrt West',         alert2_body:'+18 Min Reisezeitverlust · B1 empfohlen',
    alert3_title:'Luftqualität verbessert',        alert3_body:'PM2.5 unter WHO-Grenzwert · Gut für Outdoor',
    parking_title:'Parkleitsystem',
    transit_title:'ÖPNV-Auslastung',
    free:'frei',
    overview_energy_title:'Energiemix · Jetzt',
    overview_traffic_title:'Verkehrslast · Heute',
    // MOBILITY PAGE
    mob_title:'Mobilität', mob_sub:'ÖPNV · Verkehr · Sharing · Parken',
    mob_bikes_label:'Aktive Fahrräder', mob_sharing_badge:'Sharing',
    mob_scooter_label:'E-Scooter', mob_scooter_badge:'Aktiv',
    mob_jams_label:'Staus aktiv', mob_jams_badge:'Mäßig',
    mob_charging_label:'E-Ladestationen', mob_charging_sub:'aktiv · 87.5%',
    transit_full_title:'ÖPNV Linienauslastung · Echtzeit', transit_realtime:'MVB · aktualisiert alle 30s',
    traffic_24h:'Verkehrsfluss · 24h',
    parking_all_title:'Parkleitsystem · Alle',
    pt_header_name:'Parkhaus', pt_header_free:'Frei', pt_header_total:'Total', pt_header_status:'Status',
    // ENVIRONMENT PAGE
    env_title:'Umwelt & Klima', env_sub:'Luft · Wasser · Lärm · Temperaturen',
    env_temp_label:'Temperatur', env_temp_sub:'Lufttemperatur · Magdeburg',
    env_humidity_label:'Luftfeuchtigkeit', env_humidity_sub:'rel. Luftfeuchtigkeit',
    env_aqi_label:'Luftqualität AQI', env_aqi_sub:'Europäischer AQI',
    env_noise_label:'Lärmpegel', env_noise_sub:'dB · Innenstadt ∅',
    elbe_chart_title:'Elbe-Pegel · Verlauf 30 Tage',
    elbe_current:'Aktuell (cm)', elbe_warn1:'Warnstufe 1', elbe_warn2:'Warnstufe 2', elbe_warn3:'Warnstufe 3',
    aqi_components_title:'Luftqualitäts-Komponenten', aqi_source:'Open-Meteo AQI',
    temp_7day_title:'Temperatur · 7-Tage-Trend',
    wind_title:'Windgeschwindigkeit', wind_kmh:'km/h', wind_gusts:'Böen km/h', wind_dir:'Richtung',
    // ENERGY PAGE
    energy_title:'Energie', energy_sub:'Erzeugung · Verbrauch · Netz · Erneuerbare',
    energy_consumption_label:'Stromverbrauch', energy_consumption_badge:'Jetzt',
    energy_consumption_sub:'Stadtweiter Bedarf',
    energy_solar_label:'Solarertrag', energy_solar_badge:'Aktiv', energy_solar_sub:'Stadtwerke Solarpark',
    energy_wind_label:'Windenergie', energy_wind_badge:'Aktiv', energy_wind_sub:'Windpark Magdeburg',
    energy_co2_label:'CO₂-Intensität', energy_co2_badge:'Mittel', energy_co2_sub:'Netz-Emissionsintensität',
    energy_chart_title:'Verbrauch vs. Erzeugung · 24h',
    energy_mix_title:'Energiemix · Aktuell',
    energy_infra_title:'Infrastruktur-Status',
    energy_infra1_title:'Stromnetz MVB', energy_infra1_body:'99.98% Verfügbarkeit · Nominal',
    energy_infra2_title:'Fernwärmenetz',  energy_infra2_body:'Druck normal · 82°C',
    energy_infra3_title:'Solaranlage Dachstaden', energy_infra3_body:'2 Module offline · Wartung geplant',
    energy_infra4_title:'E-Ladenetz',    energy_infra4_body:'42/48 Stationen aktiv',
    // CITY PAGE
    city_title:'Magdeburg entdecken', city_sub:'Geschichte · Kultur · Die Ottostadt an der Elbe',
    city_region:'Sachsen-Anhalt · Landeshauptstadt',
    city_hero_title:'Die Ottostadt an der Elbe',
    city_hero_body:'Magdeburg — gegründet 805 n. Chr. — ist eine der ältesten Städte Deutschlands. Mit über 1.200 Jahren Geschichte, dem ältesten Dom Deutschlands und dem Geburtsort des Luftballons ist die Elbestadt voller Überraschungen.',
    city_stat_pop:'Einwohner', city_stat_area:'Stadtfläche', city_stat_year:'Gründungsjahr',
    hl1_title:'Magdeburger Dom', hl1_body:'Der älteste gotische Dom Deutschlands (geweiht 1363). Kaiser Otto I. ist hier begraben — Begründer des Heiligen Römischen Reiches. Zwei 100-m-Türme prägen die Skyline.',hl1_tag:'📍 Domplatz · Eintritt frei',
    hl2_title:'Geburtsort des Luftballons', hl2_body:'Otto von Guericke (1602–1686) erfand die Luftpumpe und bewies mit seinen berühmten Halbkugeln 1654 die Existenz des Vakuums — in Magdeburg!', hl2_tag:'🔬 Kulturhistorisches Museum',
    hl3_title:'Grünste Großstadt', hl3_body:'Mehr Grünfläche pro Einwohner als jede andere deutsche Großstadt. Rotehornpark, Herrenkrug und Elbauenpark bieten 500+ ha Naherholung.', hl3_tag:'🌳 500+ Hektar Grünfläche',
    hl4_title:'Magdeburger Recht', hl4_body:'Das Stadtrecht aus dem 13. Jh. wurde Vorbild für 1.000+ Städte — von Krakau bis Riga. UNESCO-Dokumentenerbe.', hl4_tag:'🏛️ UNESCO-Dokumentenerbe',
    hl5_title:'Wasserstraßenkreuz', hl5_body:'918 Meter lange Kanalbrücke — Schiffe fahren buchstäblich über die Elbe. Eine der spektakulärsten Wasserbauwerke Europas.', hl5_tag:'🌉 918 m lang · 1998–2003',
    hl6_title:'Händel & Kultur', hl6_body:'Geburtsstadt Georg Friedrich Händels. Opernhaus Magdeburg + jährliches Altstadtfest mit 200.000+ Besuchern im Juni.', hl6_tag:'🎵 Altstadtfest · Juni',
    buga_badge:'IBA 2027 · Stadtentwicklung',
    buga_title:'Smart City Magdeburg 2026–2027',
    buga_body:'Im Zuge der Internationalen Bauausstellung IBA 2027 gestaltet Magdeburg seine Zukunft: digitale Infrastruktur, smarte Mobilität und nachhaltige Stadtentwicklung vereint. Das IMIQ-Projekt am Wissenschaftshafen erprobt intelligente Mobilitätslösungen.',
    // CHATBOT
    chatbot_title:'Magdeburg Assistent', chatbot_status:'Online',
    chatbot_placeholder:'Frag mich über Magdeburg…',
    chatbot_welcome:'Hallo! Ich bin der Magdeburg-Assistent — powered by IMIQ Dashbot. Frag mich zu Sehenswürdigkeiten, ÖPNV, Umweltdaten, Geschichte und mehr!',
    chatbot_send:'Senden',
    chatbot_quick1:'🏛️ Sehenswürdigkeiten', chatbot_q1:'Was kann ich in Magdeburg sehen?',
    chatbot_quick2:'🌬️ Luftqualität',       chatbot_q2:'Wie ist die Luftqualität gerade?',
    chatbot_quick3:'💧 Elbe-Pegel',          chatbot_q3:'Wie hoch ist der Elbe-Pegel?',
    chatbot_quick4:'🚋 ÖPNV',               chatbot_q4:'Welche Straßenbahnen gibt es in Magdeburg?',
    // BADGES & MISC
    badge_good:'Gut', badge_normal:'Normal', badge_current:'Aktuell', badge_medium:'Mittel',
    badge_sharing:'Sharing', badge_active:'Aktiv', badge_moderate:'Mäßig',
    badge_now:'Jetzt', badge_warning:'Warnung', badge_increased:'Erhöht',
    badge_high:'Hoch', badge_low:'Gering', badge_uba_dwd:'DWD',
    badge_mvb_rt:'MVB Echtzeit',
    // FACTS
    facts_label:'Wusstest du?',
    // FOOTER
    footer_data:'Daten: PegelOnline WSV · Open-Meteo · MVB · Stadtwerke MD',
    footer_center:'Smart City Magdeburg · Echtzeit-Dashboard 2026',
    // STATUS
    all_systems_normal:'✓ Alle Systeme normal',
    construction_active:'⚠ 1 Baustelle aktiv',
    last_update_prefix:'Letzte Aktualisierung: ',
    sensors_active:'37 Sensoren aktiv',
    tram_live:'Tram Live',
    places_label:'Orte',
  },
  en: {
    nav_overview:'Overview', nav_mobility:'Mobility', nav_environment:'Environment',
    nav_energy:'Energy', nav_city:'The City',
    mob_nav_overview:'🏙️ Overview', mob_nav_mobility:'🚌 Mobility',
    mob_nav_environment:'🌿 Environment', mob_nav_energy:'⚡ Energy', mob_nav_city:'🏛️ The City',
    live_label:'LIVE',
    overview_title:'City Overview',
    overview_sub:'Updating…',
    chip_ok:'✓ All systems normal',
    chip_warn:'⚠ 1 construction site active',
    kpi_aqi:'Air Quality AQI', kpi_elbe:'Elbe Level', kpi_traffic:'Traffic', kpi_temp:'Temperature',
    kpi_pm25_label:'PM2.5', kpi_elbe_sub:'Strombrücke · cm a.s.l.',
    kpi_traffic_sub:'% load · City center', kpi_humidity_sub:'Humidity:',
    map_title:'City Map · Magdeburg',
    map_filter_all:'All', map_filter_restaurants:'🍽 Restaurants', map_filter_cafes:'☕ Cafés',
    map_filter_bars:'🍺 Bars', map_filter_sights:'⭐ Sights',
    map_filter_trams:'🚋 Trams', map_filter_buses:'🚌 Buses', map_filter_sbahn:'🚂 S-Bahn',
    legend_tram:'Tram Stop', legend_bus:'Bus Stop', legend_sbahn:'S-Bahn',
    legend_restaurant:'Restaurant', legend_cafe:'Café', legend_bar:'Bar', legend_sight:'Sight',
    map_locate_btn:'📍 My Location',
    alerts_title:'Active Alerts',
    alert1_title:'Water main break · Breiter Weg', alert1_body:'Road closed · Crew on site · Est. 3h',
    alert2_title:'Congestion A2 west exit',        alert2_body:'+18 min travel delay · B1 recommended',
    alert3_title:'Air quality improved',           alert3_body:'PM2.5 below WHO limit · Good for outdoors',
    parking_title:'Parking Guide',
    transit_title:'Transit Load',
    free:'free',
    overview_energy_title:'Energy Mix · Now',
    overview_traffic_title:'Traffic Load · Today',
    mob_title:'Mobility', mob_sub:'Transit · Traffic · Sharing · Parking',
    mob_bikes_label:'Active Bikes', mob_sharing_badge:'Sharing',
    mob_scooter_label:'E-Scooters', mob_scooter_badge:'Active',
    mob_jams_label:'Active Jams', mob_jams_badge:'Moderate',
    mob_charging_label:'EV Chargers', mob_charging_sub:'active · 87.5%',
    transit_full_title:'Transit Line Load · Live', transit_realtime:'MVB · updated every 30s',
    traffic_24h:'Traffic Flow · 24h',
    parking_all_title:'Parking Guide · All',
    pt_header_name:'Car Park', pt_header_free:'Free', pt_header_total:'Total', pt_header_status:'Status',
    env_title:'Environment & Climate', env_sub:'Air · Water · Noise · Temperatures',
    env_temp_label:'Temperature', env_temp_sub:'Air temperature · Magdeburg',
    env_humidity_label:'Humidity', env_humidity_sub:'Relative humidity',
    env_aqi_label:'Air Quality AQI', env_aqi_sub:'European AQI',
    env_noise_label:'Noise Level', env_noise_sub:'dB · City center avg.',
    elbe_chart_title:'Elbe Level · 30-Day Trend',
    elbe_current:'Current (cm)', elbe_warn1:'Warning 1', elbe_warn2:'Warning 2', elbe_warn3:'Warning 3',
    aqi_components_title:'Air Quality Components', aqi_source:'Open-Meteo AQI',
    temp_7day_title:'Temperature · 7-Day Trend',
    wind_title:'Wind Speed', wind_kmh:'km/h', wind_gusts:'Gusts km/h', wind_dir:'Direction',
    energy_title:'Energy', energy_sub:'Generation · Consumption · Grid · Renewables',
    energy_consumption_label:'Power Consumption', energy_consumption_badge:'Now',
    energy_consumption_sub:'City-wide demand',
    energy_solar_label:'Solar Output', energy_solar_badge:'Active', energy_solar_sub:'City solar park',
    energy_wind_label:'Wind Energy', energy_wind_badge:'Active', energy_wind_sub:'Magdeburg wind farm',
    energy_co2_label:'CO₂ Intensity', energy_co2_badge:'Medium', energy_co2_sub:'Grid emission intensity',
    energy_chart_title:'Consumption vs. Generation · 24h',
    energy_mix_title:'Energy Mix · Current',
    energy_infra_title:'Infrastructure Status',
    energy_infra1_title:'Grid MVB', energy_infra1_body:'99.98% availability · Nominal',
    energy_infra2_title:'District Heating', energy_infra2_body:'Pressure normal · 82°C',
    energy_infra3_title:'Solar Plant Dachstaden', energy_infra3_body:'2 modules offline · Maintenance planned',
    energy_infra4_title:'EV Charging Network', energy_infra4_body:'42/48 stations active',
    city_title:'Discover Magdeburg', city_sub:'History · Culture · The Otto City on the Elbe',
    city_region:'Saxony-Anhalt · State Capital',
    city_hero_title:'The Otto City on the Elbe',
    city_hero_body:'Magdeburg — founded in 805 AD — is one of Germany\'s oldest cities. With over 1,200 years of history, Germany\'s oldest Gothic cathedral, and birthplace of the vacuum pump, this Elbe city is full of surprises.',
    city_stat_pop:'Residents', city_stat_area:'City area', city_stat_year:'Founded',
    hl1_title:'Magdeburg Cathedral', hl1_body:'Germany\'s oldest Gothic cathedral (consecrated 1363). Emperor Otto I is buried here — founder of the Holy Roman Empire. Two 100m towers define the skyline.', hl1_tag:'📍 Domplatz · Free entry',
    hl2_title:'Birthplace of the Vacuum', hl2_body:'Otto von Guericke (1602–1686) invented the air pump and proved the vacuum with his famous hemispheres in 1654 — right here in Magdeburg!', hl2_tag:'🔬 Cultural History Museum',
    hl3_title:'Germany\'s Greenest City', hl3_body:'More green space per resident than any other major German city. Rotehornpark, Herrenkrug and Elbauenpark offer 500+ ha of recreation.', hl3_tag:'🌳 500+ hectares of parks',
    hl4_title:'Magdeburg Law', hl4_body:'The 13th-century city law became the model for 1,000+ cities from Kraków to Riga. UNESCO documentary heritage.', hl4_tag:'🏛️ UNESCO Heritage',
    hl5_title:'Waterway Crossroads', hl5_body:'918-metre canal bridge — ships literally sail over the Elbe. One of Europe\'s most spectacular hydraulic engineering works.', hl5_tag:'🌉 918 m long · 1998–2003',
    hl6_title:'Händel & Culture', hl6_body:'Birthplace of Georg Friedrich Händel. Opera house + annual Altstadtfest with 200,000+ visitors in June.', hl6_tag:'🎵 Altstadtfest · June',
    buga_badge:'IBA 2027 · Urban Development',
    buga_title:'Smart City Magdeburg 2026–2027',
    buga_body:'As part of the International Building Exhibition IBA 2027, Magdeburg is shaping its future: digital infrastructure, smart mobility and sustainable urban development combined. The IMIQ project at the Science Harbor is testing intelligent mobility solutions.',
    chatbot_title:'Magdeburg Assistant', chatbot_status:'Online',
    chatbot_placeholder:'Ask me about Magdeburg…',
    chatbot_welcome:'Hello! I\'m the Magdeburg Assistant — powered by IMIQ Dashbot. Ask me about sights, transit, environment data, history and more!',
    chatbot_send:'Send',
    chatbot_quick1:'🏛️ Sights',       chatbot_q1:'What can I see in Magdeburg?',
    chatbot_quick2:'🌬️ Air Quality',  chatbot_q2:'What is the current air quality?',
    chatbot_quick3:'💧 Elbe Level',    chatbot_q3:'What is the Elbe water level?',
    chatbot_quick4:'🚋 Transit',       chatbot_q4:'What tram lines exist in Magdeburg?',
    badge_good:'Good', badge_normal:'Normal', badge_current:'Current', badge_medium:'Medium',
    badge_sharing:'Sharing', badge_active:'Active', badge_moderate:'Moderate',
    badge_now:'Now', badge_warning:'Warning', badge_increased:'Elevated',
    badge_high:'High', badge_low:'Low', badge_uba_dwd:'DWD',
    badge_mvb_rt:'MVB Live',
    facts_label:'Did you know?',
    footer_data:'Data: PegelOnline WSV · Open-Meteo · MVB · Stadtwerke MD',
    footer_center:'Smart City Magdeburg · Real-Time Dashboard 2026',
    all_systems_normal:'✓ All systems normal',
    construction_active:'⚠ 1 construction site active',
    last_update_prefix:'Last update: ',
    sensors_active:'37 sensors active',
    tram_live:'Tram Live',
    places_label:'Places',
  }
};

let currentLang = 'de';
function t(key) { return (TRANSLATIONS[currentLang] || TRANSLATIONS.de)[key] || key; }

// ======================================================
// STATE
// ======================================================
const state = {
  elbe: null, weather: null, airQuality: null,
  lastWeatherFetch: 0,
  charts: {}, elbeHistory: [],
  trafficHistory: Array.from({length:24}, (_,i) => ({
    hour: i,
    load: 20 + Math.round(Math.sin(i * 0.4) * 25 + Math.random() * 20 + (i>7&&i<9||i>16&&i<19 ? 35 : 0))
  })),
  transitLines: [
    { name:'Tram 1 · Hauptbahnhof', load:72, max:100 },
    { name:'Tram 2 · Sudenburg',     load:45, max:100 },
    { name:'Tram 3 · Barleber See',  load:88, max:100 },
    { name:'Bus 51 · Rotehorn',      load:31, max:100 },
    { name:'Bus 60 · Alte Neustadt', load:59, max:100 },
    { name:'Bus 62 · Herrenkrug',    load:23, max:100 },
    { name:'S-Bahn · Schönebeck',    load:67, max:100 },
  ],
  parking: { hbf:312, alter:88, allee:207, breiter:14 },
  live: {
    aqi: 42, pm25: 12, traffic: 58, noise: 58,
    bikes: 178, scooters: 293, jams: 4,
    solar: 47, wind_energy: 118, consumption: 312, co2: 189
  },
  tramMarkers: [],
  tramPositions: [],
  layerGroups: {},
  userMarker: null,
  weatherDisplay: null,
};

// ======================================================
// CLOCK
// ======================================================
function startClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  function tick() { el.textContent = new Date().toLocaleTimeString('de-DE'); }
  tick(); setInterval(tick, 1000);
}

// ======================================================
// LANGUAGE TOGGLE
// ======================================================
function initLangToggle() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    btn.textContent = currentLang === 'de' ? 'EN' : 'DE';
    applyTranslations();
    // re-render dynamic content
    renderTransitBars('transit-bars');
    renderTransitBars('transit-bars-full');
    if (state.weatherDisplay) {
      setEl('kpi-weather-desc', wmoDesc(state.weatherDisplay.code));
      setEl('env-temp', state.weatherDisplay.temp + '°');
    }
  });
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && 'placeholder' in el) {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
  const ci = document.getElementById('chat-input');
  if (ci) ci.placeholder = t('chatbot_placeholder');
}

// ======================================================
// PAGE NAV
// ======================================================
function initNav() {
  document.querySelectorAll('.nav-tab, .mobile-nav-item').forEach(tab => {
    tab.addEventListener('click', () => switchPage(tab.dataset.page));
  });
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.getElementById('mobile-nav-overlay').classList.add('open');
  });
  document.getElementById('mobile-nav-close')?.addEventListener('click', () => {
    document.getElementById('mobile-nav-overlay').classList.remove('open');
  });
  document.getElementById('mobile-nav-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
  });
}

function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab, .mobile-nav-item').forEach(t => t.classList.remove('active'));
  document.getElementById('page-' + pageId)?.classList.add('active');
  document.querySelectorAll(`[data-page="${pageId}"]`).forEach(t => t.classList.add('active'));
  document.getElementById('mobile-nav-overlay')?.classList.remove('open');

  document.querySelectorAll(`#page-${pageId} .anim-in`).forEach(el => {
    el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
  });

  if (pageId === 'environment' && !state.charts.elbe) initEnvCharts();
  if (pageId === 'energy' && !state.charts.energy) initEnergyCharts();
  if (pageId === 'mobility') renderTransitBars('transit-bars-full');
}

// ======================================================
// POI DATA — Restaurants, Cafes, Bars, Sights
// (Based on IMIQ map data from Magdeburg)
// ======================================================
const POIS = [
  // RESTAURANTS
  { lat:52.1208, lng:11.6312, type:'restaurant', name:'Anas Grill',             detail:'Halal · Döner & Grill', link:'https://imiq-public.et.uni-magdeburg.de/?id=Rest%3AAnasGrill' },
  { lat:52.1190, lng:11.6270, type:'restaurant', name:'Zur Alten Schmiede',      detail:'Deutsche Küche · Traditionell' },
  { lat:52.1220, lng:11.6280, type:'restaurant', name:'Restaurant Domplatz',     detail:'Regionale Küche · Domplatz' },
  { lat:52.1175, lng:11.6240, type:'restaurant', name:'Petrikrog',               detail:'Fisch & Fleisch · Magdeburg' },
  { lat:52.1260, lng:11.6290, type:'restaurant', name:'Lieblingsplatz',          detail:'Café & Restaurant' },
  { lat:52.1198, lng:11.6150, type:'restaurant', name:'Ratswaage Restaurant',    detail:'Internationale Küche' },
  { lat:52.1235, lng:11.6340, type:'restaurant', name:'Brauhaus am Hasselbachpl.',detail:'Brauhaus · Regionale Küche' },
  { lat:52.1170, lng:11.6185, type:'restaurant', name:'Stadtfeld Stube',         detail:'Bistro · Mittagstisch' },
  // CAFES
  { lat:52.1215, lng:11.6300, type:'cafe', name:'Café Central',        detail:'Kaffee & Kuchen · Innenstadt' },
  { lat:52.1230, lng:11.6255, type:'cafe', name:'Kaffeebar am Dom',    detail:'Specialty Coffee' },
  { lat:52.1185, lng:11.6320, type:'cafe', name:'Café Tomate',         detail:'Bio · Vegan · Brunch' },
  { lat:52.1245, lng:11.6385, type:'cafe', name:'Eiscafé Venezia',     detail:'Eis & Kaffee · Altstadt' },
  { lat:52.1202, lng:11.6265, type:'cafe', name:'Literaturcafé',       detail:'Bücher & Kaffee' },
  { lat:52.1218, lng:11.6192, type:'cafe', name:'Café Stadtfeld',      detail:'Frühstück & Brunch' },
  // BARS
  { lat:52.1210, lng:11.6285, type:'bar', name:'Festung Mark Bar',   detail:'Live Music · Cocktails' },
  { lat:52.1195, lng:11.6345, type:'bar', name:'Hassi Bar',           detail:'Hasselbachplatz · Cocktails' },
  { lat:52.1228, lng:11.6260, type:'bar', name:'Bierhof Remise',      detail:'Craft Beer · Altstadt' },
  { lat:52.1202, lng:11.6295, type:'bar', name:'7grad Bar',           detail:'Cocktails · Lounge' },
  { lat:52.1238, lng:11.6338, type:'bar', name:'Studentenkeller',     detail:'Studentenclub · Günstig' },
  // SIGHTS
  { lat:52.1213, lng:11.6275, type:'sight', name:'Magdeburger Dom',        detail:'Gotischer Dom · 1363 · Kaiser Otto I.' },
  { lat:52.1280, lng:11.6340, type:'sight', name:'Grüne Zitadelle',        detail:'Hundertwasser Architektur · 2005' },
  { lat:52.1165, lng:11.6182, type:'sight', name:'Kulturhistorisches Museum', detail:'Otto von Guericke · Halbkugeln' },
  { lat:52.1155, lng:11.6390, type:'sight', name:'Albinmüller-Turm',       detail:'Elbauenpark · Panoramablick' },
  { lat:52.1340, lng:11.6460, type:'sight', name:'Herrenkrug Park',        detail:'Naturpark · Elbauen' },
  { lat:52.1090, lng:11.6250, type:'sight', name:'Rotehornpark',           detail:'Stadtpark · Elbe' },
  { lat:52.1300, lng:11.6200, type:'sight', name:'Jahrtausendturm',        detail:'Millennium Tower · Elbauenpark' },
  { lat:52.1188, lng:11.6290, type:'sight', name:'Kloster Unser Lieben Frauen', detail:'Romanische Klosterkirche · Kunstmuseum' },
];

// ======================================================
// TRANSIT STOPS — Real Magdeburg MVB stops
// ======================================================
const TRAM_STOPS = [
  { lat:52.1305, lng:11.6275, name:'Hauptbahnhof',            lines:'Tram 1,2,3,4,5,6,8,9,10' },
  { lat:52.1213, lng:11.6278, name:'Domplatz',                lines:'Tram 1,5,6,8' },
  { lat:52.1232, lng:11.6318, name:'Alter Markt',             lines:'Tram 1,2,5,9' },
  { lat:52.1196, lng:11.6255, name:'Hasselbachplatz',         lines:'Tram 3,6,8,9,10' },
  { lat:52.1150, lng:11.6210, name:'Sudenburg Markt',         lines:'Tram 2,6' },
  { lat:52.1388, lng:11.6320, name:'Barleber See',            lines:'Tram 3' },
  { lat:52.1270, lng:11.6395, name:'Universitätsplatz',       lines:'Tram 4,9' },
  { lat:52.1110, lng:11.6160, name:'Westerhüsen',             lines:'Tram 10' },
  { lat:52.1330, lng:11.6215, name:'Neue Neustadt',           lines:'Tram 3,5' },
  { lat:52.1245, lng:11.6170, name:'Wilhelmstädter Straße',   lines:'Tram 2' },
  { lat:52.1175, lng:11.6312, name:'Jakobstraße',             lines:'Tram 1,6' },
  { lat:52.1258, lng:11.6240, name:'Breiter Weg',             lines:'Tram 1,4,9,10' },
];

const BUS_STOPS = [
  { lat:52.1308, lng:11.6282, name:'Hauptbahnhof (Bus)',       lines:'Bus 51,52,53,60,61,62,73' },
  { lat:52.1220, lng:11.6350, name:'Allee-Center',             lines:'Bus 51,60,73' },
  { lat:52.1095, lng:11.6305, name:'Rotehorn',                 lines:'Bus 51' },
  { lat:52.1350, lng:11.6480, name:'Herrenkrug',               lines:'Bus 62' },
  { lat:52.1160, lng:11.6400, name:'Elbauenpark',              lines:'Bus 74' },
  { lat:52.1210, lng:11.6195, name:'Stadtfeld West',           lines:'Bus 60,61' },
  { lat:52.1380, lng:11.6200, name:'Sternbrücke Nord',         lines:'Bus 64,65' },
  { lat:52.1140, lng:11.6100, name:'Sudenburg West',           lines:'Bus 70,71' },
];

const SBAHN_STOPS = [
  { lat:52.1305, lng:11.6275, name:'Magdeburg Hauptbahnhof',   lines:'S1 · RE · IC/ICE' },
  { lat:52.1050, lng:11.6180, name:'Magdeburg-Buckau',         lines:'S1' },
  { lat:52.1415, lng:11.6360, name:'Magdeburg-Neustadt',       lines:'S1,S2' },
  { lat:52.1500, lng:11.6430, name:'Magdeburg-Rothensee',      lines:'S1' },
];

// Tram route paths for animation
const TRAM_ROUTES = [
  { name:'Tram 1', waypoints:[[52.1150,11.6205],[52.1175,11.6230],[52.1196,11.6260],[52.1213,11.6278],[52.1232,11.6310],[52.1258,11.6340],[52.1295,11.6375]] },
  { name:'Tram 2', waypoints:[[52.1150,11.6210],[52.1170,11.6240],[52.1196,11.6260],[52.1213,11.6278],[52.1250,11.6268],[52.1290,11.6260],[52.1305,11.6275]] },
  { name:'Tram 3', waypoints:[[52.1305,11.6275],[52.1290,11.6275],[52.1255,11.6282],[52.1213,11.6278],[52.1196,11.6255],[52.1170,11.6240],[52.1140,11.6200]] },
  { name:'Tram 5', waypoints:[[52.1305,11.6275],[52.1295,11.6290],[52.1270,11.6310],[52.1232,11.6318],[52.1213,11.6278],[52.1196,11.6260],[52.1170,11.6250]] },
];

// ======================================================
// LEAFLET MAP
// ======================================================
function initMap() {
  const map = L.map('city-map', { center:[MAGDEBURG.lat, MAGDEBURG.lng], zoom:13, zoomControl:true });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'© OpenStreetMap', maxZoom:19,
  }).addTo(map);

  // Layer groups
  const lgRestaurants = L.layerGroup();
  const lgCafes       = L.layerGroup();
  const lgBars        = L.layerGroup();
  const lgSights      = L.layerGroup();
  const lgTrams       = L.layerGroup();
  const lgBuses       = L.layerGroup();
  const lgSbahn       = L.layerGroup();
  const lgTramAnim    = L.layerGroup();

  state.layerGroups = { restaurants:lgRestaurants, cafes:lgCafes, bars:lgBars, sights:lgSights, trams:lgTrams, buses:lgBuses, sbahn:lgSbahn, tramAnim:lgTramAnim };

  const TYPE_EMOJI = { restaurant:'🍽', cafe:'☕', bar:'🍺', sight:'⭐' };

  // Add POIs
  POIS.forEach(p => {
    const icon = L.divIcon({
      className:'',
      html:`<div class="poi-marker poi-${p.type}" title="${p.name}">${TYPE_EMOJI[p.type]||'📍'}</div>`,
      iconSize:[30,30], iconAnchor:[15,15],
    });
    const popup = p.link
      ? `<b>${p.name}</b><br><span class="pop-detail">${p.detail}</span><br><a href="${p.link}" target="_blank" style="color:#FF6B30;font-size:10px">IMIQ →</a>`
      : `<b>${p.name}</b><br><span class="pop-detail">${p.detail}</span>`;
    const marker = L.marker([p.lat, p.lng], {icon}).bindPopup(popup);
    state.layerGroups[p.type === 'restaurant' ? 'restaurants' : p.type === 'cafe' ? 'cafes' : p.type === 'bar' ? 'bars' : 'sights'].addLayer(marker);
  });

  // Tram stops
  TRAM_STOPS.forEach(s => {
    const icon = L.divIcon({
      className:'',
      html:`<div class="transit-stop-marker tram-stop" title="${s.name}">🚋</div>`,
      iconSize:[28,28], iconAnchor:[14,14],
    });
    lgTrams.addLayer(L.marker([s.lat, s.lng], {icon}).bindPopup(`<b>${s.name}</b><br><span class="pop-detail">${s.lines}</span>`));
  });

  // Bus stops
  BUS_STOPS.forEach(s => {
    const icon = L.divIcon({
      className:'',
      html:`<div class="transit-stop-marker bus-stop" title="${s.name}">🚌</div>`,
      iconSize:[28,28], iconAnchor:[14,14],
    });
    lgBuses.addLayer(L.marker([s.lat, s.lng], {icon}).bindPopup(`<b>${s.name}</b><br><span class="pop-detail">${s.lines}</span>`));
  });

  // S-Bahn stops
  SBAHN_STOPS.forEach(s => {
    const icon = L.divIcon({
      className:'',
      html:`<div class="transit-stop-marker sbahn-stop" title="${s.name}">🚂</div>`,
      iconSize:[28,28], iconAnchor:[14,14],
    });
    lgSbahn.addLayer(L.marker([s.lat, s.lng], {icon}).bindPopup(`<b>${s.name}</b><br><span class="pop-detail">${s.lines}</span>`));
  });

  // Animated trams (moving icons — 🚋 emoji)
  TRAM_ROUTES.forEach((route, ri) => {
    const startFrac = Math.random();
    state.tramPositions.push({ route, frac:startFrac, dir:1 });

    const icon = L.divIcon({
      className:'',
      html:`<div class="tram-anim-marker" title="${route.name}">🚋</div>`,
      iconSize:[28,28], iconAnchor:[14,14],
    });
    const pos = interpolateRoute(route.waypoints, startFrac);
    const marker = L.marker(pos, {icon}).bindPopup(`<b>🚋 ${route.name}</b><br><span class="pop-detail">Live-Position</span>`);
    lgTramAnim.addLayer(marker);
    state.tramMarkers.push(marker);
  });

  // Animate trams every 2s
  setInterval(animateTrams, 2000);

  // Add all layers by default
  Object.values(state.layerGroups).forEach(lg => lg.addTo(map));

  // Map filter logic
  document.querySelectorAll('.map-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const layer = btn.dataset.layer;
      if (layer === 'all') {
        document.querySelectorAll('.map-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        Object.values(state.layerGroups).forEach(lg => lg.addTo(map));
        return;
      }
      document.querySelector('.map-filter[data-layer="all"]')?.classList.remove('active');
      btn.classList.toggle('active');

      const active = new Set([...document.querySelectorAll('.map-filter.active')].map(b => b.dataset.layer));
      if (active.size === 0) {
        document.querySelector('.map-filter[data-layer="all"]')?.classList.add('active');
        Object.values(state.layerGroups).forEach(lg => lg.addTo(map));
        return;
      }

      const show = (name, condition) => condition ? state.layerGroups[name]?.addTo(map) : map.removeLayer(state.layerGroups[name]);
      show('restaurants', active.has('restaurants'));
      show('cafes',       active.has('cafes'));
      show('bars',        active.has('bars'));
      show('sights',      active.has('sights'));
      show('trams',       active.has('trams'));
      show('tramAnim',    active.has('trams'));
      show('buses',       active.has('buses'));
      show('sbahn',       active.has('sbahn'));
    });
  });

  // User location button
  const locBtn = L.control({position:'topright'});
  locBtn.onAdd = function() {
    const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control locate-btn');
    div.innerHTML = `<a href="#" title="My Location" style="font-size:16px;display:flex;align-items:center;justify-content:center;width:34px;height:34px;background:var(--red-dark);border:1px solid var(--red);border-radius:6px;color:white;text-decoration:none">📍</a>`;
    L.DomEvent.on(div.querySelector('a'), 'click', e => { L.DomEvent.preventDefault(e); locateUser(map); });
    return div;
  };
  locBtn.addTo(map);

  state.map = map;
}

function interpolateRoute(waypoints, frac) {
  frac = Math.max(0, Math.min(1, frac));
  const n = waypoints.length - 1;
  const idx = Math.floor(frac * n);
  const rem = frac * n - idx;
  if (idx >= n) return waypoints[n];
  const a = waypoints[idx], b = waypoints[idx+1];
  return [a[0]+(b[0]-a[0])*rem, a[1]+(b[1]-a[1])*rem];
}

function animateTrams() {
  state.tramPositions.forEach((tp, i) => {
    tp.frac += tp.dir * 0.035;
    if (tp.frac >= 1) { tp.frac = 1; tp.dir = -1; }
    if (tp.frac <= 0) { tp.frac = 0; tp.dir = 1; }
    state.tramMarkers[i].setLatLng(interpolateRoute(tp.route.waypoints, tp.frac));
  });
}

function locateUser(map) {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    if (state.userMarker) map.removeLayer(state.userMarker);
    const icon = L.divIcon({ className:'', html:`<div class="user-marker"></div>`, iconSize:[18,18], iconAnchor:[9,9] });
    state.userMarker = L.marker([latitude, longitude], {icon}).addTo(map);
    state.userMarker.bindPopup('<b>📍 Dein Standort</b>').openPopup();
    map.setView([latitude, longitude], 15);
  }, () => map.setView([MAGDEBURG.lat, MAGDEBURG.lng], 14));
}

// ======================================================
// FETCH: ELBE
// ======================================================
async function fetchElbe() {
  try {
    const stRes = await fetch(`${PEGEL_BASE}/stations.json?waters=ELBE`);
    if (!stRes.ok) throw new Error('station list failed');
    const stations = await stRes.json();
    const station = stations.find(s => s.shortname?.toUpperCase().includes('MAGDEBURG') && s.longname?.toUpperCase().includes('STROM'))
                  || stations.find(s => s.shortname?.toUpperCase().includes('MAGDEBURG'));
    if (!station) throw new Error('not found');
    const measRes = await fetch(`${PEGEL_BASE}/stations/${station.uuid}/W/currentmeasurement.json`);
    if (!measRes.ok) throw new Error('meas failed');
    const meas = await measRes.json();
    const v = Math.round(meas.value);
    state.elbe = v;
    updateElbeUI(v);
    fetchElbeHistory(station.uuid);
  } catch {
    const v = Math.round(180 + Math.random() * 40);
    state.elbe = v;
    updateElbeUI(v);
    generateSimElbeHistory();
  }
}

async function fetchElbeHistory(uuid) {
  try {
    const end = new Date().toISOString();
    const start = new Date(Date.now() - 30*24*3600*1000).toISOString();
    const res = await fetch(`${PEGEL_BASE}/stations/${uuid}/W/measurements.json?start=${start}&end=${end}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    const step = Math.max(1, Math.floor(data.length/30));
    state.elbeHistory = data.filter((_,i)=>i%step===0).slice(-30).map(d=>({
      date: new Date(d.timestamp).toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'}),
      value: Math.round(d.value)
    }));
    if (state.charts.elbe) updateElbeChart();
  } catch { generateSimElbeHistory(); }
}

function generateSimElbeHistory() {
  let v = 190;
  state.elbeHistory = Array.from({length:30}, (_,i) => {
    v += (Math.random()-0.48)*12; v = Math.max(100, Math.min(350,v));
    const d = new Date(Date.now()-(29-i)*24*3600*1000);
    return { date:d.toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'}), value:Math.round(v) };
  });
  if (state.charts.elbe) updateElbeChart();
}

function updateElbeUI(cm) {
  const dm = (cm/100).toFixed(2);
  const el = document.getElementById('kpi-elbe');
  if (el) { el.textContent = dm+' m'; flash(el.closest('.kpi-card')); }
  const pct = Math.min(100, Math.round(cm/590*100));
  const fill = document.getElementById('river-fill');
  if (fill) fill.style.width = pct+'%';
  const badge = document.getElementById('elbe-badge');
  if (badge) {
    if (cm>=590) { badge.className='badge badge-red';   badge.textContent=t('badge_warning'); }
    else if (cm>=400){ badge.className='badge badge-amber'; badge.textContent=t('badge_increased'); }
    else              { badge.className='badge badge-green'; badge.textContent=t('badge_normal'); }
  }
  setEl('elbe-live-val', cm);
  const eb2 = document.getElementById('elbe-chart-badge');
  if (eb2) {
    if (cm>=590){ eb2.className='badge badge-red'; eb2.textContent=t('badge_warning'); }
    else        { eb2.className='badge badge-green'; eb2.textContent=t('badge_normal'); }
  }
}

// ======================================================
// FETCH: WEATHER
// ======================================================
async function fetchWeather() {
  try {
    const url = `${WEATHER_BASE}/forecast?latitude=${LAT}&longitude=${LNG}`+
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code`+
      `&daily=temperature_2m_max,temperature_2m_min&wind_speed_unit=kmh&timezone=Europe%2FBerlin&forecast_days=7`;
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    state.weather = data;
    updateWeatherUI(data);
  } catch {
    if (!state.weather) updateWeatherUIFallback();
  }
}

const WMO_DE = {0:'Klar',1:'Überwiegend klar',2:'Teilweise bewölkt',3:'Bewölkt',45:'Nebel',48:'Reifnebel',51:'Leichter Niesel',53:'Niesel',55:'Starker Niesel',61:'Leichter Regen',63:'Regen',65:'Starker Regen',71:'Leichter Schnee',73:'Schnee',80:'Schauer',81:'Starke Schauer',95:'Gewitter',96:'Gewitter mit Hagel'};
const WMO_EN = {0:'Clear',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',48:'Rime fog',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',71:'Light snow',73:'Snow',80:'Showers',81:'Heavy showers',95:'Thunderstorm',96:'Thunderstorm & hail'};
function wmoDesc(code) { return (currentLang==='en'?WMO_EN:WMO_DE)[code]||'–'; }

function updateWeatherUI(data) {
  const c = data.current;
  const temp = c.temperature_2m?.toFixed(1) ?? '--';
  const hum  = Math.round(c.relative_humidity_2m ?? 0);
  const wSpd = Math.round(c.wind_speed_10m ?? 0);
  const wGst = Math.round(c.wind_gusts_10m ?? 0);
  const wDir = Math.round(c.wind_direction_10m ?? 0);
  state.weatherDisplay = { temp, hum, wSpd, wGst, wDir, code:c.weather_code };

  setEl('kpi-temp', temp+'°');
  setEl('kpi-humidity', hum+'%');
  setEl('kpi-weather-desc', wmoDesc(c.weather_code));
  setEl('env-temp', temp+'°');
  setEl('env-humidity', hum+'%');
  setEl('wind-speed', wSpd);
  setEl('wind-gusts', wGst);
  setEl('wind-dir-label', degToCompass(wDir));
  const needle = document.getElementById('compass-needle');
  if (needle) needle.style.transform = `translate(-50%,-100%) rotate(${wDir}deg)`;
  if (data.daily && state.charts.temp) updateTempChart(data.daily);
}

function updateWeatherUIFallback() {
  setEl('kpi-temp','18°'); setEl('kpi-humidity','65%'); setEl('kpi-weather-desc', wmoDesc(2));
  setEl('env-temp','18°'); setEl('env-humidity','65%');
  setEl('wind-speed','14'); setEl('wind-gusts','22'); setEl('wind-dir-label','NW');
}

function degToCompass(deg) {
  const dirs=['N','NNO','NO','ONO','O','OSO','SO','SSO','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg/22.5)%16];
}

// ======================================================
// FETCH: AIR QUALITY
// ======================================================
async function fetchAirQuality() {
  try {
    const url = `${AQI_BASE}/air-quality?latitude=${LAT}&longitude=${LNG}`+
      `&current=european_aqi,pm2_5,pm10,nitrogen_dioxide,ozone,carbon_monoxide&timezone=Europe%2FBerlin`;
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    state.airQuality = data;
    updateAQIUI(data);
  } catch {
    if (!state.airQuality) updateAQIUIFallback();
  }
}

function updateAQIUI(data) {
  const c = data.current;
  const aqi = Math.round(c.european_aqi ?? 42);
  const pm25 = (c.pm2_5 ?? 12).toFixed(1);
  const pm10 = Math.round(c.pm10 ?? 18);
  const no2  = Math.round(c.nitrogen_dioxide ?? 22);
  const o3   = Math.round(c.ozone ?? 48);
  const co   = (c.carbon_monoxide ?? 180).toFixed(0);
  state.live.aqi = aqi; state.live.pm25 = pm25;
  setEl('kpi-aqi', aqi); setEl('kpi-pm25', pm25); setEl('env-aqi', aqi);
  ['aqi-badge','env-aqi-badge'].forEach(id => {
    const el = document.getElementById(id); if (!el) return;
    if (aqi<=20)      { el.className='badge badge-green'; el.textContent='Sehr gut'; }
    else if (aqi<=40) { el.className='badge badge-green'; el.textContent=t('badge_good'); }
    else if (aqi<=60) { el.className='badge badge-amber'; el.textContent='Mäßig'; }
    else              { el.className='badge badge-red';   el.textContent='Schlecht'; }
  });
  renderAQIBreakdown([
    {label:'PM2.5', value:parseFloat(pm25), max:25,  unit:'µg/m³', color:'var(--red)'},
    {label:'PM10',  value:pm10,             max:50,  unit:'µg/m³', color:'var(--amber)'},
    {label:'NO₂',   value:no2,              max:200, unit:'µg/m³', color:'var(--blue)'},
    {label:'O₃',    value:o3,               max:180, unit:'µg/m³', color:'var(--green)'},
    {label:'CO',    value:parseFloat(co)/10,max:100, unit:'×10µg/m³', color:'var(--muted)'},
  ]);
}

function updateAQIUIFallback() {
  renderAQIBreakdown([
    {label:'PM2.5', value:12, max:25,  unit:'µg/m³', color:'var(--red)'},
    {label:'PM10',  value:18, max:50,  unit:'µg/m³', color:'var(--amber)'},
    {label:'NO₂',   value:22, max:200, unit:'µg/m³', color:'var(--blue)'},
    {label:'O₃',    value:48, max:180, unit:'µg/m³', color:'var(--green)'},
    {label:'CO',    value:18, max:100, unit:'×10µg/m³', color:'var(--muted)'},
  ]);
}

function renderAQIBreakdown(items) {
  const el = document.getElementById('aqi-breakdown'); if (!el) return;
  el.innerHTML = items.map(item => {
    const pct = Math.min(100, Math.round(item.value/item.max*100));
    return `<div class="aqi-item">
      <span class="aqi-item-label">${item.label}</span>
      <div class="aqi-track"><div class="aqi-fill" style="width:${pct}%;background:${item.color}"></div></div>
      <span class="aqi-val">${item.value} ${item.unit}</span>
    </div>`;
  }).join('');
}

// ======================================================
// CHARTS
// ======================================================
const CHART_DEFAULTS = {
  responsive:true, maintainAspectRatio:false,
  plugins:{
    legend:{display:false},
    tooltip:{backgroundColor:'var(--red-dark)', titleFont:{family:'DM Mono'}, bodyFont:{family:'DM Mono'}}
  },
  animation:{duration:600, easing:'easeOutQuart'},
};

function makeGradient(ctx, c1, c2) {
  const g = ctx.createLinearGradient(0,0,0,ctx.canvas.height);
  g.addColorStop(0,c1); g.addColorStop(1,c2); return g;
}

function initSparklines() {
  ['aqi','traffic'].forEach(key => {
    const container = document.getElementById('spark-'+key); if (!container) return;
    const canvas = document.createElement('canvas');
    canvas.style.width='100%'; canvas.style.height='32px';
    container.appendChild(canvas);
    const pts = Array.from({length:20}, ()=>Math.random()*60+20);
    state.charts['spark_'+key] = new Chart(canvas.getContext('2d'), {
      type:'line',
      data:{labels:pts.map((_,i)=>i),datasets:[{data:pts,borderColor:key==='aqi'?'#E84E0C':'#b45309',borderWidth:1.5,pointRadius:0,fill:true,backgroundColor:key==='aqi'?'rgba(232,78,12,0.08)':'rgba(180,83,9,0.08)',tension:0.4}]},
      options:{...CHART_DEFAULTS, scales:{x:{display:false},y:{display:false}}, plugins:{legend:{display:false},tooltip:{enabled:false}}, animation:{duration:0}}
    });
  });
}

// FIXED: Traffic chart — initialize once at startup, never destroy
function initMobilityCharts() {
  const canvas = document.getElementById('trafficChart');
  if (!canvas || state.charts.traffic) return;
  const ctx = canvas.getContext('2d');
  const hours = state.trafficHistory.map(d=>d.hour+':00');
  const loads  = state.trafficHistory.map(d=>d.load);
  const grad = makeGradient(ctx,'rgba(180,83,9,0.4)','rgba(180,83,9,0.02)');
  state.charts.traffic = new Chart(ctx, {
    type:'line',
    data:{labels:hours, datasets:[{data:loads,borderColor:'#d97706',borderWidth:2,fill:true,backgroundColor:grad,tension:0.4,pointRadius:2,pointBackgroundColor:'#d97706'}]},
    options:{...CHART_DEFAULTS,
      scales:{
        x:{ticks:{font:{family:'DM Mono',size:9},color:'rgba(122,64,48,0.6)',maxTicksLimit:8},grid:{display:false}},
        y:{min:0,max:100,ticks:{font:{family:'DM Mono',size:9},color:'rgba(122,64,48,0.6)'},grid:{color:'rgba(232,78,12,0.06)'}}
      }
    }
  });

  // Overview mini traffic chart
  initMiniTrafficChart();
  renderTransitBars('transit-bars-full');
}

function initMiniTrafficChart() {
  const canvas = document.getElementById('trafficMiniChart'); if (!canvas || state.charts.trafficMini) return;
  const ctx = canvas.getContext('2d');
  const hours = state.trafficHistory.map(d=>d.hour+':00');
  const loads  = state.trafficHistory.map(d=>d.load);
  state.charts.trafficMini = new Chart(ctx, {
    type:'bar',
    data:{labels:hours, datasets:[{data:loads, backgroundColor:loads.map(v=>v>70?'rgba(232,78,12,0.8)':v>45?'rgba(217,119,6,0.7)':'rgba(21,128,61,0.7)'), borderRadius:3, borderSkipped:false}]},
    options:{...CHART_DEFAULTS,
      scales:{x:{ticks:{font:{family:'DM Mono',size:8},color:'rgba(122,64,48,0.5)',maxTicksLimit:6},grid:{display:false}},
              y:{min:0,max:100,ticks:{font:{family:'DM Mono',size:8},color:'rgba(122,64,48,0.5)'},grid:{color:'rgba(232,78,12,0.05)'}}}
    }
  });
}

function initOverviewEnergyChart() {
  const canvas = document.getElementById('overviewEnergyChart'); if (!canvas || state.charts.overviewEnergy) return;
  const ctx = canvas.getContext('2d');
  state.charts.overviewEnergy = new Chart(ctx, {
    type:'doughnut',
    data:{
      labels:['Solar','Wind','Fernwärme','Gas','Import'],
      datasets:[{data:[18,38,22,12,10], backgroundColor:['#d97706','#3b82f6','#22c55e','#ef4444','#8b5cf6'], borderWidth:0, hoverOffset:4}]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{display:true, position:'right', labels:{font:{family:'DM Mono',size:9},color:'rgba(122,64,48,0.8)',boxWidth:8,padding:8}},
        tooltip:{backgroundColor:'var(--red-dark)', titleFont:{family:'DM Mono'}, bodyFont:{family:'DM Mono'}}
      },
      cutout:'60%', animation:{duration:800}
    }
  });
}

function initEnvCharts() {
  const elbeCtx = document.getElementById('elbeChart')?.getContext('2d');
  if (elbeCtx && !state.charts.elbe) {
    const labels = state.elbeHistory.map(d=>d.date);
    const values = state.elbeHistory.map(d=>d.value);
    const grad = makeGradient(elbeCtx,'rgba(59,130,246,0.4)','rgba(59,130,246,0.02)');
    state.charts.elbe = new Chart(elbeCtx, {
      type:'line',
      data:{labels, datasets:[
        {data:values, borderColor:'#3b82f6', borderWidth:2, fill:true, backgroundColor:grad, tension:0.3, pointRadius:2, pointBackgroundColor:'#3b82f6'},
        {data:Array(labels.length).fill(590), borderColor:'rgba(232,78,12,0.5)', borderWidth:1, borderDash:[4,4], pointRadius:0, fill:false, label:'Warnstufe 1'}
      ]},
      options:{...CHART_DEFAULTS,
        plugins:{...CHART_DEFAULTS.plugins, legend:{display:true, position:'bottom', labels:{font:{family:'DM Mono',size:10},color:'rgba(122,64,48,0.7)',boxWidth:12}}},
        scales:{x:{ticks:{font:{family:'DM Mono',size:9},color:'rgba(122,64,48,0.6)',maxTicksLimit:10},grid:{display:false}},
                y:{ticks:{font:{family:'DM Mono',size:9},color:'rgba(122,64,48,0.6)'},grid:{color:'rgba(232,78,12,0.06)'}}}
      }
    });
  }

  const tempCtx = document.getElementById('tempChart')?.getContext('2d');
  if (tempCtx && !state.charts.temp) {
    const days = currentLang==='en'?['Mo','Tu','We','Th','Fr','Sa','Su']:['Mo','Di','Mi','Do','Fr','Sa','So'];
    state.charts.temp = new Chart(tempCtx, {
      type:'line',
      data:{labels:days, datasets:[
        {label:'Max °C', data:[16,18,21,19,15,17,20], borderColor:'var(--red)', borderWidth:2, fill:false, tension:0.4, pointRadius:3, pointBackgroundColor:'var(--red)'},
        {label:'Min °C', data:[8,9,12,11,7,9,11], borderColor:'#3b82f6', borderWidth:2, fill:false, tension:0.4, pointRadius:3, pointBackgroundColor:'#3b82f6'}
      ]},
      options:{...CHART_DEFAULTS,
        plugins:{...CHART_DEFAULTS.plugins, legend:{display:true, position:'bottom', labels:{font:{family:'DM Mono',size:10},color:'rgba(122,64,48,0.7)',boxWidth:12}}},
        scales:{x:{ticks:{font:{family:'DM Mono',size:9},color:'rgba(122,64,48,0.6)'},grid:{display:false}},
                y:{ticks:{font:{family:'DM Mono',size:9},color:'rgba(122,64,48,0.6)',callback:v=>v+'°'},grid:{color:'rgba(232,78,12,0.06)'}}}
      }
    });
    if (state.weather?.daily) updateTempChart(state.weather.daily);
  }
}

function updateElbeChart() {
  if (!state.charts.elbe || !state.elbeHistory.length) return;
  state.charts.elbe.data.labels = state.elbeHistory.map(d=>d.date);
  state.charts.elbe.data.datasets[0].data = state.elbeHistory.map(d=>d.value);
  state.charts.elbe.data.datasets[1].data = Array(state.elbeHistory.length).fill(590);
  state.charts.elbe.update('none');
}

function updateTempChart(daily) {
  if (!state.charts.temp) return;
  state.charts.temp.data.datasets[0].data = daily.temperature_2m_max?.slice(0,7)||[];
  state.charts.temp.data.datasets[1].data = daily.temperature_2m_min?.slice(0,7)||[];
  state.charts.temp.update();
}

function initEnergyCharts() {
  const enCtx = document.getElementById('energyChart')?.getContext('2d');
  if (enCtx && !state.charts.energy) {
    const hours = Array.from({length:24},(_,i)=>i+':00');
    const cons  = hours.map((_,i)=>220+Math.sin(i*0.5)*60+(i>7&&i<21?80:0)+Math.random()*20);
    const solar = hours.map((_,i)=>i>5&&i<20?Math.max(0,Math.sin((i-5)/15*Math.PI)*80+Math.random()*10):0);
    const wind  = hours.map(()=>80+Math.random()*60);
    state.charts.energy = new Chart(enCtx, {
      type:'line',
      data:{labels:hours, datasets:[
        {label:'Verbrauch (MW)', data:cons,  borderColor:'var(--red)',  borderWidth:2, fill:true, backgroundColor:'rgba(232,78,12,0.08)',   tension:0.4, pointRadius:0},
        {label:'Solar (MW)',     data:solar, borderColor:'#d97706',     borderWidth:2, fill:true, backgroundColor:'rgba(217,119,6,0.08)',   tension:0.4, pointRadius:0},
        {label:'Wind (MW)',      data:wind,  borderColor:'#3b82f6',     borderWidth:2, fill:true, backgroundColor:'rgba(59,130,246,0.08)',  tension:0.4, pointRadius:0}
      ]},
      options:{...CHART_DEFAULTS,
        plugins:{...CHART_DEFAULTS.plugins, legend:{display:true,position:'bottom',labels:{font:{family:'DM Mono',size:10},color:'rgba(122,64,48,0.7)',boxWidth:12}}},
        scales:{x:{ticks:{font:{family:'DM Mono',size:9},color:'rgba(122,64,48,0.6)',maxTicksLimit:8},grid:{display:false}},
                y:{ticks:{font:{family:'DM Mono',size:9},color:'rgba(122,64,48,0.6)'},grid:{color:'rgba(232,78,12,0.06)'}}}
      }
    });
  }

  const mixCtx = document.getElementById('energyMixChart')?.getContext('2d');
  if (mixCtx && !state.charts.energyMix) {
    state.charts.energyMix = new Chart(mixCtx, {
      type:'doughnut',
      data:{
        labels:['Solar','Wind','Fernwärme','Gas','Import'],
        datasets:[{data:[18,38,22,12,10], backgroundColor:['#d97706','#3b82f6','#22c55e','#ef4444','#8b5cf6'], borderWidth:0, hoverOffset:8}]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{legend:{display:true,position:'right',labels:{font:{family:'DM Mono',size:10},color:'rgba(122,64,48,0.8)',boxWidth:10,padding:12}},
                 tooltip:{backgroundColor:'var(--red-dark)', titleFont:{family:'DM Mono'}, bodyFont:{family:'DM Mono'}}},
        cutout:'60%', animation:{duration:800, easing:'easeOutQuart'}
      }
    });
  }
}

// ======================================================
// TRANSIT BARS
// ======================================================
function renderTransitBars(containerId) {
  const el = document.getElementById(containerId); if (!el) return;
  el.innerHTML = state.transitLines.map((line,i) => {
    const pct = line.load;
    const color = pct>80?'var(--red)':pct>60?'#d97706':'var(--green)';
    return `<div class="transit-bar-item">
      <div class="transit-bar-label">
        <span>${line.name}</span>
        <span class="transit-bar-pct" data-transit-pct="${i}">${pct}%</span>
      </div>
      <div class="transit-bar-track">
        <div class="transit-bar-fill" data-transit-bar="${i}" style="width:${pct}%;background:${color}"></div>
      </div>
    </div>`;
  }).join('');
}

function initOverviewTransitBars() {
  const el = document.getElementById('transit-bars'); if (!el) return;
  el.innerHTML = state.transitLines.slice(0,4).map((line,i) => {
    const pct = line.load;
    const color = pct>80?'var(--red)':pct>60?'#d97706':'var(--green)';
    return `<div class="transit-bar-item">
      <div class="transit-bar-label">
        <span>${line.name}</span>
        <span class="transit-bar-pct" data-transit-pct="${i}">${pct}%</span>
      </div>
      <div class="transit-bar-track">
        <div class="transit-bar-fill" data-transit-bar="${i}" style="width:${pct}%;background:${color}"></div>
      </div>
    </div>`;
  }).join('');
}

// ======================================================
// FACTS CAROUSEL
// ======================================================
const FACTS_DE = [
  { emoji:'🎈', text:'Otto von Guericke erfand 1654 das Vakuum hier in Magdeburg', detail:'Die berühmten Magdeburger Halbkugeln — 8 Pferde konnten sie nicht auseinanderziehen!' },
  { emoji:'⛪', text:'Der Magdeburger Dom ist der älteste gotische Dom Deutschlands', detail:'Geweiht 1363 · Kaiser Otto I. liegt hier begraben · 100 Meter hohe Türme' },
  { emoji:'🌿', text:'Magdeburg hat mehr Grünfläche pro Einwohner als jede andere Großstadt', detail:'500+ Hektar Parks direkt am Wasser — Rotehornpark, Herrenkrug, Elbauenpark' },
  { emoji:'🏛️', text:'Das Magdeburger Stadtrecht ist UNESCO-Dokumentenerbe', detail:'Vorlage für 1.000+ Städte in Europa — von Krakau bis Riga — seit dem 13. Jahrhundert' },
  { emoji:'🚢', text:'Das Wasserstraßenkreuz ist eine der spektakulärsten Ingenieursleistungen Europas', detail:'918 Meter lang · Schiffe fahren buchstäblich über die Elbe auf einer Kanalbrücke' },
  { emoji:'🎵', text:'Georg Friedrich Händel wurde 1685 in Magdeburg geboren', detail:'Der Opern-Genius lebte seine frühen Jahre an der Elbe · Opernhaus trägt heute seinen Geist' },
  { emoji:'⚡', text:'Magdeburg erzeugt 56% seines Stroms aus erneuerbaren Quellen', detail:'Solar, Wind und Fernwärme — Stadtwerke MD auf dem Weg zur Klimaneutralität 2035' },
  { emoji:'🚲', text:'Über 750 km Radwege durchziehen Magdeburg', detail:'MD-Rad Sharing, der Elberadweg und täglich wachsende Infrastruktur' },
];
const FACTS_EN = [
  { emoji:'🎈', text:'Otto von Guericke invented the vacuum right here in Magdeburg in 1654', detail:'The famous Magdeburg hemispheres — 8 horses couldn\'t pull them apart!' },
  { emoji:'⛪', text:'Magdeburg Cathedral is Germany\'s oldest Gothic cathedral', detail:'Consecrated 1363 · Emperor Otto I buried here · 100m towers' },
  { emoji:'🌿', text:'Magdeburg has more green space per resident than any other major city', detail:'500+ hectares of parks by the water — Rotehornpark, Herrenkrug, Elbauenpark' },
  { emoji:'🏛️', text:'Magdeburg Law is UNESCO documentary heritage', detail:'Model for 1,000+ cities in Europe — from Kraków to Riga — since the 13th century' },
  { emoji:'🚢', text:'The Waterway Crossroads is one of Europe\'s most spectacular engineering feats', detail:'918 metres long · Ships literally sail over the Elbe on a canal bridge' },
  { emoji:'🎵', text:'Georg Friedrich Händel was born in Magdeburg in 1685', detail:'The opera genius spent his early years on the Elbe · the opera house carries his spirit' },
  { emoji:'⚡', text:'Magdeburg generates 56% of its electricity from renewables', detail:'Solar, wind and district heating — Stadtwerke MD heading for climate neutrality 2035' },
  { emoji:'🚲', text:'750+ km of cycling paths run through Magdeburg', detail:'MD-Rad bike sharing, the Elbe cycle route and daily growing infrastructure' },
];

function getFacts() { return currentLang==='en' ? FACTS_EN : FACTS_DE; }

function initFacts() {
  const content = document.getElementById('facts-content');
  const dotsEl  = document.getElementById('facts-dots');
  if (!content || !dotsEl) return;

  let current = 0;

  function renderFacts() {
    const facts = getFacts();
    content.innerHTML = facts.map((f,i) => `
      <div class="fact-slide ${i===0?'active':''}" data-fact="${i}">
        <div class="fact-emoji">${f.emoji}</div>
        <div class="fact-text">${f.text}</div>
        <div class="fact-detail">${f.detail}</div>
      </div>`).join('');
    dotsEl.innerHTML = facts.map((_,i) => `<div class="fact-dot ${i===0?'active':''}" data-dot="${i}"></div>`).join('');
    dotsEl.querySelectorAll('.fact-dot').forEach(dot => {
      dot.addEventListener('click', () => goToFact(parseInt(dot.dataset.dot)));
    });
    current = 0;
  }

  function goToFact(idx) {
    const slides = content.querySelectorAll('.fact-slide');
    const dots   = dotsEl.querySelectorAll('.fact-dot');
    if (!slides[current]) return;
    slides[current].classList.remove('active');
    slides[current].classList.add('exiting');
    setTimeout(() => slides[current]?.classList.remove('exiting'), 600);
    current = idx;
    if (slides[current]) slides[current].classList.add('active');
    dots.forEach((d,i) => d.classList.toggle('active', i===current));
  }

  window.goToFact = goToFact;
  renderFacts();
  setInterval(() => goToFact((current+1) % getFacts().length), 5000);
}

// ======================================================
// LIVE DATA SIMULATION
// ======================================================
function jitter(val, factor, min, max) {
  return Math.max(min, Math.min(max, val + (Math.random()-0.5)*2*factor*(max-min)));
}

function updateLiveData() {
  const L = state.live;
  L.aqi      = Math.round(jitter(L.aqi,     0.03, 10, 80));
  L.traffic  = Math.round(jitter(L.traffic, 0.04, 10, 100));
  L.noise    = Math.round(jitter(L.noise,   0.03, 40, 75));
  L.bikes    = Math.round(jitter(L.bikes,   0.04, 80, 280));
  L.scooters = Math.round(jitter(L.scooters,0.04,150, 420));
  L.jams     = Math.max(0, Math.min(12, L.jams + (Math.random()>0.8?(Math.random()>0.5?1:-1):0)));
  L.solar    = Math.round(jitter(L.solar,      0.06, 0, 90));
  L.wind_energy  = Math.round(jitter(L.wind_energy, 0.05, 40, 200));
  L.consumption  = Math.round(jitter(L.consumption, 0.03, 200, 420));
  L.co2          = Math.round(jitter(L.co2,         0.04, 100, 300));

  flashSet('kpi-traffic',    Math.round(L.traffic));
  flashSet('env-noise',      Math.round(L.noise));
  flashSet('mob-bikes',      Math.round(L.bikes));
  flashSet('mob-scooters',   Math.round(L.scooters));
  flashSet('mob-jams',       Math.round(L.jams));
  flashSet('en-solar',       Math.round(L.solar));
  flashSet('en-wind',        Math.round(L.wind_energy));
  flashSet('en-consumption', Math.round(L.consumption));
  flashSet('en-co2',         Math.round(L.co2));

  const tb = document.getElementById('traffic-badge');
  if (tb) {
    if (L.traffic>75)      { tb.className='badge badge-red';   tb.textContent=t('badge_high'); }
    else if (L.traffic>50) { tb.className='badge badge-amber'; tb.textContent=t('badge_medium'); }
    else                   { tb.className='badge badge-green'; tb.textContent=t('badge_low'); }
  }

  state.parking.hbf     = Math.round(jitter(state.parking.hbf,    0.06, 0,500));
  state.parking.alter   = Math.round(jitter(state.parking.alter,  0.08, 0,200));
  state.parking.allee   = Math.round(jitter(state.parking.allee,  0.07, 0,300));
  state.parking.breiter = Math.round(jitter(state.parking.breiter,0.15, 0, 50));
  ['hbf','alter','allee','breiter'].forEach(k => {
    setEl('park-'+k, state.parking[k]);
    setEl('pt-'+k,   state.parking[k]);
  });

  state.transitLines.forEach((line,i) => {
    line.load = Math.max(5, Math.min(100, Math.round(jitter(line.load,0.06,5,100))));
    const color = line.load>80?'var(--red)':line.load>60?'#d97706':'var(--green)';
    document.querySelectorAll(`[data-transit-bar="${i}"]`).forEach(b=>{b.style.width=line.load+'%';b.style.background=color;});
    document.querySelectorAll(`[data-transit-pct="${i}"]`).forEach(p=>{p.textContent=line.load+'%';});
  });

  ['aqi','traffic'].forEach(key => {
    const chart = state.charts['spark_'+key]; if (!chart) return;
    const val = key==='aqi'?L.aqi:L.traffic;
    chart.data.datasets[0].data.shift();
    chart.data.datasets[0].data.push(val);
    chart.update('none');
  });

  setEl('last-update', t('last_update_prefix') + new Date().toLocaleTimeString('de-DE'));
}

// ======================================================
// RAG CHATBOT — IMIQ Dashbot style, comprehensive knowledge
// ======================================================
const MAGDEBURG_SYSTEM_PROMPT = `You are the Magdeburg Smart City Assistant — an AI assistant for the Smart City Dashboard of Magdeburg (the "Ottostadt"). You are inspired by the IMIQ Dashbot project from the Otto von Guericke University.

Answer in the same language the user writes in (German or English). Keep answers concise (2-5 sentences), friendly and informative. If you don't know something specific, say so honestly.

=== MAGDEBURG KNOWLEDGE BASE ===

GEOGRAPHY & BASICS:
- State capital of Saxony-Anhalt (Sachsen-Anhalt), Germany
- Population: ~244,000 (2024); Area: 201 km²
- Location: on the Elbe river, 52.1°N 11.6°E
- Mayor (Bürgermeisterin): Simone Borris (independent, since 2022)
- Nicknamed "Ottostadt" after Emperor Otto I and Otto von Guericke

PUBLIC TRANSPORT (MVB — Magdeburger Verkehrsbetriebe):
- Tram lines: 1 (Herrenkrug–Sudenburg), 2 (Cracau–Sudenburg), 3 (Barleber See–Buckau), 4 (Messegelände–Neue Neustadt), 5 (Messegelände–Diesdorf), 6 (Hauptbahnhof–Westerhüsen), 8 (Hauptbahnhof–Salbker Chaussee), 9 (Hauptbahnhof–Alter Markt), 10 (Hauptbahnhof–Westerhüsen)
- Key stops: Hauptbahnhof (Hbf), Hasselbachplatz, Domplatz, Alter Markt, Universitätsplatz, Breiter Weg
- Bus lines: 50-65, 70, 71, 73, 74 — covering outer districts
- S-Bahn: S1 (Schönebeck–Magdeburg Hbf–Marienborn), also S2
- IC/ICE connections at Hauptbahnhof to Berlin, Hamburg, Leipzig
- MD-Rad: bike-sharing system with stations across the city
- E-Scooters: available in city centre (Tier, Bolt operators)
- Elbe cycle route (Elberadweg) runs through the city

ENVIRONMENT & CLIMATE:
- Elbe flood warning levels at Strombrücke gauge: Level 1 = 590cm, Level 2 = 690cm, Level 3 = 790cm, Level 4 = 890cm
- Average annual temperature: ~10°C; Summer avg: 22–26°C
- Greener city per capita than any other major German city
- Air quality monitored via European AQI; under 50 = good
- Significant park areas: Rotehornpark (150ha), Herrenkrug Park, Elbauenpark, Stadtpark

SIGHTS & ATTRACTIONS:
- Magdeburger Dom (Cathedral): oldest Gothic cathedral in Germany, consecrated 1363; Emperor Otto I buried here; 101m towers; free entry
- Grüne Zitadelle: unique pink Hundertwasser building (2005), shops, apartments, café
- Kulturhistorisches Museum: Otto von Guericke's vacuum hemisphere experiment (1654), city history
- Technikmuseum Magdeburg: technical history museum
- Kloster Unser Lieben Frauen: Romanesque monastery church, now art museum
- Elbauenpark + Albinmüller-Turm: park with panoramic tower views over Elbe
- Rotehornpark: 150ha city park directly on the Elbe
- Herrenkrug Park: nature park, meadows along Elbe
- Jahrtausendturm (Millennium Tower): 60m wooden tower, tallest in the world
- Wasserstraßenkreuz: 918m canal bridge over the Elbe (2003), ships sail over the river
- Magdeburger Reiter (1240): earliest free-standing equestrian statue north of the Alps
- Festung Mark: 19th century fortress, now cultural venue with concerts/events

RESTAURANTS & FOOD:
- Anas Grill: popular halal restaurant, Döner and grill (IMIQ partner location)
- Zur Alten Schmiede: traditional German cuisine
- Brauhaus am Hasselbachpl.: brewery/restaurant with regional food
- Petrikrog: fish and meat restaurant
- Hasselbachplatz area: main nightlife and restaurant district
- Breiter Weg: main shopping street with cafés and restaurants
- Alter Markt: historic market square with restaurants

CAFÉS:
- Café Central: coffee and cake, city centre
- Kaffeebar am Dom: specialty coffee near the cathedral
- Café Tomate: organic, vegan, brunch
- Literaturcafé: books and coffee

BARS & NIGHTLIFE:
- Hasselbachplatz: main bar/pub district (dozens of bars)
- Festung Mark: live music venue
- Bierhof Remise: craft beer, old town
- Studentenkeller: student club, affordable

ENERGY:
- Stadtwerke Magdeburg (SWM): main utility provider
- Goal: climate neutrality by 2035
- Current renewables share: ~56%
- District heating network covers inner city (Fernwärme)
- Solar park operated by Stadtwerke
- Wind farm north of the city

HISTORY:
- Founded 805 AD as trading post by Charlemagne (Karl dem Großen)
- Emperor Otto I (912–973): made Magdeburg his capital, founded the archbishopric, buried in the cathedral
- Magdeburg Law (13th century): became the legal model for 1,000+ cities from Poland to the Baltic — UNESCO documentary heritage since 2013
- 1631: city almost completely destroyed in the Thirty Years' War (Sack of Magdeburg)
- Otto von Guericke (1602–1686): mayor and inventor; created vacuum pump, proved atmospheric pressure with famous "Magdeburger Halbkugeln" (hemispheres) in 1654
- Georg Friedrich Händel (1685–1759): composer, born in Magdeburg
- WW2: heavily bombed; extensive post-war reconstruction
- 1990: German reunification, Magdeburg becomes state capital

INFRASTRUCTURE:
- Wasserstraßenkreuz: 918m canal bridge over Elbe completed 2003
- Elbe: important inland waterway (Elbe river kilometre 326)
- Magdeburg port (Binnenhafen): commercial inland port
- Motorways: A2 (east-west, Berlin–Hanover), A14 (north-south)
- OVGU (Otto von Guericke Universität Magdeburg): major research university

SMART CITY / IMIQ:
- IMIQ Project (Intelligenter Mobilitätsraum im Quartier): smart mobility research at Wissenschaftshafen (Science Harbor), run by OVGU, funded by EFRE
- Dashbot: IMIQ's AI assistant for real-time city Q&A (the inspiration for this chatbot)
- IBA 2027: International Building Exhibition in preparation
- Smart City Initiative: digital sensors deployed across the city
- Digital twin platform: infrastructure visualization
- MD-Rad and e-scooter data integrated into mobility dashboard
- Real-time tram/bus tracking via MVB live feeds

PARKING:
- HBF-Garage: 500 spaces (near Hauptbahnhof)
- Alter Markt: 200 spaces
- Allee-Center: 300 spaces (shopping centre)
- Breiter Weg: 50 spaces (often full)
- Domplatz: 120 spaces

EVENTS & CULTURE:
- Altstadtfest: annual city festival in June, 200,000+ visitors
- Handel festival: annual music festival
- Magdeburger Dom concerts: organ music, classical concerts
- Christmas market at Alter Markt and Domplatz
- Elbauenpark events throughout summer

When the user asks about current sensor data (AQI, Elbe level, temperature, traffic), use the context provided in brackets if available. Always be helpful and friendly!`;

let chatHistory = [];

function initChatbot() {
  const chatWidget = document.createElement('div');
  chatWidget.id = 'chatbot-widget';
  chatWidget.innerHTML = `
    <button id="chat-fab" aria-label="Chatbot öffnen">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span class="chat-fab-badge" id="chat-unread">1</span>
    </button>
    <div id="chat-panel" class="chat-panel">
      <div class="chat-header">
        <div class="chat-header-left">
          <div class="chat-avatar">MD</div>
          <div>
            <div class="chat-title" data-i18n="chatbot_title">Magdeburg Assistent</div>
            <div class="chat-status"><span class="live-dot"></span> <span data-i18n="chatbot_status">Online</span></div>
          </div>
        </div>
        <button id="chat-close" class="chat-close-btn">✕</button>
      </div>
      <div id="chat-messages" class="chat-messages">
        <div class="chat-msg bot">
          <div class="chat-bubble" id="chat-welcome-msg">${t('chatbot_welcome')}</div>
        </div>
      </div>
      <div class="chat-quick-btns" id="chat-quick-btns">
        <button class="chat-quick-btn" data-q="${t('chatbot_q1')}">${t('chatbot_quick1')}</button>
        <button class="chat-quick-btn" data-q="${t('chatbot_q2')}">${t('chatbot_quick2')}</button>
        <button class="chat-quick-btn" data-q="${t('chatbot_q3')}">${t('chatbot_quick3')}</button>
        <button class="chat-quick-btn" data-q="${t('chatbot_q4')}">${t('chatbot_quick4')}</button>
      </div>
      <div class="chat-input-row">
        <input type="text" id="chat-input" placeholder="${t('chatbot_placeholder')}" autocomplete="off">
        <button id="chat-send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>`;
  document.body.appendChild(chatWidget);

  const fab   = document.getElementById('chat-fab');
  const panel = document.getElementById('chat-panel');
  const close = document.getElementById('chat-close');
  const input = document.getElementById('chat-input');
  const send  = document.getElementById('chat-send');
  const badge = document.getElementById('chat-unread');

  fab.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) { badge.style.display='none'; input.focus(); }
  });
  close.addEventListener('click', () => panel.classList.remove('open'));
  send.addEventListener('click', sendChatMessage);
  input.addEventListener('keydown', e => { if (e.key==='Enter') sendChatMessage(); });

  document.querySelectorAll('.chat-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.dataset.q;
      sendChatMessage();
      document.getElementById('chat-quick-btns').style.display='none';
    });
  });
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim(); if (!msg) return;
  input.value = '';

  appendChatMessage(msg, 'user');

  const contextMsg = buildContextMessage(msg);
  chatHistory.push({role:'user', content:contextMsg});

  const typingId = appendChatTyping();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:1000,
        system:MAGDEBURG_SYSTEM_PROMPT,
        messages:chatHistory,
      })
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || (currentLang==='en'
      ? 'Sorry, I could not generate a response.'
      : 'Entschuldigung, ich konnte keine Antwort generieren.');

    removeTyping(typingId);
    appendChatMessage(reply, 'bot');
    chatHistory.push({role:'assistant', content:reply});
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

  } catch {
    removeTyping(typingId);
    appendChatMessage(currentLang==='en'
      ? '⚠️ Connection error. Please try again.'
      : '⚠️ Verbindungsfehler. Bitte versuche es erneut.', 'bot');
    chatHistory.pop();
  }
}

function buildContextMessage(userMsg) {
  const L = state.live;
  const elbe = state.elbe ? `${state.elbe} cm` : 'unknown';
  const temp = state.weatherDisplay?.temp ? `${state.weatherDisplay.temp}°C (${wmoDesc(state.weatherDisplay.code)})` : 'unknown';
  return `${userMsg}\n\n[Live sensor context: Elbe level: ${elbe}, AQI: ${L.aqi}, PM2.5: ${L.pm25}µg/m³, Temperature: ${temp}, Traffic: ${L.traffic}%, Noise: ${L.noise}dB, Free bikes: ${L.bikes}, E-scooters: ${L.scooters}, Active jams: ${L.jams}]`;
}

function appendChatMessage(text, role) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `<div class="chat-bubble">${text.replace(/\n/g,'<br>')}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function appendChatTyping() {
  const msgs = document.getElementById('chat-messages');
  const id = 'typing-'+Date.now();
  const div = document.createElement('div');
  div.id = id; div.className = 'chat-msg bot';
  div.innerHTML = `<div class="chat-bubble chat-typing"><span></span><span></span><span></span></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return id;
}

function removeTyping(id) { document.getElementById(id)?.remove(); }

// ======================================================
// HELPERS
// ======================================================
function setEl(id, val) { const el=document.getElementById(id); if(el) el.textContent=val; }
function flashSet(id, val) {
  const el=document.getElementById(id); if (!el) return;
  el.textContent=val;
  const card=el.closest('.kpi-card,.parking-slot');
  if(card) flash(card);
}
function flash(el) {
  if (!el) return;
  el.classList.remove('kpi-updated'); void el.offsetWidth; el.classList.add('kpi-updated');
}

// ======================================================
// MAIN INIT
// ======================================================
async function init() {
  startClock();
  initNav();
  initLangToggle();
  initMap();
  initSparklines();
  initFacts();
  initOverviewTransitBars();

  // Always init charts at startup with short delay for canvas sizing
  setTimeout(() => {
    initMobilityCharts();
    initMiniTrafficChart();
    initOverviewEnergyChart();
  }, 150);

  // Fetch live data
  fetchElbe();
  fetchWeather();
  fetchAirQuality();

  // Live simulation
  setInterval(updateLiveData, 5000);

  // Refresh intervals
  setInterval(fetchElbe,        5*60*1000);
  setInterval(fetchWeather,    10*60*1000);
  setInterval(fetchAirQuality, 10*60*1000);

  setTimeout(updateLiveData, 900);

  // Init chatbot
  initChatbot();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}