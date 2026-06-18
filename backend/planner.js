import { CITY_DATA } from './mock_data.js';
import { applySeasonPrice, addDaysISO, getDayName } from './dates.js';
import { getEventsForDate, getWeatherForDate, getMealCost } from './calendar.js';
import { formatCurrency } from './helpers.js';

const INTEREST_ALIASES = {
  alisveris: 'Alışveriş',
  alışveriş: 'Alışveriş',
  doga: 'Doğa',
  doğa: 'Doğa',
  etkinlik: 'Etkinlik'
};

function normalizeInterest(interest) {
  const key = String(interest || '').toLowerCase();
  return INTEREST_ALIASES[key] || interest;
}

function hashSeed(input) {
  const str = JSON.stringify(input);
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function mulberry32(seed) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(array, seed) {
  const rng = mulberry32(seed);
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function scoreItem(item, interests) {
  const categories = item.category || [];
  const normalized = interests.map(normalizeInterest);
  let score = item.rating || 4;
  categories.forEach((cat) => {
    if (normalized.some((i) => i.toLowerCase() === cat.toLowerCase())) score += 10;
  });
  return score;
}

function pickOne(pool, seed, usedNames) {
  const shuffled = shuffle(pool, seed);
  const item = shuffled.find((entry) => !usedNames.has(entry.name));
  if (item) {
    usedNames.add(item.name);
    return item;
  }
  const fallback = shuffled[0];
  if (fallback) usedNames.add(fallback.name);
  return fallback;
}

function filterByBudget(items, budgetLevel) {
  const maxBudget = Number(budgetLevel) === 1 ? 2 : Number(budgetLevel) === 3 ? 3 : 2;
  const filtered = items.filter((item) => (item.budget || 2) <= maxBudget);
  return filtered.length ? filtered : items;
}

function withPrice(item, isoDate, type = 'place') {
  const base = item.basePrice ?? item.price ?? 0;
  const price = type === 'meal' ? getMealCost(item, isoDate) : applySeasonPrice(base, isoDate);
  return {
    ...item,
    price,
    priceFormatted: formatCurrency(price),
    source: item.source || (type === 'meal' ? 'google-places-mock' : 'google-places-mock')
  };
}

export function searchFlights(city, transportType, budgetLevel, seed, departureDate) {
  const cityData = CITY_DATA[city];
  if (!cityData) return null;
  const options = cityData.flights[transportType] || cityData.flights.plane || [];
  if (!options.length) return null;

  const sorted = [...options].sort((a, b) => {
    if (Number(budgetLevel) === 1) return a.price - b.price;
    if (Number(budgetLevel) === 3) return (b.rating || 0) - (a.rating || 0);
    return (b.rating / b.price) - (a.rating / a.price);
  });

  const rng = mulberry32(seed + city.length);
  const top = sorted.slice(0, Math.min(3, sorted.length));
  const flight = top[Math.floor(rng() * top.length)];
  const price = applySeasonPrice(flight.price, departureDate);
  return {
    ...flight,
    price,
    basePrice: flight.price,
    priceFormatted: formatCurrency(price),
    departureDate,
    source: 'mock-amadeus-api'
  };
}

export function searchHotels(city, accommodationType, budgetLevel, seed, checkInDate, nights = 1) {
  const cityData = CITY_DATA[city];
  if (!cityData) return null;
  const options = cityData.accommodation[accommodationType] || cityData.accommodation['mid-hotel'] || [];
  if (!options.length) return null;

  const sorted = [...options].sort((a, b) => {
    if (Number(budgetLevel) === 1) return a.price - b.price;
    if (Number(budgetLevel) === 3) return (b.rating || 0) - (a.rating || 0) || b.stars - a.stars;
    return (b.rating || 0) - (a.rating || 0);
  });

  const rng = mulberry32(seed + accommodationType.length);
  const top = sorted.slice(0, Math.min(3, sorted.length));
  const hotel = top[Math.floor(rng() * top.length)];
  const nightly = applySeasonPrice(hotel.price, checkInDate);
  const totalStay = nightly * nights;
  return {
    ...hotel,
    price: nightly,
    totalStay,
    priceFormatted: `${formatCurrency(nightly)}/gece`,
    totalStayFormatted: formatCurrency(totalStay),
    checkIn: checkInDate,
    nights,
    stars: hotel.stars ? '⭐'.repeat(hotel.stars) : '🏠 Daire',
    source: 'mock-booking-api'
  };
}

export function searchPlaces(city, interests) {
  const cityData = CITY_DATA[city];
  if (!cityData) return [];
  const normalized = interests.map(normalizeInterest);
  return cityData.places
    .map((place) => ({ ...place, basePrice: place.price, matchScore: scoreItem(place, normalized) }))
    .sort((a, b) => b.matchScore - a.matchScore);
}

export function buildDailySchedule(city, interests, days, budgetLevel, planSeed, cityStartDate) {
  const cityData = CITY_DATA[city];
  if (!cityData) return [];

  const seed = hashSeed({ planSeed, city, days, interests, cityStartDate });
  const usedNames = new Set();
  const normalized = interests.map(normalizeInterest);

  const places = shuffle(searchPlaces(city, normalized), seed);
  const breakfasts = shuffle(filterByBudget(cityData.dining.breakfast, budgetLevel), seed + 2);
  const lunches = shuffle(filterByBudget(cityData.dining.lunch, budgetLevel), seed + 3);
  const dinners = shuffle(filterByBudget(cityData.dining.dinner, budgetLevel), seed + 4);

  const schedule = [];

  for (let i = 0; i < days; i += 1) {
    const dateStr = addDaysISO(cityStartDate, i);
    const daySeed = seed + i * 17;

    const breakfast = withPrice(pickOne(breakfasts, daySeed, usedNames), dateStr, 'meal');
    const lunch = withPrice(pickOne(lunches, daySeed + 1, usedNames), dateStr, 'meal');
    const dinner = withPrice(pickOne(dinners, daySeed + 2, usedNames), dateStr, 'meal');

    const visitPool = places.filter((p) => !usedNames.has(p.name));
    const rawVisit = visitPool[0] || places.find((p) => !usedNames.has(p.name)) || places[i % places.length];
    usedNames.add(rawVisit.name);
    const visit = withPrice(rawVisit, dateStr, 'place');

    const dayEvents = getEventsForDate(city, dateStr, normalized);
    const eveningRaw = dayEvents[0];
    const evening = {
      ...eveningRaw,
      price: applySeasonPrice(eveningRaw.price || 0, dateStr),
      priceFormatted: formatCurrency(applySeasonPrice(eveningRaw.price || 0, dateStr)),
      source: 'foursquare-mock'
    };

    schedule.push({
      date: dateStr,
      dayName: getDayName(dateStr),
      weather: getWeatherForDate(city, dateStr),
      breakfast,
      lunch,
      dinner,
      visit,
      evening,
      dayCost: {
        food: breakfast.price + lunch.price + dinner.price,
        activities: visit.price + evening.price,
        foodFormatted: formatCurrency(breakfast.price + lunch.price + dinner.price),
        activitiesFormatted: formatCurrency(visit.price + evening.price),
        totalFormatted: formatCurrency(breakfast.price + lunch.price + dinner.price + visit.price + evening.price)
      }
    });
  }

  return schedule;
}
