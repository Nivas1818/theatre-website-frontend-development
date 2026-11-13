import { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa'

const ToastContext = createContext(null)

// Simple counter so every toast gets a unique id.
let nextId = 1

const ICONS = {
  success: FaCheckCircle,
  error: FaExclamationCircle,
  info: FaInfoCircle,
}

// ============================================================
// Shows short pop-up messages, e.g. "Booking confirmed!".
// The message appears top-right and disappears after 3.5 seconds.
// ============================================================
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // Show a message, then remove it again after a delay.
  function showToast(message, type = 'success') {
    const id = nextId++
    setToasts((list) => [...list, { id, message, type }])
    setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id))
    }, 3500)
  }

  function removeToast(id) {
    setToasts((list) => list.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      {/* createPortal draws the toasts on top of the page,
          outside of the normal page flow. */}
      {createPortal(
        <div className="cb-toast-stack">
          {toasts.map((toast) => {
            const Icon = ICONS[toast.type] || FaInfoCircle
            return (
              <div key={toast.id} className={'cb-toast cb-toast-' + toast.type}>
                <Icon className="cb-toast-icon" />
                <span className="cb-toast-msg">{toast.message}</span>
                <button className="cb-toast-close" onClick={() => removeToast(toast.id)} aria-label="Close">
                  <FaTimes />
                </button>
              </div>
            )
          })}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

// Use in any component:  const toast = useToast()
// then:  toast('Booking confirmed!')
export function useToast() {
  return useContext(ToastContext)
}
