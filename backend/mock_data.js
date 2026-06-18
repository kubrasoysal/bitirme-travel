export const CITY_DATA = {
  Roma: {
    country: 'İtalya',
    flights: {
      plane: [
        { airline: 'ITA Airways', duration: '2s 30dk', time: '09:00', price: 180, rating: 4.2, stops: 0 },
        { airline: 'Ryanair', duration: '2s 45dk', time: '06:30', price: 95, rating: 3.5, stops: 0 },
        { airline: 'Lufthansa', duration: '3s 10dk', time: '14:20', price: 210, rating: 4.5, stops: 1 }
      ],
      train: [
        { airline: 'Trenitalia Frecciarossa', duration: '3s 20dk', time: '08:00', price: 90, rating: 4.4, stops: 0 },
        { airline: 'Italo Treno', duration: '3s 35dk', time: '11:15', price: 75, rating: 4.1, stops: 0 }
      ],
      bus: [
        { airline: 'FlixBus', duration: '16s 30dk', time: '07:00', price: 60, rating: 3.8, stops: 2 },
        { airline: 'Marino Autolinee', duration: '15s 00dk', time: '22:00', price: 55, rating: 3.6, stops: 1 }
      ]
    },
    accommodation: {
      hostel: [
        { name: 'The Rome Hostel', price: 35, stars: 2, rating: 4.1, distanceKm: 1.2 },
        { name: 'YellowSquare Rome', price: 42, stars: 2, rating: 4.3, distanceKm: 0.8 }
      ],
      'mid-hotel': [
        { name: 'Hotel Marsala', price: 95, stars: 3, rating: 4.4, distanceKm: 0.5 },
        { name: 'Best Western Plus', price: 120, stars: 4, rating: 4.5, distanceKm: 1.0 },
        { name: 'Hotel Artemide', price: 145, stars: 4, rating: 4.6, distanceKm: 0.3 }
      ],
      luxury: [
        { name: 'Hassler Roma', price: 520, stars: 5, rating: 4.9, distanceKm: 0.2 },
        { name: 'Hotel de Russie', price: 680, stars: 5, rating: 4.8, distanceKm: 0.4 }
      ],
      airbnb: [
        { name: 'Trastevere Loft', price: 120, stars: 0, rating: 4.7, distanceKm: 0.6 },
        { name: 'Monti Designer Flat', price: 98, stars: 0, rating: 4.5, distanceKm: 0.4 }
      ]
    },
    dining: {
      breakfast: [
        { name: 'Pasticceria Regoli', type: 'Kahvaltı', budget: 1, cuisine: 'Pastane', rating: 4.7 },
        { name: 'Roscioli Caffe', type: 'Kahvaltı', budget: 2, cuisine: 'İtalyan', rating: 4.6 },
        { name: 'Sant Eustachio Il Caffe', type: 'Kahvaltı', budget: 1, cuisine: 'Kafe', rating: 4.5 }
      ],
      lunch: [
        { name: 'Supplizio', type: 'Öğle Yemeği', budget: 1, cuisine: 'Street Food', rating: 4.6 },
        { name: 'Flavio al Velavevodetto', type: 'Öğle Yemeği', budget: 2, cuisine: 'Roman', rating: 4.7 },
        { name: 'Pizzarium Bonci', type: 'Öğle Yemeği', budget: 1, cuisine: 'Pizza', rating: 4.8 },
        { name: 'La Licata', type: 'Öğle Yemeği', budget: 1, cuisine: 'Sokak Lezzeti', rating: 4.4 }
      ],
      dinner: [
        { name: 'Tonnarello', type: 'Akşam Yemeği', budget: 2, cuisine: 'Trastevere', rating: 4.7 },
        { name: 'Armando al Pantheon', type: 'Akşam Yemeği', budget: 3, cuisine: 'Gurme', rating: 4.8 },
        { name: 'Da Enzo al 29', type: 'Akşam Yemeği', budget: 2, cuisine: 'Ev Yemekleri', rating: 4.6 },
        { name: 'Roscioli Salumeria', type: 'Akşam Yemeği', budget: 3, cuisine: 'Gastronomi', rating: 4.9 }
      ]
    },
    places: [
      { name: 'Kolezyum', category: ['Tarih'], price: 18, duration: '2s', rating: 4.8 },
      { name: 'Vatikan Müzeleri', category: ['Sanat', 'Tarih'], price: 25, duration: '3s', rating: 4.9 },
      { name: 'Forum Romanum', category: ['Tarih'], price: 12, duration: '2s', rating: 4.7 },
      { name: 'Borghese Galerisi', category: ['Sanat'], price: 20, duration: '2.5s', rating: 4.8 },
      { name: 'Trevi Çeşmesi', category: ['Tarih'], price: 0, duration: '30dk', rating: 4.6 },
      { name: 'Campo de Fiori Pazarı', category: ['Gastronomi', 'Alışveriş'], price: 0, duration: '1.5s', rating: 4.5 },
      { name: 'Villa Borghese', category: ['Doğa'], price: 0, duration: '2s', rating: 4.6 },
      { name: 'Via del Corso', category: ['Alışveriş'], price: 0, duration: '2s', rating: 4.3 }
    ],
    events: [
      { name: 'Opera di Roma — Aida', category: ['Etkinlik', 'Sanat'], type: 'Opera', price: 65, time: '20:00', venue: 'Terme di Caracalla', rating: 4.8 },
      { name: 'Jazz Club Alexanderplatz', category: ['Etkinlik'], type: 'Konser', price: 25, time: '21:30', venue: 'Trastevere', rating: 4.5 },
      { name: 'Roma Light Festival', category: ['Etkinlik'], type: 'Festival', price: 0, time: '19:00', venue: 'Piazza del Popolo', rating: 4.6 },
      { name: 'Stand-up Comedy Night', category: ['Etkinlik'], type: 'Gösteri', price: 18, time: '22:00', venue: 'Teatro Palladium', rating: 4.2 },
      { name: 'Aperitivo Rooftop Sunset', category: ['Gastronomi', 'Etkinlik'], type: 'Sosyal', price: 22, time: '18:30', venue: 'Hotel Forum Rooftop', rating: 4.7 }
    ],
    position: { lat: 41.9028, lon: 12.4964 }
  },
  Milano: {
    country: 'İtalya',
    flights: {
      plane: [
        { airline: 'THY', duration: '2s 50dk', time: '11:20', price: 165, rating: 4.3, stops: 0 },
        { airline: 'easyJet', duration: '2s 40dk', time: '07:45', price: 88, rating: 3.7, stops: 0 },
        { airline: 'Air Dolomiti', duration: '3s 05dk', time: '16:00', price: 195, rating: 4.2, stops: 1 }
      ],
      train: [
        { airline: 'Trenitalia Frecciarossa', duration: '3s 10dk', time: '10:00', price: 120, rating: 4.5, stops: 0 },
        { airline: 'Italo', duration: '3s 25dk', time: '13:30', price: 105, rating: 4.3, stops: 0 }
      ],
      bus: [
        { airline: 'FlixBus', duration: '14s 10dk', time: '09:00', price: 55, rating: 3.9, stops: 1 },
        { airline: 'Marino', duration: '13s 30dk', time: '21:00', price: 48, rating: 3.5, stops: 2 }
      ]
    },
    accommodation: {
      hostel: [
        { name: 'Ostello Bello', price: 40, stars: 2, rating: 4.5, distanceKm: 0.9 },
        { name: 'HI Milano', price: 36, stars: 2, rating: 4.0, distanceKm: 1.5 }
      ],
      'mid-hotel': [
        { name: 'NH Collection Milano', price: 180, stars: 4, rating: 4.6, distanceKm: 0.4 },
        { name: 'Hotel Spadari', price: 155, stars: 4, rating: 4.7, distanceKm: 0.2 },
        { name: 'Starhotels Echo', price: 130, stars: 4, rating: 4.4, distanceKm: 0.6 }
      ],
      luxury: [
        { name: 'Armani Hotel', price: 700, stars: 5, rating: 4.9, distanceKm: 0.1 },
        { name: 'Bulgari Hotel Milano', price: 850, stars: 5, rating: 4.9, distanceKm: 0.3 }
      ],
      airbnb: [
        { name: 'Navigli Studio', price: 130, stars: 0, rating: 4.6, distanceKm: 1.2 },
        { name: 'Brera Design Loft', price: 145, stars: 0, rating: 4.8, distanceKm: 0.5 }
      ]
    },
    dining: {
      breakfast: [
        { name: 'Pavé', type: 'Kahvaltı', budget: 2, cuisine: 'Pastane', rating: 4.7 },
        { name: 'Cova Montenapoleone', type: 'Kahvaltı', budget: 3, cuisine: 'Lüks Kafe', rating: 4.6 },
        { name: 'Giacomo Arengario', type: 'Kahvaltı', budget: 2, cuisine: 'Kafe', rating: 4.5 }
      ],
      lunch: [
        { name: 'Luini Panzerotti', type: 'Öğle Yemeği', budget: 1, cuisine: 'Street Food', rating: 4.6 },
        { name: 'Trippa', type: 'Öğle Yemeği', budget: 2, cuisine: 'Modern İtalyan', rating: 4.8 },
        { name: 'Ratanà', type: 'Öğle Yemeği', budget: 3, cuisine: 'Gastronomi', rating: 4.7 },
        { name: 'Spontini', type: 'Öğle Yemeği', budget: 1, cuisine: 'Pizza', rating: 4.5 }
      ],
      dinner: [
        { name: 'Cracco', type: 'Akşam Yemeği', budget: 3, cuisine: 'Michelin', rating: 4.9 },
        { name: 'Trattoria del Nuovo Macello', type: 'Akşam Yemeği', budget: 2, cuisine: 'Et', rating: 4.7 },
        { name: 'Langosteria', type: 'Akşam Yemeği', budget: 3, cuisine: 'Deniz Ürünleri', rating: 4.8 },
        { name: 'Osteria del Binari', type: 'Akşam Yemeği', budget: 2, cuisine: 'Navigli', rating: 4.5 }
      ]
    },
    places: [
      { name: 'Duomo & Terrazza', category: ['Tarih', 'Sanat'], price: 15, duration: '2s', rating: 4.9 },
      { name: 'Sforza Kalesi', category: ['Tarih'], price: 0, duration: '2s', rating: 4.6 },
      { name: 'Brera Sanat Bölgesi', category: ['Sanat'], price: 0, duration: '2.5s', rating: 4.7 },
      { name: 'Navigli Kanalları', category: ['Doğa', 'Gastronomi'], price: 0, duration: '2s', rating: 4.5 },
      { name: 'Quadrilatero Moda', category: ['Alışveriş'], price: 0, duration: '3s', rating: 4.4 },
      { name: 'Pinacoteca di Brera', category: ['Sanat'], price: 15, duration: '2s', rating: 4.8 },
      { name: 'San Siro Stadyum Turu', category: ['Etkinlik', 'Tarih'], price: 30, duration: '1.5s', rating: 4.5 }
    ],
    events: [
      { name: 'La Scala — La Traviata', category: ['Etkinlik', 'Sanat'], type: 'Opera', price: 95, time: '20:00', venue: 'Teatro alla Scala', rating: 4.9 },
      { name: 'Milano Fashion Week Pop-up', category: ['Etkinlik', 'Alışveriş'], type: 'Festival', price: 0, time: '14:00', venue: 'Via Tortona', rating: 4.6 },
      { name: 'Blue Note Jazz Club', category: ['Etkinlik'], type: 'Konser', price: 35, time: '21:00', venue: 'Via Pietro Borsieri', rating: 4.7 },
      { name: 'Navigli Aperitivo Festival', category: ['Gastronomi', 'Etkinlik'], type: 'Festival', price: 15, time: '18:00', venue: 'Navigli', rating: 4.5 },
      { name: 'San Siro — AC Milan Maçı', category: ['Etkinlik'], type: 'Spor', price: 55, time: '20:45', venue: 'San Siro', rating: 4.8 }
    ],
    position: { lat: 45.4642, lon: 9.19 }
  },
  Viyana: {
    country: 'Avusturya',
    flights: {
      plane: [
        { airline: 'Austrian Airlines', duration: '2s 15dk', time: '08:30', price: 140, rating: 4.4, stops: 0 },
        { airline: 'Wizz Air', duration: '2s 30dk', time: '12:10', price: 72, rating: 3.6, stops: 0 },
        { airline: 'Swiss', duration: '3s 00dk', time: '15:40', price: 175, rating: 4.3, stops: 1 }
      ],
      train: [
        { airline: 'ÖBB Railjet', duration: '7s 45dk', time: '08:00', price: 110, rating: 4.6, stops: 0 },
        { airline: 'ÖBB Nightjet', duration: '9s 30dk', time: '22:30', price: 85, rating: 4.2, stops: 0 }
      ],
      bus: [
        { airline: 'FlixBus', duration: '12s 25dk', time: '07:30', price: 65, rating: 3.8, stops: 1 },
        { airline: 'RegioJet', duration: '11s 50dk', time: '23:00', price: 58, rating: 4.0, stops: 2 }
      ]
    },
    accommodation: {
      hostel: [
        { name: 'Wombats City Hostel', price: 38, stars: 2, rating: 4.4, distanceKm: 0.7 },
        { name: 'MEININGER Wien', price: 42, stars: 2, rating: 4.2, distanceKm: 1.1 }
      ],
      'mid-hotel': [
        { name: 'Motel One Wien', price: 110, stars: 3, rating: 4.5, distanceKm: 0.3 },
        { name: 'Hotel Kaiserhof', price: 135, stars: 4, rating: 4.6, distanceKm: 0.5 },
        { name: 'Ruby Marie Hotel', price: 125, stars: 4, rating: 4.5, distanceKm: 0.8 }
      ],
      luxury: [
        { name: 'Hotel Sacher', price: 480, stars: 5, rating: 4.9, distanceKm: 0.2 },
        { name: 'Park Hyatt Vienna', price: 550, stars: 5, rating: 4.8, distanceKm: 0.1 }
      ],
      airbnb: [
        { name: 'Innere Stadt Apartment', price: 95, stars: 0, rating: 4.6, distanceKm: 0.4 },
        { name: 'Leopoldstadt Loft', price: 88, stars: 0, rating: 4.4, distanceKm: 1.0 }
      ]
    },
    dining: {
      breakfast: [
        { name: 'Café Central', type: 'Kahvaltı', budget: 2, cuisine: 'Viyana Kafe', rating: 4.7 },
        { name: 'Demel', type: 'Kahvaltı', budget: 2, cuisine: 'Pastane', rating: 4.8 },
        { name: 'Café Sacher', type: 'Kahvaltı', budget: 3, cuisine: 'Lüks Kafe', rating: 4.6 }
      ],
      lunch: [
        { name: 'Naschmarkt Food Stalls', type: 'Öğle Yemeği', budget: 1, cuisine: 'Pazar', rating: 4.5 },
        { name: 'Figlmüller', type: 'Öğle Yemeği', budget: 2, cuisine: 'Schnitzel', rating: 4.7 },
        { name: 'Plachutta', type: 'Öğle Yemeği', budget: 3, cuisine: 'Et', rating: 4.8 },
        { name: 'Salm Bräu', type: 'Öğle Yemeği', budget: 2, cuisine: 'Bira Evi', rating: 4.4 }
      ],
      dinner: [
        { name: 'Steirereck', type: 'Akşam Yemeği', budget: 3, cuisine: 'Michelin', rating: 4.9 },
        { name: 'Skopik & Lohn', type: 'Akşam Yemeği', budget: 2, cuisine: 'Avusturya', rating: 4.6 },
        { name: 'Motto am Fluss', type: 'Akşam Yemeği', budget: 3, cuisine: 'Modern', rating: 4.7 },
        { name: 'Griechenbeisl', type: 'Akşam Yemeği', budget: 2, cuisine: 'Geleneksel', rating: 4.5 }
      ]
    },
    places: [
      { name: 'Schönbrunn Sarayı', category: ['Tarih', 'Doğa'], price: 22, duration: '3s', rating: 4.9 },
      { name: 'Belvedere Müzesi', category: ['Sanat'], price: 18, duration: '2.5s', rating: 4.8 },
      { name: 'Stephansdom', category: ['Tarih'], price: 0, duration: '1s', rating: 4.7 },
      { name: 'Prater & Dönme Dolap', category: ['Doğa', 'Etkinlik'], price: 12, duration: '2s', rating: 4.5 },
      { name: 'Kunsthistorisches Museum', category: ['Sanat', 'Tarih'], price: 16, duration: '2.5s', rating: 4.8 },
      { name: 'Mariahilfer Straße', category: ['Alışveriş'], price: 0, duration: '2s', rating: 4.3 },
      { name: 'Naschmarkt', category: ['Gastronomi', 'Alışveriş'], price: 0, duration: '1.5s', rating: 4.6 }
    ],
    events: [
      { name: 'Wiener Staatsoper — Balet Gecesi', category: ['Etkinlik', 'Sanat'], type: 'Bale', price: 75, time: '19:30', venue: 'Staatsoper', rating: 4.9 },
      { name: 'Vienna Jazz Festival', category: ['Etkinlik'], type: 'Konser', price: 40, time: '20:00', venue: 'Stadtpark', rating: 4.7 },
      { name: 'Prater Sommernacht', category: ['Etkinlik'], type: 'Festival', price: 0, time: '21:00', venue: 'Prater', rating: 4.5 },
      { name: 'Stand-up Comedy — Kabarett', category: ['Etkinlik'], type: 'Gösteri', price: 28, time: '20:30', venue: 'Kabarett Simpl', rating: 4.4 },
      { name: 'Heuriger Wine Evening', category: ['Gastronomi', 'Etkinlik'], type: 'Sosyal', price: 20, time: '17:30', venue: 'Grinzing', rating: 4.6 }
    ],
    position: { lat: 48.2082, lon: 16.3738 }
  },
  Paris: {
    country: 'Fransa',
    flights: {
      plane: [
        { airline: 'Air France', duration: '3s 45dk', time: '10:00', price: 210, rating: 4.5, stops: 0 },
        { airline: 'Pegasus', duration: '4s 10dk', time: '13:30', price: 110, rating: 3.8, stops: 0 }
      ],
      train: [],
      bus: []
    },
    accommodation: {
      hostel: [
        { name: 'St Christopher\'s Inn', price: 45, stars: 2, rating: 4.2, distanceKm: 2.0 }
      ],
      'mid-hotel': [
        { name: 'Hotel de l\'Empereur', price: 160, stars: 4, rating: 4.5, distanceKm: 1.2 }
      ],
      luxury: [
        { name: 'Ritz Paris', price: 950, stars: 5, rating: 4.9, distanceKm: 0.5 }
      ],
      airbnb: [
        { name: 'Montmartre Studio', price: 120, stars: 0, rating: 4.7, distanceKm: 1.5 }
      ]
    },
    dining: {
      breakfast: [
        { name: 'Café de Flore', type: 'Kahvaltı', budget: 3, cuisine: 'Fransız Kafe', rating: 4.6 }
      ],
      lunch: [
        { name: 'L\'As du Fallafel', type: 'Öğle Yemeği', budget: 1, cuisine: 'Sokak Lezzeti', rating: 4.7 }
      ],
      dinner: [
        { name: 'Le Relais de l\'Entrecôte', type: 'Akşam Yemeği', budget: 3, cuisine: 'Biftek', rating: 4.8 }
      ]
    },
    places: [
      { name: 'Eyfel Kulesi', category: ['Tarih'], price: 28, duration: '2s', rating: 4.8 },
      { name: 'Louvre Müzesi', category: ['Sanat', 'Tarih'], price: 22, duration: '4s', rating: 4.9 },
      { name: 'Champs-Élysées', category: ['Alışveriş'], price: 0, duration: '2s', rating: 4.5 }
    ],
    events: [
      { name: 'Moulin Rouge Gösterisi', category: ['Etkinlik', 'Sanat'], type: 'Kabare', price: 120, time: '21:00', venue: 'Moulin Rouge', rating: 4.8 }
    ],
    position: { lat: 48.8566, lon: 2.3522 }
  },
  Barcelona: {
    country: 'İspanya',
    flights: {
      plane: [
        { airline: 'Vueling', duration: '4s 00dk', time: '09:15', price: 140, rating: 4.0, stops: 0 },
        { airline: 'THY', duration: '4s 20dk', time: '14:45', price: 190, rating: 4.4, stops: 0 }
      ],
      train: [],
      bus: []
    },
    accommodation: {
      hostel: [
        { name: 'Generator Barcelona', price: 35, stars: 2, rating: 4.3, distanceKm: 1.5 }
      ],
      'mid-hotel': [
        { name: 'Hotel 1898', price: 145, stars: 4, rating: 4.6, distanceKm: 0.2 }
      ],
      luxury: [
        { name: 'W Barcelona', price: 450, stars: 5, rating: 4.8, distanceKm: 3.0 }
      ],
      airbnb: [
        { name: 'Gothic Quarter Loft', price: 110, stars: 0, rating: 4.5, distanceKm: 0.5 }
      ]
    },
    dining: {
      breakfast: [
        { name: 'Brunch & Cake', type: 'Kahvaltı', budget: 2, cuisine: 'Modern', rating: 4.6 }
      ],
      lunch: [
        { name: 'Mercado de La Boqueria', type: 'Öğle Yemeği', budget: 1, cuisine: 'Pazar', rating: 4.7 }
      ],
      dinner: [
        { name: 'Cervecería Catalana', type: 'Akşam Yemeği', budget: 2, cuisine: 'Tapas', rating: 4.8 }
      ]
    },
    places: [
        { name: 'La Sagrada Familia', category: ['Tarih', 'Sanat'], price: 26, duration: '2s', rating: 4.9 },
        { name: 'Park Güell', category: ['Doğa', 'Sanat'], price: 10, duration: '2s', rating: 4.6 },
        { name: 'La Rambla', category: ['Alışveriş', 'Doğa'], price: 0, duration: '2s', rating: 4.4 }
      ],
      events: [
        { name: 'Flamenko Gösterisi', category: ['Etkinlik', 'Sanat'], type: 'Dans', price: 45, time: '20:00', venue: 'Palau Dalmases', rating: 4.7 }
      ],
    position: { lat: 41.3851, lon: 2.1734 }
  }
};
