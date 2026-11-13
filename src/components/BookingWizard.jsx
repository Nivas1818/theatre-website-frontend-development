import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight, FaCheck, FaLock } from 'react-icons/fa'
import { useBookings } from '../context/BookingContext'
import { useToast } from '../context/ToastContext'
import { THEATRES, SHOW_TIMINGS, SEAT_ROWS, SEAT_COLS, SEAT_CLASSES, seatTier } from '../constants/cinema'
import { nextDays, formatDate } from '../lib/dates'
import { inr } from '../lib/format'
import Modal from './Modal'

const STEPS = ['Show', 'Seats', 'Review']

// ============================================================
// The 3-step booking flow:
//   Step 1 — pick theatre, date and time
//   Step 2 — pick seats on the seat map
//   Step 3 — check everything and confirm
// ============================================================
function BookingWizard({ movie }) {
  const { takenSeats, addBooking } = useBookings()
  const toast = useToast()
  const navigate = useNavigate()

  // What the user has picked so far.
  const [step, setStep] = useState(1)
  const [theatre, setTheatre] = useState(THEATRES[0].name)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [selected, setSelected] = useState([]) // e.g. [{ id: 'C4', tier: 'premium', price: 310 }]
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState(null) // the finished booking (shows the popup)

  const days = nextDays(7) // the next 7 dates for the date buttons
  const sold = takenSeats(movie.name, theatre, date, time) // seats already taken
  const total = selected.reduce((sum, seat) => sum + seat.price, 0)

  // Group the selected seats by class, for the price breakdown.
  // Example: { premium: { count: 2, price: 310 } }
  const byTier = {}
  selected.forEach((seat) => {
    byTier[seat.tier] = byTier[seat.tier] || { count: 0, price: seat.price }
    byTier[seat.tier].count++
  })

  // Clicking a free seat adds it to the selection — clicking it
  // again takes it back out.
  function toggleSeat(seatId) {
    const alreadyPicked = selected.some((s) => s.id === seatId)
    if (alreadyPicked) {
      setSelected(selected.filter((s) => s.id !== seatId))
    } else {
      const tier = seatTier(seatId[0]) // the first letter of 'C4' is the row
      const price = movie.price + SEAT_CLASSES[tier].extra
      setSelected([...selected, { id: seatId, tier, price }])
    }
  }

  // The "Continue" button: make sure the current step is complete.
  function goNext() {
    setError('')
    if (step === 1 && !date) return setError('Please pick a date.')
    if (step === 1 && !time) return setError('Please pick a show time.')
    if (step === 2 && selected.length === 0) return setError('Please select at least one seat.')
    setStep(step + 1)
  }

  // The "Confirm & Pay" button on the last step.
  function confirmBooking() {
    const booking = addBooking({ movieId: movie.id, movieName: movie.name, poster: movie.poster, theatre, date, time, seats: selected, total })
    setConfirmed(booking)
    toast(`Booking confirmed — enjoy ${movie.name}!`)
  }

  // Closing the success popup goes to the bookings list.
  function closePopup() {
    setConfirmed(null)
    navigate('/my-bookings')
  }

  return (
    <div className="booking-wizard">
      {/* ---------- Progress indicator: 1 Show, 2 Seats, 3 Review ---------- */}
      <ol className="wizard-steps">
        {STEPS.map((label, i) => {
          const number = i + 1
          return (
            <li
              key={label}
              className={number === step ? 'active' : number < step ? 'done' : ''}
            >
              <span className="wizard-dot">{number < step ? <FaCheck /> : number}</span>
              <span className="wizard-label">{label}</span>
            </li>
          )
        })}
      </ol>

      <div className="wizard-panel">
        {/* ---------- STEP 1: theatre, date and time ---------- */}
        {step === 1 && (
          <div className="fade-up">
            <div className="form-section">
              <div className="form-label-bold">Choose theatre</div>
              <div className="theatre-options">
                {THEATRES.map((t) => (
                  <button
                    key={t.name}
                    type="button"
                    className={'theatre-option' + (theatre === t.name ? ' selected' : '')}
                    onClick={() => setTheatre(t.name)}
                  >
                    <b>{t.name}</b>
                    <small>{t.location}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-section">
              <div className="form-label-bold">Pick a date</div>
              <div className="date-chips">
                {days.map((d) => (
                  <button
                    key={d.iso}
                    type="button"
                    className={'date-chip' + (date === d.iso ? ' selected' : '')}
                    onClick={() => setDate(d.iso)}
                  >
                    <small>{d.isToday ? 'Today' : d.weekday}</small>
                    <b>{d.day}</b>
                    <small>{d.month}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-section mb-0">
              <div className="form-label-bold">Pick a time</div>
              <div className="time-chips">
                {SHOW_TIMINGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={'time-chip' + (time === t ? ' selected' : '')}
                    onClick={() => setTime(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- STEP 2: the seat map ---------- */}
        {step === 2 && (
          <div className="fade-up">
            <div className="screen-wrap">
              <div className="screen-bar" />
              <small className="text-secondary">Screen this way</small>
            </div>

            <div className="seat-map">
              {SEAT_ROWS.map((row) => (
                <div className="seat-row" key={row}>
                  <span className="row-label">{row}</span>
                  {SEAT_COLS.map((col) => {
                    const seatId = row + col // e.g. 'C4'
                    const tier = seatTier(row)
                    const isSold = sold.has(seatId)
                    const isSelected = selected.some((s) => s.id === seatId)

                    // Build the class list, e.g. "seat seat-premium seat-selected".
                    let classes = 'seat seat-' + tier
                    if (isSold) classes += ' seat-taken'
                    if (isSelected) classes += ' seat-selected'

                    return (
                      <button
                        key={seatId}
                        type="button"
                        className={classes}
                        disabled={isSold}
                        onClick={() => toggleSeat(seatId)}
                        title={`Seat ${seatId} — ${SEAT_CLASSES[tier].label} ${inr(movie.price + SEAT_CLASSES[tier].extra)}`}
                      >
                        {col}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="seat-legend">
              <span><i className="seat seat-mini" /> Available</span>
              <span><i className="seat seat-mini seat-selected" /> Selected</span>
              <span><i className="seat seat-mini seat-taken" /> Booked</span>
            </div>

            <div className="tier-legend">
              {Object.keys(SEAT_CLASSES).map((key) => (
                <span key={key} className="tier-chip">
                  <b>{SEAT_CLASSES[key].label}</b> {inr(movie.price + SEAT_CLASSES[key].extra)}/seat
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ---------- STEP 3: review and confirm ---------- */}
        {step === 3 && (
          <div className="review-step fade-up">
            <div className="review-hero">
              <img src={movie.poster} alt={movie.name} />
              <div>
                <h4 className="mb-1">{movie.name}</h4>
                <p className="text-secondary mb-0">{theatre}</p>
                <p className="mb-0">
                  <b>{formatDate(date)}</b> · {time}
                </p>
              </div>
            </div>

            <ul className="review-list">
              <li>
                <span>Seats ({selected.length})</span>
                <span>{selected.map((s) => s.id).join(', ')}</span>
              </li>
              {Object.keys(byTier).map((tier) => (
                <li key={tier}>
                  <span>
                    {SEAT_CLASSES[tier].label} × {byTier[tier].count}
                  </span>
                  <span>{inr(byTier[tier].price * byTier[tier].count)}</span>
                </li>
              ))}
              <li className="review-total">
                <span>Total payable</span>
                <span className="text-danger">{inr(total)}</span>
              </li>
            </ul>

            <p className="text-secondary small mb-0">
              <FaLock className="me-1" /> Demo checkout — no real payment is taken.
            </p>
          </div>
        )}
      </div>

      {/* Error message when a step is not complete yet */}
      {error && <div className="alert alert-danger py-2 mt-3 mb-0">{error}</div>}

      {/* ---------- Total price + Back / Continue / Confirm buttons ---------- */}
      <div className="wizard-footer">
        <div className="wizard-total">
          <span className="text-secondary small">
            {selected.length} seat{selected.length === 1 ? '' : 's'} selected
          </span>
          <h4 className="mb-0">{inr(total)}</h4>
        </div>
        <div className="wizard-actions">
          {step > 1 && (
            <button
              className="btn btn-ghost"
              onClick={() => {
                setStep(step - 1)
                setError('')
              }}
            >
              <FaArrowLeft className="me-2" /> Back
            </button>
          )}
          {step < 3 ? (
            <button className="btn btn-red" onClick={goNext}>
              Continue <FaArrowRight className="ms-2" />
            </button>
          ) : (
            <button className="btn btn-red" onClick={confirmBooking}>
              Confirm &amp; Pay <FaCheck className="ms-2" />
            </button>
          )}
        </div>
      </div>

      {/* ---------- Success popup with the e-ticket ---------- */}
      <Modal
        open={!!confirmed}
        onClose={closePopup}
        title="Booking Confirmed"
        footer={
          <button className="btn btn-red" onClick={closePopup}>
            View My Bookings
          </button>
        }
      >
        {confirmed && (
          <div className="ticket">
            <div className="ticket-main">
              <div className="ticket-ref">
                Booking Ref <b>{confirmed.ref}</b>
              </div>
              <h3 className="ticket-title">{confirmed.movieName}</h3>
              <div className="ticket-grid">
                <span>Theatre</span>
                <b>{confirmed.theatre}</b>
                <span>Date</span>
                <b>{formatDate(confirmed.date)}</b>
                <span>Time</span>
                <b>{confirmed.time}</b>
                <span>Seats</span>
                <b>{confirmed.seats.map((s) => s.id).join(', ')}</b>
              </div>
              <div className="ticket-total">
                <span>Total Paid</span>
                <b className="text-danger">{inr(confirmed.total)}</b>
              </div>
            </div>
            <div className="ticket-stub">
              <div className="ticket-barcode" />
              <span className="badge bg-success">Confirmed</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default BookingWizard
