// itinerary_logic.js
document.addEventListener('DOMContentLoaded', () => {
    const rawItinerary = localStorage.getItem('finalItinerary');
    const rawPlanData = localStorage.getItem('planData');
    if (!rawItinerary || !rawPlanData) {
        window.location.href = 'plan.html';
        return;
    }

    const finalItinerary = JSON.parse(rawItinerary);
    const planData = JSON.parse(rawPlanData);

    // Dashboard Üst Bilgileri
    document.getElementById('page-title').textContent = `🗺️ ${planData.destinations.join(' - ')} Macerası`;
    document.getElementById('estimated-budget').textContent = localStorage.getItem('totalBudget');
    document.getElementById('travelers-count').textContent = planData.travelers + " Kişi";
    
    // Gün sayısını hesapla
    const s = new Date(planData.startDate);
    const e = new Date(planData.endDate);
    const diff = Math.ceil(Math.abs(e - s) / (1000 * 60 * 60 * 24)) || 1;
    document.getElementById('trip-duration').textContent = diff + " Gün";

    renderUI(finalItinerary);
});

function renderUI(itinerary) {
    const container = document.getElementById('city-tabs-container');
    let tabsHtml = '<div class="city-tabs">';
    let contentHtml = '<div class="tab-content-area">';

    Object.keys(itinerary).forEach((city, idx) => {
        const cityData = itinerary[city];
        const info = cityData.info;
        const icon = info.type?.toLowerCase() === 'airbnb' ? '🏠' : '🏨';

        // Sekme Butonları
        tabsHtml += `
            <button class="tab-button ${idx === 0 ? 'active' : ''}" onclick="openCity(event, '${city}')">
                ${city}
            </button>`;

        // Şehir İçeriği
        contentHtml += `
            <div id="${city}" class="tab-content" style="display: ${idx === 0 ? 'block' : 'none'}">
                <div class="booking-summary-card">
                    <div class="booking-info">
                        <h4>${icon} ${info.type} KONAKLAMA</h4>
                        <h3>${info.accommodation.name}</h3>
                        <span class="booking-tag">${info.accommodation.stars || 'Seçili'} • ${info.accommodation.price}€ / Gece</span>
                    </div>
                    <div class="booking-line"></div>
                    <div class="booking-info">
                        <h4>✈️ ULAŞIM (UÇUŞ)</h4>
                        <h3>${info.flight.airline}</h3>
                        <span class="booking-tag">${info.flight.time} | ${info.flight.duration}</span>
                    </div>
                </div>
                <div class="daily-grid">`;

        // Günlük Kartlar
        Object.keys(cityData).forEach(dayKey => {
            if (dayKey === 'info') return;
            const slots = cityData[dayKey];
            
            contentHtml += `
                <div class="day-card">
                    <div class="day-header"><h4>${dayKey}</h4></div>
                    <div class="day-body">
                        ${slots.map(s => `
                            <div class="timeline-item">
                                <span class="timeline-time">${s.time}</span>
                                <div class="timeline-content">
                                    <strong>${s.name}</strong>
                                    <span class="meta">${s.tag} • ${s.price}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
        });
        contentHtml += `</div></div>`;
    });

    container.innerHTML = tabsHtml + '</div>' + contentHtml + '</div>';
}

// Sekme değiştirme fonksiyonu
window.openCity = function(evt, cityName) {
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) contents[i].style.display = "none";

    const buttons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < buttons.length; i++) buttons[i].className = buttons[i].className.replace(" active", "");

    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}