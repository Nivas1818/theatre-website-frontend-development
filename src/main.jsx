import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { ToastProvider } from './context/ToastContext'

// ============================================================
// The starting point of the whole app.
// The three providers give every page its shared data:
//   AuthProvider    -> who is logged in (login / logout)
//   BookingProvider -> the list of bookings
//   ToastProvider   -> pop-up messages
// BrowserRouter makes the address bar work like a real website.
// ============================================================
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
