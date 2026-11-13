// ============================================================
// All the cinema data for the app lives in this one file.
// It is just plain data — no React code here.
// ============================================================

// The three theatres you can book at.
export const THEATRES = [
  { name: 'PVR Cinemas', location: 'Anna Nagar' },
  { name: 'INOX Grand', location: 'Jockey Plaza' },
  { name: 'Cinepolis Central', location: 'Mall Road' },
]

// Every movie plays at these four times.
export const SHOW_TIMINGS = ['10:00 AM', '01:30 PM', '06:00 PM', '09:30 PM']

// Genre buttons on the Movies page.
export const GENRES = ['Action', 'Comedy', 'Thriller', 'Sci-Fi', 'Romance', 'Drama']

// The seat map: 6 rows (A–F) with 8 seats in each row.
export const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E', 'F']
export const SEAT_COLS = [1, 2, 3, 4, 5, 6, 7, 8]

// Seat classes: which rows they cover and how much EXTRA they cost
// on top of the movie's base price.
export const SEAT_CLASSES = {
  regular: { label: 'Regular', extra: 0, rows: ['A', 'B'] },
  premium: { label: 'Premium', extra: 60, rows: ['C', 'D'] },
  recliner: { label: 'Recliner', extra: 120, rows: ['E', 'F'] },
}

// Which class does a row belong to?  'A' -> 'regular', 'C' -> 'premium'
export function seatTier(row) {
  if (SEAT_CLASSES.regular.rows.includes(row)) return 'regular'
  if (SEAT_CLASSES.premium.rows.includes(row)) return 'premium'
  return 'recliner'
}

// All movies in the app. `price` is the base price for one Regular
// seat — Premium seats cost ₹60 more, Recliner seats ₹120 more.
export const SEED_MOVIES = [
  {
    id: 1,
    name: 'Midnight Chase',
    genre: 'Action',
    rating: 4.5,
    price: 250,
    releaseDate: '2026-10-10',
    status: 'Now Showing',
    duration: '2h 28m',
    language: 'English',
    description: 'A retired getaway driver is pulled back in for one last high-speed chase across a neon-lit city that never sleeps.',
    cast: ['Ravi Menon', 'Sara Iyer', 'Dan Cole'],
    poster: '/images/poster-1.svg',
    backdrop: '/images/backdrop-1.svg',
  },
  {
    id: 2,
    name: 'Laugh Out Loud',
    genre: 'Comedy',
    rating: 4.1,
    price: 180,
    releaseDate: '2026-10-24',
    status: 'Now Showing',
    duration: '2h 05m',
    language: 'Tamil',
    description: 'Three friends try to organise the perfect wedding and everything that can go wrong does — hilariously.',
    cast: ['Vikram Rao', 'Meera Joshi', 'Anu Thomas'],
    poster: '/images/poster-2.svg',
    backdrop: '/images/backdrop-2.svg',
  },
  {
    id: 3,
    name: 'Silent Echo',
    genre: 'Thriller',
    rating: 4.3,
    price: 220,
    releaseDate: '2026-10-17',
    status: 'Now Showing',
    duration: '2h 12m',
    language: 'English',
    description: 'A sound engineer discovers a hidden message inside an old recording, and someone will do anything to keep it quiet.',
    cast: ['Nathan Cole', 'Priya Nair'],
    poster: '/images/poster-3.svg',
    backdrop: '/images/backdrop-3.svg',
  },
  {
    id: 4,
    name: 'Galaxy Run',
    genre: 'Sci-Fi',
    rating: 4.7,
    price: 300,
    releaseDate: '2026-10-03',
    status: 'Now Showing',
    duration: '2h 40m',
    language: 'English',
    description: 'A crew of explorers races against time to save a dying colony stranded in deep space.',
    cast: ['Elena Marsh', 'Karan Patel', 'Iris Vega'],
    poster: '/images/poster-4.svg',
    backdrop: '/images/backdrop-4.svg',
  },
  {
    id: 5,
    name: 'Hearts in Rain',
    genre: 'Romance',
    rating: 4.0,
    price: 170,
    releaseDate: '2026-10-29',
    status: 'Now Showing',
    duration: '2h 00m',
    language: 'Tamil',
    description: 'Two strangers keep meeting on rainy days in a busy coastal town, until coincidence starts to look like fate.',
    cast: ['Aisha Khan', 'Rohit Das'],
    poster: '/images/poster-5.svg',
    backdrop: '/images/backdrop-5.svg',
  },
  {
    id: 6,
    name: 'The Last Letter',
    genre: 'Drama',
    rating: 4.4,
    price: 190,
    releaseDate: '2026-11-02',
    status: 'Now Showing',
    duration: '2h 18m',
    language: 'English',
    description: 'A family comes together after finding a letter hidden away for thirty years.',
    cast: ['Margaret Fern', 'Ajay Kumar', 'Lily Rose'],
    poster: '/images/poster-6.svg',
    backdrop: '/images/backdrop-6.svg',
  },
  {
    id: 7,
    name: 'Shadow Strike',
    genre: 'Action',
    rating: 4.2,
    price: 260,
    releaseDate: '2026-12-05',
    status: 'Upcoming',
    duration: '2h 20m',
    language: 'English',
    description: 'An undercover agent must stop a global heist before the clock runs out.',
    cast: ['Jack Reyes', 'Diana Rao'],
    poster: '/images/poster-7.svg',
    backdrop: '/images/backdrop-7.svg',
  },
  {
    id: 8,
    name: 'Moonlight Dreams',
    genre: 'Romance',
    rating: 4.3,
    price: 200,
    releaseDate: '2026-12-12',
    status: 'Upcoming',
    duration: '2h 08m',
    language: 'Hindi',
    description: 'A musician and a painter find love during one magical winter in the hills.',
    cast: ['Neha Kapoor', 'Arjun Mehta'],
    poster: '/images/poster-8.svg',
    backdrop: '/images/backdrop-8.svg',
  },
  {
    id: 9,
    name: 'Code Zero',
    genre: 'Sci-Fi',
    rating: 4.6,
    price: 280,
    releaseDate: '2026-12-19',
    status: 'Upcoming',
    duration: '2h 35m',
    language: 'English',
    description: 'A young hacker discovers that the city AI is hiding a dangerous secret.',
    cast: ['Zoe Lin', 'Ravi Menon'],
    poster: '/images/poster-9.svg',
    backdrop: '/images/backdrop-9.svg',
  },
  {
    id: 10,
    name: 'Family Fiesta',
    genre: 'Comedy',
    rating: 4.0,
    price: 160,
    releaseDate: '2026-12-25',
    status: 'Upcoming',
    duration: '1h 58m',
    language: 'Tamil',
    description: 'A big family reunion turns into a hilarious festival of chaos.',
    cast: ['Sundar Raj', 'Kamala Devi'],
    poster: '/images/poster-10.svg',
    backdrop: '/images/backdrop-10.svg',
  },
]
