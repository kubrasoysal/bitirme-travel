const DAY_NAMES = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

export function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function toISODate(date) {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

export function addDaysISO(isoDate, days) {
  const d = new Date(`${isoDate}T12:00:00`);
  d.setDate(d.getDate() + days);
  return toISODate(d);
}

export function getDayName(isoDate) {
  const d = new Date(`${isoDate}T12:00:00`);
  return DAY_NAMES[d.getDay()];
}

export function resolveFutureDate(year, month, day = 1) {
  const today = startOfToday();
  let y = year ?? today.getFullYear();
  let candidate = new Date(y, month - 1, day);
  candidate.setHours(0, 0, 0, 0);
  if (candidate < today) {
    y += 1;
    candidate = new Date(y, month - 1, day);
  }
  return toISODate(candidate);
}

export function resolveMonthRange(month, durationDays = 5, startDay = 10) {
  const start = resolveFutureDate(null, month, startDay);
  const end = addDaysISO(start, Math.max(durationDays - 1, 1));
  return { startDate: start, endDate: end };
}

export function validateFutureRange(startDate, endDate) {
  if (!startDate || !endDate) return { ok: false, error: 'Başlangıç ve bitiş tarihi gereklidir.' };

  const today = startOfToday();
  const start = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate}T12:00:00`);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (isNaN(start) || isNaN(end)) return { ok: false, error: 'Geçersiz tarih formatı.' };
  if (start < today) return { ok: false, error: 'Geçmiş tarih kabul edilmez. Bugün veya ileri bir tarih seçin.' };
  if (end < start) return { ok: false, error: 'Bitiş tarihi başlangıçtan önce olamaz.' };

  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  return {
    ok: true,
    startDate: toISODate(start),
    endDate: toISODate(end),
    days: diff
  };
}

export function getSeasonMultiplier(isoDate) {
  if (!isoDate) return 1.0;
  const month = Number(isoDate.split('-')[1]);
  if (month >= 7 && month <= 8) return 1.32;
  if (month === 6 || month === 9) return 1.15;
  if (month === 12 || month === 1) return 1.12;
  if (month >= 3 && month <= 5) return 1.05;
  return 1.0;
}

export function applySeasonPrice(basePrice, isoDate) {
  return Math.round((basePrice || 0) * getSeasonMultiplier(isoDate));
}

export function getDefaultTripDates(durationDays = 6) {
  const today = startOfToday();
  const julyStart = new Date(today.getFullYear(), 6, 10);
  julyStart.setHours(0, 0, 0, 0);

  let start;
  if (julyStart >= today) start = julyStart;
  else {
    start = new Date(today);
    start.setDate(start.getDate() + 21);
  }

  const end = new Date(start);
  end.setDate(end.getDate() + durationDays - 1);

  return { startDate: toISODate(start), endDate: toISODate(end) };
}

export function daysUntil(isoDate) {
  const today = startOfToday();
  const target = new Date(`${isoDate}T12:00:00`);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}
