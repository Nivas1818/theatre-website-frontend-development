import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { useToast } from '../context/ToastContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

// A simple check: does it look like an email address?
function looksLikeEmail(text) {
  return /^\S+@\S+\.\S+$/.test(text)
}

// The "Contact Us" page with a message form.
function Contact() {
  useDocumentTitle('Contact Us')
  const toast = useToast()

  // The three form fields, kept in one state object.
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')

  // Called when any input changes, e.g. setField('name')(event)
  const setField = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Simple checks before "sending".
    if (form.name.trim().length < 2) return setError('Please tell us your name.')
    if (!looksLikeEmail(form.email.trim())) return setError('Enter a valid email address.')
    if (form.message.trim().length < 10) return setError('Your message should be at least 10 characters.')

    // This is a demo — nothing is really sent anywhere.
    toast('Message sent — we will get back to you soon!')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="container page-pad">
      <h1 className="page-title mb-4">Contact Us</h1>

      <div className="row g-4">
        {/* The form */}
        <div className="col-12 col-lg-7">
          <div className="info-block p-4 fade-up">
            <h5 className="mb-3">Send us a message</h5>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="contact-name" className="form-label">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  className="form-control cb-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={setField('name')}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contact-email" className="form-label">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-control cb-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={setField('email')}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contact-message" className="form-label">Message</label>
                <textarea
                  id="contact-message"
                  rows="5"
                  className="form-control cb-input"
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={setField('message')}
                  required
                />
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <button type="submit" className="btn btn-red">Send Message</button>
            </form>
          </div>
        </div>

        {/* Address, phone and opening hours */}
        <div className="col-12 col-lg-5">
          <div className="d-flex flex-column gap-3">
            <div className="info-block p-4 fade-up">
              <h5 className="mb-3">Reach us</h5>
              <p className="mb-2 contact-line"><FaMapMarkerAlt className="text-danger" /> 12 Cinema Street, Madurai</p>
              <p className="mb-2 contact-line"><FaPhone className="text-danger" /> +91 98765 43210</p>
              <p className="mb-0 contact-line"><FaEnvelope className="text-danger" /> support@cinebook.com</p>
            </div>
            <div className="info-block p-4 fade-up">
              <h5 className="mb-3">Opening hours</h5>
              <p className="mb-2 contact-line"><FaClock className="text-danger" /> Box office: 9 AM – 10 PM</p>
              <p className="mb-0 contact-line"><FaClock className="text-danger" /> Shows: 10 AM – 11 PM, all days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
