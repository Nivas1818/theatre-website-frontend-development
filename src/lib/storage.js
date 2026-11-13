// ============================================================
// Two tiny helpers for saving data in localStorage.
// Everything is stored as JSON under keys like 'cb:bookings'.
// ============================================================

// Read a saved value. If nothing is saved yet, return the fallback.
export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem('cb:' + key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback // broken data -> act like it was never saved
  }
}

// Save a value (any type that JSON understands).
export function writeStorage(key, value) {
  localStorage.setItem('cb:' + key, JSON.stringify(value))
}
