import type { Accessor, Component } from 'solid-js'
import { Show, createContext, createEffect, createSignal, useContext } from 'solid-js'
import type { Element } from 'xast-util-from-xml/lib'
import type { XmlComponent, XmlNodeRenderer } from '../types'
import { XmlContext, extendXmlContext } from '../types'
import XmlChildren from '../XmlChildren'
import Utils from './TryIt/Utils'
import Viewport from './Viewport'
import libs from '~/lib/external'
import uno from '~/unocss'

const { formatter, highlighter } = libs

export interface SelectedUtil {
  util: string
  renderer: string
}

export const Context = createContext<{
  selectUtil: (val: SelectedUtil) => void
  selected: Accessor<SelectedUtil | undefined>
  html: Accessor<string>
  css: Accessor<{ shortCss: string; fullCss: string } | undefined>
}>()

const styles = {
  pre: 'bg-surface p-s rounded-s leading-$($s+$s.4) overflow-auto',
}

const NothingSelected: Component = () => (
  <div class="bg-surface rounded-s p-s flex gap-s text-fg-3">
    <div class="i-mdi-exclamation"></div>
    Please select a utility first
  </div>
)

const render: XmlNodeRenderer = (node) => {
  const ctx = useContext(Context)

  if (node.type === 'element') {
    switch (node.name) {
      case 'utils':
        return <Utils {...node} />
      case 'renderer':
        return null
      case 'viewport':
        return <Show when={ctx?.selected()} fallback={<NothingSelected />}>
          <Viewport
            html={ctx?.html() ?? ''}
            css={ctx?.css()?.fullCss ?? ''}
            class="bg-normal-2 rounded-s p-m.2 overflow-auto"
            rootStyle="display: flex; align-items: center; justify-content: center;"
          />
        </Show>
      case 'html':
        return <Show when={ctx?.selected()} fallback={<NothingSelected />} keyed>
          {({ util }) => <pre
            class={styles.pre}
            innerHTML={highlighter()?.highlight(formatter()?.html_beautify(ctx?.html() ?? '') ?? '', { language: 'xml' }).value.replaceAll(util, `<span class="bg-accent-2 rounded-s.4 p-i-s.2">${util}</span>`)}
          />}
        </Show>
      case 'css':
        return <Show when={ctx?.selected()} fallback={<NothingSelected />}>
          <pre
            class={`${styles.pre} css`}
            innerHTML={highlighter()?.highlight(formatter()?.css_beautify(ctx?.css()?.shortCss ?? '') ?? '', { language: 'css' }).value}
          />
        </Show>
    }
  }
}

const main: XmlComponent<Element> = (props) => {
  const [selected, setSelected] = createSignal<SelectedUtil>()

  const [html, setHtml] = createSignal<string>('')
  const [css, setCss] = createSignal<{ shortCss: string; fullCss: string }>()

  createEffect(async () => {
    const shortCss = (await uno.generate(selected()?.util ?? '', { safelist: false, preflights: false, minify: true })).css
    const fullCss = (await uno.generate(html())).css
    setCss({ shortCss, fullCss })
  })

  const renderers = () => props.children.map((child) => {
    if (child.type !== 'element')
      return null

    if (child.name !== 'renderer')
      return null

    if (!child.attributes)
      return null

    if (!child.attributes.html)
      return null

    return [new RegExp(child.attributes.for ?? ''), child.attributes.html]
  }).filter(Boolean) as [RegExp, string][]

  const selectUtil = (val: SelectedUtil) => {
    setSelected(val)

    for (let i = 0; i < renderers().length; ++i) {
      const [matcher, output] = renderers()[i]
      if (matcher.test(val.renderer)) {
        setHtml(output.replaceAll('$util', val.util))
        return
      }
    }
  }

  return (
    <Context.Provider value={{ selectUtil, selected, html, css }}>
      <XmlContext.Provider value={extendXmlContext([render])}>
        <XmlChildren {...props} />
      </XmlContext.Provider>
    </Context.Provider>
  )
}

export default main
