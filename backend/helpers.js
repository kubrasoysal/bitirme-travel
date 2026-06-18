export function haversineDistance(coordA, coordB) {
  const toRad = (value) => (value * Math.PI) / 180;
  const lat1 = toRad(coordA.lat);
  const lon1 = toRad(coordA.lon);
  const lat2 = toRad(coordB.lat);
  const lon2 = toRad(coordB.lon);
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c;
}

export function formatCurrency(value, currency = '₺') {
  const tlValue = value * 35; // Convert mock Euro data to TL
  return `${Math.round(tlValue).toLocaleString('tr-TR')} ${currency}`;
}

export function optimizeRoute(destinations, positions) {
  const visited = new Set();
  const route = [];
  let current = destinations[0];
  route.push(current);
  visited.add(current);

  while (route.length < destinations.length) {
    const currentPos = positions[current];
    const nextCity = destinations
      .filter((city) => !visited.has(city))
      .sort((a, b) => haversineDistance(currentPos, positions[a]) - haversineDistance(currentPos, positions[b]))[0];
    if (!nextCity) break;
    visited.add(nextCity);
    route.push(nextCity);
    current = nextCity;
  }

  return route;
}
