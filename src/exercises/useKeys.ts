import { useEffect, useRef } from 'react'

/** Клавиши на Mac: цифры выбирают вариант, Enter — проверить / дальше. Не мешает вводу в поле. */
export function useKeys(handlers: Record<string, () => void>, active = true) {
  const ref = useRef(handlers)
  ref.current = handlers
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if (typing && e.key !== 'Enter') return
      const fn = ref.current[e.key]
      if (fn) {
        e.preventDefault()
        fn()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])
}
