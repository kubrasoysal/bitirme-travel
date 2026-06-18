/** Takvim bazlı etkinlik veritabanı — seçilen güne göre gerçek tarihli program */
export const CITY_CALENDAR = {
  Roma: {
    weather: { 6: '28°C · Güneşli', 7: '32°C · Sıcak & güneşli', 8: '30°C · Açık', 9: '24°C · Ilıman' },
    byDate: {
      '2026-07-10': [{ name: 'Terme di Caracalla — Aida Operası', type: 'Opera', time: '21:00', venue: 'Terme di Caracalla', price: 72, category: ['Etkinlik', 'Sanat'] }],
      '2026-07-11': [{ name: 'Roma Jazz Festival — Açılış Gecesi', type: 'Konser', time: '20:30', venue: 'Auditorium Parco della Musica', price: 45, category: ['Etkinlik'] }],
      '2026-07-12': [{ name: 'Vatikan Müzeleri Gece Turu', type: 'Özel Tur', time: '19:00', venue: 'Vatican Museums', price: 38, category: ['Sanat', 'Tarih'] }],
      '2026-07-13': [{ name: 'Trastevere Yaz Gastronomi Festivali', type: 'Festival', time: '18:00', venue: 'Piazza di Santa Maria', price: 0, category: ['Gastronomi', 'Etkinlik'] }],
      '2026-07-14': [{ name: 'Colosseum Moonlight Tour', type: 'Gece Turu', time: '21:30', venue: 'Colosseum', price: 55, category: ['Tarih', 'Etkinlik'] }],
      '2026-07-15': [{ name: 'Estate Romana — Tiber Nehri Konseri', type: 'Konser', time: '20:00', venue: 'Lungotevere', price: 0, category: ['Etkinlik'] }],
      '2026-07-16': [{ name: 'Opera di Roma — Tosca', type: 'Opera', time: '21:00', venue: 'Terme di Caracalla', price: 68, category: ['Etkinlik', 'Sanat'] }],
      '2026-07-17': [{ name: 'Campo de Fiori Gece Pazarı & Şarap', type: 'Festival', time: '19:30', venue: 'Campo de Fiori', price: 15, category: ['Gastronomi'] }],
      '2026-07-18': [{ name: 'Roma Summer Fest — DJ Set', type: 'Konser', time: '22:00', venue: 'Circo Massimo', price: 28, category: ['Etkinlik'] }],
      '2026-07-19': [{ name: 'Papa Audience (Papa Audience)', type: 'Dini Etkinlik', time: '10:00', venue: 'St. Peters Square', price: 0, category: ['Tarih', 'Etkinlik'] }],
      '2026-07-20': [{ name: 'Galleria Borghese Yaz Konseri', type: 'Konser', time: '20:30', venue: 'Villa Borghese', price: 42, category: ['Sanat', 'Etkinlik'] }]
    },
    recurring: [
      { months: [6, 7, 8], dayOfWeek: 5, name: 'Cuma Aperitivo — Pincio Terrace', type: 'Sosyal', time: '18:30', venue: 'Pincio Terrace', price: 22, category: ['Gastronomi', 'Etkinlik'] },
      { months: [6, 7, 8], dayOfWeek: 6, name: 'Cumartesi Antik Forum Işık Gösterisi', type: 'Gösteri', time: '21:00', venue: 'Roman Forum', price: 20, category: ['Tarih', 'Etkinlik'] },
      { months: [7, 8], dayOfWeek: 0, name: 'Pazar Brunch & Canlı Müzik — Testaccio', type: 'Konser', time: '11:00', venue: 'Testaccio Market', price: 18, category: ['Gastronomi', 'Etkinlik'] }
    ],
    markets: [
      { months: [6, 7, 8, 9], dayOfWeek: 1, name: 'Campo de Fiori Sabah Pazarı', type: 'Pazar', time: '08:00', venue: 'Campo de Fiori', price: 0, category: ['Gastronomi', 'Alışveriş'] }
    ]
  },
  Milano: {
    weather: { 6: '26°C · Ilıman', 7: '30°C · Sıcak', 8: '29°C · Güneşli', 9: '22°C · Serin' },
    byDate: {
      '2026-07-10': [{ name: 'La Scala Yaz Konseri — Verdi Requiem', type: 'Konser', time: '20:30', venue: 'Teatro alla Scala', price: 88, category: ['Etkinlik', 'Sanat'] }],
      '2026-07-11': [{ name: 'Navigli Aperitivo Festivali', type: 'Festival', time: '18:00', venue: 'Navigli Kanalları', price: 12, category: ['Gastronomi', 'Etkinlik'] }],
      '2026-07-12': [{ name: 'San Siro Stadyum Turu + AC Milan Müzesi', type: 'Tur', time: '14:00', venue: 'San Siro', price: 35, category: ['Etkinlik', 'Tarih'] }],
      '2026-07-13': [{ name: 'Milano Moda Yaz Pop-up', type: 'Festival', time: '11:00', venue: 'Via Tortona', price: 0, category: ['Alışveriş', 'Etkinlik'] }],
      '2026-07-14': [{ name: 'Blue Note Milano — Jazz Night', type: 'Konser', time: '21:00', venue: 'Blue Note', price: 38, category: ['Etkinlik'] }],
      '2026-07-15': [{ name: 'Duomo Rooftop Sunset Tour', type: 'Tur', time: '19:00', venue: 'Duomo di Milano', price: 28, category: ['Tarih', 'Etkinlik'] }],
      '2026-07-16': [{ name: 'San Siro — Inter Milan vs Friendly', type: 'Spor', time: '20:45', venue: 'San Siro', price: 55, category: ['Etkinlik'] }],
      '2026-07-17': [{ name: 'Estate a Milano — Açık Hava Sinema', type: 'Gösteri', time: '21:30', venue: 'Arco della Pace', price: 10, category: ['Etkinlik'] }],
      '2026-07-18': [{ name: 'Brera Art Night Walk', type: 'Festival', time: '18:00', venue: 'Brera', price: 0, category: ['Sanat', 'Etkinlik'] }],
      '2026-07-19': [{ name: 'Idroscalo Yaz Konseri', type: 'Konser', time: '20:00', venue: 'Idroscalo', price: 25, category: ['Etkinlik', 'Doğa'] }],
      '2026-07-20': [{ name: 'La Scala — La Traviata (Yaz Sezonu)', type: 'Opera', time: '20:00', venue: 'Teatro alla Scala', price: 95, category: ['Etkinlik', 'Sanat'] }]
    },
    recurring: [
      { months: [7, 8], dayOfWeek: 4, name: 'Perşembe Navigli Canlı Müzik', type: 'Konser', time: '20:00', venue: 'Navigli', price: 0, category: ['Etkinlik'] },
      { months: [6, 7, 8], dayOfWeek: 6, name: 'Cumartesi Brera Sanat Pazarlığı', type: 'Pazar', time: '10:00', venue: 'Brera', price: 0, category: ['Sanat', 'Alışveriş'] }
    ],
    markets: []
  },
  Viyana: {
    weather: { 6: '24°C · Ilıman', 7: '27°C · Sıcak', 8: '26°C · Güneşli', 9: '20°C · Serin' },
    byDate: {
      '2026-07-10': [{ name: 'Wiener Staatsoper — Sommerballett', type: 'Bale', time: '19:30', venue: 'Staatsoper', price: 78, category: ['Etkinlik', 'Sanat'] }],
      '2026-07-11': [{ name: 'Donauinselfest — Gün 1', type: 'Festival', time: '14:00', venue: 'Donauinsel', price: 0, category: ['Etkinlik'] }],
      '2026-07-12': [{ name: 'Donauinselfest — Gün 2', type: 'Festival', time: '14:00', venue: 'Donauinsel', price: 0, category: ['Etkinlik'] }],
      '2026-07-13': [{ name: 'Schönbrunn Yaz Konseri', type: 'Konser', time: '20:30', venue: 'Schönbrunn Sarayı', price: 52, category: ['Etkinlik', 'Tarih'] }],
      '2026-07-14': [{ name: 'Vienna Jazz Festival', type: 'Konser', time: '20:00', venue: 'Stadtpark', price: 40, category: ['Etkinlik'] }],
      '2026-07-15': [{ name: 'Kabarett Simpl — Stand-up Gece', type: 'Gösteri', time: '20:30', venue: 'Kabarett Simpl', price: 32, category: ['Etkinlik'] }],
      '2026-07-16': [{ name: 'Heuriger Grinzing Şarap Akşamı', type: 'Sosyal', time: '17:30', venue: 'Grinzing', price: 22, category: ['Gastronomi', 'Etkinlik'] }],
      '2026-07-17': [{ name: 'Prater Sommernacht Festival', type: 'Festival', time: '21:00', venue: 'Prater', price: 0, category: ['Etkinlik', 'Doğa'] }],
      '2026-07-18': [{ name: 'Filmmuseum Open Air — Klasik Film Gecesi', type: 'Gösteri', time: '21:00', venue: 'MuseumsQuartier', price: 12, category: ['Etkinlik', 'Sanat'] }],
      '2026-07-19': [{ name: 'Vienna Philharmonic Summer Night', type: 'Konser', time: '20:00', venue: 'Schönbrunn', price: 65, category: ['Etkinlik', 'Sanat'] }],
      '2026-07-20': [{ name: 'Rathaus Film Festival — Açık Hava', type: 'Festival', time: '20:30', venue: 'Rathausplatz', price: 0, category: ['Etkinlik'] }]
    },
    recurring: [
      { months: [6, 7, 8], dayOfWeek: 5, name: 'Cuma Naschmarkt Gece Pazarı', type: 'Pazar', time: '18:00', venue: 'Naschmarkt', price: 0, category: ['Gastronomi'] },
      { months: [7, 8], dayOfWeek: 6, name: 'Cumartesi Prater Gece Lunapark', type: 'Etkinlik', time: '19:00', venue: 'Prater', price: 15, category: ['Etkinlik', 'Doğa'] }
    ],
    markets: [
      { months: [6, 7, 8, 9], dayOfWeek: 6, name: 'Naschmarkt Cumartesi Bit Pazarı', type: 'Pazar', time: '07:00', venue: 'Naschmarkt', price: 0, category: ['Gastronomi', 'Alışveriş'] }
    ]
  }
};

