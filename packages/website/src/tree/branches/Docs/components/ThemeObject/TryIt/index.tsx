import { For, Show, createEffect, createSignal } from 'solid-js'
import type { AddonXmlComponent } from '../XmlComponent'
import Controls from './controls'
import Viewport from './Viewport'
import libs from '~/lib/external'
import uno from '~/unocss'

const { formatter, highlighter } = libs

const styles = {
  pre: 'bg-surface p-s rounded-s leading-$($s+$s.4) overflow-auto',
}

const NothingSelected = () => (
  <div class="bg-surface rounded-s p-s flex gap-s text-fg-3">
    <div class="i-mdi-exclamation"></div>
    Please select a utility first
  </div>
)

const Xml: AddonXmlComponent = (props) => {
  const Fallback = props.fallback ?? (() => undefined)

  const [selected, setSelected] = createSignal<{
    id: string
    util: string
  }>()
  const [html, setHtml] = createSignal<string>('')
  const [css, setCss] = createSignal<{ shortCss: string; fullCss: string }>()

  createEffect(async () => {
    const h = html()
    const shortCss = (await uno.generate(h, { safelist: false, preflights: false, minify: true })).css
    const fullCss = (await uno.generate(h)).css
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

  const selectUtil = (val: { util: string; id: string }) => {
    setSelected(val)

    for (let i = 0; i < renderers().length; ++i) {
      const [matcher, output] = renderers()[i]
      if (matcher.test(val.id)) {
        setHtml(output)
        return
      }
    }
  }

  return <For each={props.children}>
    {(node) => {
      if (node.type === 'element') {
        switch (node.name) {
          case 'utils':
            return <Controls fallback={props.fallback} onChange={selectUtil}>{node.children}</Controls>
          case 'renderer':
            return undefined
          case 'viewport':
            return <Show when={selected()} fallback={<NothingSelected />}>
              <Viewport
                html={html()}
                css={css()?.fullCss ?? ''}
                class="bg-normal-2 rounded-s p-m.2 overflow-auto"
                rootStyle="display: flex; align-items: center; justify-content: center;"
              />
            </Show>
          case 'html':
            return <Show when={selected()} fallback={<NothingSelected />} keyed>
              {({ util }) => <pre
                class={styles.pre}
                innerHTML={highlighter()?.highlight(formatter()?.html_beautify(html()) ?? '', { language: 'xml' }).value.replaceAll(util, `<span class="bg-accent-2 rounded-s.4 p-i-s.2">${util}</span>`)}
              />}

            </Show>
          case 'css':
            return <Show when={selected()} fallback={<NothingSelected />}>
              <pre
                class={`${styles.pre} css`}
                innerHTML={highlighter()?.highlight(formatter()?.css_beautify(css()?.shortCss ?? '') ?? '', { language: 'css' }).value}
              />
            </Show>
        }
      }

      return <Fallback>{[node]}</Fallback>
    }}
  </For>
}

const main: AddonXmlComponent = props => <Xml fallback={props.fallback}>{props.children}</Xml>

export default main
