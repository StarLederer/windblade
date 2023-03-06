import { For, Show, createEffect, createSignal } from 'solid-js'
import type { AddonXmlComponent } from './XmlComponent'
import Utils from './TryIt/Utils'
import Viewport from './TryIt/Viewport'
import libs from '~/lib/external'
import uno from '~/unocss'

const { formatter, highlighter } = libs

export interface SelectedUtil {
  util: string
  renderer: string
}

export interface Props {
  onChange: (val: SelectedUtil) => void
}

const styles = {
  pre: 'bg-surface p-s rounded-s leading-$($s+$s.4) overflow-auto',
}

const NothingSelected = () => (
  <div class="bg-surface rounded-s p-s flex gap-s text-fg-3">
    <div class="i-mdi-exclamation"></div>
    Please select a utility first
  </div>
)

const Xml: AddonXmlComponent<Props & {
  selected: SelectedUtil | null
  html: string
  shortCss: string
  fullCss: string
}> = props => (
  <For each={props.children}>
    {(node) => {
      if (node.type === 'element') {
        switch (node.name) {
          case 'utils':
            return <Utils fallback={props.fallback} onChange={props.onChange}>{node.children}</Utils>
          case 'renderer':
            return undefined
          case 'viewport':
            return <Show when={props.selected} fallback={<NothingSelected />}>
              <Viewport
                html={props.html}
                css={props.fullCss}
                class="bg-normal-2 rounded-s p-m.2 overflow-auto"
                rootStyle="display: flex; align-items: center; justify-content: center;"
              />
            </Show>
          case 'html':
            return <Show when={props.selected} fallback={<NothingSelected />} keyed>
              {({ util }) => <pre
                class={styles.pre}
                innerHTML={highlighter()?.highlight(formatter()?.html_beautify(props.html) ?? '', { language: 'xml' }).value.replaceAll(util, `<span class="bg-accent-2 rounded-s.4 p-i-s.2">${util}</span>`)}
              />}
            </Show>
          case 'css':
            return <Show when={props.selected} fallback={<NothingSelected />}>
              <pre
                class={`${styles.pre} css`}
                innerHTML={highlighter()?.highlight(formatter()?.css_beautify(props.shortCss) ?? '', { language: 'css' }).value}
              />
            </Show>
        }
      }

      return <props.fallback>{[node]}</props.fallback>
    }}
  </For>
)

const main: AddonXmlComponent = (props) => {
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
    <Xml
      onChange={selectUtil}
      html={html()}
      shortCss={css()?.shortCss ?? ''}
      fullCss={css()?.fullCss ?? ''}
      fallback={props.fallback}
      selected={selected() ?? null}
    >
      {props.children}
    </Xml>
  )
}

export default main
