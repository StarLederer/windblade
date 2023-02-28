import { createMemo, createRoot, createSignal } from 'solid-js'

type ColorScheme = 'light' | 'dark'

export const hues: Record<ColorScheme, number> = {
  dark: 240,
  light: 260,
}

function main() {
  // System sceheme
  const [systemSceheme, setSystemScheme] = createSignal<ColorScheme | undefined>(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
    setSystemScheme(event.matches ? 'light' : 'dark')
  })

  // Manually selected scheme
  const [enforceScheme, setEnforceScheme] = createSignal<ColorScheme | undefined>(undefined)
  const toggleScheme = () => {
    switch (enforceScheme()) {
      case 'dark':
        setEnforceScheme('light')
        break
      case 'light':
        setEnforceScheme('dark')
        break
      default:
        setEnforceScheme(systemSceheme() === 'light' ? 'dark' : 'light')
    }
  }

  // Computed
  const scheme = createMemo(() => enforceScheme() ?? systemSceheme() ?? 'dark')
  const hue = createMemo(() => scheme() === 'dark' ? hues.dark : hues.light)

  return { scheme, hue, enforceScheme, setEnforceScheme, toggleScheme }
}

export default createRoot(main)
