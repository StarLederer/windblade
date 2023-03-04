import { For, Show, createSignal } from 'solid-js'
import type { XmlComponent } from '../XmlComponent'
import Controls from './controls'
import ShadowDomUnoCSS from '~/lib/ShadowDomUnoCSS'
import libs from '~/lib/external'

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

const Xml: XmlComponent = (props) => {
  const [selectedI, setSelectedI] = createSignal(-1)
  const [selectedId, setSelectedId] = createSignal<string | undefined>(undefined)
  const [selected, setSelected] = createSignal<string | undefined>(undefined)
  const [html, setHtml] = createSignal<string>('')
  const [css, setCss] = createSignal<string>('')

  const Fallback = props.fallback ?? (() => undefined)

  return <For each={props.children}>
    {(node) => {
      if (node.type === 'element') {
        switch (node.name) {
          case 'utils':
            return <Controls fallback={props.fallback}>{node.children}</Controls>
          case 'preview':
            return <Show when={selected()} fallback={<NothingSelected />}>
              <ShadowDomUnoCSS
                html={html().replaceAll('$util', selected() ?? '')}
                class="bg-normal-2 rounded-s p-m.2 overflow-auto"
                rootStyle="display: flex; align-items: center; justify-content: center;"
                onChange={setCss}
              />
            </Show>
          case 'html':
            return <Show when={selected()} fallback={<NothingSelected />}>
              <pre
                class={`${styles.pre} css`}
                innerHTML={highlighter()?.highlight(formatter()?.css_beautify(css()) ?? '', { language: 'css' }).value}
              />
            </Show>
          case 'css':
            return <Show when={selected()} fallback={<NothingSelected />}>
              <pre
                class={`${styles.pre} css`}
                innerHTML={highlighter()?.highlight(formatter()?.css_beautify(css()) ?? '', { language: 'css' }).value}
              />
            </Show>
        }
      }

      return <Fallback>{[node]}</Fallback>
    }}
  </For>
}

const main: XmlComponent = props => <Xml fallback={props.fallback}>{props.children}</Xml>

export default main
