import { FaStar, FaRegStar } from 'react-icons/fa'

// ============================================================
// Shows a movie rating as 5 stars plus the number.
// Example: value 4.3 -> 4 filled stars + "4.3"
// ============================================================
function Rating({ value = 0 }) {
  const filled = Math.round(value) // 4.3 -> 4 filled stars

  return (
    <span className="cb-rating">
      {[1, 2, 3, 4, 5].map((n) =>
        n <= filled ? (
          <FaStar key={n} className="star star-full" />
        ) : (
          <FaRegStar key={n} className="star star-empty" />
        )
      )}
      <b className="cb-rating-value">{value.toFixed(1)}</b>
    </span>
  )
}

export default Rating
