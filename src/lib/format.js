// ============================================================
// Small formatting helpers used in a few places.
// ============================================================

// 1250 -> '₹1,250'
export function inr(number) {
  return '₹' + Number(number || 0).toLocaleString('en-IN')
}

// 'Nivas Sivanthi' -> 'NS' — used for the avatar circle in the navbar.
export function initialsOf(name = '') {
  return (
    name
      .trim()
      .split(/\s+/) // split on spaces
      .map((word) => word[0]) // take the first letter of each word
      .join('')
      .slice(0, 2) // keep at most 2 letters
      .toUpperCase() || 'U'
  )
}
