// ============================================================
// Small date helpers. Dates are stored as text like '2026-11-11'.
// ============================================================

// Formats a Date object as 'YYYY-MM-DD' in LOCAL time.
// (Using local time avoids the classic "date is one day off" bug.)
function toISO(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0') // months start at 0
  const day = String(date.getDate()).padStart(2, '0')
  return date.getFullYear() + '-' + month + '-' + day
}

// Today's date, e.g. '2026-11-11'.
export function todayISO() {
  return toISO(new Date())
}

// The next `count` days starting today — used for the date
// buttons in the booking page.
export function nextDays(count) {
  const days = []
  for (let i = 0; i < count; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i) // move i days forward
    days.push({
      iso: toISO(date),
      day: date.getDate(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }), // e.g. 'Wed'
      month: date.toLocaleDateString('en-US', { month: 'short' }), // e.g. 'Nov'
      isToday: i === 0,
    })
  }
  return days
}

// '2026-11-11' -> 'Wed, 11 Nov 2026' (for showing dates to the user)
export function formatDate(iso) {
  if (!iso) return ''
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Has this date already passed? ('2026-01-01' < '2026-11-11' works
// because the text sorts like real dates.)
export function isPastDate(iso) {
  return iso < todayISO()
}
