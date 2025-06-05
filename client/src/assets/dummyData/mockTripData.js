export const mockTripData = {
  _id: "683b6fb80e9e728fafb3f87b",
  title: "10 days in Italy (Rome and Florence)",
  duration: 10,
  countries: [
    { _id: "68345bffb3ece0dca3b2a2c5", name: "Italy" }
  ],
  cities: ["Rome", "Florence"],
  coverPhoto: "https://images.unsplash.com/photo-1523293171974-1b4b6d04f0b9?q=80&w=3546&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  createdAt: "2023-09-15T12:00:00Z",
  rating: 5,
  timesCopied: 127,
  timesBookmarked: 77,
  user: {
    _id: "user456",
    name: "Bob",
    surname: "Green",
    country: "Italy"
  },
  days: [
    {
      _id: "day_1",
      title: "Arrival in Rome",
      dayNumber: 1,
      events: [
        {
          _id: "event1",
          title: "Check-in at Hotel Artemide",
          location: {
            _id: "loc_event1",
            name: "Hotel Artemide",
            address: "Via Nazionale 22, Rome",
            city: "Rome",
            coordinates: { lat: 41.900932, lng: 12.495481 }
          },
          notes: "Modern hotel in the heart of Rome. Request a room with a balcony for city views. The staff is extremely helpful with local recommendations.",
          price: "€150/night",
          rating: 4,
          photos: [
            "https://images.unsplash.com/photo-1727553560821-018e46b484b0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8MHwwfHx8Mg%3D%3D",
            "https://images.unsplash.com/photo-1585852707087-45a211d7f8c9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8MHwwfHx8Mg%3D%3D"
          ]
        },
        {
          _id: "event2",
          title: "Evening walk at Piazza Navona",
          location: {
            _id: "loc_event2",
            name: "Piazza Navona",
            address: "Piazza Navona, Rome",
            city: "Rome",
            coordinates: { lat: 41.8989, lng: 12.4731 }
          },
          notes: "Beautiful square with three fountains. Visit after 7pm when the street performers are active and the lighting is perfect for photos.",
          rating: 5,
          photos: [
            "https://images.unsplash.com/photo-1647943114702-9a5495a8c7f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXRhbHklMjBmaWxtJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1683561780838-549e5f701807?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8fDB8fHwy",
            "https://images.unsplash.com/photo-1731956124539-195637f0aeac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxpdGFseSUyMGZpbG0lMjBwaG90b3xlbnwwfHwwfHx8Mg%3D%3D"
          ]
        },
        {
          _id: "event3",
          title: "Dinner at Roscioli Restaurant",
          location: {
            _id: "loc_event3",
            name: "Roscioli Restaurant",
            address: "Via dei Giubbonari 21, Rome",
            city: "Rome",
            coordinates: { lat: 41.8945, lng: 12.4741 }
          },
          notes: "Cozy atmosphere, not so many tourists, pasta — 🔥",
          price: "€35",
          rating: 5,
          photos: [
            "https://images.unsplash.com/photo-1739273240715-d191e76d9358?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8MXwwfHx8Mg%3D%3D",
            "https://images.unsplash.com/photo-1639739964325-f6fe291c1281?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8fDB8fHwy",
            "https://images.unsplash.com/photo-1727553560821-018e46b484b0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8MHwwfHx8Mg%3D%3D"
          ]
        }
      ]
    },
    {
      _id: "day_2",
      title: "Rome Classics",
      dayNumber: 2,
      events: [
        {
          _id: "event4",
          title: "Colosseum & Roman Forum",
          location: {
            _id: "loc_event4",
            name: "Colosseum",
            address: "Piazza del Colosseo, Rome",
            city: "Rome",
            coordinates: { lat: 41.8902, lng: 12.4922 }
          },
          notes: "Arrive early (before 9am) to avoid long lines. The combined ticket includes both attractions. Consider hiring a guide for better historical context.",
          price: "€16 entrance fee",
          rating: 5,
          photos: [
            "https://images.unsplash.com/photo-1585852707087-45a211d7f8c9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8MHwwfHx8Mg%3D%3D",
            "https://images.unsplash.com/photo-1647943114702-9a5495a8c7f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXRhbHklMjBmaWxtJTIwcGhvdG98ZW58MHx8MHx8fDA%3D"
          ]
        },
        {
          _id: "event5",
          title: "Lunch at Trattoria Da Danilo",
          location: {
            _id: "loc_event5",
            name: "Trattoria Da Danilo",
            address: "Via Petrarca 13, Rome",
            city: "Rome",
            coordinates: { lat: 41.8828, lng: 12.5096 }
          },
          notes: "Famous for carbonara and cacio e pepe. Make a reservation a day ahead.",
          price: "€25-30 per person",
          rating: 4,
          photos: [
            "https://images.unsplash.com/photo-1683561780838-549e5f701807?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8fDB8fHwy"
          ]
        },
        {
          _id: "event6",
          title: "Pantheon",
          location: {
            _id: "loc_event6",
            name: "Pantheon",
            address: "Piazza della Rotonda, Rome",
            city: "Rome",
            coordinates: { lat: 41.8986, lng: 12.4768 }
          },
          notes: "Free entrance. The oculus in the dome is an engineering marvel. Best lighting inside is around noon when sunlight streams through the opening.",
          rating: 5,
          photos: [
            "https://images.unsplash.com/photo-1731956124539-195637f0aeac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxpdGFseSUyMGZpbG0lMjBwaG90b3xlbnwwfHwwfHx8Mg%3D%3D",
            "https://images.unsplash.com/photo-1739273240715-d191e76d9358?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8MXwwfHx8Mg%3D%3D"
          ]
        }
      ]
    },
    {
      _id: "day_3",
      title: "Vatican City",
      dayNumber: 3,
      events: [
        {
          _id: "event7",
          title: "Vatican Museums & Sistine Chapel",
          location: {
            _id: "loc_event7",
            name: "Vatican Museums",
            address: "Viale Vaticano, Vatican City",
            city: "Vatican City",
            coordinates: { lat: 41.9064, lng: 12.4534 }
          },
          notes: "Book 'skip the line' tickets online. The Sistine Chapel is at the end of the museum route. No photos allowed in the chapel.",
          price: "€17 entrance fee + €4 online booking",
          rating: 5,
          photos: [
            "https://images.unsplash.com/photo-1639739964325-f6fe291c1281?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8fDB8fHwy",
            "https://images.unsplash.com/photo-1727553560821-018e46b484b0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8MHwwfHx8Mg%3D%3D"
          ]
        },
        {
          _id: "event8",
          title: "St. Peter's Basilica",
          location: {
            _id: "loc_event8",
            name: "St. Peter's Basilica",
            address: "Piazza San Pietro, Vatican City",
            city: "Vatican City",
            coordinates: { lat: 41.9022, lng: 12.4533 }
          },
          notes: "Free entrance but expect security lines. Dress code enforced: no shorts, bare shoulders or short skirts. Climb the dome for €8 for panoramic views.",
          rating: 5,
          photos: [
            "https://images.unsplash.com/photo-1585852707087-45a211d7f8c9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8MHwwfHx8Mg%3D%3D",
            "https://images.unsplash.com/photo-1647943114702-9a5495a8c7f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXRhbHklMjBmaWxtJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1683561780838-549e5f701807?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8fDB8fHwy"
          ]
        }
      ]
    },
    {
      _id: "day_4",
      title: "Travel to Florence",
      dayNumber: 4,
      events: [
        {
          _id: "event9",
          title: "Train to Florence",
          location: {
            _id: "loc_event9",
            name: "Roma Termini Station",
            address: "Roma Termini Station",
            city: "Rome",
            coordinates: { lat: 41.9001, lng: 12.5013 }
          },
          notes: "High-speed train takes about 1.5 hours. Book tickets in advance for better prices. First class is worth it for longer journeys.",
          price: "€40-60 one way",
          photos: [
            "https://images.unsplash.com/photo-1731956124539-195637f0aeac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxpdGFseSUyMGZpbG0lMjBwaG90b3xlbnwwfHwwfHx8Mg%3D%3D",
            "https://images.unsplash.com/photo-1739273240715-d191e76d9358?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8MXwwfHx8Mg%3D%3D"
          ]
        },
        {
          _id: "event10",
          title: "Check-in at Hotel Spadai",
          location: {
            _id: "loc_event10",
            name: "Hotel Spadai",
            address: "Via dei Martelli 10, Florence",
            city: "Florence",
            coordinates: { lat: 43.7748, lng: 11.2556 }
          },
          notes: "Boutique hotel near the Duomo. Ask for a room with a cathedral view.",
          price: "€180/night",
          rating: 5,
          photos: [
            "https://images.unsplash.com/photo-1639739964325-f6fe291c1281?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8fDB8fHwy"
          ]
        },
        {
          _id: "event11",
          title: "Aperitivo at La Terrazza Rooftop Bar",
          location: {
            _id: "loc_event11",
            name: "La Terrazza Rooftop Bar",
            address: "Vicolo dell'Oro 6, Florence",
            city: "Florence",
            coordinates: { lat: 43.7678, lng: 11.2531 }
          },
          notes: "Stunning views of the Arno River and Ponte Vecchio. Reservation recommended for sunset slots.",
          price: "€15-20 per cocktail",
          rating: 4,
          photos: [
            "https://images.unsplash.com/photo-1727553560821-018e46b484b0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8MHwwfHx8Mg%3D%3D",
            "https://images.unsplash.com/photo-1585852707087-45a211d7f8c9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8MHwwfHx8Mg%3D%3D"
          ]
        }
      ]
    },
    {
      _id: "day_5",
      title: "Florence Art Tour",
      dayNumber: 5,
      events: [
        {
          _id: "event12",
          title: "Uffizi Gallery",
          location: {
            _id: "loc_event12",
            name: "Uffizi Gallery",
            address: "Piazzale degli Uffizi 6, Florence",
            city: "Florence",
            coordinates: { lat: 43.7677, lng: 11.2558 }
          },
          notes: "Home to Botticelli's 'Birth of Venus' and works by Leonardo da Vinci. Book 'skip the line' tickets. Plan at least 3 hours to explore.",
          price: "€20 entrance fee",
          rating: 5,
          photos: [
            "https://images.unsplash.com/photo-1647943114702-9a5495a8c7f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXRhbHklMjBmaWxtJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1683561780838-549e5f701807?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8fDB8fHwy"
          ]
        },
        {
          _id: "event13",
          title: "Lunch at All'Antico Vinaio",
          location: {
            _id: "loc_event13",
            name: "All'Antico Vinaio",
            address: "Via dei Neri 65, Florence",
            city: "Florence",
            coordinates: { lat: 43.7681, lng: 11.2597 }
          },
          notes: "Famous for enormous sandwiches with high-quality ingredients. Expect a line but it moves quickly.",
          price: "€6-8 per sandwich",
          rating: 5,
          photos: [
            "https://images.unsplash.com/photo-1731956124539-195637f0aeac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxpdGFseSUyMGZpbG0lMjBwaG90b3xlbnwwfHwwfHx8Mg%3D%3D"
          ]
        },
        {
          _id: "event14",
          title: "Accademia Gallery (Michelangelo's David)",
          location: {
            _id: "loc_event14",
            name: "Accademia Gallery",
            address: "Via Ricasoli 58-60, Florence",
            city: "Florence",
            coordinates: { lat: 43.7761, lng: 11.2585 }
          },
          notes: "The statue is more impressive in person than any photo can capture. Book tickets in advance.",
          price: "€12 entrance fee",
          rating: 5,
          photos: [
            "https://images.unsplash.com/photo-1739273240715-d191e76d9358?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8MXwwfHx8Mg%3D%3D",
            "https://images.unsplash.com/photo-1639739964325-f6fe291c1281?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGl0YWx5JTIwZmlsbSUyMHBob3RvfGVufDB8fDB8fHwy"
          ]
        }
      ]
    }
  ],
  reviews: [
    {
      _id: "review1",
      user: {
        _id: "user_anette",
        name: "Anette",
        surname: "van der Sar",
        country: "Netherlands"
      },
      text: "This route was exactly what I needed! I had no time to plan, and this gave me a full, realistic itinerary with the right balance of sightseeing and relaxing. Loved the Vatican day and the restaurant recommendations were spot on!"
    },
    {
      _id: "review2",
      user: {
        _id: "user_lucas",
        name: "Lucas",
        surname: "Muller",
        country: "Germany"
      },
      text: "Great structure and flow. I really appreciated how the route handled logistics — especially travel between cities. The timing was realistic, and I never felt rushed. I ended up swapping one museum day in Florence for a local food tour, and the flexibility of the plan made that super easy."
    }
  ],
  authorReview: "This 10-day journey through Italy was one of my favorite travel experiences. I tried to balance iconic landmarks with personal discoveries — like the sunset at Piazzale Michelangelo or a quiet dinner spot in Trastevere. The pace is relaxed but still covers a lot of ground. I built the route to minimize travel stress and maximize immersion, especially for first-time visitors. All activities were chosen based on real experience, not just tourist lists. Feel free to tweak it, but I hope the core structure works well for you. Buon viaggio!"
};

