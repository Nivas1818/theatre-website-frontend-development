// ============================================================
// A friendly "there is nothing here" message with an icon,
// a title and some text.
// ============================================================
function EmptyState({ icon: Icon, title, text, children }) {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-state-icon">
          <Icon />
        </div>
      )}
      <h4 className="mb-1">{title}</h4>
      {text && <p className="text-secondary">{text}</p>}
      {children}
    </div>
  )
}

export default EmptyState
