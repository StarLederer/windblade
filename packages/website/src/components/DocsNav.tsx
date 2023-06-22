import type { Component, ParentComponent } from 'solid-js'
import { createContext, useContext } from 'solid-js'
import type { DocumentationTree } from '@windblade/unocss-docs'

import Selector from '~/components/ModuleSelector'
import ForMap from '~/lib/ForMap'

interface Settings {
  leafActive: (path: string[]) => boolean
  leafAs: ParentComponent<{
    path: string[]
    class?: string
  }>
}

const Context = createContext<Settings>()

const Button: Component<{
  path: string[]
  title: string
  i: number
}> = (props) => {
  const settings = useContext(Context) as Settings

  const style = `filter: hue-rotate(${3.6 * props.i}deg);`
  const active = () => settings.leafActive(props.path)

  const styles = () => ({
    root: `
      block
      relative
      p-s.6
      p-i-s
      p-is-m.2
      rounded-full
      text-start
      justify-start
      transition
      ease-out
      overflow-hidden
      hover:bg-accent-3
      hover:text-fg-1
      ${active() ? 'bg-surface text-fg-1' : 'text-fg-3'}
    `,
    dot: {
      all: `
        transition
        absolute
        size-b-m.2
        size-i-m.2
        rounded-full
        inset-0
        inset-b-0
        m-b-auto
      `,
      glow: `
        blur-s
        ${active() ? 'bg-accent-2' : ''}
      `,
      fg: `
        size-b-s.4
        size-i-s.4
        m-is-$(($m.2-$s.4)/2)
        ${active() ? 'bg-accent' : 'bg-accent-2'}
      `,
    },
  })

  return (
    <settings.leafAs
      path={props.path}
      class={styles().root}
    >
      <div class="absolute inset-0" style={style}>
        <div class={`${styles().dot.all} ${styles().dot.glow}`} />
        <div class={`${styles().dot.all} ${styles().dot.fg}`} />
      </div>
      <span class="relative">{props.title}</span>
    </settings.leafAs>
  )
}

const Branch: Component<{
  tree: DocumentationTree
  prefix: string[]
  depth: number
}> = (props) => {
  let i = 0

  return (<>
    <ul class={`list-none flex flex-col ${props.depth > 0 ? 'before:font-semibold before:m-be-s before:block gap-s.2' : 'gap-s'}`} title={props.depth > 0 ? props.prefix.at(-1) : undefined}>
      <ForMap each={props.tree}>
        {([name, value]) => (
          <li>
            {typeof value === 'string'
              ? <Button path={[...props.prefix, name]} title={name} i={++i} />
              : <Branch tree={value} prefix={[...props.prefix, name]} depth={props.depth + 1} />
            }
          </li>
        )}
      </ForMap>
    </ul>
  </>)
}

const Main: Component<{
  tree: DocumentationTree
  class?: string
  ref?: HTMLElement
  settings: Settings
}> = (props) => {
  return (
    <nav class={`${props.class} flex flex-col gap-s`} ref={props.ref}>
      <Selector />
      <Context.Provider value={props.settings}>
        <Branch tree={props.tree} prefix={[]} depth={0} />
      </Context.Provider>
    </nav>
  )
}

export default Main
