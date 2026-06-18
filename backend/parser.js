import { resolveFutureDate, resolveMonthRange, addDaysISO } from './dates.js';

const monthNames = {
  ocak: 1,
  subat: 2,
  mart: 3,
  nisan: 4,
  mayis: 5,
  haziran: 6,
  temmuz: 7,
  agustos: 8,
  eylul: 9,
  ekim: 10,
  kasim: 11,
  aralik: 12
};

function normalizeText(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[ıİ]/g, 'i')
    .replace(/[şŞ]/g, 's')
    .replace(/[çÇ]/g, 'c')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[öÖ]/g, 'o')
    .replace(/[üÜ]/g, 'u')
    .replace(/[^a-zA-Z0-9\s.,/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function parseDateRange(text) {
  const normalized = normalizeText(text);
  const explicitDates = [...normalized.matchAll(/(\d{1,2})[.\/\-](\d{1,2})(?:[.\/\-](\d{2,4}))?/g)];
  const dates = [];

  for (const match of explicitDates) {
    const day = Number(match[1]);
    const month = Number(match[2]);
    let year = match[3] ? Number(match[3].length === 2 ? `20${match[3]}` : match[3]) : null;
    if (!year) year = Number(resolveFutureDate(null, month, day).split('-')[0]);
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
      const date = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
      if (!isNaN(date.getTime())) dates.push(date);
    }
  }

  if (dates.length >= 2) {
    return { startDate: dates[0].toISOString().slice(0, 10), endDate: dates[1].toISOString().slice(0, 10) };
  }
  if (dates.length === 1) {
    return { startDate: dates[0].toISOString().slice(0, 10), endDate: addDaysISO(dates[0].toISOString().slice(0, 10), 4) };
  }

  const monthMatches = normalized.match(/(\d{1,2})?\s*(ocak|subat|mart|nisan|mayis|haziran|temmuz|agustos|eylul|ekim|kasim|aralik)/);
  const durationMatch = normalized.match(/(\d{1,2})\s*(gun|gunluk|gundur|gunde)/);

  if (monthMatches) {
    const month = monthNames[monthMatches[2]];
    if (!month) return {};
    const day = durationMatch ? 10 : Number(monthMatches[1]) || 10;
    const duration = durationMatch ? Number(durationMatch[1]) : 5;
    const range = resolveMonthRange(month, duration, day);
    return range;
  }

  return {};
}

function parseBudget(text) {
  const normalized = normalizeText(text);
  const match = normalized.match(/(\d{1,3}(?:[.,]\d{3})*|\d+)(?:\s*(tl|try|tr|lira|eur|euro|usd|\$))/);
  if (match) {
    const value = Number(match[1].replace(/[.,]/g, ''));
    if (value <= 30000) return 1;
    if (value <= 80000) return 2;
    return 3;
  }
  if (normalized.includes('dusuk') || normalized.includes('ucuz')) return 1;
  if (normalized.includes('orta')) return 2;
  if (normalized.includes('luks') || normalized.includes('lux')) return 3;
  return 2;
}

function parseTravelers(text) {
  const normalized = normalizeText(text);
  const match = normalized.match(/(\d{1,2})\s*(kisi|ki?si|person|pax|yolcu)/);
  return match ? Number(match[1]) : 2;
}

function parseTransport(text) {
  const normalized = normalizeText(text);
  if (normalized.includes('ucak')) return 'plane';
  if (normalized.includes('tren')) return 'train';
  if (normalized.includes('otob') || normalized.includes('otobus')) return 'bus';
  return 'train';
}

function parseAccommodation(text) {
  const normalized = normalizeText(text);
  if (normalized.includes('hostel') || normalized.includes('ucuz') || normalized.includes('ekonomik')) return 'hostel';
  if (normalized.includes('airbnb') || normalized.includes('daire') || normalized.includes('penthouse')) return 'airbnb';
  if (normalized.includes('luks') || normalized.includes('5 yildiz') || normalized.includes('5 yildizli')) return 'luxury';
  return 'mid-hotel';
}

function parseInterests(text) {
  const interests = [];
  const keywordMap = {
    Tarih: ['tarih', 'antik', 'miras', 'kale', 'muze', 'müzik', 'mezar'],
    Sanat: ['sanat', 'galeri', 'opera', 'resim', 'fotograf', 'guzel sanat'],
    Gastronomi: ['gastronomi', 'yemek', 'gurme', 'restoran', 'kafe', 'sarap'],
    Alisveris: ['alisveris', 'pazar', 'butik', 'marka', 'souvenir', 'magaza'],
    Alışveriş: ['alisveris', 'pazar', 'butik', 'marka', 'souvenir', 'magaza'],
    Doga: ['doga', 'trek', 'manzara', 'gol', 'park', 'orman'],
    Etkinlik: ['etkinlik', 'konser', 'festival', 'bilet', 'gosterim']
  };
  const normalized = normalizeText(text);
  Object.entries(keywordMap).forEach(([key, keywords]) => {
    const label = key === 'Alisveris' ? 'Alışveriş' : key === 'Doga' ? 'Doğa' : key;
    if (keywords.some((k) => normalized.includes(k))) interests.push(label);
  });
  return interests.length ? interests : ['Tarih', 'Sanat'];
}

function parseDestinations(text) {
  const normalized = normalizeText(text);
  const allCities = ['Roma', 'Milano', 'Venedik', 'Paris', 'Nice', 'Barcelona', 'Madrid', 'Viyana', 'Salzburg', 'Prag', 'Budapeste'];
  const foundCities = allCities.filter((city) => normalized.includes(normalizeText(city)));
  if (foundCities.length) return foundCities;

  const countryMap = {
    italya: ['Roma', 'Milano', 'Venedik'],
    avusturya: ['Viyana', 'Salzburg'],
    fransa: ['Paris', 'Nice'],
    ispanya: ['Barcelona', 'Madrid'],
    cekya: ['Prag'],
    macaristan: ['Budapeste']
  };

  for (const key of Object.keys(countryMap)) {
    if (normalized.includes(key)) return countryMap[key];
  }
  return ['Roma', 'Milano'];
}

export function parseNaturalPlan(prompt) {
  const budgetLevel = parseBudget(prompt);
  const dates = parseDateRange(prompt);
  return {
    destinations: parseDestinations(prompt),
    startDate: dates.startDate || '',
    endDate: dates.endDate || '',
    travelers: parseTravelers(prompt),
    budgetLevel,
    accommodationType: parseAccommodation(prompt),
    transportType: parseTransport(prompt),
    interests: parseInterests(prompt),
    rawText: prompt.trim()
  };
}
