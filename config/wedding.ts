export const wedding = {
  // ==================== COUPLE ====================
  groom: {
    name: "Nato",
    nameKh: "ណាតូ", // Khmer name (optional)
  },
  bride: {
    name: "Rita",
    nameKh: "រីតា", // Khmer name (optional)
  },

  // ==================== DATE & LOCATION ====================
  date: "2026-08-15T10:00:00", // ISO format — used for countdown
  dateDisplay: "15 August 2026",
  dateShort: "15 . 08 . 2026",
  location: "Phnom Penh",

  // ==================== VENUE ====================
  venue: {
    name: "Sofitel Phnom Penh Phokeethra",
    address: "26 Old August Site, Sothearos Blvd",
    city: "Phnom Penh, Cambodia",
    lat: 11.5564,
    lng: 104.9282,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=11.5564,104.9282",
  },

  // ==================== GUEST (personalized per invite link) ====================
  guest: {
    names: "Chheung & Guekhuy",
  },

  // ==================== MUSIC (set to null to disable) ====================
  music: {
    enabled: true,
    src: "/sounds/background-music.mp3",
    volume: 0.3,
  },

  // ==================== HERO ====================
  hero: {
    backgroundImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=60&auto=format",
  },

  // ==================== EVENTS TIMELINE ====================
  events: [
    {
      title: "Groom's Processional",
      titleKh: "ពិធីហែក្បួនមក",
      time: "6:00 AM",
      date: "Saturday, 15 August 2026",
      description: null,
      venue: "Bride's Family Home",
      venueDetail: "Phnom Penh, Cambodia",
    },
    {
      title: "Blessing Ceremony",
      titleKh: "ពិធីសូត្រមន្ត",
      time: "7:00 AM",
      date: null,
      description: "Monks' chanting & blessings",
      venue: null,
      venueDetail: null,
    },
    {
      title: "Hair Cutting Ceremony",
      titleKh: "ពិធីកាត់សក់",
      time: "9:00 AM",
      date: null,
      description: "Symbolic hair trim by elders",
      venue: null,
      venueDetail: null,
    },
    {
      title: "Knot-Tying Ceremony",
      titleKh: "ពិធីបង្វិលប្រទីប",
      time: "11:00 AM",
      date: null,
      description: "Sacred thread & candle passing",
      venue: null,
      venueDetail: null,
    },
    {
      title: "Lunch Banquet",
      titleKh: "ពិធីថ្វាយភោជនាហារ",
      time: "12:00 PM",
      date: null,
      description: null,
      venue: "Bride's Family Home",
      venueDetail: "Phnom Penh, Cambodia",
    },
    {
      title: "Wedding Reception",
      titleKh: "ពិធីជប់លៀង",
      time: "5:00 PM",
      date: null,
      description: null,
      venue: "Sofitel Phnom Penh Phokeethra",
      venueDetail: "26 Old August Site, Sothearos Blvd",
    },
  ],
  dressCode: "Formal / Semi-Formal",

  // ==================== GALLERY ====================
  gallery: [
    { id: 1, alt: "Our first date at the riverside cafe", date: "March 2024", src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&h=800&fit=crop&q=70" },
    { id: 2, alt: "Sunset walk along the beach", date: "June 2024", src: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=1200&h=800&fit=crop&q=70" },
    { id: 3, alt: "The moment he proposed", date: "October 2024", src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&h=800&fit=crop&q=70" },
    { id: 4, alt: "Our engagement party", date: "December 2024", src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=800&fit=crop&q=70" },
    { id: 5, alt: "Pre-wedding photoshoot", date: "February 2025", src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop&q=70" },
    { id: 6, alt: "Our adventure in Siem Reap", date: "April 2025", src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&h=800&fit=crop&q=70" },
    { id: 7, alt: "Dancing under the stars", date: "July 2025", src: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=1200&h=800&fit=crop&q=70" },
    { id: 8, alt: "Together, forever and always", date: "January 2026", src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&h=800&fit=crop&q=70" },
  ],

  // ==================== COMMENTS / WISHES ====================
  comments: [
    {
      id: 1, name: "Sarah Johnson", initials: "SJ",
      avatarBg: "linear-gradient(135deg, #B8975A, #8A6E3A)",
      message: "Wishing you both a lifetime of love and happiness! Your love story is truly one for the ages. May every day bring you closer together.",
      relation: "Bride's Best Friend",
    },
    {
      id: 2, name: "Michael Chen", initials: "MC",
      avatarBg: "linear-gradient(135deg, #4A2028, #6B3040)",
      message: "Congratulations to the most beautiful couple! From college roommates to witnessing this beautiful union — what a journey, bro!",
      relation: "Groom's College Friend",
    },
    {
      id: 3, name: "Aunt Patricia", initials: "AP",
      avatarBg: "linear-gradient(135deg, #8A6E3A, #B8975A)",
      message: "My dearest niece and her wonderful partner, may your marriage be filled with all the right ingredients: a heap of love, a dash of humor, and a touch of romance.",
      relation: "Bride's Aunt",
    },
    {
      id: 4, name: "David & Lisa Park", initials: "DP",
      avatarBg: "linear-gradient(135deg, #6B3040, #4A2028)",
      message: "Two amazing people coming together to create an even more amazing future. We are so honored to be part of your special day!",
      relation: "Family Friends",
    },
    {
      id: 5, name: "Emma Williams", initials: "EW",
      avatarBg: "linear-gradient(135deg, #B8975A, #6B3040)",
      message: "The way you two look at each other says it all. Here is to a lifetime of love, laughter, and happily ever after. So thrilled for you both!",
      relation: "Work Colleague",
    },
    {
      id: 6, name: "James & Rosie Thompson", initials: "JR",
      avatarBg: "linear-gradient(135deg, #4A2028, #B8975A)",
      message: "As a couple married for 30 years, our advice: never stop dating each other, never stop laughing together, and always choose love. Congratulations!",
      relation: "Groom's Parents' Friends",
    },
  ],

  // ==================== GIFT / QR ====================
  gift: {
    message: "Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we would be grateful for your blessing.",
    bankName: "ABA Bank",
    accountName: "Nato & Rita Wedding Fund",
    accountNumber: "001-234-567",
    qrValue: "https://pay.ababank.com/example",
  },

  // ==================== FOOTER ====================
  footer: {
    thankyou: "Thank you for being part of our love story",
    credit: "Techversed Co.LTD",
    year: "2026",
  },
}
