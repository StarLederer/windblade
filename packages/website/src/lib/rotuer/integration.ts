import { createIntegration } from '@solidjs/router'

function querySelector<T extends Element>(selector: string) {
  // Guard against selector being an invalid CSS selector
  try {
    return document.querySelector<T>(selector)
  }
  catch (e) {
    return null
  }
}

function scrollToHash(hash: string, fallbackTop?: boolean) {
  const el = querySelector(`#${hash}`)
  if (el)
    el.scrollIntoView()

  else if (fallbackTop)
    window.scrollTo(0, 0)
}

function bindEvent(target: EventTarget, type: string, handler: EventListener) {
  target.addEventListener(type, handler)
  return () => target.removeEventListener(type, handler)
}

export function main(fallback = '/') {
  const getCurentPath = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const urlNav = decodeURIComponent(urlParams.get('navigation') ?? fallback)
    return urlNav
  }

  return createIntegration(
    () => ({
      value: getCurentPath(),
      state: history.state,
    }),
    ({ value, replace, scroll, state }) => {
      const to = `?navigation=${encodeURIComponent(value)}`

      if (replace)
        window.history.replaceState(state, '', to)
      else
        window.history.pushState(state, '', to)

      scrollToHash(window.location.hash.slice(1), scroll)
    },
    notify => bindEvent(window, 'popstate', () => notify()),
    {
      go: delta => window.history.go(delta),
    },
  )
}

export default main
