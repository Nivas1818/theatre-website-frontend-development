import { formatDate, isPastDate } from '../lib/dates'
import { inr } from '../lib/format'

// ============================================================
// One booking shown as a ticket, on the My Bookings page.
// ============================================================
function TicketCard({ booking, onCancel }) {
  const cancelled = booking.status === 'Cancelled'
  const past = isPastDate(booking.date)

  // Pick the right status label and colour.
  const label = cancelled ? 'Cancelled' : past ? 'Completed' : 'Confirmed'
  const colour = cancelled ? 'danger' : past ? 'secondary' : 'success'

  return (
    <article className={'ticket ticket-card fade-up' + (cancelled ? ' ticket-dim' : '')}>
      {/* Left part: all the booking details */}
      <div className="ticket-main">
        <div className="ticket-ref">
          Booking Ref <b>{booking.ref}</b>
        </div>
        <h3 className="ticket-title">{booking.movieName}</h3>
        <div className="ticket-grid">
          <span>Theatre</span>
          <b>{booking.theatre}</b>
          <span>Date</span>
          <b>{formatDate(booking.date)}</b>
          <span>Time</span>
          <b>{booking.time}</b>
          <span>Seats</span>
          <b className="seat-chip-row">
            {booking.seats.map((seat) => (
              <span key={seat.id} className="seat-chip">
                {seat.id}
              </span>
            ))}
          </b>
        </div>
        <div className="ticket-total">
          <span>Total</span>
          <b className="text-danger">{inr(booking.total)}</b>
        </div>

        {/* A booking can only be cancelled while it is still upcoming */}
        {!cancelled && !past && (
          <button className="btn btn-outline-danger btn-sm mt-2" onClick={() => onCancel(booking)}>
            Cancel Booking
          </button>
        )}
      </div>

      {/* Right part: the "stub" with the barcode look */}
      <div className="ticket-stub">
        <div className="ticket-barcode" />
        <span className={'badge bg-' + colour}>{label}</span>
      </div>
    </article>
  )
}

export default TicketCard
