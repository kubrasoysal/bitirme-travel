import { parseNaturalPlan } from './parser.js';
import { CITY_DATA } from './mock_data.js';
import { optimizeRoute, formatCurrency } from './helpers.js';
import { validateFutureRange, addDaysISO, daysUntil, getSeasonMultiplier } from './dates.js';
import { getWeatherForDate, getEventsForDate } from './calendar.js';
import { searchFlights, searchHotels, buildDailySchedule, searchPlaces } from './planner.js';
import nodemailer from 'nodemailer';

function ensureDates(startDate, endDate) {
  const result = validateFutureRange(startDate, endDate);
  if (!result.ok) throw new Error(result.error);
  return result;
}

function selectDestinations(parsed, manual) {
  if (parsed.destinations?.length) return parsed.destinations;
  return manual.length ? manual : ['Roma', 'Milano', 'Viyana'];
}

function selectInterests(parsed, manual) {
  return parsed.interests?.length ? parsed.interests : manual.length ? manual : ['Tarih', 'Sanat'];
}

function selectAccommodation(parsed, manual) {
  return parsed.accommodationType || manual || 'mid-hotel';
}

function selectTransport(parsed, manual) {
  return parsed.transportType || manual || 'train';
}

export async function getSupportedCities() {
  return Object.keys(CITY_DATA).map((city) => ({
    city,
    country: CITY_DATA[city].country
  }));
}

