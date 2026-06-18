import { CITY_DATA } from './data.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function searchFlights(city, budgetLevel, transportType) {
    await delay(120);
    const cityInfo = CITY_DATA[city];
    if (!cityInfo) return null;
    const basePrice = cityInfo.flights.price || 120;
    const typeModifier = transportType === 'plane' ? 1.25 : transportType === 'bus' ? 0.9 : 1.0;
    const price = Math.round(basePrice * typeModifier * (budgetLevel === '1' ? 0.9 : budgetLevel === '3' ? 1.25 : 1.0));
    return {
        airline: cityInfo.flights.airline,
        duration: cityInfo.flights.duration,
        time: cityInfo.flights.time,
        price
    };
}

export async function searchHotels(city, accommodationType, budgetLevel) {
    await delay(140);
    const cityInfo = CITY_DATA[city];
    if (!cityInfo) return null;
    const stayType = accommodationType === 'airbnb' ? 'airbnb' : 'hotel';
    const hotelData = cityInfo.accommodation[stayType][budgetLevel] || cityInfo.accommodation[stayType][2];
    return { ...hotelData, type: stayType === 'airbnb' ? 'Airbnb' : 'Otel' };
}

export async function searchPlaces(city, interests) {
    await delay(140);
    const cityInfo = CITY_DATA[city];
    if (!cityInfo) return [];
    const places = cityInfo.places || cityInfo.activities.map((act) => ({ name: act.name, category: act.category, price: act.cost }));
    const prioritized = places.filter((place) =>
        interests.some((interest) => place.category.map((c) => c.toLowerCase()).includes(interest.toLowerCase()))
    );
    if (prioritized.length >= 4) return prioritized.slice(0, 4);
    return prioritized.length ? prioritized : places.slice(0, 4);
}

export function formatCurrency(value) {
    return typeof value === 'number' ? `${value.toLocaleString('tr-TR')} €` : value;
}
