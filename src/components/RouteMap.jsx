import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background:#149688;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

export default function RouteMap({ route = [], cityPositions = {} }) {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
  }, []);

  const points = route
    .map((city) => {
      const pos = cityPositions[city];
      return pos ? [pos.lat, pos.lon] : null;
    })
    .filter(Boolean);

  const center = points.length
    ? [points.reduce((s, p) => s + p[0], 0) / points.length, points.reduce((s, p) => s + p[1], 0) / points.length]
    : [45.0, 12.0];

  if (!points.length) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl bg-slate-100 text-sm text-slate-500">
        Harita verisi yükleniyor...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-inner">
      <MapContainer center={center} zoom={5} scrollWheelZoom={false} style={{ height: '320px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.length > 1 && (
          <Polyline positions={points} pathOptions={{ color: '#149688', weight: 3, dashArray: '8 6' }} />
        )}
        {route.map((city, index) => {
          const pos = cityPositions[city];
          if (!pos) return null;
          return (
            <Marker key={city} position={[pos.lat, pos.lon]} icon={markerIcon}>
              <Popup>
                <strong>{index + 1}. {city}</strong>
                <br />
                <span className="text-xs">Optimize edilmiş rota durağı</span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
