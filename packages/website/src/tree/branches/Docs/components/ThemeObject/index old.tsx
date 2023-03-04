import type { Component, JSXElement, ParentComponent } from 'solid-js'
import { For, Show, Suspense, createSignal } from 'solid-js'
import type { Content, HTML, PhrasingContent, Root } from 'mdast-util-from-markdown/lib'
import type { DocumentationPage } from 'unocss-docs'
import Progress from '@ui/primitives/Progress'
import UnilityButton from './UtilityButton'
import libs from '~/lib/external'
import ShadowDomUnoCSS from '~/lib/ShadowDomUnoCSS'

const { formatter, highlighter } = libs

const Main: Component<{
  title?: string // unused atm
  page: DocumentationPage
}> = (props) => {
  const [selectedI, setSelectedI] = createSignal(-1)
  const [selectedId, setSelectedId] = createSignal<string | undefined>(undefined)
  const [selected, setSelected] = createSignal<string | undefined>(undefined)
  const [html, setHtml] = createSignal<string>('')
  const [css, setCss] = createSignal<string>('')

  const styles = {
    tr: 'border border-color-transparent border-be-color-fg-5',
    th: 'p-b-s.6 text-start text-fg-3',
    h3: 'font-bold text-$($s+$s.2)',
    h4: 'font-bold m-be-s',
    pre: 'bg-surface p-s rounded-s leading-$($s+$s.4) overflow-auto',
  }

  const Error: ParentComponent = props => (
    <div class="inline-block scheme-auto-0 bg-surface p-s.4 p-i-s rounded-s text-fg-2 font-normal">
      <span class="text-fg-1 font-semibold">Error:</span> {props.children}
    </div>
  )

  const textDirectiveToJSX = (name: string, attributes: Record<string, string | undefined | null>, children: PhrasingContent[]) => {
    switch (name) {
      default:
        return <Error>Unsupported text directive: {name}</Error>
    }
  }

  const TryItControls: Component<{
    utilities: Record<string, string | undefined | null>
  }> = props => (
    <table class="border-collapse">
      <thead class="font-semibold">
        <tr class={styles.tr}>
          <th class={`${styles.th} p-i-s`}><div class="i-mdi-minus" /></th>
          <th class={`${styles.th} size-i-full`}>Utility</th>
        </tr>
      </thead>
      <tbody>
        <For each={Object.entries(props.utilities).filter(([_, val]) => typeof val === 'string') as [string, string][]}>
          {([key, utility], i) => (
            <tr class={styles.tr} >
              <td class="p-i-s">
                <div class="m-auto i-mdi-check transition ease-linear text-fg-1" style={`opacity: ${selectedI() === i() ? 1 : 0};`} />
              </td>
              <td class="p-b-s">
                <UnilityButton
                  utility={utility}
                  onClick={(util) => {
                    setSelectedI(i)
                    setSelectedId(key)
                    setSelected(util)
                  }}
                />
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  )

  const leafDirectiveToJSX = (name: string, attributes: Record<string, string | undefined | null>, children: PhrasingContent[]) => {
    switch (name) {
      case 'try-it-controls':
        return <TryItControls utilities={attributes} />
      case 'try-it-html':
        return <Suspense fallback={<div class={`${styles.pre} flex gap-s items-center`}>Loading <Progress /></div>}>
          <Show when={selected()} fallback="Please select a utility first">
            <pre
              class={styles.pre}
              innerHTML={highlighter()?.highlight(formatter()?.html_beautify(html()) ?? '', { language: 'xml' }).value.replaceAll(selected() ?? '', `<span class="bg-accent-2 rounded-s.4 p-i-s.2">${selected()}</span>`)}
            />
          </Show>
        </Suspense>
      case 'try-it-css':
        return <Suspense fallback={<div class={`${styles.pre} flex gap-s items-center`}>Loading <Progress /></div>}>
          <Show when={selected()} fallback="Please select a utility first">
            <pre
              class={`${styles.pre} css`}
              innerHTML={highlighter()?.highlight(formatter()?.css_beautify(css()) ?? '', { language: 'css' }).value}
            />
          </Show>
        </Suspense>
      default:
        return <Error>Unsupported leaf directive: {name}</Error>
    }
  }

  const tryItPreview = (children: Content[], forId: string | null | undefined) => {
    let a = ''
    for (let i = 0; i < children.length; ++i) {
      if (children[i].type === 'html')
        a += (children[i] as HTML).value
      else
        return <Error>Only HTML is supported inside :::try-it-preview but found: {children[i].type}</Error>
    }

    if (!forId || forId.split(',').includes(selectedId() ?? '')) {
      setHtml(a)
      return <Show when={selected()} fallback="Please select a utility first">
        <ShadowDomUnoCSS
          html={html().replaceAll('$util', selected() ?? '')}
          class="bg-normal-2 rounded-s p-m.2 overflow-auto"
          rootStyle="display: flex; align-items: center; justify-content: center;"
          onChange={setCss}
        />
      </Show>
    }

    return undefined
  }

  const containerDirectiveToJSX = (name: string, attributes: Record<string, string | undefined | null>, children: Content[]) => {
    switch (name) {
      case 'try-it-preview':
        return tryItPreview(children, attributes.for)
      default:
        return <Error>Unsupported container directive: {name}</Error>
    }
  }

  const mdToJsx = (tree: Content | Root): JSXElement => {
    switch (tree.type) {
      case 'text':
        return tree.value
      case 'link':
        return <a class="text-accent" href={tree.url}>{tree.children.map(child => mdToJsx(child))}</a>
      case 'paragraph':
        return (
          <p class="text-fg-3 font-semibold leading-$($s+$s.2) max-size-i-[128ch]">
            {tree.children.map(child => mdToJsx(child))}
          </p>
        )
      case 'heading':
        switch (tree.depth) {
          case 1:
            return <h2 class="text-fg-1 font-bold text-m.2">{tree.children.map(child => mdToJsx(child))}</h2>
          case 2:
            return <h3 class="font-bold text-$($s+$s.2)">{tree.children.map(child => mdToJsx(child))}</h3>
          case 3:
            return <h4 class="font-bold">{tree.children.map(child => mdToJsx(child))}</h4>
          case 4:
            return <h5>{tree.children.map(child => mdToJsx(child))}</h5>
          case 5:
            return <h6>{tree.children.map(child => mdToJsx(child))}</h6>
          case 6:
            return <Error>Heading too deep</Error>
          default:
            return <Error>Invalid heading depth</Error>
        }
      case 'code':
        if (tree.lang === 'uno-html') {
          return <ShadowDomUnoCSS html={tree.value} class="overflow-auto" />
        }
        else {
          const style = `bg-surface p-s rounded-s leading-$($s+$s.4) overflow-auto ${tree.lang ?? ''}`

          if (!tree.lang)
            return <pre class={style}>{tree.value}</pre>

          let highlighted = tree.value
          try {
            highlighted = libs.highlighter()?.highlight(tree.value, { language: tree.lang }).value ?? ''
          }
          catch (err: any) {
            return <Error>Failed highlighting code. {err.message}</Error>
          }

          return <pre class={style} innerHTML={highlighted} />
        }
      case 'inlineCode':
        return <span class="bg-surface p-i-s.4 rounded-s.4">{tree.value}</span>
      case 'strong':
        return <strong class="font-bold">{tree.children.map(child => mdToJsx(child))}</strong>
      case 'list':
        return <ul class="p-is-s flex flex-col gap-s.4">{tree.children.map(child => mdToJsx(child))}</ul>
      case 'listItem':
        return <li class="text-fg-3 font-semibold">{tree.children.map(child => mdToJsx(child))}</li>
      case 'root':
        return tree.children.map(child => mdToJsx(child))
      case 'textDirective':
        return textDirectiveToJSX(tree.name, tree.attributes ?? {}, tree.children)
      case 'leafDirective':
        return leafDirectiveToJSX(tree.name, tree.attributes ?? {}, tree.children)
      case 'containerDirective':
        return containerDirectiveToJSX(tree.name, tree.attributes ?? {}, tree.children)
      default:
        return <Error>Unsoppoprted element: {tree.type}</Error>
    }
  }

  return (
    <div class="size-b-full overflow-auto">
      <div class="p-m.2 flex flex-col gap-s">
        <Suspense fallback="Loading...">
          {(() => {
            const astDirectives = libs.mdDirective()?.directiveFromMarkdown
            if (!astDirectives)
              return 'Error: Failed to load mdast directives extension'

            const mdDirectives = libs.micromarkDirective()?.directive
            if (!mdDirectives)
              return 'Error: Failed to load micromark directives extension'

            const parser = libs.md()
            if (!parser)
              return 'Error: Failed to load mdast parser'

            const md = parser.fromMarkdown(props.page, { mdastExtensions: [astDirectives], extensions: [mdDirectives()] })
            if (!md)
              return 'Error: Failed to parse this page\'s markdown'
            return mdToJsx(md)
          })()}
        </Suspense>
      </div>
    </div>
  )
}

export default Main
