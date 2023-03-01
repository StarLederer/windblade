import type { Path } from '@ui/router'
import router, { pathStartsWith } from '@ui/router'
import type { CompiledDocumentationTree } from '@windblade/unocss-docs'
import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { LocalLink } from '~/lib/rotuer'

const Button: Component<{
  path: Path
  title: string
  i: number
}> = (props) => {
  const current = () => pathStartsWith(router.route().current, props.path)
  const style = `filter: hue-rotate(${3.6 * props.i}deg);`

  return (
    <LocalLink
      style="none"
      href={props.path.join('/')}
      // onClick={() => setDrawerOpen(false)}
      class={`${current() ? 'bg-surface text-fg-1' : 'text-fg-3'} block relative p-s.6 p-i-s p-is-m.2 rounded-full text-start justify-start transition ease-out overflow-hidden hover:bg-accent-3 hover:text-fg-1`}
    >
      <div class="absolute inset-0" style={style}>
        <div class={`${current() ? 'bg-accent-2' : 'bg-transparent'} blur-s transition absolute size-b-m.2 size-i-m.2 rounded-full inset-0 inset-b-0 m-b-auto`} />
        <div class={`${current() ? 'bg-accent' : 'bg-accent-2'} size-b-s.4 size-i-s.4 transition absolute rounded-full inset-0 inset-b-0 m-b-auto m-is-$(($m.2-$s.4)/2)`} />
      </div>
      <span class="relative">{props.title}</span>
    </LocalLink>
  )
}

const Main: Component<{
  prefix: Path
  tree: CompiledDocumentationTree
  depth?: number
}> = (props) => {
  let i = 0

  const depth = () => props.depth ?? 0

  return (<>
    <ul class={`list-none flex flex-col ${depth() > 0 ? 'before:font-semibold before:m-be-s before:block gap-s.2' : 'gap-s'}`} title={depth() > 0 ? props.prefix.at(-1) : undefined}>
      <For each={props.tree}>
        {({ name, value }) => (
          <li>
            {typeof value === 'string'
              ? <Button path={[...props.prefix, name]} title={name} i={++i} />
              : <Main tree={value} prefix={[...props.prefix, name]} depth={depth() + 1}/>
            }
          </li>
        )}
      </For>
    </ul>
  </>)
}

export default Main
