'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';

export type MapMetric = 'occupancy' | 'equity' | 'bedsPerTenK' | 'population';

interface GovernorateData {
  code: string;
  name: string;
  nameAr?: string;
  value: number;
}

interface OmanMapRealProps {
  metric: MapMetric;
  data: GovernorateData[];
  onSelect?: (code: string) => void;
  selectedCode?: string | null;
}

// Map GeoJSON NAME_1 values to our governorate codes
const NAME_TO_CODE: Record<string, string> = {
  'Muscat': 'MUS',
  'Dhofar': 'DHO',
  'Musandam': 'MSN',
  'AlBuraymi': 'BUR',
  'AdDakhliyah': 'DAK',
  'AlBatinahNorth': 'BTN',
  'AlBatinahSouth': 'BTS',
  'AshSharqiyahSouth': 'SHS',
  'AshSharqiyahNorth': 'SHN',
  'AlDhahira': 'DHH',
  'AlWusta': 'WUS',
};

const CODE_TO_ARABIC: Record<string, string> = {
  'MUS': 'مسقط',
  'DHO': 'ظفار',
  'MSN': 'مسندم',
  'BUR': 'البريمي',
  'DAK': 'الداخلية',
  'BTN': 'شمال الباطنة',
  'BTS': 'جنوب الباطنة',
  'SHS': 'جنوب الشرقية',
  'SHN': 'شمال الشرقية',
  'DHH': 'الظاهرة',
  'WUS': 'الوسطى',
};

const METRIC_LABELS: Record<MapMetric, string> = {
  occupancy: 'Bed Occupancy %',
  equity: 'Equity Score',
  bedsPerTenK: 'Beds per 10K',
  population: 'Population',
};

function getColorScale(value: number, min: number, max: number, metric: MapMetric): string {
  if (max === min) return '#94a3b8';
  const normalized = (value - min) / (max - min);

  if (metric === 'occupancy') {
    if (normalized > 0.75) return '#dc2626';
    if (normalized > 0.5) return '#f97316';
    if (normalized > 0.25) return '#f59e0b';
    return '#10b981';
  }
  if (metric === 'equity' || metric === 'bedsPerTenK') {
    if (normalized > 0.75) return '#059669';
    if (normalized > 0.5) return '#10b981';
    if (normalized > 0.25) return '#f59e0b';
    return '#dc2626';
  }
  // population - blue scale
  if (normalized > 0.75) return '#1e40af';
  if (normalized > 0.5) return '#2563eb';
  if (normalized > 0.25) return '#60a5fa';
  return '#bfdbfe';
}

function formatValue(val: number, metric: MapMetric): string {
  if (metric === 'population') return val.toLocaleString();
  if (metric === 'occupancy') return `${val.toFixed(1)}%`;
  if (metric === 'bedsPerTenK') return val.toFixed(1);
  return val.toFixed(1);
}

