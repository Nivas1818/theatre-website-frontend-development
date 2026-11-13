import { FaFilm } from 'react-icons/fa'
import MovieCard from './MovieCard'
import EmptyState from './EmptyState'

// ============================================================
// A responsive grid of movie cards.
// If the list is empty, a friendly message is shown instead.
// ============================================================
function MovieGrid({ movies, emptyText = 'No movies found.' }) {
  if (movies.length === 0) {
    return <EmptyState icon={FaFilm} title={emptyText} text="Try changing your search or filters." />
  }

  return (
    <div className="row g-3 g-md-4">
      {movies.map((movie) => (
        <div className="col-6 col-sm-4 col-md-3" key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  )
}

export default MovieGrid
