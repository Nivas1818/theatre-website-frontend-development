import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes } from 'react-icons/fa'

// ============================================================
// A simple pop-up dialog with a dark background behind it.
// It closes when you press Escape or click the background.
//
//   <Modal open={show} onClose={() => setShow(false)} title="Hello">
//     ...content...
//   </Modal>
// ============================================================
function Modal({ open, onClose, title, children, footer }) {
  // Close when the Escape key is pressed.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // open=false -> show nothing at all.
  if (!open) return null

  return createPortal(
    <div className="cb-modal-backdrop" onClick={onClose}>
      {/* stopPropagation stops the click from reaching the backdrop */}
      <div className="cb-modal" role="dialog" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="cb-modal-header">
          <h5 className="mb-0">{title}</h5>
          <button className="cb-modal-close" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>
        <div className="cb-modal-body">{children}</div>
        {footer && <div className="cb-modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body // draw the modal on top of everything else
  )
}

export default Modal
