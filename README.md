# Sehhati (صحتي) — Oman Health Equity and Hospital Capacity Intelligence Platform

An interactive bilingual (Arabic/English) platform that transforms open health and population data from the [National Open Data Portal](https://opendata.gov.om) into actionable intelligence for healthcare planning, equity assessment, and disease surveillance across all 11 governorates of the Sultanate of Oman.

**Live Demo:** [sehhati.vercel.app](https://sehhati.vercel.app)

## Datasets Used from the National Open Data Portal

### Ministry of Health (وزارة الصحة)
Publisher page: [opendata.gov.om/en/publishers/139b01ed-59c8-4157-a38e-9036408f2a06](https://opendata.gov.om/en/publishers/139b01ed-59c8-4157-a38e-9036408f2a06)

| Dataset | How it was used |
|---|---|
| **Healthcare services data in health institutions** | Extracted hospital-level indicators including bed counts, discharge volumes, occupancy rates, and mean length of stay for 98+ hospitals across all governorates. Powers the hospital capacity equity analysis that identifies critical gaps (e.g., Ibra Hospital at 95.6% occupancy). |
| **Disease surveillance and notifiable infectious diseases** | Built the disease surveillance dashboard tracking 28 notifiable diseases (Groups A, B, C) including Cholera, Malaria, TB, COVID-19, Dengue, and Food Poisoning with trend analysis across 2023–2025. |
| **Deaths by cause of disease by governorate** | Mapped mortality patterns across 11 governorates by 9 disease categories (Circulatory, Respiratory, Infectious, Neoplasms, etc.), enabling regional health burden comparisons. |

### National Centre for Statistics and Information — NCSI (المركز الوطني للإحصاء والمعلومات)
Publisher page: [opendata.gov.om/en/publishers/3f8e43cf-8092-411f-96b7-0d0ffa040ca0](https://opendata.gov.om/en/publishers/3f8e43cf-8092-411f-96b7-0d0ffa040ca0)

| Dataset | How it was used |
|---|---|
| **Population by governorate (Omani and expatriate)** | Calculates per-capita health indicators (beds per 10,000, doctors per 10,000) and equity scores. Uses 2023–2025 population data broken down by Omani vs. expatriate for each governorate. |
| **Vital statistics (births, deaths, fertility rates, life expectancy)** | Tracks population health indicators from 2016–2025: life expectancy (78.6 years), infant mortality (7.4/1,000), fertility rate (1.9), and maternal mortality trends. |
| **Population projections (2026–2040)** | Forecasts future hospital bed demand and health workforce requirements through 2030, identifying governorates that will face critical capacity shortfalls. |

## Key Analyses Built from Open Data

### 1. Hospital Capacity Equity Score (`/equity`)
Compares beds-per-capita, occupancy rates, and discharge volumes across governorates to identify underserved areas. Analysis revealed:
- Ibra Hospital at **95.6% occupancy** (critical overload)
- Al Batinah South at only **4.4 beds per 10,000** population (critical gap)
- Average national occupancy: **64.6%**

### 2. Health Workforce Gap Analysis (`/capacity`)
Maps the ratio of doctors, nurses, dentists, and pharmacists per 10,000 population by governorate, highlighting workforce distribution inequities between Muscat and peripheral governorates.

### 3. Disease Trend Surveillance (`/diseases`)
Detects epidemiological surges to support public health response planning:
- **166% increase** in food poisoning cases (266 → 707, 2023–2025)
- **70% decline** in Dengue (2,711 → 203, 2023–2025)
- COVID-19 declining trend (2,394 → 817)

### 4. Capacity Forecasting (`/dashboard`)
Combines population projections with current bed utilization to project when governorates will exceed safe occupancy thresholds.

## Platform Features

- Bilingual interface (Arabic/English) with RTL support
- Interactive dashboards with charts and maps for all 11 governorates
- Governorate-level drill-down for hospital, workforce, and disease data
- Dark/light mode
- Fully responsive design

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Maps:** Leaflet + react-leaflet
- **Deployment:** Vercel

## Data Provenance

All data used in this platform is sourced exclusively from the [Oman National Open Data Portal](https://opendata.gov.om) and the [NCSI Data Portal](https://data.gov.om). Data files are stored in `src/data/` with clear attribution to their source datasets.

The platform aligns with Oman Vision 2040's healthcare equity goals by enabling evidence-based resource allocation decisions using open government data.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.

## License

Open Government License — Sultanate of Oman