export const allTrips = [
  {
    _id: "trip_rome_weekend",
    title: "Weekend in Rome",
    coverPhoto: "https://images.unsplash.com/photo-1555508275-b5451b4c240a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cm9tZSUyMGZpbG0lMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
    country: "Italy",
    duration: "3 days",
    rating: 4.7,
    timesCopied: 45
  },
  {
    _id: "trip_florence_art",
    title: "Florence Art Tour",
    coverPhoto: "https://images.unsplash.com/photo-1710313481148-fa3fbe9d3947?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmxvcmVuY2UlMjBmaWxtJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
    country: "Italy",
    duration: "5 days",
    rating: 4.8,
    timesCopied: 89
  },
  {
    _id: "trip_venice_canals",
    title: "Venice Canals",
    coverPhoto: "https://images.unsplash.com/photo-1702747891854-506cc3275eb8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVuaWNlJTIwZmlsbSUyMHBob3RvfGVufDB8fDB8fHww",
    country: "Italy",
    duration: "4 days",
    rating: 4.9,
    timesCopied: 112
  },
  {
    _id: "trip_amalfi_coast",
    title: "Amalfi Coast Drive",
    coverPhoto: "https://plus.unsplash.com/premium_photo-1673140983133-9aebf7c2d456?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEFtYWxmaSUyMENvYXN0JTIwZmlsbSUyMHBob3RvfGVufDB8fDB8fHww",
    country: "Italy",
    duration: "7 days",
    rating: 5.0,
    timesCopied: 203
  },
  {
    _id: "trip_paris_weekend",
    title: "Weekend in Paris",
    coverPhoto: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    country: "France",
    duration: "3 days",
    rating: 4.6,
    timesCopied: 78
  },
  {
    _id: "trip_provence_lavender",
    title: "Provence Lavender Fields",
    coverPhoto: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    country: "France",
    duration: "5 days",
    rating: 4.9,
    timesCopied: 65
  },
  {
    _id: "trip_french_riviera",
    title: "French Riviera Getaway",
    coverPhoto: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    country: "France",
    duration: "6 days",
    rating: 4.8,
    timesCopied: 92
  },
  {
    _id: "trip_tokyo_essentials",
    title: "Tokyo Essentials",
    coverPhoto: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    country: "Japan",
    duration: "5 days",
    rating: 4.9,
    timesCopied: 156
  },
  {
    _id: "trip_kyoto_temples",
    title: "Kyoto Temples & Gardens",
    coverPhoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    country: "Japan",
    duration: "4 days",
    rating: 4.8,
    timesCopied: 134
  },
  {
    _id: "trip_japan_cherry_blossoms",
    title: "Cherry Blossom Tour",
    coverPhoto: "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    country: "Japan",
    duration: "7 days",
    rating: 5.0,
    timesCopied: 245
  },
  {
    _id: "trip_nyc_weekend",
    title: "New York City Weekend",
    coverPhoto: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    country: "USA",
    duration: "3 days",
    rating: 4.7,
    timesCopied: 187
  },
  {
    _id: "trip_california_coast",
    title: "California Coast Drive",
    coverPhoto: "https://images.unsplash.com/photo-1608229191360-7064b0afa639?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    country: "USA",
    duration: "8 days",
    rating: 4.9,
    timesCopied: 211
  },
  {
    _id: "trip_national_parks",
    title: "Utah National Parks",
    coverPhoto: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    country: "USA",
    duration: "6 days",
    rating: 4.8,
    timesCopied: 176
  }
];