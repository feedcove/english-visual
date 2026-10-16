import { useLayoutEffect, useRef, useState } from 'react'

// Ширина текста для раскладки схем: слова стоят в абсолютных координатах, поэтому их размер нужно знать заранее.
// Шрифт совпадает с --font-ui (системный), запас +1 px страхует от расхождений между canvas и версткой.

const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
let ctx: CanvasRenderingContext2D | null | undefined
const cache = new Map<string, number>()

export function textWidth(text: string, size: number, weight = 600): number {
  const key = `${weight} ${size} ${text}`
  const hit = cache.get(key)
  if (hit !== undefined) return hit
  if (ctx === undefined) {
    try {
      ctx = document.createElement('canvas').getContext('2d')
    } catch {
      ctx = null
    }
  }
  let w: number
  if (ctx) {
    ctx.font = `${weight} ${size}px ${FONT}`
    w = ctx.measureText(text).width
  } else {
    w = text.length * size * 0.58
  }
  w = Math.ceil(w) + 1
  cache.set(key, w)
  return w
}

/** Ширина содержимого элемента (без padding) — чтобы растянуть или центрировать схему. */
export function useBoxWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const read = () => {
      const cs = getComputedStyle(el)
      setWidth(el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight))
    }
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}
