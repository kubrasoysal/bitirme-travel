export function getTodayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

export function getDefaultTripDates(durationDays = 6) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const julyStart = new Date(today.getFullYear(), 6, 10);
  let start = julyStart >= today ? julyStart : new Date(today.getTime() + 21 * 86400000);
  const end = new Date(start);
  end.setDate(end.getDate() + durationDays - 1);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10)
  };
}

export function isPastDate(isoDate) {
  const today = getTodayISO();
  return isoDate < today;
}