function buildItinerary(route, daysPerCity, interests, travelers, startDate, transportType, accommodationType, budgetLevel, planSeed) {
  const trip = {};
  let currentDateStr = startDate;
  let flightsTotal = 0;
  let accommodationTotal = 0;
  let foodTotal = 0;
  let activitiesTotal = 0;

  route.forEach((city, index) => {
    const cityDays = daysPerCity[index] || 1;
    const seed = `${planSeed}-${city}-${index}`;
    const citySchedule = buildDailySchedule(city, interests, cityDays, budgetLevel, seed, currentDateStr);
    const flight = searchFlights(city, transportType, budgetLevel, hashSeed(seed), currentDateStr);
    const accommodation = searchHotels(city, accommodationType, budgetLevel, hashSeed(`${seed}-hotel`), currentDateStr, cityDays);

    flightsTotal += (flight?.price || 0) * travelers;
    accommodationTotal += (accommodation?.totalStay || accommodation?.price * cityDays || 0) * travelers;

    citySchedule.forEach((item) => {
      foodTotal += item.dayCost.food * travelers;
      activitiesTotal += item.dayCost.activities * travelers;
    });

    trip[city] = {
      info: {
        flight,
        accommodation,
        country: CITY_DATA[city].country,
        days: cityDays,
        checkIn: currentDateStr,
        checkOut: addDaysISO(currentDateStr, cityDays)
      },
      days: citySchedule.map((item, dayIndex) => ({
        label: `Gün ${dayIndex + 1}`,
        date: item.date,
        dayName: item.dayName,
        weather: item.weather,
        breakfast: item.breakfast,
        lunch: item.lunch,
        dinner: item.dinner,
        visit: item.visit,
        evening: item.evening,
        dayCost: item.dayCost
      }))
    };

    currentDateStr = addDaysISO(currentDateStr, cityDays);
  });

  const total = flightsTotal + accommodationTotal + foodTotal + activitiesTotal;
  return {
    trip,
    total,
    breakdown: {
      flights: flightsTotal,
      accommodation: accommodationTotal,
      food: foodTotal,
      activities: activitiesTotal
    }
  };
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

function getPlannedBudget(budgetLevel) {
  if (Number(budgetLevel) === 1) return 1000;
  if (Number(budgetLevel) === 3) return 5000;
  return 2500;
}

function buildAlternatives(route, transportType, accommodationType, travelers, breakdown, tripStartDate) {
  const alternatives = [];
  const sampleCity = route[0];
  const refDate = tripStartDate || '2026-07-10';

  if (accommodationType === 'luxury' || accommodationType === 'mid-hotel') {
    const cheapHotel = searchHotels(sampleCity, 'hostel', 1, 42, refDate, 3);
    const currentHotel = searchHotels(sampleCity, accommodationType, 2, 43, refDate, 3);
    if (cheapHotel && currentHotel) {
      const savings = (currentHotel.price - cheapHotel.price) * 3 * travelers;
      alternatives.push({
        title: 'Konaklamadan Tasarruf',
        description: 'Hostel seçeneğine geçerek konaklama maliyetini düşürebilirsiniz.',
        savings,
        savingsFormatted: formatCurrency(savings),
        suggestion: 'Tasarruf ile ekstra gastronomi turu veya müze bileti ekleyebilirsiniz.'
      });
    }
  }

  if (transportType === 'plane') {
    const train = searchFlights(sampleCity, 'train', 2, 44, refDate);
    const plane = searchFlights(sampleCity, 'plane', 2, 45, refDate);
    if (train && plane) {
      const savings = (plane.price - train.price) * route.length * travelers;
      alternatives.push({
        title: 'Tren ile Ulaşım',
        description: 'Uçak yerine tren tercih ederek ulaşım bütçesinden tasarruf edin.',
        savings,
        savingsFormatted: formatCurrency(savings),
        suggestion: 'Avrupa içi rotalarda tren hem ekonomik hem manzaralı bir alternatif.'
      });
    }
  }

  if (breakdown.activities < 200) {
    alternatives.push({
      title: 'Aktivite Bütçesi Boşta',
      description: 'Planlanan bütçenizde aktivite payı var — premium deneyimler eklenebilir.',
      savings: 150,
      savingsFormatted: formatCurrency(150),
      suggestion: 'Rehberli şehir turu veya akşam opera bileti ekleyebilirsiniz.'
    });
  }

  return alternatives.slice(0, 3);
}

function filterSupportedDestinations(destinations) {
  return destinations.filter((city) => CITY_DATA[city]);
}

export async function generatePlan(payload) {
  const parsed = payload.naturalInput ? parseNaturalPlan(payload.naturalInput) : {};
  const rawDestinations = selectDestinations(parsed, payload.destinations || []);
  const destinations = filterSupportedDestinations(rawDestinations);
  const fallbackDestinations = ['Roma', 'Milano', 'Viyana'];
  const finalDestinations = destinations.length ? destinations : fallbackDestinations;
  const interests = selectInterests(parsed, payload.interests || []);
  const transportType = selectTransport(parsed, payload.transportType);
  const accommodationType = selectAccommodation(parsed, payload.accommodationType);
  const travelers = Number(parsed.travelers || payload.travelers || 2);

  const dateRange = ensureDates(parsed.startDate || payload.startDate, parsed.endDate || payload.endDate);

  const route = optimizeRoute(finalDestinations, Object.fromEntries(Object.entries(CITY_DATA).map(([city, value]) => [city, value.position])));
  const daysPerCity = new Array(route.length).fill(Math.max(1, Math.floor(dateRange.days / route.length)));
  for (let i = 0; i < dateRange.days % route.length; i += 1) daysPerCity[i] += 1;

  const budgetLevel = parsed.budgetLevel || payload.budgetLevel || 2;
  const planSeed = {
    naturalInput: payload.naturalInput,
    route: finalDestinations,
    startDate: dateRange.startDate,
    interests,
    transportType,
    accommodationType
  };
  const planItinerary = buildItinerary(
    route,
    daysPerCity,
    interests,
    travelers,
    dateRange.startDate,
    transportType,
    accommodationType,
    budgetLevel,
    planSeed
  );
  const plannedBudget = getPlannedBudget(budgetLevel);
  const remaining = plannedBudget - planItinerary.total;
  const cityPositions = Object.fromEntries(
    route.map((city) => [city, CITY_DATA[city]?.position]).filter(([, pos]) => pos)
  );

  const plan = {
    createdAt: new Date().toISOString(),
    input: {
      naturalInput: payload.naturalInput || '',
      manualOverride: payload.manualOverride || false,
      destinations: route,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      travelers,
      budgetLevel,
      accommodationType,
      transportType,
      interests
    },
    parsedFromAI: parsed,
    itinerary: { trip: planItinerary.trip, total: planItinerary.total },
    cityPositions,
    budget: {
      total: planItinerary.total,
      totalFormatted: formatCurrency(planItinerary.total),
      plannedBudget,
      plannedFormatted: formatCurrency(plannedBudget),
      remaining,
      remainingFormatted: formatCurrency(Math.abs(remaining)),
      overBudgetFormatted: formatCurrency(Math.abs(remaining)),
      breakdown: planItinerary.breakdown,
      breakdownFormatted: {
        flights: formatCurrency(planItinerary.breakdown.flights),
        accommodation: formatCurrency(planItinerary.breakdown.accommodation),
        food: formatCurrency(planItinerary.breakdown.food),
        activities: formatCurrency(planItinerary.breakdown.activities)
      }
    },
    alternatives: buildAlternatives(route, transportType, accommodationType, travelers, planItinerary.breakdown, dateRange.startDate),
    automation: {
      pdfReady: true,
      emailStatus: process.env.SMTP_HOST ? 'queued' : 'skipped',
      priceWatch: 'active',
      reminderScheduled: true,
      daysUntilTrip: daysUntil(dateRange.startDate),
      weatherPreview: getWeatherForDate(route[0], dateRange.startDate),
      travelDocs: ['Pasaport (6 ay geçerli)', 'Schengen vizesi', 'Seyahat sigortası', 'Otel rezervasyon onayı'],
      n8nWebhook: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/travel-plan'
    },
    meta: {
      season: getSeasonMultiplier(dateRange.startDate) > 1.2 ? 'Yüksek sezon (yaz)' : 'Normal sezon',
      pricingNote: 'Fiyatlar seçilen tarihe göre mevsimsel olarak hesaplandı (Amadeus/Booking mock API)',
      calendarSource: 'Foursquare/Google Places takvim entegrasyonu (mock)'
    },
    summary: {
      duration: dateRange.days,
      route,
      cityCount: route.length,
      budgetLabel: budgetLevel === 1 ? 'Ekonomik' : budgetLevel === 3 ? 'Premium' : 'Standart',
      price: formatCurrency(planItinerary.total)
    }
  };

  return plan;
}

export function parseNaturalInput(text) {
  return parseNaturalPlan(text);
}

export async function fetchHotelOptions(query) {
  const city = query.city;
  const type = query.type || 'mid-hotel';
  const budgetLevel = query.budgetLevel || 2;
  if (!city || !CITY_DATA[city]) throw new Error('Şehir seçimi geçersiz.');
  const options = CITY_DATA[city].accommodation[type] || [];
  return options
    .map((hotel) => ({ type, ...hotel, stars: hotel.stars ? '⭐'.repeat(hotel.stars) : '🏠 Daire', source: 'mock-booking-api' }))
    .sort((a, b) => (query.sort === 'price' ? a.price - b.price : (b.rating || 0) - (a.rating || 0)));
}

export async function fetchPlaceOptions(query) {
  const city = query.city;
  const interests = query.interests ? String(query.interests).split(',').map((i) => i.trim()) : [];
  if (!city || !CITY_DATA[city]) throw new Error('Şehir seçimi geçersiz.');
  const places = searchPlaces(city, interests.length ? interests : ['Tarih']);
  const events = getEventsForDate(city, query.date || '2026-07-10', interests.length ? interests : ['Etkinlik']);
  return [...places, ...events.map((e) => ({ ...e, name: `[Etkinlik] ${e.name}` }))];
}

export async function estimateFlight(query) {
  const city = query.city;
  const transportType = query.transportType || 'plane';
  const budgetLevel = query.budgetLevel || 2;
  const flight = searchFlights(city, transportType, budgetLevel, hashSeed(query), query.departureDate || query.date || '2026-07-10');
  if (!flight) throw new Error('Uçuş verisi bulunamadı.');
  return { ...flight, source: 'mock-amadeus-api' };
}

export async function sendPlanEmail(plan, email) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return { status: 'skipped', message: 'SMTP bilgileri yapılandırılmadı, e-posta gönderimi atlandı.' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: Boolean(process.env.SMTP_SECURE === 'true'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const html = `<h1>Seyahat Planınız</h1><pre>${JSON.stringify(plan, null, 2)}</pre>`;
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Seyahat Planınız Hazır',
    html
  });
  return { status: 'sent', messageId: info.messageId };
}
