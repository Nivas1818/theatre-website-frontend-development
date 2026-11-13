import { Link } from 'react-router-dom'
import { FaFilm, FaTheaterMasks, FaCouch, FaUsers, FaHeart, FaStar, FaShieldAlt } from 'react-icons/fa'
import { SEED_MOVIES } from '../constants/cinema'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

// What CineBook cares about — shown as four cards.
const VALUES = [
  { icon: FaHeart, title: 'Made for movie lovers', text: 'We started with one small screen and a big love for cinema. Today we serve thousands of happy moviegoers.' },
  { icon: FaCouch, title: 'Comfort first', text: 'Plush recliners, crystal-clear sound and a giant screen in every hall we run.' },
  { icon: FaStar, title: 'The latest movies', text: 'Fresh releases every week across every genre you love — action, drama, comedy and more.' },
  { icon: FaShieldAlt, title: 'Safe & clean', text: 'Sanitised halls, contactless booking and a friendly staff that always has your back.' },
]

// The "About Us" page.
function About() {
  useDocumentTitle('About Us')

  // Four quick numbers about the cinema.
  const stats = [
    { icon: FaFilm, value: SEED_MOVIES.length, label: 'Movies' },
    { icon: FaTheaterMasks, value: 3, label: 'Theatres' },
    { icon: FaCouch, value: 48, label: 'Seats per show' },
    { icon: FaUsers, value: '25,000+', label: 'Happy guests' },
  ]

  return (
    <div className="container page-pad">
      <h1 className="page-title mb-4">About CineBook</h1>

      <div className="about-intro fade-up">
        <h2 className="gradient-text">Feel the magic of cinema</h2>
        <p className="text-secondary mb-0">
          CineBook brings you the best movie experience with comfortable seating, a giant screen
          and crystal-clear sound — all bookable from your couch in a few clicks.
        </p>
      </div>

      {/* Quick numbers */}
      <div className="about-stats">
        {stats.map((s) => (
          <div className="about-stat" key={s.label}>
            <s.icon className="about-stat-icon" />
            <h3 className="mb-0">{s.value}</h3>
            <span className="text-secondary">{s.label}</span>
          </div>
        ))}
      </div>

      {/* The four value cards */}
      <div className="row g-3">
        {VALUES.map((v) => (
          <div className="col-12 col-md-6" key={v.title}>
            <div className="feature-card fade-up h-100">
              <span className="feature-icon"><v.icon /></span>
              <h5 className="mb-1">{v.title}</h5>
              <p className="text-secondary mb-0 small">{v.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Call-to-action box at the bottom */}
      <div className="cta-band fade-up">
        <h3 className="mb-1">Ready for your next show?</h3>
        <p className="text-secondary mb-3">Browse what's playing and grab the best seats before they're gone.</p>
        <Link to="/movies" className="btn btn-red btn-lg">Browse Movies</Link>
      </div>
    </div>
  )
}

export default About
