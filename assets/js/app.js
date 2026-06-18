// app.js
import { parseNaturalPlan } from './ai_parser.js';
import { searchFlights, searchHotels, searchPlaces, formatCurrency } from './mock_api.js';
import { CITY_DATA } from './data.js';

function calculateDays(start, end) {
    const s = new Date(start);
    const e = new Date(end);
    return Math.max(Math.ceil((e - s) / (1000 * 60 * 60 * 24)), 1);
}

function normalizeDestinations(value) {
    return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((city) => city.charAt(0).toUpperCase() + city.slice(1).toLowerCase());
}

async function generateOptimizedItinerary(data) {
    const finalItinerary = {};
    let totalEstimatedCost = 0;
    const totalDays = calculateDays(data.startDate, data.endDate);
    const cityCount = Math.max(data.destinations.length, 1);
    const baseDaysPerCity = Math.floor(totalDays / cityCount);
    let extraDays = totalDays % cityCount;
    let currentTripDate = new Date(data.startDate);

    for (const city of data.destinations) {
        const cityInfo = CITY_DATA[city];
        if (!cityInfo) continue;

        const daysInCity = baseDaysPerCity + (extraDays > 0 ? 1 : 0);
        extraDays -= 1;

        const flight = await searchFlights(city, data.budgetLevel, data.transportType);
        const hotel = await searchHotels(city, data.accommodationType, data.budgetLevel);
        const places = await searchPlaces(city, data.interests);

        totalEstimatedCost += (flight?.price || 120) + (hotel?.price || 100) * daysInCity;

        const cityData = {
            info: {
                flight: flight || { airline: 'Yerel Hava Yolu', duration: '2s 00dk', time: '08:00', price: 120 },
                accommodation: hotel || { name: 'Seçili Konaklama', price: 100, stars: '⭐⭐⭐' },
                type: hotel?.type || 'Otel',
                country: cityInfo.country
            }
        };

        for (let i = 1; i <= daysInCity; i += 1) {
            const dateLabel = currentTripDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
            const dayLabel = `Gün ${i} (${dateLabel})`;
            const place = places[(i - 1) % places.length] || { name: 'Şehir turu', category: ['Keşif'], price: 0 };
            const breakfast = cityInfo.dining[0] || { name: 'Kahvaltı', type: 'Kahvaltı', budget: 1 };
            const lunch = cityInfo.dining[1] || { name: 'Öğle yemeği', type: 'Yemek', budget: 2 };

            cityData[dayLabel] = [
                { time: '09:00', name: `🍽️ ${breakfast.name}`, tag: breakfast.type, price: `${breakfast.budget}€` },
                { time: '11:00', name: `📍 ${place.name}`, tag: place.category[0], price: `${place.price}€` },
                { time: '14:00', name: `🍽️ ${lunch.name}`, tag: lunch.type, price: `${lunch.budget}€` },
                { time: '18:00', name: '🌃 Serbest Zaman & Şehir Keşfi', tag: 'Keşif', price: '0€' }
            ];
            currentTripDate.setDate(currentTripDate.getDate() + 1);
        }

        finalItinerary[city] = cityData;
    }

    localStorage.setItem('finalItinerary', JSON.stringify(finalItinerary));
    localStorage.setItem('planData', JSON.stringify(data));
    localStorage.setItem('totalBudget', formatCurrency(totalEstimatedCost));
    window.location.href = 'itinerary.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('plan-form');
    const budgetValue = document.getElementById('budget-value');
    const budgetLevel = document.getElementById('budget-level');
    const naturalInput = document.getElementById('natural-input');

    function updateBudgetLabel(value) {
        budgetValue.textContent = value === '1' ? 'Düşük' : value === '2' ? 'Orta' : 'Yüksek';
    }

    updateBudgetLabel(budgetLevel.value);
    budgetLevel.addEventListener('input', (e) => updateBudgetLabel(e.target.value));

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const manualDestinations = normalizeDestinations(document.getElementById('destinations').value);
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const travelers = Number(document.getElementById('travelers').value) || 2;
        const accommodationType = document.getElementById('accommodation-type').value;
        const transportType = document.getElementById('transport-type').value;
        const interests = Array.from(document.querySelectorAll('.checkbox-container input:checked')).map((input) => input.value);

        let planData = {
            destinations: manualDestinations,
            startDate,
            endDate,
            travelers,
            budgetLevel: budgetLevel.value,
            accommodationType,
            transportType,
            interests: interests.length ? interests : ['Tarih', 'Sanat']
        };

        const naturalPrompt = naturalInput.value.trim();
        if (naturalPrompt) {
            const parsed = parseNaturalPlan(naturalPrompt);
            planData = {
                ...planData,
                ...parsed,
                destinations: parsed.destinations.length ? parsed.destinations : manualDestinations,
                startDate: parsed.startDate || startDate,
                endDate: parsed.endDate || endDate,
                interests: parsed.interests.length ? parsed.interests : planData.interests
            };
        }

        if (!planData.startDate || !planData.endDate) {
            alert('Lütfen başlangıç ve bitiş tarihlerini girin.');
            return;
        }
        if (!planData.destinations.length) {
            alert('Lütfen en az bir destinasyon girin veya doğal dil isteği kullanın.');
            return;
        }

        await generateOptimizedItinerary(planData);
    });
});
