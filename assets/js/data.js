// assets/js/data.js
export const CITY_DATA = {
    'Roma': {
        country: "İtalya",
        flights: { airline: "ITA Airways", duration: "2s 30dk", time: "09:00", price: 180 },
        accommodation: {
            hotel: {
                1: { name: "Hotel Marsala", price: 45, stars: "⭐⭐" },
                2: { name: "Hotel Artemide", price: 160, stars: "⭐⭐⭐⭐" },
                3: { name: "Hassler Roma", price: 550, stars: "⭐⭐⭐⭐⭐" }
            },
            airbnb: {
                1: { name: "Trastevere Shared Studio", price: 30, stars: "🏠 Oda" },
                2: { name: "Piazza Navona Apartment", price: 110, stars: "🏠 Daire" },
                3: { name: "Villa Borghese Luxury Loft", price: 450, stars: "🏠 Villa" }
            }
        },
        dining: [
            { name: "Tonnarello (Pasta)", type: "Akşam Yemeği", budget: 2 },
            { name: "La Licata (Kahvaltı)", type: "Kahvaltı", budget: 1 }
        ],
        activities: [
            { name: "Kolezyum & Forum", category: ["Tarih"], cost: 18 },
            { name: "Vatikan Müzeleri", category: ["Sanat"], cost: 25 },
            { name: "Trevi Çeşmesi", category: ["Manzara"], cost: 0 }
        ],
        places: [
            { name: "Panteon", category: ["Tarih"], price: 0 },
            { name: "İspanyol Merdivenleri", category: ["Manzara"], price: 0 },
            { name: "Campo de' Fiori Pazarı", category: ["Gastronomi"], price: 0 },
            { name: "Vatikana Giden Tur", category: ["Sanat"], price: 25 }
        ],
        specialEvents: [{ name: "Roma Sokak Festivali", start: "02-01", end: "02-15", type: "Festival" }]
    },
    'Milano': {
        country: "İtalya",
        flights: { airline: "THY", duration: "2s 50dk", time: "11:20", price: 165 },
        accommodation: {
            hotel: {
                1: { name: "Ostello Bello", price: 40, stars: "⭐⭐" },
                2: { name: "NH Collection Milano", price: 190, stars: "⭐⭐⭐⭐" },
                3: { name: "Armani Hotel", price: 700, stars: "⭐⭐⭐⭐⭐" }
            },
            airbnb: {
                1: { name: "Navigli Artist Room", price: 55, stars: "🏠 Oda" },
                2: { name: "Duomo View Studio", price: 130, stars: "🏠 Daire" },
                3: { name: "Brera Design District Loft", price: 600, stars: "🏠 Loft" }
            }
        },
        dining: [
            { name: "Luini Panzerotti", type: "Atıştırmalık", budget: 1 },
            { name: "Ratana (Risotto)", type: "Akşam Yemeği", budget: 3 }
        ],
        activities: [
            { name: "Duomo Katedrali", category: ["Mimari"], cost: 15 },
            { name: "Sforzesco Şatosu", category: ["Tarih"], cost: 0 },
            { name: "Galleria Vittorio Emanuele", category: ["Alışveriş"], cost: 0 }
        ],
        places: [
            { name: "Brera Mahallesi", category: ["Sanat"], price: 0 },
            { name: "Navigli Kanalları", category: ["Manzara"], price: 0 },
            { name: "Mercato Centrale", category: ["Gastronomi"], price: 0 },
            { name: "Sforza Kalesi", category: ["Tarih"], price: 10 }
        ],
        specialEvents: []
    },
    'Viyana': {
        country: "Avusturya",
        flights: { airline: "Austrian Airlines", duration: "2s 15dk", time: "08:30", price: 140 },
        accommodation: {
            hotel: { 1: { name: "Wombat's", price: 35 }, 2: { name: "Motel One", price: 110 }, 3: { name: "Hotel Sacher", price: 480 } },
            airbnb: { 1: { name: "Budget Room", price: 30 }, 2: { name: "Modern Flat", price: 95 }, 3: { name: "Penthouse", price: 350 } }
        },
        dining: [{ name: "Figlmüller", type: "Şinitzel", budget: 2 }],
        activities: [{ name: "Schönbrunn", category: ["Saray"], cost: 22 }],
        places: [
            { name: "Schönbrunn Sarayı", category: ["Saray"], price: 22 },
            { name: "Belvedere Müzesi", category: ["Sanat"], price: 18 },
            { name: "Prater Eğlence Parkı", category: ["Doğa"], price: 0 },
            { name: "Naschmarkt", category: ["Gastronomi"], price: 0 }
        ],
        specialEvents: [{ name: "Noel Pazarı", start: "11-15", end: "12-24", type: "Pazar" }]
    }
};