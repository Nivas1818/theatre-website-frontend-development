import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTicketAlt, FaCalendarAlt, FaWallet, FaBan, FaFilm } from 'react-icons/fa'
import { useBookings } from '../context/BookingContext'
import { useToast } from '../context/ToastContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { todayISO } from '../lib/dates'
import { inr } from '../lib/format'
import TicketCard from '../components/TicketCard'
import Modal from '../components/Modal'
import EmptyState from '../components/EmptyState'

// The four tabs at the top of the list.
const TABS = ['upcoming', 'past', 'cancelled', 'all']

// All bookings of the logged-in user, grouped into tabs.
function MyBookings() {
  useDocumentTitle('My Bookings')
  const { bookings, cancelBooking } = useBookings()
  const toast = useToast()

  const [tab, setTab] = useState('upcoming')
  const [cancelTarget, setCancelTarget] = useState(null) // the booking about to be cancelled
  const today = todayISO()

  // Not-cancelled bookings only.
  const active = bookings.filter((b) => b.status !== 'Cancelled')

  // The four lists shown in the tabs.
  const lists = {
    upcoming: active.filter((b) => b.date >= today),
    past: active.filter((b) => b.date < today),
    cancelled: bookings.filter((b) => b.status === 'Cancelled'),
    all: bookings,
  }
  const visible = lists[tab]

  // Quick numbers above the tabs.
  const stats = [
    { icon: FaTicketAlt, label: 'Total bookings', value: active.length },
    { icon: FaCalendarAlt, label: 'Upcoming shows', value: lists.upcoming.length },
    { icon: FaWallet, label: 'Amount spent', value: inr(active.reduce((sum, b) => sum + b.total, 0)) },
    { icon: FaBan, label: 'Cancelled', value: lists.cancelled.length },
  ]

  // Called when "Yes, cancel" is clicked in the popup.
  function confirmCancel() {
    cancelBooking(cancelTarget.id)
    toast('Booking cancelled — your seats are released.', 'info')
    setCancelTarget(null)
  }

  return (
    <div className="container page-pad">
      <h1 className="page-title mb-4">My Bookings</h1>

      {/* Quick numbers */}
      <div className="stats-row">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-icon"><s.icon /></span>
            <div>
              <h3 className="mb-0">{s.value}</h3>
              <span>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs: upcoming / past / cancelled / all */}
      <div className="tab-pills">
        {TABS.map((t) => (
          <button
            key={t}
            className={'tab-pill' + (tab === t ? ' active' : '')}
            onClick={() => setTab(t)}
          >
            {t} <span className="count">{lists[t].length}</span>
          </button>
        ))}
      </div>

      {/* The ticket list — or a friendly message when empty */}
      {visible.length === 0 ? (
        <EmptyState
          icon={FaFilm}
          title="No bookings here yet"
          text="When you book a ticket it will show up here with all the details."
        >
          <Link to="/movies" className="btn btn-red">Browse Movies</Link>
        </EmptyState>
      ) : (
        <div className="row g-3">
          {visible.map((booking) => (
            <div className="col-12 col-lg-6" key={booking.id}>
              <TicketCard booking={booking} onCancel={setCancelTarget} />
            </div>
          ))}
        </div>
      )}

      {/* "Are you sure?" popup before cancelling a booking */}
      <Modal
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        title="Cancel this booking?"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setCancelTarget(null)}>Keep it</button>
            <button className="btn btn-red" onClick={confirmCancel}>Yes, cancel</button>
          </>
        }
      >
        <p className="mb-0">
          Your booking for <b>{cancelTarget?.movieName}</b> will be cancelled
          and the seats will be released for others to book.
        </p>
      </Modal>
    </div>
  )
}

export default MyBookings