function getDayOfWeek(isoDate) {
  return new Date(`${isoDate}T12:00:00`).getDay();
}

export function getMonth(isoDate) {
  if (!isoDate) return 7;
  return Number(isoDate.split('-')[1]);
}

function scoreEvent(event, interests) {
  let score = 5;
  (event.category || []).forEach((cat) => {
    if (interests.some((i) => i.toLowerCase() === cat.toLowerCase())) score += 12;
  });
  return score;
}

export function getWeatherForDate(city, isoDate) {
  const cal = CITY_CALENDAR[city];
  if (!cal) return '22°C · Açık';
  return cal.weather[getMonth(isoDate)] || '24°C · Açık';
}

export function getEventsForDate(city, isoDate, interests = []) {
  const cal = CITY_CALENDAR[city];
  if (!cal) return [];

  const found = [];
  const dow = getDayOfWeek(isoDate);
  const month = getMonth(isoDate);

  (cal.byDate[isoDate] || []).forEach((e) => found.push({ ...e, dateConfirmed: true, scheduledDate: isoDate }));

  cal.recurring.forEach((r) => {
    if (r.months.includes(month) && r.dayOfWeek === dow) {
      found.push({ ...r, dateConfirmed: true, scheduledDate: isoDate, recurring: true });
    }
  });

  cal.markets.forEach((m) => {
    if (m.months.includes(month) && m.dayOfWeek === dow) {
      found.push({ ...m, dateConfirmed: true, scheduledDate: isoDate, isMarket: true });
    }
  });

  if (!found.length) {
    return [{
      name: `${city} Yaz Sezonu Keşif Gecesi`,
      type: 'Serbest',
      time: '19:00',
      venue: 'Şehir merkezi',
      price: 0,
      category: ['Etkinlik'],
      dateConfirmed: false,
      scheduledDate: isoDate,
      note: 'Bu tarih için özel etkinlik bulunamadı — yerel rehber önerisi'
    }];
  }

  return found.sort((a, b) => scoreEvent(b, interests) - scoreEvent(a, interests));
}

export function getMealCost(meal, isoDate) {
  const tier = meal.budget || 2;
  const base = tier === 1 ? { breakfast: 9, lunch: 16, dinner: 28 } : tier === 3 ? { breakfast: 18, lunch: 35, dinner: 65 } : { breakfast: 12, lunch: 24, dinner: 42 };
  const type = (meal.type || '').toLowerCase();
  let cost = base.lunch;
  if (type.includes('kahvalt')) cost = base.breakfast;
  else if (type.includes('akşam') || type.includes('aksam')) cost = base.dinner;
  const month = getMonth(isoDate);
  return Math.round(cost * (month >= 7 && month <= 8 ? 1.15 : 1.0));
}
