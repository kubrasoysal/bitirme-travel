export const CITY_DATA = {
  // İtalya
  Roma: {
    country: 'İtalya',
    lat: 41.9028,
    lon: 12.4964,
    flights: {
      plane: { airline: 'ITA Airways', duration: '2s 30dk', time: '09:00', price: 180 },
      train: { airline: 'Tren', duration: '12s', time: '08:00', price: 90 },
      bus: { airline: 'FlixBus', duration: '16s', time: '07:00', price: 60 }
    },
    accommodation: {
      hostel: { name: 'The Orange Hostel', price: 45, stars: '⭐⭐' },
      'mid-hotel': { name: 'Hotel Marsala', price: 120, stars: '⭐⭐⭐' },
      luxury: { name: 'Hassler Roma', price: 650, stars: '⭐⭐⭐⭐⭐' },
      airbnb: { name: 'Trastevere Loft', price: 150, stars: '🏠 Daire' }
    },
    dining: [
      { name: 'Tonnarello', type: 'Akşam Yemeği', budget: 35 },
      { name: 'Caffe Greco', type: 'Kahvaltı', budget: 8 }
    ],
    places: [
      { name: 'Kolezyum', category: ['Tarih'], price: 18 },
      { name: 'Vatikan Müzeleri', category: ['Sanat'], price: 28 },
      { name: 'Trevi Çeşmesi', category: ['Manzara'], price: 0 },
      { name: 'Forum Romarum', category: ['Tarih'], price: 15 }
    ]
  },
  Milano: {
    country: 'İtalya',
    lat: 45.4642,
    lon: 9.1900,
    flights: {
      plane: { airline: 'THY', duration: '2s 50dk', time: '11:20', price: 165 },
      train: { airline: 'Eurocity', duration: '8s', time: '10:00', price: 120 },
      bus: { airline: 'FlixBus', duration: '14s', time: '09:00', price: 55 }
    },
    accommodation: {
      hostel: { name: 'Ostello Bello', price: 50, stars: '⭐⭐' },
      'mid-hotel': { name: 'NH Collection Milano', price: 150, stars: '⭐⭐⭐⭐' },
      luxury: { name: 'Armani Hotel', price: 900, stars: '⭐⭐⭐⭐⭐' },
      airbnb: { name: 'Navigli Studio', price: 140, stars: '🏠 Daire' }
    },
    dining: [
      { name: 'Luini Panzerotti', type: 'Atıştırmalık', budget: 6 },
      { name: 'Ratana Risotto', type: 'Akşam Yemeği', budget: 45 }
    ],
    places: [
      { name: 'Duomo Katedrali', category: ['Mimari'], price: 15 },
      { name: 'Sforza Kalesi', category: ['Tarih'], price: 10 },
      { name: 'Brera Müzesi', category: ['Sanat'], price: 12 },
      { name: 'Navigli Kanalları', category: ['Doğa'], price: 0 }
    ]
  },
  Venedik: {
    country: 'İtalya',
    lat: 45.4408,
    lon: 12.3155,
    flights: {
      plane: { airline: 'Alitalia', duration: '2s 15dk', time: '10:30', price: 175 },
      train: { airline: 'Trenitalia', duration: '3s 30dk', time: '08:00', price: 45 },
      bus: { airline: 'ATVO', duration: '5s', time: '07:00', price: 35 }
    },
    accommodation: {
      hostel: { name: 'Foresteria Valdese', price: 55, stars: '⭐⭐' },
      'mid-hotel': { name: 'Hotel Danieli', price: 250, stars: '⭐⭐⭐⭐' },
      luxury: { name: 'Gritti Palace', price: 850, stars: '⭐⭐⭐⭐⭐' },
      airbnb: { name: 'Canal Grande View', price: 180, stars: '🏠 Daire' }
    },
    dining: [
      { name: 'Gino Mancini', type: 'Seafood', budget: 50 },
      { name: 'Do Mori', type: 'Bar/Cicchetti', budget: 12 }
    ],
    places: [
      { name: 'Basilica di San Marco', category: ['Tarih', 'Sanat'], price: 16 },
      { name: 'Gondola Turu', category: ['Manzara'], price: 80 },
      { name: 'Rialto Köprüsü', category: ['Manzara'], price: 0 },
      { name: 'Doge Sarayı', category: ['Tarih'], price: 20 }
    ]
  },
  
  // Avusturya
  Viyana: {
    country: 'Avusturya',
    lat: 48.2082,
    lon: 16.3738,
    flights: {
      plane: { airline: 'Austrian', duration: '2s 15dk', time: '08:30', price: 140 },
      train: { airline: 'ÖBB Railjet', duration: '7s 45dk', time: '08:00', price: 110 },
      bus: { airline: 'FlixBus', duration: '12s', time: '07:30', price: 65 }
    },
    accommodation: {
      hostel: { name: 'Wombat\'s City', price: 45, stars: '⭐⭐' },
      'mid-hotel': { name: 'Motel One', price: 130, stars: '⭐⭐⭐' },
      luxury: { name: 'Hotel Sacher', price: 550, stars: '⭐⭐⭐⭐⭐' },
      airbnb: { name: 'City Flat Innere Stadt', price: 120, stars: '🏠 Daire' }
    },
    dining: [
      { name: 'Figlmüller', type: 'Schnitzel', budget: 28 },
      { name: 'Naschmarkt Stands', type: 'Street Food', budget: 10 }
    ],
    places: [
      { name: 'Schönbrunn Sarayı', category: ['Tarih'], price: 22 },
      { name: 'Belvedere Müzesi', category: ['Sanat'], price: 18 },
      { name: 'Prater Eğlence Parkı', category: ['Doğa'], price: 15 },
      { name: 'St. Stephen\'s Katedrali', category: ['Mimari'], price: 5 }
    ]
  },
  Salzburg: {
    country: 'Avusturya',
    lat: 47.8095,
    lon: 13.0550,
    flights: {
      plane: { airline: 'Ryanair', duration: '1s 50dk', time: '09:15', price: 85 },
      train: { airline: 'Railjet', duration: '2s 30dk', time: '08:00', price: 45 },
      bus: { airline: 'FlixBus', duration: '4s', time: '08:00', price: 25 }
    },
    accommodation: {
      hostel: { name: 'YOHO Salzburg', price: 40, stars: '⭐⭐' },
      'mid-hotel': { name: 'Amadeus Hotel', price: 110, stars: '⭐⭐⭐' },
      luxury: { name: 'Hotel Goldener Hirsch', price: 450, stars: '⭐⭐⭐⭐⭐' },
      airbnb: { name: 'Altstadt Studio', price: 95, stars: '🏠 Daire' }
    },
    dining: [
      { name: 'Cafe Klassik', type: 'Österreich Mutfağı', budget: 20 },
      { name: 'Mozart Kaffee', type: 'Kahvaltı', budget: 10 }
    ],
    places: [
      { name: 'Hohensalzburg Kalesi', category: ['Tarih'], price: 16 },
      { name: 'Mirabell Sarayı', category: ['Sanat'], price: 12 },
      { name: 'St. Peter Kilisesi', category: ['Mimari'], price: 0 },
      { name: 'Kapuzinerberg', category: ['Doğa'], price: 0 }
    ]
  },

  // Çek Cumhuriyeti
  Prag: {
    country: 'Çek Cumhuriyeti',
    lat: 50.0755,
    lon: 14.4378,
    flights: {
      plane: { airline: 'Czech Airlines', duration: '2s 20dk', time: '10:00', price: 120 },
      train: { airline: 'ČD Pendolino', duration: '5s 30dk', time: '08:00', price: 50 },
      bus: { airline: 'FlixBus', duration: '8s', time: '07:00', price: 30 }
    },
    accommodation: {
      hostel: { name: 'The Old Prague', price: 35, stars: '⭐⭐' },
      'mid-hotel': { name: 'Aria Hotel', price: 140, stars: '⭐⭐⭐⭐' },
      luxury: { name: 'Four Seasons Prague', price: 700, stars: '⭐⭐⭐⭐⭐' },
      airbnb: { name: 'Old Town Square Apt', price: 110, stars: '🏠 Daire' }
    },
    dining: [
      { name: 'U Flecků', type: 'Çek Mutfağı', budget: 15 },
      { name: 'Lokál', type: 'Taverna', budget: 18 }
    ],
    places: [
      { name: 'Prag Kalesi', category: ['Tarih'], price: 18 },
      { name: 'Karls Köprüsü', category: ['Manzara'], price: 0 },
      { name: 'Eski Şehir Meydanı', category: ['Mimari'], price: 0 },
      { name: 'Azaniyya Sinagog', category: ['Tarih', 'Sanat'], price: 12 }
    ]
  },

  // Macaristan
  Budapeşte: {
    country: 'Macaristan',
    lat: 47.4979,
    lon: 19.0402,
    flights: {
      plane: { airline: 'Wizz Air', duration: '2s 00dk', time: '11:00', price: 95 },
      train: { airline: 'Railjet', duration: '7s', time: '08:00', price: 70 },
      bus: { airline: 'FlixBus', duration: '10s', time: '07:00', price: 35 }
    },
    accommodation: {
      hostel: { name: 'Citadella Hostel', price: 38, stars: '⭐⭐' },
      'mid-hotel': { name: 'Budapest Marriott', price: 160, stars: '⭐⭐⭐⭐' },
      luxury: { name: 'Four Seasons Budapest', price: 600, stars: '⭐⭐⭐⭐⭐' },
      airbnb: { name: 'Pest Side Loft', price: 105, stars: '🏠 Daire' }
    },
    dining: [
      { name: 'Szép Ilona', type: 'Macar Mutfağı', budget: 18 },
      { name: 'Central Kávéház', type: 'Kahvaltı/Tatlı', budget: 12 }
    ],
    places: [
      { name: 'Macakça Parlamento Binası', category: ['Mimari'], price: 25 },
      { name: 'Balnearium Thermal Baths', category: ['Doğa'], price: 20 },
      { name: 'Elizabeth Köprüsü', category: ['Manzara'], price: 0 },
      { name: 'Fishermans Bastion', category: ['Manzara'], price: 8 }
    ]
  },

  // Fransa
  Paris: {
    country: 'Fransa',
    lat: 48.8566,
    lon: 2.3522,
    flights: {
      plane: { airline: 'Air France', duration: '2s 30dk', time: '10:00', price: 150 },
      train: { airline: 'Eurostar', duration: '2s 15dk', time: '09:00', price: 80 },
      bus: { airline: 'FlixBus', duration: '15s', time: '08:00', price: 40 }
    },
    accommodation: {
      hostel: { name: 'St Christopher\'s Paris', price: 60, stars: '⭐⭐' },
      'mid-hotel': { name: 'Hotel de l\'Opera', price: 200, stars: '⭐⭐⭐⭐' },
      luxury: { name: 'Ritz Paris', price: 1200, stars: '⭐⭐⭐⭐⭐' },
      airbnb: { name: 'Marais Penthouse', price: 220, stars: '🏠 Daire' }
    },
    dining: [
      { name: 'Le Comptoir du Panthéon', type: 'Französisch', budget: 45 },
      { name: 'Cafe de Flore', type: 'Klassik Kahvesi', budget: 15 }
    ],
    places: [
      { name: 'Eiffel Tower', category: ['Manzara'], price: 28 },
      { name: 'Louvre Museum', category: ['Sanat'], price: 22 },
      { name: 'Notre-Dame Katedrali', category: ['Mimari'], price: 0 },
      { name: 'Arc de Triomphe', category: ['Manzara'], price: 15 }
    ]
  },
  Nice: {
    country: 'Fransa',
    lat: 43.7102,
    lon: 7.2620,
    flights: {
      plane: { airline: 'Air France', duration: '2s 20dk', time: '11:00', price: 130 },
      train: { airline: 'TGV', duration: '5s 30dk', time: '08:00', price: 60 },
      bus: { airline: 'FlixBus', duration: '12s', time: '07:00', price: 35 }
    },
    accommodation: {
      hostel: { name: 'Les Caravelles', price: 50, stars: '⭐⭐' },
      'mid-hotel': { name: 'Hotel Negresco', price: 180, stars: '⭐⭐⭐⭐' },
      luxury: { name: 'Hôtel Méridien Nice', price: 500, stars: '⭐⭐⭐⭐⭐' },
      airbnb: { name: 'Promenade Studio', price: 140, stars: '🏠 Daire' }
    },
    dining: [
      { name: 'Salade Nicoise', type: 'Yerel Mutfak', budget: 15 },
      { name: 'La Maison de Marie', type: 'Provence Yemeği', budget: 35 }
    ],
    places: [
      { name: 'Promenade des Anglais', category: ['Manzara'], price: 0 },
      { name: 'Old Town (Vieux Nice)', category: ['Kültür'], price: 0 },
      { name: 'Castle Hill', category: ['Tarih', 'Manzara'], price: 8 },
      { name: 'Matisse Museum', category: ['Sanat'], price: 10 }
    ]
  },

  // İspanya
  Barselona: {
    country: 'İspanya',
    lat: 41.3851,
    lon: 2.1734,
    flights: {
      plane: { airline: 'Vueling', duration: '2s 45dk', time: '10:30', price: 125 },
      train: { airline: 'AVE', duration: '6s', time: '08:00', price: 75 },
      bus: { airline: 'FlixBus', duration: '14s', time: '07:00', price: 45 }
    },
    accommodation: {
      hostel: { name: 'Gothic Point', price: 48, stars: '⭐⭐' },
      'mid-hotel': { name: 'Mandarin Oriental', price: 200, stars: '⭐⭐⭐⭐' },
      luxury: { name: 'W Barcelona', price: 600, stars: '⭐⭐⭐⭐⭐' },
      airbnb: { name: 'Gothic Quarter Loft', price: 160, stars: '🏠 Daire' }
    },
    dining: [
      { name: 'Tapas El Xampanyet', type: 'Tapa Barı', budget: 12 },
      { name: 'Cinc Sentits', type: 'Yüksek Mutfak', budget: 85 }
    ],
    places: [
      { name: 'Sagrada Familia', category: ['Mimari'], price: 35 },
      { name: 'Park Güell', category: ['Sanat', 'Manzara'], price: 20 },
      { name: 'Gothic Quarter', category: ['Tarih'], price: 0 },
      { name: 'Las Ramblas', category: ['Kültür'], price: 0 }
    ]
  },
  Madrid: {
    country: 'İspanya',
    lat: 40.4168,
    lon: -3.7038,
    flights: {
      plane: { airline: 'Iberia', duration: '2s 30dk', time: '11:00', price: 135 },
      train: { airline: 'AVE', duration: '8s 15dk', time: '08:00', price: 85 },
      bus: { airline: 'FlixBus', duration: '13s', time: '07:00', price: 40 }
    },
    accommodation: {
      hostel: { name: 'Cat\'s Hostel', price: 42, stars: '⭐⭐' },
      'mid-hotel': { name: 'Ritz Madrid', price: 210, stars: '⭐⭐⭐⭐' },
      luxury: { name: 'Palace Madrid', price: 750, stars: '⭐⭐⭐⭐⭐' },
      airbnb: { name: 'Gran Via Apartment', price: 170, stars: '🏠 Daire' }
    },
    dining: [
      { name: 'Casa Lucio', type: 'İspanyol Klasik', budget: 30 },
      { name: 'La Latina Taverna', type: 'Tapa', budget: 15 }
    ],
    places: [
      { name: 'Prado Müzesi', category: ['Sanat'], price: 20 },
      { name: 'Royal Palace', category: ['Tarih'], price: 18 },
      { name: 'Retiro Park', category: ['Doğa'], price: 0 },
      { name: 'Templo de Debod', category: ['Tarih'], price: 0 }
    ]
  },

  // Portekiz
  Lizbon: {
    country: 'Portekiz',
    lat: 38.7223,
    lon: -9.1393,
    flights: {
      plane: { airline: 'TAP Air Portugal', duration: '3s', time: '12:00', price: 110 },
      train: { airline: 'Tren', duration: '10s', time: '08:00', price: 55 },
      bus: { airline: 'FlixBus', duration: '12s', time: '07:00', price: 35 }
    },
    accommodation: {
      hostel: { name: 'The Independente Hostel', price: 38, stars: '⭐⭐' },
      'mid-hotel': { name: 'Memmo Alfama Hotel', price: 140, stars: '⭐⭐⭐⭐' },
      luxury: { name: 'Memmo Alfama Suites', price: 450, stars: '⭐⭐⭐⭐⭐' },
      airbnb: { name: 'Alfama Charm Apartment', price: 100, stars: '🏠 Daire' }
    },
    dining: [
      { name: 'Pasteis de Nata', type: 'Pastane', budget: 5 },
      { name: 'Cervejaria Ramiro', type: 'Deniz Ürünleri', budget: 25 }
    ],
    places: [
      { name: 'Jeronimos Manastırı', category: ['Tarih'], price: 14 },
      { name: 'Christ the King Monument', category: ['Manzara'], price: 7 },
      { name: 'Bairro Alto', category: ['Kültür'], price: 0 },
      { name: 'Sintra', category: ['Doğa', 'Tarih'], price: 15 }
    ]
  }
};