// The actual map component that uses Leaflet (must be client-only)
function MapInner({ metric, data, onSelect, selectedCode }: OmanMapRealProps) {
  const [geoData, setGeoData] = useState<any>(null);
  const mapRef = useRef<any>(null);
  const geoJsonRef = useRef<any>(null);

  // Dynamically import leaflet modules
  const [L, setL] = useState<any>(null);
  const [ReactLeaflet, setReactLeaflet] = useState<any>(null);

  useEffect(() => {
    // Import leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Import leaflet and react-leaflet
    Promise.all([
      import('leaflet'),
      import('react-leaflet'),
    ]).then(([leaflet, rl]) => {
      setL(leaflet.default || leaflet);
      setReactLeaflet(rl);
    });

    // Fetch GeoJSON
    fetch('/oman.geojson')
      .then(r => r.json())
      .then(setGeoData)
      .catch(console.error);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const { min, max } = useMemo(() => {
    const values = data.map(d => d.value);
    return { min: Math.min(...values), max: Math.max(...values) };
  }, [data]);

  if (!L || !ReactLeaflet || !geoData) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center bg-gray-50 dark:bg-slate-800/50 rounded-xl">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading map...</p>
        </div>
      </div>
    );
  }

  const { MapContainer, GeoJSON, TileLayer } = ReactLeaflet;

  const style = (feature: any) => {
    const name1 = feature.properties.NAME_1;
    const code = NAME_TO_CODE[name1] || '';
    const govData = data.find(d => d.code === code);
    const value = govData?.value ?? 0;
    const fillColor = getColorScale(value, min, max, metric);
    const isSelected = selectedCode === code;

    return {
      fillColor,
      weight: isSelected ? 3 : 1.5,
      opacity: 1,
      color: isSelected ? '#0f172a' : '#475569',
      fillOpacity: isSelected ? 0.9 : 0.75,
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const name1 = feature.properties.NAME_1;
    const code = NAME_TO_CODE[name1] || '';
    const govData = data.find(d => d.code === code);
    const arabic = CODE_TO_ARABIC[code] || '';
    const value = govData?.value ?? 0;

    // Tooltip
    const tooltipContent = `
      <div style="text-align:center;min-width:120px;">
        <strong style="font-size:13px;">${govData?.name || name1}</strong>
        <br/><span style="font-size:11px;color:#64748b;">${arabic}</span>
        <br/><span style="font-size:12px;font-weight:600;color:#0d9488;">${METRIC_LABELS[metric]}: ${formatValue(value, metric)}</span>
      </div>
    `;
    layer.bindTooltip(tooltipContent, { sticky: true, direction: 'top', className: 'leaflet-tooltip-custom' });

    // Interaction — touch-friendly
    layer.on({
      mouseover: (e: any) => {
        const target = e.target;
        target.setStyle({ weight: 2.5, fillOpacity: 0.9 });
        target.bringToFront();
      },
      mouseout: (e: any) => {
        if (geoJsonRef.current) {
          geoJsonRef.current.resetStyle(e.target);
        }
      },
      click: () => {
        if (code && onSelect) {
          onSelect(code);
        }
      },
    });
  };

  return (
    <div className="w-full">
      <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 touch-manipulation">
        <MapContainer
          ref={mapRef}
          center={[21.5, 56.5]}
          zoom={5.5}
          zoomSnap={0.5}
          style={{ height: '100%', width: '100%', background: '#f8fafc' }}
          scrollWheelZoom={true}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            attribution=""
          />
          <GeoJSON
            ref={geoJsonRef}
            key={`${metric}-${selectedCode}`}
            data={geoData}
            style={style}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
        <span>Low</span>
        <div className="flex h-3 rounded overflow-hidden">
          {metric === 'occupancy' ? (
            <>
              <div className="w-8 bg-emerald-500" />
              <div className="w-8 bg-amber-500" />
              <div className="w-8 bg-orange-500" />
              <div className="w-8 bg-red-600" />
            </>
          ) : metric === 'population' ? (
            <>
              <div className="w-8 bg-blue-200" />
              <div className="w-8 bg-blue-400" />
              <div className="w-8 bg-blue-600" />
              <div className="w-8 bg-blue-800" />
            </>
          ) : (
            <>
              <div className="w-8 bg-red-600" />
              <div className="w-8 bg-amber-500" />
              <div className="w-8 bg-emerald-400" />
              <div className="w-8 bg-emerald-600" />
            </>
          )}
        </div>
        <span>High</span>
        <span className="ml-3 font-medium">{METRIC_LABELS[metric]}</span>
      </div>

      {/* Custom tooltip styles */}
      <style jsx global>{`
        .leaflet-tooltip-custom {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          font-family: inherit;
        }
        .leaflet-tooltip-custom::before {
          border-top-color: #e2e8f0;
        }
        .dark .leaflet-tooltip-custom {
          background: #1e293b;
          border-color: #334155;
          color: #f1f5f9;
        }
      `}</style>
    </div>
  );
}

// Dynamic import wrapper with ssr: false
const OmanMapReal = dynamic(() => Promise.resolve(MapInner), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center bg-gray-50 dark:bg-slate-800/50 rounded-xl">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading map...</p>
      </div>
    </div>
  ),
}) as React.FC<OmanMapRealProps>;

export default OmanMapReal;
