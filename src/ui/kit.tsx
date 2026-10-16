import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'

// Тонкие React-обёртки над рецептами UI-кита (kit.css): классы и data-атрибуты кита, без своих стилей.

type Variant = 'solid' | 'soft' | 'surface' | 'outline' | 'ghost' | 'plain' | 'link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  tone?: 'accent' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  icon?: ReactNode
  selected?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'soft', tone, size, block, icon, selected, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`k-ctl ${block ? 'block' : ''} ${!children && icon ? 'icon' : ''} ${className ?? ''}`}
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      data-selected={selected || undefined}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
})

interface SegmentedProps<T extends string> {
  value: T
  options: { value: T; label: ReactNode }[]
  onChange: (value: T) => void
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  label?: string
}

export function Segmented<T extends string>({ value, options, onChange, size, block, label }: SegmentedProps<T>) {
  const index = Math.max(0, options.findIndex((o) => o.value === value))
  return (
    <div
      className="k-seg"
      role="group"
      aria-label={label}
      data-size={size}
      style={{ ['--n' as string]: options.length, ['--i' as string]: index, width: block ? '100%' : undefined }}
    >
      <span className="k-seg-thumb" />
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

export function Switch({ checked, onChange, label }: SwitchProps) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className="k-switch" onClick={() => onChange(!checked)} />
}

export function Progress({ value, label }: { value: number; label?: string }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100)
  return (
    <div className="k-progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <i style={{ ['--v' as string]: `${pct}%` }} />
    </div>
  )
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'soft' | 'outline' | 'surface'
  error?: boolean
  size?: never
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field({ variant = 'outline', error, className, ...rest }, ref) {
  return (
    <label className={`k-field ${className ?? ''}`} data-variant={variant} data-err={error || undefined}>
      <input ref={ref} {...rest} />
    </label>
  )
})
