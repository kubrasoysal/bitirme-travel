import { CITY_DATA } from './data.js';

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
        const year = match[3] ? Number(match[3].length === 2 ? `20${match[3]}` : match[3]) : new Date().getFullYear();
        if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
            const date = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
            if (!isNaN(date.getTime())) {
                dates.push(date);
            }
        }
    }

    if (dates.length >= 2) {
        return {
            startDate: dates[0].toISOString().slice(0, 10),
            endDate: dates[1].toISOString().slice(0, 10)
        };
    }

    const monthMatches = normalized.match(/(\d{1,2})?\s*(ocak|subat|mart|nisan|mayis|haziran|temmuz|agustos|eylul|ekim|kasim|aralik)/);
    const durationMatch = normalized.match(/(\d{1,2})\s*(gun|gunluk|gundur|gunde)/);

    if (monthMatches) {
        const day = durationMatch ? 1 : Number(monthMatches[1]) || 1;
        const month = monthNames[monthMatches[2]];
        if (!month) return {};
        const year = new Date().getFullYear();
        const start = new Date(year, month - 1, day);
        const duration = durationMatch ? Number(durationMatch[1]) : 5;
        const end = new Date(start);
        end.setDate(start.getDate() + Math.max(duration, 1));
        return {
            startDate: start.toISOString().slice(0, 10),
            endDate: end.toISOString().slice(0, 10)
        };
    }

    return {};
}

function parseBudget(text) {
    const normalized = normalizeText(text);
    const match = normalized.match(/(\d{1,3}(?:[.,]\d{3})*|\d+)(?:\s*(tl|try|tr|lira|eur|euro|usd|\$))/);
    if (match) {
        const value = Number(match[1].replace(/[.,]/g, ''));
        if (value <= 6000) return 1;
        if (value <= 15000) return 2;
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
        Tarih: ['tarih', 'antik', 'miras', 'kale', 'muze'],
        Sanat: ['sanat', 'galeri', 'muzik', 'opera', 'resim', 'fotograf'],
        Gastronomi: ['gastronomi', 'yemek', 'gurme', 'restoran', 'kafe', 'sarap'],
        Alisveris: ['alisveris', 'pazar', 'butik', 'marka', 'souvenir'],
        Doga: ['doga', 'trek', 'manzara', 'gol', 'park'],
        Etkinlik: ['etkinlik', 'konser', 'festival', 'bilet']
    };
    const normalized = normalizeText(text);
    Object.keys(keywordMap).forEach((key) => {
        const keywords = keywordMap[key];
        if (keywords.some((k) => normalized.includes(k))) interests.push(key);
    });
    return interests.length ? interests : ['Tarih', 'Sanat'];
}

function parseDestinations(text) {
    const normalized = normalizeText(text);
    const allCities = Object.keys(CITY_DATA);
    const foundCities = allCities.filter((city) => normalized.includes(normalizeText(city)));
    if (foundCities.length) return foundCities;

    const countryMap = {
        italya: ['Roma', 'Milano', 'Venedik'],
        avusturya: ['Viyana', 'Salzburg'],
        fransa: ['Paris', 'Nice'],
        ispanya: ['Barselona', 'Madrid']
    };
    for (const key of Object.keys(countryMap)) {
        if (normalized.includes(key)) return countryMap[key].filter((city) => CITY_DATA[city]);
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
