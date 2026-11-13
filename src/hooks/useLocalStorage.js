import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../lib/storage'

// ============================================================
// Works exactly like useState, but ALSO saves the value to
// localStorage — so it survives a page refresh.
//
//   const [name, setName] = useLocalStorage('name', '')
// ============================================================
export function useLocalStorage(key, initial) {
  // The starting value is read from localStorage on first render only.
  const [value, setValue] = useState(() => readStorage(key, initial))

  // Every time the value changes, save it.
  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  return [value, setValue]
}
