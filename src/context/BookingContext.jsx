import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BookingContext = createContext(null)

// Makes a random booking reference like 'CB-7XK3F9'.
function makeRef() {
  return 'CB-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}

// ============================================================
// Everything about bookings: the list, adding and cancelling.
// Bookings are saved in localStorage, so they survive a refresh.
// (Movies don't need this — they come straight from constants/cinema.js.)
// ============================================================
export function BookingProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage('bookings', [])

  // Add a new confirmed booking and return it.
  function addBooking(details) {
    const booking = {
      ...details, // movieName, theatre, date, time, seats, total
      id: Date.now(),
      ref: makeRef(),
      status: 'Confirmed',
    }
    setBookings((list) => [booking, ...list]) // newest first
    return booking
  }

  // Mark a booking as cancelled. It stays in the list (greyed out),
  // so the user keeps the history.
  function cancelBooking(id) {
    setBookings((list) =>
      list.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    )
  }

  // Which seats are already sold for ONE show (movie + theatre +
  // date + time)? These seats can't be booked again.
  function takenSeats(movieName, theatre, date, time) {
    const sold = new Set()
    bookings.forEach((b) => {
      const sameShow =
        b.movieName === movieName &&
        b.theatre === theatre &&
        b.date === date &&
        b.time === time
      if (sameShow && b.status !== 'Cancelled') {
        b.seats.forEach((seat) => sold.add(seat.id))
      }
    })
    return sold
  }

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, takenSeats }}>
      {children}
    </BookingContext.Provider>
  )
}

// Use in any component:  const { bookings, addBooking } = useBookings()
export function useBookings() {
  return useContext(BookingContext)
}
