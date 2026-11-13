import { useEffect } from 'react'

// ============================================================
// Changes the text in the browser tab while a page is open.
//
//   useDocumentTitle('All Movies')  // tab shows 'All Movies · CineBook'
// ============================================================
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title + ' · CineBook'
  }, [title])
}
